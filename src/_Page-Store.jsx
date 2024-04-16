// libs:
import { useState, useEffect } from 'react';
import { Container, Typography, Paper, Box, Button } from '@mui/material';

// comps:
import Layout from './_layout';
import ProductsGrid from './grid-products';
import ProductDetailsModal from './modal-product-details';

// utils:
import { http } from './util/http';
import { apiUrl } from './util/url';
import { asynch } from './util/async';

// hooks:
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery'; // for responsive lines in Clamp
import { useNotification } from './hooks/use-notification';


// ==============================================
// ==============================================
// ==============================================
// ==============================================

export default function StorePage () {

  // ============================================

  const [products, setProducts] = useState([]);

  const [notify] = useNotification();

  // ============================================

  // responsive:
  const theme = useTheme();
  const lg = useMediaQuery(theme.breakpoints.up('lg'));

  let pad = '0px';
  if (lg) pad = '2rem';

  // ============================================

  // Product details modal:

  const [product, setProduct] = useState({
    uuid: '',
    title: '',
    description: '',
    category: '',
    status: '',
    published: false,
    price: 0,
    units_in_stock: 0,
    image_url: '',
    image_alt: '',
    details_route: '',
  });

  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);
  const openModal = (id) => {

    const product = products.find(product => product.id === id);
    console.log('product: ', product);

    setProduct(product);
    setOpen(true);
  }

  // DEBUG: 
  // useEffect(() => {
  //   console.log('product: ', product);
  //   if (products.length > 0)
  //     openModal(products[0].id);
  // }, [products]);

  // ============================================

  const getProducts = async () => {
    const URL = apiUrl('products');
    const promise = http({ url: URL });
    const [products, error] = await asynch( promise );
    if (error) {
      console.error(error);
      notify({message: 'Error getting products...', variant: 'error', duration: 2000})();
      return;
    }
    // console.log('products: ', products);
    setProducts(products);
  };

  // ============================================

  useEffect(() => {
    getProducts();
  }, []);

  // ============================================
  
  return (
    <Layout navbar={true} footer={true}>
      <Container 
        sx={{ 
          paddingTop: pad
        }}
      > 
        <ProductsGrid { ...{ products, openModal } } />
      </Container>

      <ProductDetailsModal {... { open, setOpen, product } } />
    </Layout>
  );
};