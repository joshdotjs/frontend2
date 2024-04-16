git commit --amend -m "message..."


Fix bug: "TypeError: styled_default is not a function"
npm cache clean --force
Delete node_modules/.vite Cache: https://github.com/mui/material-ui/issues/32727#issuecomment-1705737899
-ultimately, commenting out of the theme provider in _index.js solved the problem (and also deleting node_modules and re-installing)

--NOTE: pasting the following inside the vite.config.js utlimately solved the styled_default bug (did not use the entire solution from the post):   // https://github.com/mui/material-ui/issues/32727#issuecomment-1767646455

  optimizeDeps: { 
    include: [
      '@emotion/react', 
      '@emotion/styled', 
      '@mui/material/Tooltip'
    ],
  },