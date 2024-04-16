import * as React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export default function CheckboxLabels({ dataCY, checked, setChecked, enablePolling, disablePolling }) {

  // const [checked, setChecked] = React.useState(true);

  const handleChange = (event) => {
    const check = event.target.checked;
    if (check) {
      enablePolling();
    } else {
      disablePolling();
    }

    setChecked(check);
  };

  return (
    <FormGroup>
      <FormControlLabel 
        sx={{ color: 'black' }} 
        control={
          <Checkbox 
            data-cy={dataCY}
            checked={checked}
            onChange={handleChange}
          />
        } 
        label="Real Time"
      />
    </FormGroup>
  );
}