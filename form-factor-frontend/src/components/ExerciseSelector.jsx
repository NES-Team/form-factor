import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import KeyboardIcon from '@mui/icons-material/Keyboard'
import { Box, Typography } from '@mui/material';

const bicep = require('./bicepPng.png')
const jack = require('./jackPng.png')
const lateral = require('./lateralPng.png')
const crunch = require('./crunchPng.png')
const push = require('./pushPng.png')
const row = require('./rowPng.png')

export default function ExerciseToggleButtons({ setExercise, exercise, size = '10rem' }) {
  const handleExercise = (
    event,
    newExercise
  ) => {
    setExercise(newExercise);
  };

  return (
    <Box sx={{display: 'flex', width: '100%', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
        <Box sx={{
            width: '100%',
            textAlign: 'center',
            marginBottom: '2rem',
            flex: 1/3,
        }}>
            <Typography fontSize={20} fontWeight={500}>
                Exercise
            </Typography>
        </Box>
        <Box sx={{
            width: '100%',
            textAlign: 'center',
            marginBottom: '1rem',
            flex: 2/3,
        }}> 
            <ToggleButtonGroup
            value={exercise}
            exclusive
            onChange={handleExercise}
            aria-label="exercise type"
            >
            <ToggleButton value="bicep" aria-label="bicep curl">
                    <img src={bicep} alt="bicep curl" style={{ width: size, height: size }} />
                
            </ToggleButton>
            <ToggleButton value="jack" aria-label="jumping jacks">
                    <img src={jack} alt="jumping jack" style={{ width: size, height: size }} />
            </ToggleButton>
            <ToggleButton value="lateral" aria-label="lateral raise">
                    <img src={lateral} alt="lateral raise" style={{ width: size, height: size }} />
            </ToggleButton>
            <ToggleButton value="crunch" aria-label="crunches">
                    <img src={crunch} alt="crunches" style={{ width: size, height: size }} />
            </ToggleButton>
            <ToggleButton value="push" aria-label="push ups">
                    <img src={push} alt="push up" style={{ width: size, height: size }} />
            </ToggleButton>
            <ToggleButton value="row" aria-label="rows">
                    <img src={row} alt="rows" style={{ width: size, height: size }} />
            </ToggleButton>
            </ToggleButtonGroup>
        </Box>
    </Box>
  );
}
