const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const characteristicDescriptors = {
  "2101": "ax",
  "2102": "ay",
  "2103": "az",
  "2104": "gx",
  "2105": "gy",
  "2106": "gz",
}

let sensorValue = NaN;
let descriptor = "";
let clients = []; // Store connected WebSocket clients

wss.on('connection', (ws) => {
  // console.log('WebSocket client connected');
  clients.push(ws);

  ws.on('close', () => {
    // console.log('WebSocket client disconnected');
    clients = clients.filter((client) => client !== ws);
  });
});

const noble = require('@abandonware/noble');

const uuid_service = "2711";
const uuid_values = ["2101", "2102", "2103", "2104", "2105", "2106"];

noble.on('stateChange', async (state) => {
  if (state === 'poweredOn') {
    console.log("start scanning");
    await noble.startScanningAsync([uuid_service], false);
  }
});

noble.on('discover', async (peripheral) => {
  await noble.stopScanningAsync();
  await peripheral.connectAsync();
  const { characteristics } = await peripheral.discoverSomeServicesAndCharacteristicsAsync([uuid_service], uuid_values);
  characteristics.forEach((characteristic) => {
    readData(characteristic);
  });
});

let readData = async (characteristic) => {
  const value = (await characteristic.readAsync());
  descriptor = characteristicDescriptors[characteristic.uuid];
  sensorValue = value.readFloatLE(0);
  console.log(`${descriptor}:`, sensorValue);

  // Broadcast data to connected WebSocket clients
  clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({ descriptor, sensorValue }));
    }
  });

  // read data again in t milliseconds
  setTimeout(() => {
    readData(characteristic);
  }, 10);
};

const port = 8000;

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index');
});

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
