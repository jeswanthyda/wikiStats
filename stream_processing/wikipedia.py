from kafka import KafkaProducer
from sseclient import SSEClient as EventSource

def publishWikiChangeKafka():
    #Create a Kafka producer which publishes events to a topic
    #Connects to google cloud compute VM instance, which is running as a Kafka broker
    #NOTE: This function runs in a thread, but it could easily be it's own program
    producer = KafkaProducer(bootstrap_servers='35.236.54.217:9092')

    url = 'https://stream.wikimedia.org/v2/stream/recentchange'
    for event in EventSource(url):
        if event.event == 'message':
            try:
                #Publish each new event to the 'wikipedia' kafka topic
                producer.send('wikipedia', event.data.encode('utf-8'))
            except ValueError:
                pass
                
def getWikipediaStream(ssc):
    # Get Wikipedia Dstream from the Kafka topic
    # Consume recent changes from the Kafka topic
    stream = KafkaUtils.createDirectStream(ssc, ['wikipedia'], {"metadata.broker.list": '35.236.54.217:9092'})
    return stream