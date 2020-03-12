from kafka import KafkaProducer
from sseclient import SSEClient as EventSource

KAFKA_SERVER = '35.236.54.217:9092'
KAFKA_TOPIC = 'wikipedia'
DATA_SOURCE = 'https://stream.wikimedia.org/v2/stream/recentchange'

def publishWikiChangeKafka():
    #Create a Kafka producer which publishes events to a topic
    #Connects to google cloud compute VM instance, which is running as a Kafka broker
    #NOTE: This function runs in a thread, but it could easily be it's own program
    producer = KafkaProducer(bootstrap_servers=KAFKA_SERVER)

    for event in EventSource(DATA_SOURCE):
        if event.event == 'message':
            try:
                #Publish each new event to the 'wikipedia' kafka topic
                producer.send(KAFKA_TOPIC, event.data.encode('utf-8'))
            except ValueError:
                pass
                
def getWikipediaStream(ssc):
    # Get Wikipedia Dstream from the Kafka topic
    # Consume recent changes from the Kafka topic
    stream = KafkaUtils.createDirectStream(ssc, [KAFKA_TOPIC], {"metadata.broker.list": KAFKA_SERVER})
    return stream
    
    
    
    
##CAN POSSIBLY BE USED. HERE TEMPORARILY
for event in EventSource(url):
    if event.event == 'message':
        try:
            change = json.loads(event.data)
        except ValueError:
            pass
        else:
            if(change['type'] == 'edit'):
                if(change['length']['old'] > change['length']['new']):
                    change['class'] = 'Deletion'
                else:
                    change['class'] = 'Addition'
            else:
                change['class'] = 'Not edit'
            print('Type: ' + str(change['type']))
            print('Wiki: ' + str(change['wiki']))
            print('Title: ' + str(change['title']))
            print('BOT: ' + str(change['bot']))
            print('User: ' + str(change['user']))
            print('Timestamp: ' + str(change['timestamp']))
            print('Class: ' + str(change['class']))
            print('Comment: ' + str(change['comment']))