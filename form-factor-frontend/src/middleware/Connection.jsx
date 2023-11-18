import { useEffect, useState } from 'react';

export default function Connection() {
  const [sensorData, setSensorData] = useState({ descriptor: '', sensorValue: NaN });
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Establish WebSocket connection
    const ws = new WebSocket('ws://localhost:3000'); // Replace with your server URL

    ws.onopen = () => {
      console.log('WebSocket connected');
      setSocket(ws);
    };

    ws.onmessage = (event) => {
      const receivedData = JSON.parse(event.data);
      setSensorData(receivedData); // Update state with received sensor data
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
      <p>Descriptor: {sensorData.descriptor}</p>
      <p>Sensor Value: {sensorData.sensorValue}</p>
    </div>
  );
}
