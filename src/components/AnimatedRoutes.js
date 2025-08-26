import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from '../pages/Home';
import About from '../pages/About';
import Shop from '../pages/Shop';
import Product from '../pages/Product';
import Login from '../pages/Login';
import Checkout from '../pages/Checkout';
import User from '../pages/User';
import Register from '../pages/Register';

const AnimatedRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/product" element={<Product />} />
      <Route path="/login" element={<Login />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/user" element={<User />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default AnimatedRoutes;