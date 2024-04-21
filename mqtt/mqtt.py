from re import sub
import paho.mqtt.client as mqtt
import atexit
import time
import os
import pymysql
import base64

broker = '127.0.0.1'
port = 1883

data_topic = 'data'
image_topic = 'image'
image_output_dir = '../frontend/public/images/' 

class message:
    def __init__(self, day, time, co2):
        self.day = day
        self.time = time
        self.co2 = co2


db = pymysql.connect(host="localhost", port=3306, user="root", password="qiu1446747873", db="co2")
cursor = db.cursor()


def connect_mqtt() -> mqtt.Client:
    def on_connect(client, userdata, flags, rc):
        print("Connect successfully!" if rc == 0 else "Connect failed, return code {rc}")
    client = mqtt.Client(mqtt.CallbackAPIVersion.VERSION1)
    client.on_connect = on_connect
    client.connect(broker, port)
    return client


def subscribe(client: mqtt.Client):
    client.subscribe(data_topic)
    client.subscribe(image_topic) 


def unsubscribe(client: mqtt.Client):
    client.unsubscribe(data_topic)
    client.subscribe(image_topic) 

def on_message(client, userdata, msg):
    if msg.topic == image_topic:
        image_data = base64.b64decode(msg.payload)
        title = str(time.time())
        image_path = os.path.join(image_output_dir, f'{title}.jpg')
        with open(image_path, 'wb') as image_file:
            image_file.write(image_data)
        print(f'Saved image to {image_path}')
        cursor.execute("INSERT INTO picture (title) VALUES (%s)", (title,))
        db.commit()
    elif msg.topic == data_topic:
        data = msg.payload.decode()
        data = sub('day: ', '', data)
        data = sub('time: ', '', data)
        data = sub('co2: ', '', data)
        data = data.split(', ')
        day = data[0]
        day_time = data[1]
        co2 = int(data[2])
        print('day:', day)
        print('time:', day_time)
        print('co2:', co2)
        place = '32 Dormitory'
        people_num = 4
        print("people_num:",people_num)

        cursor.execute("INSERT INTO messages (place, day, time, co2, people_num) VALUES (%s, %s, %s, %s, %s)", (place, day, day_time, co2, people_num))
        db.commit()

def quit():
    unsubscribe(client)
    cursor.close()
    db.close()


if __name__ == '__main__':
    os.chdir(os.path.dirname(__file__))
    atexit.register(quit)
    client = connect_mqtt()
    client.on_message = on_message
    client.loop_start()

    while True:
        subscribe(client)
        time.sleep(20)
        unsubscribe(client)
