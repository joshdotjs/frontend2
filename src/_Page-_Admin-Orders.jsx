// libs:
import { useState, useEffect, Fragment } from 'react';
import { Container, Typography, Box  } from '@mui/material';
import Divider from '@mui/material/Divider';

import dayjs from 'dayjs';

// comps:
import Layout from './_layout';
import OrdersStatusSelect from './select-orders-status';
import OrdersTime from './time-orders';
import OrdersDate from './date-orders';
import RealTimeCheckbox from './checkbox-orders-real-time';
import OrderAccordion from './accordion-order';

// utils:
import { http } from './util/http';
import { apiUrl } from './util/url';
import { asynch } from './util/async';
import { sortDataById } from './util/sort';

// hooks:
import { useNotification } from './hooks/use-notification';

// context:
// import { AuthContext } from './context/auth-context';

// web sockets:
import { socket } from './util/socket';

// ==============================================
// ==============================================

function ConnectionState({ isConnected }) {
  return <p style={{ background: 'white' }}>State: { '' + isConnected }</p>;
}

// ==============================================
// ==============================================

let interval_id = null;

// ==============================================
// ==============================================
// ==============================================
// ==============================================

export default function AdminOrdersPage () {

  // ============================================

  const [orders, setOrders] = useState([]);
  const [notify] = useNotification();

  // Step 1: Iniitalize date/time's with dayJS format (allows for easy initalization)
  // Step 2: Update in time / date comps with dayJS format
  // Step 3: Send to server in SQL format

  const formatDate     = (date_time) => date_time.format('YYYY-MM-DD');
  const formatTime     = (date_time) => date_time.format('HH:mm:ssZ');
  const formatDateTime = (date, time) => `${formatDate(date)} ${formatTime(time)}`;
  
  const [time_lo, setTimeLo] = useState(dayjs().startOf('day'));
  const [time_hi, setTimeHi] = useState(dayjs());
  const [date, setDate] = useState(dayjs());
  const [statuses, setStatuses] = useState([1, 2, 3, 4]);
  const [polling, setPolling] = useState(true);

  // ============================================

  // trigger update of date/time and trigger update of orders via useEffect:
  const resetDateTimeToNow = () => { 
    setTimeLo(dayjs().startOf('day'));  
    setTimeHi(dayjs());
    setDate(dayjs());
  };

  // ============================================

  const [isConnected, setIsConnected] = useState(socket.connected);

  // // page load:
  // useEffect(() => {

  //   // - - - - - - - - - - - - - - - - - - - - - 

  //   const onConnect = () => setIsConnected(true);
  //   const onDisconnect = () => setIsConnected(false);
  //   // const onFooEvent = (value) => setFooEvents(previous => [...previous, value]);
  //   const onMessageEvent = (msg) => { // listen for the order status to change from backend:
  //     console.log(msg);
  //     setTimeout(() => resetDateTimeToNow(), 10);
  //   };

  //   socket.on('connect', onConnect);
  //   socket.on('disconnect', onDisconnect);
  //   // socket.on('foo', onFooEvent);
  //   const socket_event_name = `message - admin orders`;
  //   socket.on(socket_event_name, onMessageEvent);

  //   return () => {
  //     socket.off('connect', onConnect);
  //     socket.off('disconnect', onDisconnect);
  //     // socket.off('foo', onFooEvent);
  //     socket.off(socket_event_name, onMessageEvent);
  //   };

  //   // - - - - - - - - - - - - - - - - - - - - - 
  // }, []);

  // ============================================

  // -load page with all orders from today
  // -set up polling to update orders every N-seconds
  useEffect(() => { 
    getFilteredOrders({ date, time_lo, time_hi, statuses }); 
  }, [date, time_lo, time_hi, statuses]);

  // ============================================

  useEffect(() => { enablePolling(); }, []);

  // ============================================

  const enablePolling = () => {
    disablePolling(); // clear any existing polling
    resetDateTimeToNow();
    interval_id = setInterval(() => {
      // console.clear();
      console.log('polling for orders... ', dayjs().format('h:mm:ss A'));
      resetDateTimeToNow();
    }, 30e3);
    // console.log('enablePolling() -- interval_id:  ', interval_id);
  };

  // ============================================

  const disablePolling = () => {
    if (interval_id) {
      clearInterval(interval_id);
      // console.log('DISABLE -- disablePolling() -- interval_id:  ', interval_id);
      interval_id = null;
    }
  };

  // ============================================

  const getFilteredOrders = async ({ date, time_lo, time_hi, statuses }) => {

    const date_time_lo = formatDateTime(date, time_lo);
    const date_time_hi = formatDateTime(date, time_hi);

    const body = { date_time_lo, date_time_hi, status: statuses }; // NOTE: status on backend is an array (really should be called statusES)
    console.log('getFilteredOrders()  --  body: ', body);

    const promise = http({ 
      url: apiUrl('orders/get-filtered'),
      method: 'POST',
      body,
     });
    const [orders, error] = await asynch( promise );
    // console.log('orders: ', orders);
    if (error) {
      console.error(error);
      notify({message: 'Error getting orders...', variant: 'error', duration: 2000})();
      return;
    }

    // const sorted_orders = sortDataById(orders);

    // console.log('orders: ', orders);
    setOrders(orders);
  };

  // ============================================

  // NOTE: status here is a single status (not an array!)
  const updateStatus = async ({ id, uuid, status_int }) => {
    const promise = http({ 
      url: apiUrl('orders/update-status'),
      method: 'POST',
      body: {
         id, 
         uuid, 
         status: status_int
        }, // body:
     });
    const [data, error] = await asynch( promise );
    if (error) {
      console.error(error);
      notify({message: 'Error getting orders...', variant: 'error', duration: 2000})();
      return;
    }

    // NOTE: The value of status here does not change when we
    //         update status_int, so the state variables below
    //         should indeed have non stale values.
    //       -statuses contains the statuses we are fitlering on.
    //       -status_int is the value we are changing the current orders status to.
    getFilteredOrders({ date, time_lo, time_hi, statuses });
  };

  // ============================================

  return (
    <Layout navbar={true} footer={true}>
      <Container 
        data-cy="admin-orders"
        sx={{ 
          border: 'solid white 1px', 
          borderTop: 'none', 
          p: 4,
          background: 'white'
        }}
      >
        
        <OrdersStatusSelect statuses={statuses} setStatuses={setStatuses} />

        <RealTimeCheckbox 
          dataCY="admin-orders-real-time-checkbox"
          checked={polling} 
          setChecked={setPolling} 
          { ...{ enablePolling, disablePolling } } 
        />

        <Box 
          sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            gap: '1rem',
            mb: '2rem',
          }}>
          <OrdersDate 
            dataCY="admin-orders-calendar"
            date={date} 
            update={setDate} 
            disabled={polling}
          />

          <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem'}}>
            <OrdersTime 
              dataCY="admin-orders-time-lo"
              time={time_lo} 
              update={setTimeLo} 
              disabled={polling}
            />

            <Typography sx={{ color: 'black' }}> to </Typography>

            <OrdersTime 
              dataCY="admin-orders-time-hi"
              time={time_hi} 
              update={setTimeHi} 
              disabled={polling}
            />
          </Box>
        </Box>

        {
          orders.map(({order, line_items}, idx) => {

            return (
              // <Fragment key={order.uuid}>{JSON.stringify(order)}</Fragment>
              <Fragment key={order.uuid}>
                <OrderAccordion { ...{ order, line_items, updateStatus } }  />
                <Divider />
              </Fragment>
            );
          })
        }

      </Container>
    </Layout>
  );
};
