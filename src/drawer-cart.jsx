import * as React from 'react';
import { styled  } from '@mui/system';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CloseIcon from '@mui/icons-material/Close';
import Backdrop from '@mui/material/Backdrop';

// comps:
import Clamp from './text-clamp';

// utils:
import { http } from './util/http';
import { apiUrl } from './util/url';
import { asynch } from './util/async';
import { money } from './util/money';

// context:
import { CartContext } from './context/cart-context';

// hooks:
// import { useNavigate } from 'react-router-dom';
import { useNotification } from './hooks/use-notification';
import { Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles'; // responsive
import useMediaQuery from '@mui/material/useMediaQuery';

// ==============================================
// ==============================================

const margin = 0;
const padding = '1rem';
const img_size = '70px';

// ==============================================
// ==============================================

const title_font_size = {
  fontSize: {
    xs: '1.000rem',
    sm: '1.025rem',
    md: '1.050rem',
    lg: '1.075rem',
    xl: '1.100rem',
  },
}

const sub_title_font_size = {
  fontSize: {
    xs: '0.900rem',
    sm: '0.925rem',
    md: '0.950rem',
    lg: '0.975rem',
    xl: '1.000rem',
  },
}

// ==============================================
// ==============================================
// ==============================================
// ==============================================

export default function CartDrawer() {

  // const navigate = useNavigate();
  const [ notify ] = useNotification();

  // ============================================

  const { 
    cart, open, 
    closeCart, emptyCart,
    addToCart, subtractFromCart,
    getTotal,
  } = React.useContext(CartContext);

  // ============================================

  // responsive lines in Clamp:
  // const theme = useTheme();
  // const sm = useMediaQuery(theme.breakpoints.up('sm'));

  // let cart_pb = '0rem';
  // if (sm) cart_pb = '0rem';

  // ============================================

  const checkout = async () => {

    closeCart();
    notify({message: 'sending cart to checkout...', variant: 'info', duration: 2000})();

    // console.log('sending to checkout...');
    // console.log('cart: ', cart);

    const order_items = cart.map(({ product, qty }) => {
      return { product_id: product.id, quantity: qty };
    });

    const order = { 
      user_id: 1, 
      // order_items: [
      //   { product_id: 1, quantity: 2 },
      //   { product_id: 2, quantity: 2 },
      // ] // order_items
      order_items,
    };
    console.log('order: ', order);

    const URL = apiUrl('orders');
    const promise = http({ 
      url: URL, 
      method: 'POST', 
      body: order 
    });

    const [data, error] = await asynch( promise );
    if (error) {
      notify({message: 'Error creating order...', variant: 'error', duration: 4000})();
      console.log('if(error) in checkout()');
      console.log(error);
      return;
    }

    console.log('data: ', data);
    if (!data?.url) {
      const message = 'Error sending to stripe - update Stripe API key!';
      notify({message, variant: 'error', duration: 4000})();
      console.log(error);
      console.log(message);
      if (data?.test_url)
        window.location.href = data.test_url; // Bypass Stripe Checkout for testing (data.url is empty, and data_test_url is set)
      return;
    }

    notify({message: 'created order in PENDING state 🙂', variant: 'success', duration: 2000})();
    notify({message: 'sending to checkout...', variant: 'info', duration: 4000 });

    // wait on cart to close before navigating to orders page:
    // setTimeout(() => navigate('/orders'), 250);
    
    setTimeout(() => {
      // redirect to Stripe checkout:
      window.location.href = data.url;
    }, 1e3);
  };

  // ============================================

  const Container = styled('div')(({ theme }) => ({
    minWidth: '150px', 
    paddingTop: '2.5rem',
    // paddingBottom: cart_pb,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    // background: 'red',
    height: '100%',
    // width: '400px'
  }));
  
  // ==============================================
  
  const LineItem = styled('div')(({ theme }) => ({
    color: theme.palette.primary.contrastText,
    // backgroundColor: theme.palette.primary.main,
    // padding: theme.spacing(1),
    // borderRadius: theme.shape.borderRadius,
    borderBottom: 'solid #E5E7EB 1px',
    padding,
    display: 'grid',
    // gap: '1rem',
    columnGap: '1rem',
    gridTemplateRows: 'auto 1fr',
    gridTemplateColumns: `${img_size} 1fr 1fr`,
  }));

  // ============================================

  return (
    <>
      <Drawer
        id="cart-drawer"
        data-testid="cart-drawer"
        data-cy="cart-drawer"
        anchor={'right'}
        open={open}
        onClose={() => closeCart()}
      >
        <Container
          sx={{
            position: 'relative',
            width: {
              xs: '90vw',
              sm: '400px',
            },
          }}
        >

          {/* =============================== */}

          <CloseIcon 
            data-cy="cart-drawer-close-button"
            onClick={() => closeCart()}
            sx={{
              position: 'absolute',
              top: '1rem',
              left: '1rem',
              cursor: 'pointer',
            }}
          />

          {/* =============================== */}

          {/* Line Items */}
          <div>
            { cart.map(({ product, qty }) => {
              return (
                <LineItem 
                  key={product.uuid}
                  data-cy={`cart-item-${product.id}`}
                >
                  <CardMedia
                    component="img"
                    alt={product?.image_alt}
                    // height="140"
                    // width="140"
                    // image="/static/images/cards/contemplative-reptile.jpg"
                    image={ product?.image_url ?? '/food.jpg' }
                    sx={{ 
                      gridColumn: '1 / 2', 
                      gridRow: '1 / 3', 
                      border: 'solid #E5E7EB 1px', 
                      borderRadius: '4px', 
                      height: img_size, 
                      width: img_size
                    }}
                  />

                  <Typography 
                    data-cy={`cart-item-${product.id}-title`}
                    variant="h6"
                    color="text.primary" 
                    sx={{ 
                      fontWeight: 'bold',
                      // background: 'limegreen',
                      ...title_font_size,
                      mb: '0.2rem'
                    }}
                  >
                    { product.title }
                  </Typography>


                  <Typography 
                    data-cy={`cart-item-${product.id}-price`}
                    variant="h6"
                    color="text.primary" 
                    sx={{ 
                      // background: 'deepskyblue',
                      textAlign: 'right',
                      ...title_font_size
                    }}
                  >
                    { money(product.price )}
                  </Typography>
                  
                  <Clamp 
                    lines={2}
                    variant='body1'
                    color="text.secondary"
                    sx={{ 
                      // background: 'darkorange',
                      lineHeight: '1.25em',
                      ...sub_title_font_size,
                    }}
                  >
                    { product.description }
                  </Clamp>
                
                  <Box
                    sx={{ 
                      textAlign: 'right',
                    }}
                  >
                    <ButtonGroup 
                      variant="text" 
                      aria-label="text button group" 
                      color='black' 
                      sx={{ 
                        // background: 'deeppink',
                      }}>
                      
                        { qty === 1 && 
                          <Button data-cy={`cart-item-${product.id}-quantity-trash`}>
                            <DeleteOutlineIcon onClick={() => subtractFromCart(product)} /> 
                          </Button>
                        }
                        { qty > 1 && 
                          <Button data-cy={`cart-item-${product.id}-quantity-minus`}>
                            <RemoveIcon onClick={() => subtractFromCart(product)} />
                          </Button>
                        }
                      
                      <Button
                        data-cy={`cart-item-${product.id}-quantity`}
                      >
                        {qty}
                      </Button>

                      <Button data-cy={`cart-item-${product.id}-quantity-plus`}>
                        <AddOutlinedIcon onClick={() => addToCart(product)} />
                      </Button>
                    </ButtonGroup>
                  </Box>

                  <ButtonGroup />
                </LineItem>
              );
            })}
          </div>

          {/* =============================== */}

          {/* Cart Total / Checkout Buttons */}
          <Box 
            sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              width: '100%',
              p: 2 // padding: '1rem',
            }}
          >

            {/* <Typography variant="h5" align="center" color="text.secondary" paragraph>
              { money(getTotal()) }
            </Typography> */}
            
            {/* <Button
              id="empty-cart-button"
              // variant="outlined"
              color='info'
              sx={{  mb: '1rem' }}
              onClick={() => emptyCart()}
            >
              Empty Cart
            </Button> */}

            {/* <Button
              id="close-cart-button"
              data-testid="close-cart-button"
              variant="outlined"
              color='info'
              sx={{  mb: '1rem' }}
              onClick={() => closeCart()
            }>
              Close
            </Button> */}

            <Button
              data-cy="cart-checkout-button"
              variant="contained"
              color='info'
              onClick={() => checkout()}
              sx={{
                // width: '500px'
                display: 'flex',
                justifyContent: 'space-between',
              }}
              fullWidth
            >
              <Typography>Checkout</Typography>  
              <Typography
                data-cy="cart-total"
              >
                { money(getTotal()) }
              </Typography>
            </Button>

          </Box>
             
          {/* =============================== */}
              
        </Container>
      </Drawer>
    </>
  );
}