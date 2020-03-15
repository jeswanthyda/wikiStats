#Libraries
from pyspark import SparkContext
from pyspark.streaming import StreamingContext
from pyspark.streaming.kafka import KafkaUtils
from collections import defaultdict
from time import sleep,time
import json
from kafka import KafkaProducer
from json import dumps,loads
from pyspark.sql import SparkSession
import threading
from collections import defaultdict
from pymongo import MongoClient
import datetime
from datetime import date
import calendar



#Global Variables for Kafka
KAFKA_TOPIC_read = 'wikipedia'
KAFKA_BROKER_read = '127.0.0.1:9092'

#Global Variables for Line Charts
additionLineChartData = []
additionLineChartLabels = []
deletionLineChartData = []
deletionLineChartLabels = []
noeditsLineChartData = []
noeditsLineChartLabels = []



# Restructure Functions
def usersListRestructure(raw_data):
    structured_list = []
    for ((out_key,in_key),value) in raw_data:
        structured_list.append([in_key,value])
    return structured_list

def dataLabelRestructure(raw_data):
    temp_dict = {}
    for ((out_key,in_key),value) in raw_data:
        temp_dict[in_key] = value
    structured_dict = {'labels':list(temp_dict.keys()),'data':list(temp_dict.values())}
    return structured_dict

def wikiCardsRestructure(raw_data,total_changes):
    structured_dict = {'data':[]}
    for ((out_key,in_key),value) in raw_data:
        percent = int(round((100*value)/total_changes))
        structured_dict['data'].append({'domain':in_key,'count':value,'percent':percent})
    return structured_dict

def trafficRestructure(data,labels,limit):
    if len(data) > limit:
        data.pop(0)
        labels.pop(0)
    strucured_dict = {'data':data,'labels':labels}
    return strucured_dict
    

#Push windowed updates to Kafka
def window_sendToKafka(rdd):
    #Thread Target Function
    def doWrite():
        # Kafka Producer
        KAFKA_TOPIC_write = 'processed'
        #KAFKA_BROKER_write = '35.231.177.25:9092'
        KAFKA_BROKER_write = '35.185.103.25:9092' 
        processed_data_producer = KafkaProducer(bootstrap_servers=KAFKA_BROKER_write)
        
        #Restructure data
        data_dict = defaultdict(dict)
        
        #Traffic Line additions Chart
        global additionLineChartData
        global additionLineChartLabels
        
        additionLineChart_data = rdd.filter(lambda x: x[0][0]=='Class' and x[0][1]=='additions').collect()[0][1]
        additionLineChart_label = str(datetime.datetime.now().hour)+':'+str(datetime.datetime.now().minute)+':'+str(datetime.datetime.now().second)
        
        additionLineChartData.append(additionLineChart_data)
        additionLineChartLabels.append(additionLineChart_label)
        
        data_dict['additionLineChart'] = trafficRestructure(additionLineChartData,additionLineChartLabels,20) 
        
        #Traffic Line deletions Chart
        global deletionLineChartData
        global deletionLineChartLabels
        
        deletionLineChart_data = rdd.filter(lambda x: x[0][0]=='Class' and x[0][1]=='deletions').collect()[0][1]
        deletionLineChart_label = str(datetime.datetime.now().hour)+':'+str(datetime.datetime.now().minute)+':'+str(datetime.datetime.now().second)
        
        deletionLineChartData.append(deletionLineChart_data)
        deletionLineChartLabels.append(deletionLineChart_label)
        
        data_dict['deletionLineChart'] = trafficRestructure(deletionLineChartData,deletionLineChartLabels,20)      

        #Traffic Line noedits Chart
        global noeditsLineChartData
        global noeditsLineChartLabels
        
        noeditsLineChart_data = rdd.filter(lambda x: x[0][0]=='Class' and x[0][1]=='noedits').collect()[0][1]
        noeditsLineChart_label = str(datetime.datetime.now().hour)+':'+str(datetime.datetime.now().minute)+':'+str(datetime.datetime.now().second)
        
        noeditsLineChartData.append(noeditsLineChart_data)
        noeditsLineChartLabels.append(noeditsLineChart_label)
              
             
        data_dict['noeditLineChart'] = trafficRestructure(noeditsLineChartData,noeditsLineChartLabels,20)
        
        #Get BotCount and totalChanges (Used for botPercent Card and wikiCards percent)
        bot_count = rdd.filter(lambda x: x[0][0]=='Bot' and x[0][1]=='True').collect()[0][1]
        no_bot_count = rdd.filter(lambda x: x[0][0]=='Bot' and x[0][1]=='False').collect()[0][1]
        total_changes = bot_count+no_bot_count
        
        #Percentage of bots card
        bot_percent = int(round((100*bot_count)/total_changes))
        data_dict['botPercent'] = {"percent":bot_percent}
        
        
        #Top 7 Domains Donut Chart
        domainCountDonut_raw = rdd.filter(lambda x: x[0][0]=='Domain').take(7)
        data_dict['domainCountDonut'] = dataLabelRestructure(domainCountDonut_raw)
        
        #Top 10 Users for Leaderboard
        userLeaderboard_raw = rdd.filter(lambda x: x[0][0]=='User').take(10)
        data_dict['userLeaderboard'] = dataLabelRestructure(userLeaderboard_raw)
        
        #Top 3 popular wiki cards
        topWikiCards_raw = rdd.filter(lambda x: x[0][0]=='Domain').take(3)
        data_dict['topWikiCards'] = wikiCardsRestructure(topWikiCards_raw,total_changes)
        
        #Feed structured data    
        processed_data_producer.send(KAFKA_TOPIC_write, value=dumps(data_dict,ensure_ascii=False).encode('utf-8'))
        
    #Start writing to kafka topic "processed" seperately in a thread
    runner = threading.Thread(target=doWrite)
    runner.start()

    
    
