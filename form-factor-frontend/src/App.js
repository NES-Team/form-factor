import { Box, Typography } from '@mui/material';
import StrictnessSlider from './components/StricnessSlider';
import { useState } from 'react';
import ExerciseToggleButtons from './components/ExerciseSelector';
import Scanner from './components/Scanner';
import Connection from './middleware/Connection'
function App() {
  const [sliderVal, setSliderVal] = useState(50);
  const [exercise, setExercise] = useState('bicep');
  const [scanning, setScanning] = useState(false);
  const [badFormShared, setBadFormShared] = useState(null);
  const [done, setDone] = useState(false);
  const [processing, setProcessing] = useState(false);

  return (
    <Box sx={{padding: 10, justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column'}}>
      
      <Box sx={{ width: '60%', justifyContent: 'center', alignItems: 'center', mb: 20}}>
        <ExerciseToggleButtons exercise={exercise} setExercise={setExercise}/>
       <Box sx={{padding: 2}}/>
        <StrictnessSlider value={sliderVal} setValue={setSliderVal}/>
      </Box>


      <Box sx={{ width: '80%', justifyContent: 'center', alignItems: 'center' }}>
        <Scanner scanning={scanning} setScanning={setScanning} badFormShared={badFormShared} form={exercise} doneProcess={done} setDoneProcess={setDone} processing={processing} setProcessing={setProcessing}/>
      </Box>

      {!scanning && !done && !processing && (
                <Box sx={{ width: '80%', justifyContent: 'center', alignItems: 'center', }}>

          <Typography variant="header" color="text.secondary" mb={3} fontSize={22} ml={5}>
            Click "Start tracking" to begin monitoring your form.
          </Typography>
          </Box>
        )}

      {scanning && 
      <>
        <Box sx={{ width: '80%', justifyContent: 'center', alignItems: 'center' }}>
          <Connection badFormShared={badFormShared} setBadFormShared={setBadFormShared} exercise={exercise}/>
        </Box>
      </>}

    </Box>
    
  );
}

export default App;
