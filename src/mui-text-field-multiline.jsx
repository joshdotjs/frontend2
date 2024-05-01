import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';


export default function MultilineTextFields({ reply, setReply }) {
  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '55ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="filled-multiline-static"
        label="Reply"
        multiline
        rows={4}
        // defaultValue="Default Value"
        variant="filled"
        value={reply}
        onChange={(e) => setReply(e.target.value)}
      />
    </Box>
  );
}
