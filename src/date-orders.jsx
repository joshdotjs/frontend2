// libs:
import * as React from 'react';
import Box from '@mui/material/Box';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

// ==============================================
// ==============================================
// ==============================================
// ==============================================

export default function ControlledComponent({ dataCY, date, update, disabled }) {

  // ============================================

  return (
    <Box data-cy={dataCY}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['DatePicker']}>
          <DatePicker
            value={date} 
            onChange={(newDate) => update(newDate)}
            disabled={disabled}
          />
        </DemoContainer>
      </LocalizationProvider>
    </Box>
  );
}