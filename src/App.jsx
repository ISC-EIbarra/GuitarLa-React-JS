import { useState, useEffect } from 'react';
import Header from './components/Header';
import Guitar from './components/Guitar';
import { db } from './data/db';

function App() {
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

  return (
    <>
      <Header
        cart={cart}
        removeToCart={removeToCart}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        clearCart={clearCart}
      />

      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {guitar.map((guitars) => (
            <Guitar
              key={guitars.id}
              guitars={guitars}
              setCart={setCart}
              addToCart={addToCart}
            />
          ))}
        </div>
      </main>

      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">
            GuitarLA - Todos los derechos Reservados
          </p>
        </div>
      </footer>
    </>
  );
}

export default App;
