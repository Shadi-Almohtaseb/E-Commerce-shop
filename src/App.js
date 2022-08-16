import React, { useEffect, useState } from 'react';
import { Navbar, Products, Cart, Checkout } from './components';
import { commerce } from './lib/commerce';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [order, setOrder] = useState({});
  const [errorMessage, seterrorMessage] = useState('');


  const fetchProducts = async () => {
    const { data } = await commerce.products.list();
    setProducts(data);
  }

  const fetchCart = async () => {
    const cart = await commerce.cart.retrieve();
    setCart(cart);

    // OR What we can do ??
    // setCart(await commerce.cart.retrieve()) ;
  }
  const handleAddCart = async (productId, quantity) => {
    const { cart } = await commerce.cart.add(productId, quantity);
    setCart(cart);
  }

  const handleUpdateCartQty = async (productId, quantity) => {
    const { cart } = await commerce.cart.update(productId, { quantity })
    setCart(cart);
  }
  const handleRemoveFromCart = async (productId) => {
    const { cart } = await commerce.cart.remove(productId);
    setCart(cart);
  }
  const handleEmptyCart = async () => {
    const { cart } = await commerce.cart.empty();
    setCart(cart);
  }

  const refreshCart = async () => {
    const newCard = await commerce.card.refresh();
    setCart(newCard);
  }

  const handleCapturCheckout = async (checkoutTokenId, newOrder) => {
    try {
      const incomeingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder);
      setOrder(incomeingOrder);
      refreshCart();
    } catch (error) {
      seterrorMessage(error.data.error.message);
    }
  }

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  console.log(cart)
  console.log(products);

  return (
    <BrowserRouter>
      <div>
        <Navbar totalItems={cart.total_items} />
        <Routes>
          <Route path='/' element={<Products products={products} onAddToCart={handleAddCart} />} />
          <Route path='/cart' element={<Cart cart={cart} handleUpdateCartQty={handleUpdateCartQty} handleRemoveFromCart={handleRemoveFromCart} handleEmptyCart={handleEmptyCart} />} />
          <Route path='/checkout' element={<Checkout cart={cart} order={order} errorMessage={errorMessage} handleCapturCheckout={handleCapturCheckout} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