# Aggregated updates to Kafka
def aggregate_sendToKafka(rdd):
    def doWrite():
        # Kafka Producer
        KAFKA_TOPIC_write = 'processed'
        #KAFKA_BROKER_write = '35.231.177.25:9092'
        KAFKA_BROKER_write = '35.185.103.25:9092' 
        processed_data_producer = KafkaProducer(bootstrap_servers=KAFKA_BROKER_write)
                
        #Restructure data
        data_dict = defaultdict(dict)
        
        #Filter and seperate fields as per requirement
        usersadditionsList_raw = rdd.filter(lambda x: x[0][0]=='usersadditions').take(10)
        usersdeletionsList_raw = rdd.filter(lambda x: x[0][0]=='usersdeletions').take(10)
        usersnoeditsList_raw = rdd.filter(lambda x: x[0][0]=='usersnoedits').take(10)
        addDeleteNoedit_raw = rdd.filter(lambda x: x[0][0]=='Class').collect()
        usersadditionsCount = rdd.filter(lambda x: x[0][0]=='usersadditions').count()
        usersdeletionsCount = rdd.filter(lambda x: x[0][0]=='usersdeletions').count()
        usersnoeditsCount   = rdd.filter(lambda x: x[0][0]=='usersnoedits').count()
        
        
        #Feed structured data
        for ((out_key,in_key),value) in addDeleteNoedit_raw:
                data_dict['keyChangesCard'][in_key] = value
                
        data_dict['keyChangesCard']['usersadditionsList'] = usersListRestructure(usersadditionsList_raw)
        data_dict['keyChangesCard']['usersdeletionsList'] = usersListRestructure(usersdeletionsList_raw)
        data_dict['keyChangesCard']['usersnoeditsList'] = usersListRestructure(usersnoeditsList_raw)
        data_dict['keyChangesCard']['usersadditionsCount'] = usersadditionsCount
        data_dict['keyChangesCard']['usersdeletionsCount'] = usersdeletionsCount
        data_dict['keyChangesCard']['usersnoeditsCount'] = usersnoeditsCount
        processed_data_producer.send(KAFKA_TOPIC_write, value=dumps(data_dict,ensure_ascii=False).encode('utf-8'))
    
    #Start writing to kafka topic "processed" seperately in a thread
    runner = threading.Thread(target=doWrite)
    runner.start()

    
