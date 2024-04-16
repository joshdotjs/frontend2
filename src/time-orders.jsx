// libs:
import * as React from 'react';
import Box from '@mui/material/Box';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

// ==============================================
// ==============================================
// ==============================================
// ==============================================

export default function BasicTimePicker({ dataCY, time, update, disabled }) {

  // ============================================

  return (
    <Box data-cy={dataCY}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['TimePicker']}>
          <TimePicker 
            value={time} 
            onChange={(newTime) => update(newTime)}
            disabled={disabled}
          />
        </DemoContainer>
      </LocalizationProvider>
    </Box>
  );
}