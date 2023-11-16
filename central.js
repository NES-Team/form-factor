// based on the example on https://www.npmjs.com/package/@abandonware/noble

const noble = require('@abandonware/noble');

const uuid_service = "2711"
const uuid_values = ["2101", "2102", "2103", "2104", "2105", "2106"]
const characteristicDescriptors = {
  "2101": "ax",
  "2102": "ay",
  "2103": "az",
  "2104": "gx",
  "2105": "gy",
  "2106": "gz",
}

let sensorValue = NaN
let descriptor = ""

noble.on('stateChange', async (state) => {
    if (state === 'poweredOn') {
        console.log("start scanning")
        await noble.startScanningAsync([uuid_service], false);
    }
});

noble.on('discover', async (peripheral) => {
    await noble.stopScanningAsync();
    await peripheral.connectAsync();
    const {
        characteristics
    } = await peripheral.discoverSomeServicesAndCharacteristicsAsync([uuid_service], uuid_values);
    characteristics.forEach((characteristic) => {
        readData(characteristic);
    });
});

//
// read data periodically
//
let readData = async (characteristic) => {
    const value = (await characteristic.readAsync());
    descriptor = characteristicDescriptors[characteristic.uuid];
    sensorValue = value.readFloatLE(0);
    console.log(`${descriptor}:`, sensorValue);

    // read data again in t milliseconds
    setTimeout(() => {
        readData(characteristic)
    }, 10);
}

//
// hosting a web-based front-end and respond requests with sensor data
// based on example code on https://expressjs.com/
//
const express = require('express')
const app = express()
const port = 3000

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index')
})

app.post('/', (req, res) => {
    res.writeHead(200, {
        'Content-Type': 'application/json'
    });
    res.end(JSON.stringify({
        descriptor: descriptor,
        sensorValue: sensorValue
    }))
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})