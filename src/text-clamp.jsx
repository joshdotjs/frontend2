import Typography from '@mui/material/Typography';

export default function Clamp({ children, lines, color='text.primary', variant='body1', sx=null }) {

  return (
    <Typography 
      variant={variant} 
      color={color}
      sx={{ // clamp text to 3 lines
        // display: 'block',
        display: '-webkit-box',
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
        lineHeight: '1.2em',  // Line height
        maxHeight: `${lines * 1.2}em`,   // Max height = lineHeight * number of lines
        WebkitLineClamp: lines, // Number of lines to display
        textOverflow: 'ellipsis',
        ...sx,
      }}
    >
      { children }
    </Typography>
  );
};