import { render, screen, fireEvent, within } from '@testing-library/react';
import App from './_App';
import './util/console-node';

import { describe, it, expect, beforeEach } from 'vitest';
// -not needed due to --globals flag
// -helps intellisense though

// ================================================
// ================================================
// ================================================
// ================================================

describe('Cart Context', () => {

  // ==============================================

  it('should pass sanity check', () => {
    render(<App />);
    // screen.debug();
    expect(true).toBe(true);
  });

  // ==============================================

  it('should render cart button', () => {
    render(<App />);
    // screen.debug();
    const cart_button = screen.getByTestId('open-cart-button');
    // screen.debug(cart_button);
    expect(cart_button).toBeInTheDocument();
  });

  // ==============================================

  it('open cart when cart button is clicked', () => {
    render(<App />);
    // screen.debug();
    const cart_button = screen.getByTestId('open-cart-button');
    // screen.debug(cart_button);
    // expect(cart_button).toBeInTheDocument();

    // open cart
    fireEvent.click(cart_button);

    // check if cart is open
    const cart_drawer = screen.getByTestId('cart-drawer');
    // screen.debug(cart_drawer);
    expect(cart_drawer).toBeInTheDocument();
  });

  // ==============================================

  // TODO: Add item to cart
  // TODO: Increase quantity of item in cart
  // TODO: Decrease quantity of item in cart
  // TODO: Remove item from cart
  // TODO: Clear cart
  // TODO: Close cart

});

// ================================================
// ================================================
// ================================================
// ================================================