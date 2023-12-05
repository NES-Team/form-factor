import * as React from 'react';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { useEffect, useState} from 'react'
import { styled } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';
import Snackbar from '@mui/material/Snackbar';


const translation = 
{
  "bicep": "Bicep Curl",
  "jack": "Jumping Jacks",
  "lateral": "Lateral Raise",
  "crunch": "Crunches",
  "push": "Push Ups",
  "row": "Rows",
}


export default function Scanner({scanning, setScanning, badFormShared, form = "bicep", doneProcess, setDoneProcess, processing, setProcessing}) {

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

  useEffect(()=>{
    console.log(badFormShared)
  }, [badFormShared])

  const StyledAlert = styled(Alert)(({ theme }) => ({
    '& .MuiAlert-icon': {
      fontSize: '2.2rem', // Adjust the font size of the Alert icon
    },
  }));

  return (
    <div>
      <Button onClick={startScanning} disabled={scanning || processing}  
        sx={{ fontSize: '1.8rem', padding: '15px', marginBottom: '10px', marginRight: '15px'}}
        >
        Start Tracking
      </Button>
      <Button onClick={stopScanning} disabled={!scanning || processing}  color="error"
        sx={{ fontSize: '1.8rem', padding: '15px', marginBottom: '10px' }}
      >

        Stop Tracking
      </Button>

      {scanning && badFormShared === null && (
      <StyledAlert
        severity="success"
        sx={{
          fontSize: '3rem', // Adjust the font size to increase the overall size
          padding: '20px', // Increase padding for more space
          position: 'relative', // Make the position relative for absolute positioning of Linear Progress
        }}
      >
        <AlertTitle sx={{ fontSize: '1.6rem', color: '#656565', marginLeft: 2, mb: 5 }}>
          Tracking your{' '}
          <span style={{ color: '#333333', fontWeight: 'bold' }}>{translation[form]}</span> form
          {" "}
          <span style={{ color: '#2e7d32', fontWeight: 'bold' }}> (Good) </span>
        </AlertTitle>
        
        <LinearProgress
          sx={{
            position: 'absolute', // Set position to absolute
            bottom: 0, // Position it at the bottom
            left: 0, // Align it with the left side
            width: '100%', // Make it stretch across the whole width of the Alert
            height: '10px', // Increase the height for better visibility
          
          }}
          color="success"
        />
      </StyledAlert>
    )}

    {scanning && badFormShared !== null && (
      <StyledAlert
        severity="error"
        sx={{
          fontSize: '3rem', // Adjust the font size to increase the overall size
          padding: '20px', // Increase padding for more space
          position: 'relative', // Make the position relative for absolute positioning of Linear Progress
        }}
      >
        <AlertTitle sx={{ fontSize: '1.6rem', color: '#656565', marginLeft: 2, mb: 5 }}>
          Your
          {" "}
          <span style={{ color: '#333333', fontWeight: 'bold' }}>{translation[form]}</span> form
          {" "} needs improvement.
          <span style={{ color: '##d32f2f', fontWeight: 'bold' }}> ({badFormShared}) </span>
        </AlertTitle>
        
        <LinearProgress
          sx={{
            position: 'absolute', // Set position to absolute
            bottom: 0, // Position it at the bottom
            left: 0, // Align it with the left side
            width: '100%', // Make it stretch across the whole width of the Alert
            height: '10px', // Increase the height for better visibility
          
          }}
          color="error"
        />
      </StyledAlert>
    )}  


      {/* {processing && !doneProcess && (
        <Alert severity="info">
          <AlertTitle>Processing...</AlertTitle>
          This might take a moment.
        </Alert>
      )} */}
      {/* {processing && !doneProcess && (
        <Alert severity="info">
          <AlertTitle>Processing...This might take a moment.</AlertTitle>
          
        </Alert>
      )} */}

      {processing && !doneProcess && (
        <StyledAlert
        severity="info"
        sx={{
          fontSize: '3rem', // Adjust the font size to increase the overall size
          padding: '20px', // Increase padding for more space
          position: 'relative', // Make the position relative for absolute positioning of Linear Progress
        }}
      >
          <AlertTitle sx={{ fontSize: '1.6rem', color: '#656565', marginLeft: 2, mb: 5 }}>
          <span style={{ color: '#333333', fontWeight: 'bold' }}>Processing...</span><br />
          This might take a moment.
          </AlertTitle>
        </StyledAlert>
      )}

      {/* Conditionally render processing alert */}
      {processing && doneProcess && (
        <StyledAlert
        severity="success"
        sx={{
          fontSize: '3rem', // Adjust the font size to increase the overall size
          padding: '20px', // Increase padding for more space
          position: 'relative', // Make the position relative for absolute positioning of Linear Progress
        }}
        onClose={stopProcessing}
      >
          <AlertTitle sx={{ fontSize: '1.6rem', color: '#656565', marginLeft: 2, mb: 5 }}>
          You ego lift too much...
          
          </AlertTitle>
        </StyledAlert>
      )}
    </div>
  );
}
