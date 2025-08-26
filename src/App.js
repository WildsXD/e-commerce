import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './styles/App.css';

import Navbar from './components/Navbar';
import AnimatedRoutes from './components/AnimatedRoutes';

import { CartProvider } from './context/CartContext';
import { UserProvider } from './context/UserContext';



function App() {
  return (
    <UserProvider>
      <CartProvider>
        <Router>
          <div className="App">
            <Navbar />
            <AnimatedRoutes />
          </div>
        </Router>
      </CartProvider>
    </UserProvider>
  );
}

export default App;