import json
from sseclient import SSEClient as EventSource

url = 'https://stream.wikimedia.org/v2/stream/recentchange'
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