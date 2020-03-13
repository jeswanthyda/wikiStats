from kafka import KafkaProducer
from sseclient import SSEClient as EventSource
from json import dumps,loads

# KAFKA_BROKER = '35.231.177.25:9092' #Jeswanth
KAFKA_BROKER = '35.185.103.25:9092' #Sid
KAFKA_TOPIC = 'wikipedia_consumer'
DATA_SOURCE = 'https://stream.wikimedia.org/v2/stream/recentchange'

def publishWikiChangeKafka():
    #Create a Kafka producer which publishes events to a topic
    
    producer = KafkaProducer(bootstrap_servers=KAFKA_BROKER)
    for event in EventSource(DATA_SOURCE):
        if event.event == 'message':
            #Process event and extract necessary attributes here
            useful_info = {}
            try:
                change = loads(event.data)
            except ValueError:
                pass
            else:
                if(change['type'] == 'edit'):
                    if(change['length']['old'] > change['length']['new']):
                        useful_info['class'] = 'Deletion'
                    else:
                        useful_info['class'] = 'Addition'
                else:
                    useful_info['class'] = 'Not edit'
                useful_info['Type'] = change['type']
                useful_info['Domain'] = change['meta']['domain']
                useful_info['Title'] = change['title']
                useful_info['BOT'] = change['bot']
                useful_info['User'] = change['user']
                useful_info['Timestamp'] = change['timestamp']
                useful_info['Comment'] = change['comment']
                useful_info['Topic'] = change['meta']['topic']
                useful_info['Wiki'] = change['wiki']
                
            #Publish each new event to the 'wikipedia' kafka topic    
            try:
                #How to deal with Non-ascii values? Will it have any impact?
                producer.send(KAFKA_TOPIC, value=dumps(useful_info,ensure_ascii=False).encode('utf-8'))
            except:
                pass
            
            
if __name__ == "__main__":
    publishWikiChangeKafka()