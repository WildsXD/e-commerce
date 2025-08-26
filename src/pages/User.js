import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faShoppingBag, faHeart, faAddressCard, faSignOutAlt, faPen } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../styles/User.css';
import { useUser } from '../context/UserContext';

const User = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const { currentUser, updateProfile, logout } = useUser();
  const navigate = useNavigate();
  
  // Redirect if not logged in
  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    }
  }, [currentUser, navigate]);
  
  // Initialize userData from currentUser or with defaults
  const [userData, setUserData] = useState({
    name: currentUser?.name || 'Guest User',
    email: currentUser?.email || 'guest@example.com',
    phone: currentUser?.phone || '081234567890',
    address: currentUser?.address || 'Jl. Sudirman No. 123, Jakarta',
    profileImage: currentUser?.profileImage || '/public/images/Profile.webp'
  });
  const [orders, setOrders] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editFormData, setEditFormData] = useState({...userData});

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
    });

    // Sample orders data
    const sampleOrders = [
      {
        id: 'ORD-001',
        date: '2023-05-15',
        status: 'Delivered',
        total: 899000,
        items: [
          {
            id: 1,
            name: 'Air Jordan Retro',
            price: 899000,
            quantity: 1,
            image: '/images/air_jordan.png'
          }
        ]
      },
      {
        id: 'ORD-002',
        date: '2023-06-20',
        status: 'Processing',
        total: 1198000,
        items: [
          {
            id: 2,
            name: 'Pink Casual Sneakers',
            price: 599000,
            quantity: 1,
            image: '/images/Pinkky.png'
          },
          {
            id: 3,
            name: 'Running Shoes Pro',
            price: 599000,
            quantity: 1,
            image: '/images/Sepatusliderr.png'
          }
        ]
      }
    ];

    // Sample wishlist data
    const sampleWishlist = [
      {
        id: 4,
        name: 'Classic Oxford',
        price: 899000,
        image: '/images/product-4.jpg'
      },
      {
        id: 5,
        name: 'Casual Loafers',
        price: 699000,
        image: '/images/product-5.jpg'
      },
      {
        id: 6,
        name: 'Sport Sandals',
        price: 499000,
        image: '/images/product-6.jpg'
      }
    ];

    setOrders(sampleOrders);
    setWishlist(sampleWishlist);
  }, []);

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({
      ...editFormData,
      [name]: value
    });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    setUserData(editFormData);
    updateProfile(editFormData);
    setIsEditing(false);
  };

  const handleRemoveWishlistItem = (id) => {
    setWishlist(prevItems => prevItems.filter(item => item.id !== id));
  };

  // Format price to IDR
  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  return (
    <div className="user-dashboard-container">
      <div className="user-dashboard" data-aos="fade-up">
        <div className="dashboard-sidebar">
          <div className="user-profile-summary">
            <div className="profile-image">
              <img src={userData.profileImage} alt="Profile" />
            </div>
            <h3>{userData.name}</h3>
            <p>{userData.email}</p>
          </div>
          
          <div className="dashboard-menu">
            <button 
              className={activeTab === 'profile' ? 'active' : ''}
              onClick={() => setActiveTab('profile')}
            >
              <FontAwesomeIcon icon={faUser} />
              <span>Profil</span>
            </button>
            
            <button 
              className={activeTab === 'orders' ? 'active' : ''}
              onClick={() => setActiveTab('orders')}
            >
              <FontAwesomeIcon icon={faShoppingBag} />
              <span>Pesanan</span>
            </button>
            
            <button 
              className={activeTab === 'wishlist' ? 'active' : ''}
              onClick={() => setActiveTab('wishlist')}
            >
              <FontAwesomeIcon icon={faHeart} />
              <span>Wishlist</span>
            </button>
            
            <button 
              className={activeTab === 'address' ? 'active' : ''}
              onClick={() => setActiveTab('address')}
            >
              <FontAwesomeIcon icon={faAddressCard} />
              <span>Alamat</span>
            </button>
            
            <button 
              className="logout-btn"
              onClick={() => {
                logout();
                navigate('/login');
              }}
            >
              <FontAwesomeIcon icon={faSignOutAlt} />
              <span>Logout</span>
            </button>
          </div>
        </div>
        
        <div className="dashboard-content">
          {activeTab === 'profile' && (
            <div className="profile-tab">
              <div className="tab-header">
                <h2>Profil Saya</h2>
                {!isEditing && (
                  <button className="edit-btn" onClick={() => setIsEditing(true)}>
                    <FontAwesomeIcon icon={faPen} />
                    <span>Edit</span>
                  </button>
                )}
              </div>
              
              {isEditing ? (
                <form onSubmit={handleEditSubmit} className="edit-profile-form">
                  <div className="form-group">
                    <label>Nama Lengkap</label>
                    <input 
                      type="text" 
                      name="name" 
                      value={editFormData.name} 
                      onChange={handleEditChange} 
                      required 
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Email</label>
                    <input 
                      type="email" 
                      name="email" 
                      value={editFormData.email} 
                      onChange={handleEditChange} 
                      required 
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Nomor Telepon</label>
                    <input 
                      type="tel" 
                      name="phone" 
                      value={editFormData.phone} 
                      onChange={handleEditChange} 
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Alamat</label>
                    <textarea 
                      name="address" 
                      value={editFormData.address} 
                      onChange={handleEditChange} 
                    ></textarea>
                  </div>
                  
                  <div className="form-actions">
                    <button type="submit" className="save-btn">Simpan</button>
                    <button 
                      type="button" 
                      className="cancel-btn" 
                      onClick={() => {
                        setIsEditing(false);
                        setEditFormData({...userData});
                      }}
                    >
                      Batal
                    </button>
                  </div>
                </form>
              ) : (
                <div className="profile-info">
                  <div className="info-group">
                    <h3>Nama Lengkap</h3>
                    <p>{userData.name}</p>
                  </div>
                  
                  <div className="info-group">
                    <h3>Email</h3>
                    <p>{userData.email}</p>
                  </div>
                  
                  <div className="info-group">
                    <h3>Nomor Telepon</h3>
                    <p>{userData.phone}</p>
                  </div>
                  
                  <div className="info-group">
                    <h3>Alamat</h3>
                    <p>{userData.address}</p>
                  </div>
                </div>
              )}
            </div>
          )}
          
          {activeTab === 'orders' && (
            <div className="orders-tab">
              <div className="tab-header">
                <h2>Pesanan Saya</h2>
              </div>
              
              {orders.length > 0 ? (
                <div className="orders-list">
                  {orders.map(order => (
                    <div className="order-card" key={order.id}>
                      <div className="order-header">
                        <div>
                          <h3>Order #{order.id}</h3>
                          <p className="order-date">{formatDate(order.date)}</p>
                        </div>
                        <div className="order-status">
                          <span className={`status-badge ${order.status.toLowerCase()}`}>
                            {order.status}
                          </span>
                        </div>
                      </div>
                      
                      <div className="order-items">
                        {order.items.map(item => (
                          <div className="order-item" key={item.id}>
                            <div className="item-image">
                              <img src={item.image} alt={item.name} />
                            </div>
                            <div className="item-details">
                              <h4>{item.name}</h4>
                              <p>Qty: {item.quantity}</p>
                              <p className="item-price">{formatPrice(item.price)}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="order-footer">
                        <div className="order-total">
                          <span>Total:</span>
                          <span>{formatPrice(order.total)}</span>
                        </div>
                        <button className="view-details-btn">Lihat Detail</button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <p>Anda belum memiliki pesanan.</p>
                </div>
              )}
            </div>
          )}
          
          {activeTab === 'wishlist' && (
            <div className="wishlist-tab">
              <div className="tab-header">
                <h2>Wishlist Saya</h2>
              </div>
              
              {wishlist.length > 0 ? (
                <div className="wishlist-grid">
                  {wishlist.map(item => (
                    <div className="wishlist-item" key={item.id}>
                      <button 
                        className="remove-wishlist" 
                        onClick={() => handleRemoveWishlistItem(item.id)}
                      >
                        &times;
                      </button>
                      <div className="wishlist-image">
                        <img src={item.image} alt={item.name} />
                      </div>
                      <div className="wishlist-details">
                        <h3>{item.name}</h3>
                        <p className="wishlist-price">{formatPrice(item.price)}</p>
                        <button className="add-to-cart-btn">Tambah ke Keranjang</button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <p>Wishlist Anda kosong.</p>
                </div>
              )}
            </div>
          )}
          
          {activeTab === 'address' && (
            <div className="address-tab">
              <div className="tab-header">
                <h2>Alamat Saya</h2>
                <button className="add-address-btn">
                  <span>+</span> Tambah Alamat Baru
                </button>
              </div>
              
              <div className="address-card">
                <div className="address-card-header">
                  <h3>Alamat Utama</h3>
                  <div className="address-actions">
                    <button className="edit-address">Edit</button>
                    <button className="delete-address">Hapus</button>
                  </div>
                </div>
                <div className="address-details">
                  <p className="address-name">{userData.name}</p>
                  <p className="address-phone">{userData.phone}</p>
                  <p className="address-full">{userData.address}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default User;