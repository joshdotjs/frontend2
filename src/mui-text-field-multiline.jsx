import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';


export default function MultilineTextFields({ reply, setReply, highlight, setHighlight }) {

  const inputRef = React.useRef(null);
  React.useRef(() => {
    console.log('inputRef.current:', inputRef.current);
  }, [inputRef.current]);

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
        inputRef={inputRef}
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
        onChange={(e) => setReply(e.target.value)} // onChange
        onSelect={(e) => {
          setHighlight((prev) => {

            const { 
              selectionStart: start, 
              selectionEnd: end,
              value,
            } = e.target;

            let on;
            if (start === end)  on = false;
            else                on = true;

            return {
              // ...prev,
              on,
              text: value.substring(start, end),
              start,
              end,
            };
          })
        }} // onSelect
        onKeyDown={(event) => {
          if (event.key === "End") { // end key has desktop behavior
            event.preventDefault(); // Prevent the default "End" key action
            // Set the cursor position to the end of the text
            const endOfText = inputRef.current.value.length;
            inputRef.current.selectionStart = endOfText;
            inputRef.current.selectionEnd = endOfText;
          }
          if (event.key === "Home") { // home key has desktop behavior
            event.preventDefault(); // Prevent the default "Home" key action
            // Set the cursor position to the beginning of the text
            inputRef.current.selectionStart = 0;
            inputRef.current.selectionEnd = 0;
          }
        }} // onKeyDown
      />
    </Box>
  );
}
