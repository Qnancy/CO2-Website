import paho.mqtt.client as mqtt
import base64

# MQTT broker details
broker = "127.0.0.1"
port = 1883
topic = "image"

# The callback for when the client receives a CONNACK response from the server.
def on_connect(client, userdata, flags, rc):
    print(f"Connected with result code {rc}")

# Create an MQTT client and connect to the broker
client = mqtt.Client(mqtt.CallbackAPIVersion.VERSION1)
client.on_connect = on_connect
client.connect(broker, port, 60)

# Convert image to base64
with open("D:\College\Study\CO2\8539045.jpg", "rb") as image_file:
    encoded_string = base64.b64encode(image_file.read()).decode('utf-8')

# Publish the image
client.publish(topic, encoded_string)
