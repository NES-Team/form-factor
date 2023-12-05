import { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import badForm from '../utils/vinh';
import { state } from '@abandonware/noble';

const [AX, AY, AZ, GX, GY, GZ] = [0,1,2,3,4,5,6,7]




export default function Connection({setBadFormShared, badFormShared, exercise}) {
  const [sensorData, setSensorData] = useState({ descriptor: '', sensorValue: NaN });
  const [socket, setSocket] = useState(null)
  const [stateArr, setStateArr] = useState([0,0,0,0,0,0])
  const [flag, setFlag] = useState(true)
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

    const badFormRes = badForm({
      ax: stateArr[AX],
        ay: stateArr[AY],
        az: stateArr[AZ],
        gx: stateArr[GX],
        gy: stateArr[GY],
        gz: stateArr[GZ],
        exercise
    })

    if (badFormRes != null) {
      console.log("HEHE GOGO")
      setBadFormShared(badFormRes)
      setFlag(!flag)
      console.log("BAD FORM")
    }
    
      
    
  }



  // if trigger has not been set within 2 seconds, set bad form to false
  useEffect(() => {
    const startTimer = () => {
      timeoutId = setTimeout(()=>{
        setBadFormShared(false)

        startTimer()
      }, 2000)
    }

    startTimer()

    return ()=> {
      clearTimeout(timeoutId)
    }
  }, [flag]);

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

  function createData(name, x, y ) {
    return { name, x: Number(x.toFixed(4)), y: Number(y.toFixed(4)), };
  }

  const rows = [
    createData('x-axis', stateArr[AX], stateArr[GX]),
    createData('y-axis',  stateArr[AY], stateArr[GY]),
    createData('z-axis',  stateArr[AZ], stateArr[GZ]),
  ];

  return (
    // <div className="App">
    //   <h1>IMU Sensor Data</h1>
    //   <p>ax: {stateArr[AX]}</p>
    //   <p>ay: {stateArr[AY]}</p>
    //   <p>az: {stateArr[AZ]}</p>
    //   <p>gx: {stateArr[GX]}</p>
    //   <p>gy: {stateArr[GY]}</p>
    //   <p>gz: {stateArr[GZ]}</p>

    // </div>
    <>
    <TableContainer component={Paper}>
    <Table sx={{ minWidth: 300 }} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell sx={{fontWeight: 600, fontSize: 20}}>IMU Data </TableCell>
          <TableCell align="right" sx={{fontWeight: 600, fontSize: 20}}>Accelerometer </TableCell>
          <TableCell align="right" sx={{fontWeight: 600, fontSize: 20}}>gyroscope</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row) => (
          <TableRow
            key={row.name}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell component="th" scope="row" sx={{fontWeight: 600, fontSize: 20}}>
              {row.name}
            </TableCell>
            <TableCell align="right" sx={{fontSize: 16}}>{row.x}</TableCell>
            <TableCell align="right" sx={{fontSize: 16}}>{row.y}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
  <button onClick={() => setBadFormShared(true)}>bad form</button> 
  </>
  );
}