#Push aggregated daily hourwise changes to MongoDB
def sendToMongo(rdd):
    value = rdd.collect()[0]
    #Connect to MongoDB
    client = MongoClient('mongodb+srv://wikiStats:wikiStats@cluster0-hm78j.gcp.mongodb.net/daywise_changes?retryWrites=true&w=majority')
    db = client.get_database('wikiStats')
    daywise_changes = db.daywise_changes
    #Update changes
    query = {'day': calendar.day_name[date.today().weekday()]}
    update = {'$set':{str(datetime.datetime.now().hour):value}}
    daywise_changes.update_one(query,update)
    print('Update'+str(datetime.datetime.now().hour)+'to Mongo at'+calendar.day_name[date.today().weekday()])
    #close connection
    client.close()

    
    
#function to get continuous count - Stateful Transformation
def runningUpdate(newValues, runningCount):
    if runningCount is None:
        runningCount = 0
    return sum(newValues, runningCount)

#Functions to extract necessary information
def extract_info_aggregate(rdd):
    data = json.loads(rdd[1])
    try:
        return [(('Class',data['Class']),1),(('users'+data['Class'],data['User']),1)]
    except:
        return []
    
def extract_info_window(rdd):
    data = json.loads(rdd[1])
    try:
        if data['BOT'] == 'False':
            return [(('Domain',data['Domain']),1),(('Bot',data['BOT']),1),(('User',data['User']),1),(('Class',data['Class']),1)]
        else:
            return [(('Domain',data['Domain']),1),(('Bot',data['BOT']),1),(('Class',data['Class']),1)]
    except:
        return []

    

if __name__=='__main__':
    
    #Initialize Spark
    sc = SparkContext(appName='WikiStats')
    sparksql = SparkSession(sc)
    sc.setLogLevel("ERROR")
    
    
    #Streaming and window variables
    window_slide = 6
    window_duration = 40
    batch_time = 2

    #Read streams from Kafka Topic 'wikipedia' as dstreams
    ssc = StreamingContext(sc, batch_time)
    ssc.checkpoint("checkpoint_wiki")
    
    ##Stream Pipeline Design
    wikiKafkaStream = KafkaUtils.createDirectStream(ssc, [KAFKA_TOPIC_read], {"metadata.broker.list": KAFKA_BROKER_read})

    #Aggregations section of Stream Pipeline - Stateful transformation
    aggregate_raw_data = wikiKafkaStream.flatMap(lambda rdd: extract_info_aggregate(rdd))
    aggregate_Counts_data = aggregate_raw_data.updateStateByKey(runningUpdate)
    aggregate_ordered_Counts = aggregate_Counts_data.transform(lambda rdd : rdd.sortBy(lambda x : x[1], ascending = False).sortBy(lambda x: x[0][0]))
    aggregate_ordered_Counts.foreachRDD(lambda x: aggregate_sendToKafka(x))

    #Window section of Stream Pipeline - Stateless transformation
    window_raw_data = wikiKafkaStream.flatMap(lambda rdd: extract_info_window(rdd))
    window_Counts_data = window_raw_data.reduceByKeyAndWindow(lambda x, y: x + y, lambda x, y: x - y, window_duration, window_slide)
    window_ordered_Counts = window_Counts_data.transform(lambda rdd : rdd.sortBy(lambda x : x[1], ascending = False).sortBy(lambda x: x[0][0]))
    window_ordered_Counts.foreachRDD(lambda x: window_sendToKafka(x))

    #Write hourly changes to MongoDB
    wikiKafkaStream.countByWindow(3600, 3600).foreachRDD(lambda x: sendToMongo(x))
    
    ##Start Stream Pipeline
    ssc.start()
    start_time = time()
    ssc.awaitTermination()
    end_time = time()
    print('TERMINATION DONE after: ' + str(int(end_time-start_time)) + 'seconds')
    