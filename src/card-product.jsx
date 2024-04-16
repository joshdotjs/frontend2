// libs:
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// comps:
import Clamp from './text-clamp';

// context:
import { CartContext } from './context/cart-context';

// hooks:
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery'; // for responsive lines in Clamp

// ==============================================
// ==============================================

const img_size = {
  xs: '115px',
  sm: '140px',
};

// ==============================================
// ==============================================
// ==============================================
// ==============================================

export default function ProductCard({ product, openModal }) {

  // ============================================

  const cart_ctx = React.useContext(CartContext);

  // ============================================

  // responsive lines in Clamp:
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.up('sm'));

  let lines = 1;
  if (sm) lines = 2;

  // ============================================

  return (
    <Card 
      id={ `product-card-${product.id}` }
      data-cy={ `product-card-${product.id}` }
      sx={{ 
        display: 'flex',
        justifyContent: 'space-between',
        width: {
          xs: '325px',
          sm: '500px',
          md: '400px',
          lg: '425px',
          xl: '450px',
        },
      }}
    >

      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '1rem',
      }}>
        <CardContent 
          sx={{ 
            textAlign: 'left',
            padding: 0,
            margin: 0,
            marginBottom: '0.5rem',
          }}
        >
          
          <Typography 
            // gutterBottom 
            variant="h5" 
            // component="div" 
            sx={{ 
              fontWeight: 'bold',
              margin: 0,
              padding: 0,
              marginBottom: '0.25rem',
              fontSize: {
                xs: '1.000rem',
                sm: '1.025rem',
                md: '1.050rem',
                lg: '1.075rem',
                xl: '1.100rem',
              },
            }}
          >
            { product.title }
          </Typography>

          <Clamp lines={lines}>
            { product.description }
          </Clamp>

        </CardContent>

        <CardActions
          sx={{
            margin: 0,
            padding: 0,
          }}
        >
          <Button size="small" variant='outlined' color='info'
            onClick={() => {
            console.log('learnMore()');
            openModal(product.id);
          }}
          >Details</Button>
          <Button size="small" variant='contained' color='info' 
            onClick={() => {
              console.log('addToCart()');
              cart_ctx.addToCart(product);
            }}
            data-cy={ `product-card-${product.id}-add-button` }
          >
            Add
          </Button>
        </CardActions>
      </Box>

      <CardMedia
        component="img"
        alt={product?.image_alt}
        // height="140"
        sx={{ 
          width: img_size, 
          height: img_size, 
        }}
        image={ product?.image_url ?? '/food.jpg' }
      />

    </Card>
  );
}