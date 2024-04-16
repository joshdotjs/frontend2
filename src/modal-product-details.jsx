// libs:
import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

// context:
import { CartContext } from './context/cart-context';

// utils:
import { money } from './util/money';

// ==============================================
// ==============================================

const title_font_size = {
  fontSize: {
    xs: '1.100rem',
    sm: '1.125rem',
    md: '1.150rem',
    lg: '1.175rem',
    xl: '1.200rem',
  },
}

const sub_title_font_size = {
  fontSize: {
    xs: '1.000rem',
    sm: '1.025rem',
    md: '1.050rem',
    lg: '1.075rem',
    xl: '1.100rem',
  },
}

// ==============================================
// ==============================================
// ==============================================
// ==============================================

export default function TransitionsModal({ open, setOpen, product }) {

  // ============================================

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // ============================================

  const cart_ctx = React.useContext(CartContext);

  // ============================================

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
        // sx={{ color: 'black'}}
      >
        <Fade in={open}>
          <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            // border: '2px solid #000',
            boxShadow: 7,
            p: 4,
            borderRadius: '4px', // TODO: Make global for consistency [also used in product-card / cart-image]
          }}>
            <Typography 
              id="transition-modal-title" 
              variant="h6" 
              component="h6"
              sx={{
                fontWeight: 'bold',
                margin: 0,
                padding: 0,
                marginBottom: '0.5rem',
                ...title_font_size,
              }}
            >
              {product?.title ?? 'Product Title'}
            </Typography>
            <Typography 
              id="transition-modal-description" 
              sx={{ 
                lineHeight: '1.5em',  // Line height
                ...sub_title_font_size,
                mb: 2
              }}
            >
              {product?.description ?? 'Product Description'}
            </Typography>

            <Box sx={{ 
              display: 'flex',
              justifyContent: 'space-between'
            }}>
              <Typography 
                id="transition-modal-description" 
                sx={{ 
                  display: 'flex',
                  alignItems: 'center',
                  // background: 'red',
                  fontWeight: 'bold',
                  // ...title_font_size,
                  ...sub_title_font_size,
                }}
              >
                { money(product?.price) ?? 'Product Price' }
              </Typography>

              <Button size="small" variant='contained' color='info' 
                onClick={() => {
                console.log('addToCart()');
                cart_ctx.addToCart(product);
                handleClose();
              }}>Add to Cart</Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}