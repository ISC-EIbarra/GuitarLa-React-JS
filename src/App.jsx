import { useState } from 'react';
import Header from './components/Header';
import Guitar from './components/Guitar';
import { db } from './data/db';

function App() {
  const [guitar, setGuitar] = useState(db);
  const [cart, setCart] = useState([]);

  function addToCart(guitars) {
    const guitarsExist = cart.findIndex((guitar) => guitar.id === guitars.id);

    if (guitarsExist >= 0) {
      const updateCart = [...cart];
      updateCart[guitarsExist].quantity++;
      setCart(updateCart);
    } else {
      guitars.quantity = 1;
      setCart([...cart, guitars]);
    }
  }

  return (
    <>
      <Header cart={cart} />

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
