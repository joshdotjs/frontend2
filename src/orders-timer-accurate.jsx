// libs:
import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';

// utils:
import { zeroPad } from './util/string';

// ==============================================
// ==============================================

const display = {
  xs: 'none',
  md: 'inline',
};

// ==============================================
// ==============================================
// ==============================================
// ==============================================

const timeDiff = (time) => {
  // const created_at = dayjs(order.order.created_at);
  const then = dayjs(time);
  // console.log('created_at: ', created_at.format());
  
  const now = dayjs();
  // console.log('now: ', now.format());

  // const seconds = now.diff(then, 'second');
  // // console.log('seconds: ', seconds);
  // return seconds;

  const ms = now.diff(then, 'ms');
  // console.log('ms: ', ms);
  return ms;
};

// ==============================================

const ms2s = (t)  => Math.floor(t / 1000);
const toMin = (t) => Math.floor( ms2s(t) / 60);
const toSec = (t) => zeroPad( ms2s(t) % 60 );

// ==============================================

// ==============================================
// ==============================================
// ==============================================
// ==============================================

function PreciseTimer({ created_at, order_id }) {

  // ============================================

  const [isRunning, setIsRunning] = useState(true);
  const [elapsedTime, setElapsedTime] = useState( timeDiff(created_at) );
  const [startTime, setStartTime] = useState(Date.now() - timeDiff(created_at));

  // ============================================

  useEffect(() => {
    let timer;

    function tick() {
      const now = Date.now();
      const newElapsedTime = now - startTime;
      setElapsedTime(newElapsedTime);

      // Calculate the drift and adjust the timeout accordingly
      const nextTick = 1000 - (newElapsedTime % 1000);
      timer = setTimeout(tick, nextTick);
    }

    if (isRunning && startTime !== null) {
      tick();
    }

    return () => clearTimeout(timer);  // Clear timeout on component unmount or if dependencies change
  }, [isRunning, startTime]);

  // ============================================

  // const startTimer = () => {
  //   setIsRunning(true);
  //   setStartTime(Date.now() - elapsedTime);  // Account for the previous elapsed time
  // };

  // ============================================

  const stopTimer = () => {
    setIsRunning(false);
  };

  // ============================================

  // const resetTimer = () => {
  //   setIsRunning(false);
  //   setElapsedTime(0);
  //   setStartTime(null);
  // };

  // ============================================

  return (
    <Box
      data-cy={`admin-order-${order_id}-timer`}
      // sx={{
      //   background: 'lightblue',
      // }}
    >
      <Typography
        component="span"
        sx={{ 
          fontWeight: 'bold',
          fontSize: '1.5rem',
          mr: '3px',
         }}
      >
        { toMin(elapsedTime) }:{ toSec(elapsedTime) }
      </Typography>

      <Typography
        component="span"
        sx={{
          display
        }}
      >
        min
      </Typography>
    </Box>
  );
}

export default PreciseTimer;
