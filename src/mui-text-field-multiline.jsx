import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';


export default function MultilineTextFields({ reply, setReply, highlight, setHighlight }) {
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
        sx={{
          // '& label': { color: 'green' },
          // '& .MuiOutlinedInput-root': {
          //   '& fieldset': { borderColor: 'green' },
          //   '&:hover fieldset': { borderColor: 'red' },
          //   '&.Mui-focused fieldset': { borderColor: 'purple' },
          // },
          // '& .MuiInputBase-input': { color: 'blue' },
          backgroundColor: '#f0f0f0', // default background
          '&:hover': {
            backgroundColor: '#e0e0e0', // background on hover
          },
        }}
        onChange={(e) => setReply(e.target.value)}
        onSelect={(e) => {
          setHighlight((prev) => {
            return {
              text: e.target.value.substring(e.target.selectionStart, e.target.selectionEnd),
              start: e.target.selectionStart,
              end: e.target.selectionEnd,
            };
          })
        }}
      />
    </Box>
  );
}
