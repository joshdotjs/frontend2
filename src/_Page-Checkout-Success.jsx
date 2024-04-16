// libs:
import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import CardMedia from '@mui/material/CardMedia';

// comps:
import Layout from './_layout';

// hooks:
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

// utils:
import { http } from './util/http';
import { apiUrl } from './util/url';
import { asynch } from './util/async';
// import { sortDataById } from './util/sort';
import { truncateFront } from './util/string';
import { money } from './util/money';

// web sockets:
import { socket } from './util/socket';

// ==============================================
// ==============================================

function ConnectionState({ isConnected }) {
  return <p style={{ background: 'white' }}>State: { '' + isConnected }</p>;
}

// ==============================================
// ==============================================

function Review({ order, line_items }) {

  // ============================================

  return (
    <>
      <List
        disablePadding
        sx={{
          mb: '0.5rem',
        }}
      >
        { line_items.map((line_item) => (
          <ListItem 
            key={`order-summary-line-item-${line_item.product_id}`} sx={{ py: 1, px: 0 }}
            data-cy={`order-summary-line-item-${line_item.product_id}`}
          >
            <ListItemText 
              data-cy={`order-summary-line-item-${line_item.product_id}-title`}
              primary={line_item.product_name} 
              secondary={`${line_item.quantity} × ${ money(line_item.product_price) } each`}
            />
            <Typography variant="body2">{ money(line_item.quantity * line_item.product_price) }</Typography>
          </ListItem>
        ))}
        <ListItem
          data-cy={`order-summary-tax`}
          sx={{ py: 1, px: 0 }}
        >
          <ListItemText primary="Tax" />
          <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
            TODO
          </Typography>
        </ListItem>

        <Divider
          sx={{
            mb: '0.5rem',
          }}
        />

        <ListItem 
          data-cy="order-summary-total"
          sx={{ py: 1, px: 0 }}
        >
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            { money(order?.total) }
          </Typography>
        </ListItem>
      </List>

      <Divider
        sx={{
          mb: '1rem',
        }}
      />


      <Box
        sx={{ 
          // border: 'solid blue 10px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            // border: 'dashed hotpink 10px',
            mb: '1rem',
          }}
        >
          <Typography variant="h6" >
            Pickup Location:
          </Typography>

          <Box>
            <Typography variant="span" sx={{ fontWeight: 'bold', mr: '10px' }}>
              {/* Order Number: */}
            </Typography>

            <Typography variant="span">
              {/* { truncateFront({ str: order?.uuid, len: 4 }) } */}
              {/* { order?.uuid } */}
            </Typography>
          </Box>
        </Box>

        <Paper>
          <CardMedia
            component="iframe"
            // alt={product?.image_alt}
            // height="140"
            sx={{ 
              border: 0,
              width: '100%',
              height: '350px',
              borderRadius: '4px',
            }}
            // image={ product?.image_url ?? '/food.jpg' }
            // src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d9389.833731604926!2d-95.84684155313019!3d36.12365154657924!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87b6f3250f2af139%3A0xa66db3dab1663301!2sTacos%20Los%20Arellano!5e0!3m2!1sen!2sus!4v1697312837747!5m2!1sen!2sus"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12886.374945019179!2d-96.00138906621952!3d36.15210398515654!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87b6eb797eb36201%3A0x7a71b03ff10a53aa!2sDowntown%2C%20Tulsa%2C%20OK!5e0!3m2!1sen!2sus!4v1697320424728!5m2!1sen!2sus"
          />
        </Paper>

      </Box>

    </>
  );
}

// ==============================================
// ==============================================
// ==============================================
// ==============================================

const steps = ['Preparing', 'Ready', 'Picked Up'];

// ==============================================
// ==============================================
// ==============================================
// ==============================================

export default function CheckoutSuccessPage() {

  // ============================================

  const [searchParams] = useSearchParams();
  // console.log(searchParams); // ▶ URLSearchParams {}

  // ============================================

  const [order, setOrder] = useState({});
  const [line_items, setLineItems] = useState([]);
  const [activeStep, setActiveStep] = useState(0); // 0: preparing, 1: ready, 2: picked up

  // ============================================

  const [isConnected, setIsConnected] = useState(socket.connected);
  //  const [fooEvents, setFooEvents] = useState([]);

  // page load:
  useEffect(() => {
    // - - - - - - - - - - - - - - - - - - - - - 

    const uuid = searchParams.get('order_uuid');
    // console.log('order_uuid: ', order_uuid);

    // get order on page load:
    getOrder(uuid);

    // - - - - - - - - - - - - - - - - - - - - - 

    const onConnect = () => setIsConnected(true);
    const onDisconnect = () => setIsConnected(false);
    // const onFooEvent = (value) => setFooEvents(previous => [...previous, value]);
    const onMessageEvent = (msg) => { // listen for the order status to change from backend:
      const status = msg;
      // console.log('status: ', status);
      setActiveStep(status);
    };

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    // socket.on('foo', onFooEvent);
    const socket_event_name = `message - ${uuid}`;
    socket.on(socket_event_name, onMessageEvent);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      // socket.off('foo', onFooEvent);
      socket.off(socket_event_name, onMessageEvent);
    };

    // - - - - - - - - - - - - - - - - - - - - - 
  }, []);

  // ============================================

  const getOrder = async (uuid) => {
    // console.log('getting order...');

    const endpoint = `orders/${uuid}`;
    const URL = apiUrl(endpoint);
    const promise = http({ url: URL });
    const [data, error] = await asynch( promise );
    if (error) {
      console.error(error);
      notify({message: 'Error getting order by UUID...', variant: 'error', duration: 3000})();
      return;
    }

    // console.log('data: ', data);
    setLineItems(data?.line_items ?? []);
    setOrder(data?.order ?? {});
    setActiveStep(data?.order?.status ?? 0);
    // console.log('status: ', data?.order?.status - 2 ?? 0);
  };

  // ============================================

  return (
    <Layout navbar={true} footer={true}>
      {/* <ConnectionState isConnected={ isConnected } /> */}

      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Order { truncateFront({ str: order?.uuid, len: 4 }) }
          </Typography>
          {/* TODO: Make this activeStep more robust (error state, pending state, etc.) */}
          <Stepper activeStep={activeStep - 2} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          <Review { ...{ order, line_items } } />

        </Paper>
      </Container>
    </Layout>
  );
}
