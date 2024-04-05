import { useState, useEffect, useMemo } from 'react';
import { db } from '../data/db';

export const useCart = () => {
  const initialCart = () => {
    const localStorageCart = localStorage.getItem('cart');
    return localStorageCart ? JSON.parse(localStorageCart) : [];
  };

  const [guitar] = useState(db);
  const [cart, setCart] = useState(initialCart);

  const maxQuantity = 5;
  const minQuantity = 1;

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  function addToCart(guitars) {
    const guitarsExist = cart.findIndex((guitar) => guitar.id === guitars.id);

    if (guitarsExist >= 0) {
      if (cart[guitarsExist].quantity >= maxQuantity) return;
      const updateCart = [...cart];
      updateCart[guitarsExist].quantity++;
      setCart(updateCart);
    } else {
      guitars.quantity = 1;
      setCart([...cart, guitars]);
    }
  }

  function removeToCart(id) {
    setCart((prevCart) => prevCart.filter((guitar) => guitar.id !== id));
  }

  function increaseQuantity(id) {
    const updatedCart = cart.map((guitar) => {
      if (guitar.id === id && guitar.quantity < maxQuantity) {
        return {
          ...guitar,
          quantity: guitar.quantity + 1,
        };
      }
      return guitar;
    });

    setCart(updatedCart);
  }

  function decreaseQuantity(id) {
    const updatedCart = cart.map((guitar) => {
      if (guitar.id === id && guitar.quantity > minQuantity) {
        return {
          ...guitar,
          quantity: guitar.quantity - 1,
        };
      }
      return guitar;
    });

    setCart(updatedCart);
  }

  function clearCart() {
    setCart([]);
  }

  // State derivado
  const isEmpty = useMemo(() => cart.length === 0, [cart]);
  const cartTotal = useMemo(
    () => cart.reduce((total, item) => total + item.quantity * item.price, 0),
    [cart]
  );

  return {
    guitar,
    cart,
    addToCart,
    removeToCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    isEmpty,
    cartTotal,
  };
};
