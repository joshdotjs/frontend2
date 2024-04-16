// libs:
import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

// utils:
import { all_statuses, ints2statuses, statuses2ints } from './util/status';

// ==============================================
// ==============================================
// ==============================================
// ==============================================

export default function MultipleSelectCheckmarks({ statuses, setStatuses }) {
  const [statuses_local, setStatuses_local] = React.useState(ints2statuses(statuses));

  const handleChange = (event) => {
    const value = event.target.value;
    setStatuses( statuses2ints(value) );
    setStatuses_local(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="orders-status-multiple-checkbox-label">Status</InputLabel>
        <Select
          data-cy="admin-orders-status-dropdown"
          labelId="orders-status-multiple-checkbox-label"
          id="orders-status-multiple-checkbox"
          multiple
          value={statuses_local}
          onChange={handleChange}
          input={<OutlinedInput label="Status" />}
          renderValue={(selected) => selected.join(', ')}
        >
          {all_statuses.map((name) => (
            <MenuItem 
              key={`status-dropdown-option-${name}`} 
              data-cy={`status-dropdown-option-${name}`} 
              value={name}
            >
              <Checkbox checked={statuses_local.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}