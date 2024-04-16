import { createContext, useState, useEffect } from "react";
import { getLS, setLS } from '../util/local-storage';
import { sum } from '../util/math';

// =============================================
// =============================================
// =============================================
// =============================================

const getCartLS = () => getLS('cart');
const setCartLS = (cart) => setLS('cart', cart);

// =============================================
// =============================================
// =============================================
// =============================================

const CartContext = createContext({
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
  cartTotal: 0,
 });

 // =============================================
 // =============================================
 // =============================================
 // =============================================
 // =============================================

 function CartContextProvider ({ children }) {

  // ============================================

  const [open, setOpen] = useState(false);

  const openCart = () => setOpen(true);
  const closeCart = () => setOpen(false);

  // ============================================

  const [cart, setCart] = useState([]);

  useEffect(() => {
    getCart();
  }, []);
  // useEffect(() => {
  //   console.log('cart: ', cart);
  // }, [cart]);

  // ============================================

  const getCart = () => {

    // load cart from local storage on page load
    const cart_ls = getCartLS();
    if (cart_ls) {
      setCart(cart_ls);
    }
  };

  // ============================================

  const addToCart = (product) => {
    // console.log('cart-context: addToCart()');

    // step 1: get cart from local storage
    const prev_cart = getCartLS();
    // -if cart-ls not set then prev_cart === null  =>  idx===undefined

    // step 2: find index of product in cart
    const idx = prev_cart?.findIndex(line => line?.product.id === product.id);
    console.log('idx: ', idx);
    
    // step 3: update cart
    let new_cart;
    if (idx === null || idx === undefined) { // idx === null  =>  cart-ls not set  =>  create cart with first item)
      new_cart = [{ product, qty: 1 }];
    } else if (idx < 0) {  // idx === -1  =>  product not in cart  =>  add product to cart
      new_cart = [...prev_cart, { product, qty: 1 }]; 
    } else { // idx >= 0  =>  product in cart  =>  update product's quantity in cart
      const qty = prev_cart[idx].qty;
      new_cart = structuredClone(prev_cart);
      new_cart[idx] = {...prev_cart[idx], qty: qty + 1}; // update specific item's quantity in the cloned cart array.        
    }

    // Step 4: update LS
    setCart(new_cart);
    setCartLS(new_cart);

    // Step 5: open cart
    if (!open) openCart();
  };

  // ============================================


  const subtractFromCart = (product) => {

    // step 1: get cart from local storage
    const prev_cart = getCartLS();

    // step 2: find index of product in cart
    const idx = prev_cart.findIndex(line => line.product.id === product.id);
    console.log('idx: ', idx);

    // step 3: update cart
    let new_cart;
    if (idx === null || idx === undefined) { // idx === null  =>  cart-ls not set  =>  don't do anything
      return;
    } else if (idx < 0) {  // idx === -1  =>  product not in cart  =>  don't do anything
      return;
    } else { // idx >= 0  =>  product in cart  =>  update product's quantity in cart

      const qty = prev_cart[idx].qty;
      if (qty === 1) { // remote from cart
        const filtered = prev_cart.filter(line => line.product.id !== product.id);
        new_cart = filtered;
      } else { // subtract from cart
        new_cart = structuredClone(prev_cart);
        new_cart[idx] = {...prev_cart[idx], qty: qty - 1}; // update specific item's quantity in the cloned cart array.        
      }  // if (qty)
    } // if (idx)

    // step 4: update LS
    setCart(new_cart);
    setCartLS(new_cart);

    // Step 5: close cart
    if (new_cart.length === 0) closeCart();
  };

  // ============================================

  const removeFromCartLS = (variant_id) => {
    // lg('removeFromCart()');

    const prev_cart = getCartLS();
    // console.log('prev_cart: ', prev_cart);

    const new_cart = prev_cart.filter(line => line.variant.id !== variant_id);
    setCartLS(new_cart);
    updateNumCartItems();
    // fireEvent('cart-remove');

    // if (new_cart.length < 1) {
    //   closeCart();
    // }
  }

  // ==========================================

  const emptyCart = () => {
    setCart([]);
    setCartLS([]);
    setTimeout(() => closeCart(), 200);
  };

  // ============================================

  const getTotal = () => {
    const line_item_costs = cart.map(line => line.product.price * line.qty);
    const total = sum(line_item_costs);
    return total;
  };

  // ============================================

  const context = {
    cart,
    addToCart,
    subtractFromCart,
    open,
    closeCart,
    openCart,
    emptyCart,
    getTotal,
  };

  // ============================================

  return (
    <CartContext.Provider value={context}>
      { children }
    </CartContext.Provider>
  );
 };

// =============================================

export { CartContext };
export default CartContextProvider;