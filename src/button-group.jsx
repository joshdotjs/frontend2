import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';

// ==============================================
// ==============================================
// ==============================================
// ==============================================

const Buttons = () => {
  return (
    <>
      <Button>One</Button>
      <Button>Two</Button>
      <Button>Three</Button>
    </>
  );
};

// ==============================================
// ==============================================
// ==============================================
// ==============================================

export default function BasicButtonGroup() {
  return (
    <Box>
      <div>
        <ButtonGroup variant="contained" aria-label="outlined primary button group" color="secondary">
          <Buttons />
        </ButtonGroup>
      </div>


      <ButtonGroup variant="outlined" aria-label="outlined button group" color="warning">
        <Buttons />
      </ButtonGroup>
      <ButtonGroup variant="text" aria-label="text button group" color="error">
        <Buttons />
      </ButtonGroup>



      <div>
        <div>
          <ButtonGroup size="small" aria-label="small button group" color="secondary">
            <Buttons />
          </ButtonGroup>
        </div>
        <div>
          <ButtonGroup color="secondary" aria-label="medium secondary button group">
            <Buttons />
          </ButtonGroup>
        </div>
        <div>
          <ButtonGroup size="large" aria-label="large button group" color="secondary">
            <Buttons />
          </ButtonGroup>
        </div>
      </div>
    </Box>
  );
}