import { Box } from '@mui/material';
import StrictnessSlider from './components/StricnessSlider';
import { useState } from 'react';
import ExerciseToggleButtons from './components/ExerciseSelector';
import Scanner from './components/Scanner';
import Connection from './middleware/Connection'
function App() {
  const [sliderVal, setSliderVal] = useState(50);
  const [exercise, setExercise] = useState('bicep');
  const [scanning, setScanning] = useState(false);

  return (
    <Box sx={{padding: 30, justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column'}}>
      <Box sx={{ width: '80%', mb: 20 }}>
        <StrictnessSlider value={sliderVal} setValue={setSliderVal}/>
      </Box>
      <Box sx={{ width: '80%', justifyContent: 'center', alignItems: 'center', mb: 20}}>
        <ExerciseToggleButtons exercise={exercise} setExercise={setExercise}/>
      </Box>

      <Box sx={{ width: '80%', justifyContent: 'center', alignItems: 'center' }}>
        <Scanner scanning={scanning} setScanning={setScanning}/>
      </Box>

      {scanning && 
      <>
        <Connection />
      </>}
    </Box>
    
  );
}

export default App;
