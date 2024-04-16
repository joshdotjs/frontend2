import { useState, useEffect } from 'react';
import dayjs from 'dayjs';

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
const toSec = (t) => ms2s(t) % 60;

// ==============================================


// ==============================================
// ==============================================
// ==============================================
// ==============================================

export default function OrderTimer({ created_at }) {

  // ============================================

  const [timer, setTimer] = useState( timeDiff(created_at) );
  
  const [total_time, setTotalTime] = useState( 0 );

  // ============================================

  useEffect(() => {
    const timeout = setTimeout(() => {
      setTimer((prev_timer) => { 
        return prev_timer + 1000;
      });
    }, 1e3);
    return () => clearTimeout(timeout);
  }, [timer]);

  

  // ============================================

  return (
    <h1>{ toMin(timer) }:{ toSec(timer) }</h1>
  );
}