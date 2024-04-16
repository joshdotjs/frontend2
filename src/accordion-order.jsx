// libs:
import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { Container, Paper, Box, Button  } from '@mui/material';
import dayjs from 'dayjs';

// comps:
import OrderProductsTable from './table-order-products';
import AccurateOrderTimer from './orders-timer-accurate';

// utils:
import { int2status, statusInt2Color } from './util/status';
import { truncateFront } from './util/string';

// ==============================================
// ==============================================

const display = {
  xs: 'none',
  md: 'flex',
};

const gridTemplateColumns = {
  xs: '1fr 1fr 1fr',
  md: '1fr 1fr 1fr 1fr',
};

// ==============================================
// ==============================================
// ==============================================
// ==============================================

export default function BasicAccordion({ order, line_items, updateStatus }) {
  
  // ============================================
  
  return (
    <Accordion
      data-cy={`admin-order-${order.id}`}
    >

      {/* =================================== */}

      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Box
          sx={{
            display: 'grid',
            flexGrow: 1,
            gridTemplateColumns,
            justifyContent: 'space-between',
            alignItems: 'center',
            // outline: 'solid red 2px',
            pr: 4
          }}
        >  

          <Chip 
            data-cy={`admin-order-${order.id}-status-chip`}
            label={int2status(order.status)}
            color={statusInt2Color(order.status)}
            sx={{
              mr: '1rem',
            }}
          />

          <Box
            sx={{
              display: 'flex'
            }}
          >
            <Typography 
              sx={{ 
                fontWeight: 'bold',
                color: 'black',
                mr: '8px',
                display,
              }}
            >
              Order:
            </Typography>

            <Typography 
              data-cy={`admin-order-${order.id}-uuid`}
              sx={{ 
                color: 'black',
                // mr: '1rem',
              }}
            >
              { truncateFront({ str: order.uuid, len: 4 })}
            </Typography>
          </Box>

          <Typography 
            data-cy={`admin-order-${order.id}-time`}
            variant='span' 
            sx={{ 
              color: 'black', 
              mr: '1rem',
              display
            }}
          >
            { dayjs(order.created_at).format('h:mm:ss a') }
          </Typography>
          {/* <Typography sx={{ color: 'black' }}>{dayjs(order.created_at).format('ddd. MMM. D')}</Typography> */}

          <AccurateOrderTimer created_at={order.created_at} order_id={order.id} />

        </Box>

      </AccordionSummary>

      {/* =================================== */}

      <AccordionDetails>

        <Stack 
          direction="row" 
          spacing={1}
          sx={{
            mb: '1.25rem',
          }}
        >
          <Button data-cy={`admin-order-${order.id}--status-button--preparing`} variant="outlined" color="warning" onClick={() => updateStatus({ id: order.id, uuid: order.uuid, status_int: 2 })}>Preparing</Button>
          <Button data-cy={`admin-order-${order.id}--status-button--ready`    } variant="outlined" color="info"    onClick={() => updateStatus({ id: order.id, uuid: order.uuid, status_int: 3 })}>Ready</Button>
          <Button data-cy={`admin-order-${order.id}--status-button--done`     } variant="outlined" color="success" onClick={() => updateStatus({ id: order.id, uuid: order.uuid, status_int: 4 })}>Done</Button>
        </Stack>

        <OrderProductsTable { ...{ line_items, order } } />
      </AccordionDetails>

      {/* =================================== */}

    </Accordion>
  );
}