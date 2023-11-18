import * as React from 'react';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { useEffect, useState} from 'react'

export default function Scanner({scanning, setScanning, badform}) {
  const [processing, setProcessing] = useState(false);
  const [doneProcess, setDoneProcess] = useState(false);


  const startScanning = () => {
    setScanning(true);
    setProcessing(false);
  };

  const stopScanning = () => {
    setScanning(false);
    setProcessing(true);
  };

  const stopProcessing = () => {
    setProcessing(false);;
    setDoneProcess(false)
  };

  useEffect(() => {

    if (processing) {
      const timer = setTimeout(()=>{
        setDoneProcess(true)
      }, 3000)

      return () =>clearTimeout(timer)
    }

  },[processing])


  return (
    <div>
      <Button onClick={startScanning} disabled={scanning || processing}>
        Start Scanning
      </Button>
      <Button onClick={stopScanning} disabled={!scanning || processing}>
        Stop Scanning
      </Button>

      {scanning && (
        <Alert severity="success">
          <AlertTitle>Scanning in progress</AlertTitle>
          <CircularProgress size={20} />
        </Alert>
      )}

      {scanning && badform && (
        <Alert severity="danger">
          <AlertTitle>bad form detected</AlertTitle>
          <CircularProgress size={20} />
        </Alert>
      )}

      {processing && !doneProcess && (
        <Alert severity="info">
          <AlertTitle>Processing...</AlertTitle>
          This might take a moment.
        </Alert>
      )}

      {!scanning && !processing && (
        <Alert severity="info">
          <AlertTitle>Scanning not in progress</AlertTitle>
          Click "Start Scanning" to begin.
        </Alert>
      )}

      {/* Conditionally render processing alert */}
      {processing && doneProcess && (
        <Alert severity="success" onClose={stopProcessing}>
          <AlertTitle>Processing completed</AlertTitle>
          You suck at exercising!.
        </Alert>
      )}
    </div>
  );
}
