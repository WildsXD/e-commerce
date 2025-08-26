import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faUser, faHeart, faCartShopping, faBars, faXmark, faTrash } from '@fortawesome/free-solid-svg-icons';
import { faHeart as farHeart, faUser as farUser } from '@fortawesome/free-regular-svg-icons';
import '../styles/Navbar.css';
import { useCart } from '../context/CartContext';
import { useUser } from '../context/UserContext';

const Navbar = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [wishlistItems, setWishlistItems] = useState([]);
  
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice, getCartCount } = useCart();
  
  const { currentUser } = useUser();
  
  const navigate = useNavigate();
  const location = useLocation();
  
  const isShopPage = location.pathname === '/shop';

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };
  
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery)}`, { replace: true });
    }
  };
  
  const toggleWishlist = (productId) => {
    if (wishlistItems.includes(productId)) {
      setWishlistItems(wishlistItems.filter(id => id !== productId));
    } else {
      setWishlistItems([...wishlistItems, productId]);
    }
  };
  
  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">
          <p className="MyLogo">JINGGA<br /><span className="right">STORE</span></p>
        </Link>
      </div>
      
      {isShopPage ? (
        <div className="navbar-search">
          <form onSubmit={handleSearch}>
            <input 
              type="text" 
              placeholder="Cari produk..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit">
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
          </form>
        </div>
      ) : (
        <ul className="menu">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/shop">Shop</Link></li>
          <li><Link to="/login">Contact</Link></li>
        </ul>
      )}
      
      <div className="icons_sec">
        {!isShopPage && (
          <Link to="/shop" className="search-icon">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </Link>
        )}
        <Link to="/user" className="user-profile-link">
          {currentUser ? (
            <div className="user-profile-icon">
              <span className="username">{currentUser.name}</span>
              <img 
                src={currentUser.profileImage} 
                alt={currentUser.name} 
                className="profile-pic"
              />
            </div>
          ) : (
            <FontAwesomeIcon icon={farUser} />
          )}
        </Link>
        <div className="heart-icon">
          <FontAwesomeIcon icon={faHeart} />
          <span>{wishlistItems.length}</span>
        </div>
        <div className="cart_menu">
          <FontAwesomeIcon 
            icon={faCartShopping} 
            className="fa-cart" 
            onClick={toggleCart}
          />
          <span id="cart_count">{getCartCount()}</span>
        </div>
        {getCartCount() > 0 && (
          <h3 className="total-price">{formatPrice(getTotalPrice())}</h3>
        )}
      </div>
      <div className="bars">
        <FontAwesomeIcon icon={faBars} />
      </div>

      
      {/* Cart Container */}
      <div className={`cart_container ${isCartOpen ? 'open' : ''}`}>
        <div className="cart_head">
          <FontAwesomeIcon 
            icon={faXmark} 
            className="close-cart" 
            onClick={toggleCart}
          />
          <h1>shopping cart</h1>
        </div>
        <div className="cartInproduct">
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div className="cproduct1" key={`${item.id}-${item.size}`}>
                <img src={item.image} alt={item.name} />
                <div className="cart-detail">
                  <h2>{item.name}</h2>
                  <p>{formatPrice(item.price)}</p>
                  <div className="cart-item-quantity">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1, item.size)}>
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                    <span>{item.quantity}</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="empty-cart">Keranjang belanja kosong</div>
          )}
        </div>
        {cartItems.length > 0 && (
          <div className="cart-footer">
            <div className="cart-total">
              <span>Total:</span>
              <span>{formatPrice(getTotalPrice())}</span>
            </div>
            <Link to="/checkout" className="checkout-btn" onClick={toggleCart}>
              Checkout
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;