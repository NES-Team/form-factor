import { state } from '@abandonware/noble';
import { useEffect, useState } from 'react';

const [AX, AY, AZ, GX, GY, GZ] = [0,1,2,3,4,5,6,7]




export default function Connection({badform, setBadForm}) {
  const [sensorData, setSensorData] = useState({ descriptor: '', sensorValue: NaN });
  const [socket, setSocket] = useState(null)
  const [stateArr, setStateArr] = useState([0,0,0,0,0,0])
  let timeoutId;

  function descriptorParser() {

    let i = -1
    switch (sensorData.descriptor) {
      case "ax":
        i = AX
        break
      case "ay":
        i = AY
       break
      case "az":
        i = AZ
        break
      case "gx":
        i = GX
       break
      case "gy":
        i = GY
        break
      case "gz":
        i = GZ
        break
      default:
        console.log("Error: state desc not valid")
    }
  
    stateArr[i] = sensorData.sensorValue
    
    // logic for bad form
    if (i == AY && sensorData.sensorValue > 0.7) {
      setBadForm(true)
      resetTimer()
    }
  }

  function resetTimer() {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      setBadForm(false);
    }, 2000);
  }



  // if trigger has not been set within 2 seconds, set bad form to false
  useEffect(() => {
    if (badForm) {
      resetTimer();
    }
  }, [badForm]);

  useEffect(() => {
    // Establish WebSocket connection
    const ws = new WebSocket('ws://localhost:8000'); // Replace with your server URL

    ws.onopen = () => {
      console.log('WebSocket connected');
      setSocket(ws);
    };

    ws.onmessage = (event) => {
      const receivedData = JSON.parse(event.data);
      setSensorData(receivedData); // Update state with received sensor data
      descriptorParser(stateArr, receivedData.descriptor, receivedData.sensorValue)
      console.log(receivedData)
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    return () => {
      if (socket) {
        socket.close(); // Close WebSocket connection on component unmount
      }
    };
  }, [socket]);

  return (
    <div className="App">
      <h1>IMU Sensor Data</h1>
      {/* <p>Descriptors: {sensorData.descriptor}</p>
      <p>Sensor Value: {sensorData.sensorValue}</p> */}
      <p>ax: {stateArr[AX]}</p>
      <p>ay: {stateArr[AY]}</p>
      <p>az: {stateArr[AZ]}</p>
      <p>gx: {stateArr[GX]}</p>
      <p>gy: {stateArr[GY]}</p>
      <p>gz: {stateArr[GZ]}</p>

    </div>
  );
}
