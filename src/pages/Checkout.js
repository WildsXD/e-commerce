import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../styles/Checkout.css';
import { useCart } from '../context/CartContext';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const { cartItems, updateQuantity, removeFromCart, getTotalPrice, clearCart } = useCart();
  const { currentUser } = useUser();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    paymentMethod: 'credit-card'
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
    });
  }, []);

  const handleQuantityChange = (id, change, size = '') => {
    const item = cartItems.find(item => item.id === id && item.size === size);
    if (item) {
      updateQuantity(id, item.quantity + change, size);
    }
  };

  const handleRemoveItem = (id, size = '') => {
    removeFromCart(id, size);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'address', 'city', 'postalCode'];
    
    requiredFields.forEach(field => {
      if (!formData[field]) {
        newErrors[field] = 'Field ini diperlukan';
      }
    });
    
    // Email validation
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Format email tidak valid';
    }
    
    // Phone validation
    if (formData.phone && !/^[0-9]{10,13}$/.test(formData.phone)) {
      newErrors.phone = 'Nomor telepon tidak valid';
    }
    
    // Postal code validation
    if (formData.postalCode && !/^[0-9]{5}$/.test(formData.postalCode)) {
      newErrors.postalCode = 'Kode pos harus 5 digit';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validasi login terlebih dahulu
    if (!currentUser) {
      // Jika pengguna belum login, arahkan ke halaman login
      alert('Anda harus login atau register terlebih dahulu untuk menyelesaikan pesanan.');
      navigate('/login', { state: { returnUrl: '/checkout' } });
      return;
    }
    
    if (validateForm()) {
      // Here you would typically handle the checkout process
      console.log('Checkout form submitted:', formData);
      console.log('Cart items:', cartItems);
      console.log('User:', currentUser);
      alert('Pesanan berhasil dibuat!');
      clearCart();
    }
  };

  // Calculate subtotal, shipping, and total
  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const shipping = cartItems.length > 0 ? 15000 : 0;
  const subtotal = calculateSubtotal();
  const total = subtotal + shipping;

  // Format price to IDR
  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  // Pesan peringatan login
  const LoginAlert = () => {
    if (!currentUser) {
      return (
        <div className="login-alert" data-aos="fade-down">
          <p>Anda harus <span className="login-link" onClick={() => navigate('/login')}>login</span> atau <span className="login-link" onClick={() => navigate('/register')}>register</span> terlebih dahulu untuk menyelesaikan pesanan.</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="checkout-container">
      <h1 className="checkout-title" data-aos="fade-down">Checkout</h1>
      <LoginAlert />
      
      <div className="checkout-content">
        <div className="checkout-form-container" data-aos="fade-right">
          <h2>Informasi Pengiriman</h2>
          
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName">Nama Depan</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className={errors.firstName ? 'error' : ''}
                />
                {errors.firstName && <div className="error-message">{errors.firstName}</div>}
              </div>
              
              <div className="form-group">
                <label htmlFor="lastName">Nama Belakang</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className={errors.lastName ? 'error' : ''}
                />
                {errors.lastName && <div className="error-message">{errors.lastName}</div>}
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={errors.email ? 'error' : ''}
                />
                {errors.email && <div className="error-message">{errors.email}</div>}
              </div>
              
              <div className="form-group">
                <label htmlFor="phone">Nomor Telepon</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={errors.phone ? 'error' : ''}
                />
                {errors.phone && <div className="error-message">{errors.phone}</div>}
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="address">Alamat</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className={errors.address ? 'error' : ''}
              />
              {errors.address && <div className="error-message">{errors.address}</div>}
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="city">Kota</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className={errors.city ? 'error' : ''}
                />
                {errors.city && <div className="error-message">{errors.city}</div>}
              </div>
              
              <div className="form-group">
                <label htmlFor="postalCode">Kode Pos</label>
                <input
                  type="text"
                  id="postalCode"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleInputChange}
                  className={errors.postalCode ? 'error' : ''}
                />
                {errors.postalCode && <div className="error-message">{errors.postalCode}</div>}
              </div>
            </div>
            
            <div className="payment-methods">
              <h3>Metode Pembayaran</h3>
              
              <div className="payment-options">
                <div className="payment-option">
                  <input
                    type="radio"
                    id="credit-card"
                    name="paymentMethod"
                    value="credit-card"
                    checked={formData.paymentMethod === 'credit-card'}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="credit-card">
                    <img src="/images/bank-mandiri.png" alt="Credit Card" />
                    <span>Kartu Kredit</span>
                  </label>
                </div>
                
                <div className="payment-option">
                  <input
                    type="radio"
                    id="bank-transfer"
                    name="paymentMethod"
                    value="bank-transfer"
                    checked={formData.paymentMethod === 'bank-transfer'}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="bank-transfer">
                    <img src="/images/paymentBank.svg" alt="Bank Transfer" />
                    <span>Transfer Bank</span>
                  </label>
                </div>
                
                <div className="payment-option">
                  <input
                    type="radio"
                    id="e-wallet"
                    name="paymentMethod"
                    value="e-wallet"
                    checked={formData.paymentMethod === 'e-wallet'}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="e-wallet">
                    <img src="/images/Payment3.png" alt="E-Wallet" />
                    <span>E-Wallet</span>
                  </label>
                </div>
                
                <div className="payment-option">
                  <input
                    type="radio"
                    id="cash-on-delivery"
                    name="paymentMethod"
                    value="cash-on-delivery"
                    checked={formData.paymentMethod === 'cash-on-delivery'}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="cash-on-delivery">
                    <img src="/images/COD.png" alt="Cash on Delivery" />
                    <span>Cash on Delivery</span>
                  </label>
                </div>
              </div>
            </div>
            
            <button type="submit" className="checkout-btn">
              {currentUser ? 'Lanjutkan ke Pembayaran' : 'Selesaikan Pesanan'}
            </button>
          </form>
        </div>
        
        <div className="order-summary" data-aos="fade-left">
          <h2>Ringkasan Pesanan</h2>
          
          <div className="cart-items">
            {cartItems.length > 0 ? (
              cartItems.map(item => (
                <div className="cart-item" key={item.id}>
                  <div className="item-image">
                    <img src={item.image} alt={item.name} />
                  </div>
                  
                  <div className="item-details">
                    <h3>{item.name}</h3>
                    <p className="item-size">Size: {item.size}</p>
                    <p className="item-price">{formatPrice(item.price)}</p>
                  </div>
                  
                  <div className="item-actions">
                    <div className="quantity-control">
                      <button onClick={() => handleQuantityChange(item.id, -1, item.size)}>
                        <FontAwesomeIcon icon={faMinus} />
                      </button>
                      <span>{item.quantity}</span>
                      <button onClick={() => handleQuantityChange(item.id, 1, item.size)}>
                        <FontAwesomeIcon icon={faPlus} />
                      </button>
                    </div>
                    
                    <button className="remove-btn" onClick={() => handleRemoveItem(item.id, item.size)}>
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="empty-cart">Keranjang belanja kosong</div>
            )}
          </div>
          
          <div className="order-totals">
            <div className="total-row">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            
            <div className="total-row">
              <span>Pengiriman</span>
              <span>{formatPrice(shipping)}</span>
            </div>
            
            <div className="total-row grand-total">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;