import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faHeart, faShoppingCart, faFilter, faTimes, faCheck, faEye } from '@fortawesome/free-solid-svg-icons';
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../styles/Shop.css';
import { useCart } from '../context/CartContext';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [priceRange, setPriceRange] = useState(3000000);
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  
  const { addToCart } = useCart();

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
    });
  }, []);
  
  useEffect(() => {
    const searchQuery = queryParams.get('search');
    if (searchQuery) {
      setSearchTerm(searchQuery);
    } else if (searchTerm && !queryParams.get('search')) {
      setSearchTerm('');
    }
    
    const categoryParam = queryParams.get('category');
    if (categoryParam) {
      setActiveCategory(categoryParam);
    }
    
    const priceParam = queryParams.get('price');
    if (priceParam) {
      setPriceRange(parseInt(priceParam));
    }
  }, [location.search]);
  
  useEffect(() => {
    // Sample product data
    const sampleProducts = [
      {
        id: 1,
        name: 'Air Jordan Retro High OG',
        category: 'sneakers',
        price: 1899000,
        rating: 4.8,
        image: '/images/air_jordan.png',
        description: 'Sepatu ikonik dengan desain klasik yang terinspirasi dari model original tahun 1985. Dibuat dengan bahan kulit premium dan sol karet yang tahan lama.',
        colors: ['Black/Red', 'White/Blue', 'Grey/Black'],
        sizes: [39, 40, 41, 42, 43, 44, 45],
        stock: 15,
        discount: 0,
      },
      {
        id: 2,
        name: 'Pink Fusion Lifestyle',
        category: 'sneakers',
        price: 799000,
        rating: 4.5,
        image: '/images/Pinkky.png',
        description: 'Sepatu sneakers casual dengan warna pink yang eye-catching. Cocok untuk gaya street style dan everyday look.',
        colors: ['Pink', 'Light Pink', 'Pink/White'],
        sizes: [36, 37, 38, 39, 40],
        stock: 20,
        discount: 25,
      },
      {
        id: 3,
        name: 'Ultra Boost Running Pro',
        category: 'sports',
        price: 1299000,
        rating: 4.7,
        image: '/images/Sepatusliderr.png',
        description: 'Sepatu lari dengan teknologi responsive cushioning untuk kenyamanan maksimal. Dilengkapi dengan upper breathable dan outsole anti-slip.',
        colors: ['Black/White', 'Blue/Orange', 'Grey/Green'],
        sizes: [39, 40, 41, 42, 43, 44],
        stock: 18,
        discount: 10,
      },
      {
        id: 4,
        name: 'Classic Oxford Premium',
        category: 'formal',
        price: 1299000,
        rating: 4.6,
        image: '/images/sepatuboot.png',
        description: 'Sepatu formal klasik dengan bahan kulit asli dan detail jahitan yang rapi. Cocok untuk acara formal dan business casual.',
        colors: ['Black', 'Brown', 'Burgundy'],
        sizes: [39, 40, 41, 42, 43, 44],
        stock: 12,
        discount: 0,
      },
      {
        id: 5,
        name: 'Mountain Explorer Hiking Boots',
        category: 'boots',
        price: 1499000,
        rating: 4.9,
        image: '/images/casualSneakerr.png',
        description: 'Sepatu hiking tangguh dengan teknologi waterproof dan grip yang kuat. Ideal untuk pendakian dan aktivitas outdoor.',
        colors: ['Brown/Black', 'Olive Green', 'Grey/Orange'],
        sizes: [39, 40, 41, 42, 43, 44, 45],
        stock: 10,
        discount: 15,
      },
      {
        id: 6,
        name: 'Comfort Slip-on Loafers',
        category: 'formal',
        price: 899000,
        rating: 4.4,
        image: '/images/harry.jpeg',
        description: 'Sepatu loafers dengan desain minimalis dan bahan yang nyaman. Cocok untuk gaya smart casual dan semi-formal.',
        colors: ['Black', 'Brown', 'Navy'],
        sizes: [38, 39, 40, 41, 42, 43],
        stock: 25,
        discount: 20,
      },
      {
        id: 7,
        name: 'Pro Court Basketball Shoes',
        category: 'sports',
        price: 1349000,
        rating: 4.7,
        image: '/images/sportt.jpeg',
        description: 'Sepatu basket dengan dukungan pergelangan kaki yang optimal dan cushioning responsif. Dirancang untuk performa maksimal di lapangan.',
        colors: ['Black/Red', 'White/Blue', 'Orange/Black'],
        sizes: [40, 41, 42, 43, 44, 45, 46],
        stock: 15,
        discount: 0,
      },
      {
        id: 8,
        name: 'Vintage Leather Combat Boots',
        category: 'boots',
        price: 1599000,
        rating: 4.8,
        image: '/images/product3-.jpg',
        description: 'Sepatu boots dengan desain vintage dan bahan kulit premium. Tahan lama dan semakin nyaman seiring waktu pemakaian.',
        colors: ['Black', 'Dark Brown', 'Tan'],
        sizes: [39, 40, 41, 42, 43, 44],
        stock: 8,
        discount: 0,
      },
      {
        id: 9,
        name: 'Tokyo Street Sneakers',
        category: 'sneakers',
        price: 959000,
        rating: 4.6,
        image: '/images/japan.png',
        description: 'Sepatu sneakers dengan desain terinspirasi street style Jepang. Kombinasi warna unik dan detail yang menarik.',
        colors: ['White/Red', 'Black/Gold', 'Grey/Blue'],
        sizes: [38, 39, 40, 41, 42, 43],
        stock: 22,
        discount: 10,
      },
      {
        id: 10,
        name: 'Shuttle Ace Badminton Shoes',
        category: 'sports',
        price: 889000,
        rating: 4.3,
        image: '/images/badminton.jpeg',
        description: 'Sepatu badminton dengan grip superior dan dukungan lateral. Ringan dan dirancang untuk gerakan cepat di lapangan.',
        colors: ['White/Blue', 'Black/Yellow', 'Red/White'],
        sizes: [39, 40, 41, 42, 43, 44],
        stock: 18,
        discount: 15,
      },
      {
        id: 11,
        name: 'Executive Formal Derby',
        category: 'formal',
        price: 1259000,
        rating: 4.7,
        image: '/images/bernard.jpeg',
        description: 'Sepatu formal bergaya derby dengan bahan kulit premium dan sol yang nyaman. Cocok untuk acara formal dan penggunaan sehari-hari di kantor.',
        colors: ['Black', 'Dark Brown', 'Burgundy'],
        sizes: [39, 40, 41, 42, 43, 44],
        stock: 14,
        discount: 0,
      },
      {
        id: 12,
        name: 'Urban Explorer Boots',
        category: 'boots',
        price: 1079000,
        rating: 4.5,
        image: '/images/sepatuboot.webp',
        description: 'Sepatu boots urban dengan desain modern dan fungsional. Cocok untuk gaya casual dan petualangan di kota.',
        colors: ['Black', 'Grey', 'Khaki'],
        sizes: [39, 40, 41, 42, 43, 44],
        stock: 16,
        discount: 10,
      },
    ];

    setProducts(sampleProducts);
    
    applyFilters(sampleProducts, activeCategory, priceRange, searchTerm || '');
  }, []);
  
  const applyFilters = (productList, category, price, search) => {
    let filtered = productList;
    
    if (category !== 'all') {
      filtered = filtered.filter(product => product.category === category);
    }
    
    filtered = filtered.filter(product => product.price <= price);
    
    if (search && search.trim() !== '') {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(searchLower) || 
        product.category.toLowerCase().includes(searchLower)
      );
    }
    
    setFilteredProducts(filtered);
  };
  
  useEffect(() => {
    applyFilters(products, activeCategory, priceRange, searchTerm);
  }, [products, activeCategory, priceRange, searchTerm]);

  const filterByCategory = (category) => {
    setActiveCategory(category);
    const params = new URLSearchParams(location.search);
    if (category === 'all') {
      params.delete('category');
    } else {
      params.set('category', category);
    }
    // Keep search term if exists
    if (searchTerm) {
      params.set('search', searchTerm);
    }
    navigate(`/shop?${params.toString()}`, { replace: true });
  };

  const filterByPrice = (price) => {
    setPriceRange(price);
    const params = new URLSearchParams(location.search);
    params.set('price', price);
    if (activeCategory !== 'all') {
      params.set('category', activeCategory);
    }
    if (searchTerm) {
      params.set('search', searchTerm);
    }
    navigate(`/shop?${params.toString()}`, { replace: true });
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const navigate = useNavigate();

  const navigateTo = (path) => {
    navigate(path);
  };

  return (
    <div className="shop-container">
        <div className="shop-navigation">
          <ul className="shop-nav-menu">
            <li onClick={() => navigateTo('/')}><Link to="/">Home</Link></li>
            <li onClick={() => navigateTo('/about')}><Link to="/about">About</Link></li>
            <li className="active"><Link to="/shop">Shop</Link></li>
            <li onClick={() => navigateTo('/login')}><Link to="/login">Contact</Link></li>
          </ul>
        </div>
        <div className="shop-header">
          <h1 data-aos="fade-up">Koleksi Produk Kami</h1>
          <p data-aos="fade-up" data-aos-delay="200">
            Temukan berbagai pilihan sepatu berkualitas untuk gaya Anda
          </p>
          {searchTerm && (
            <div className="search-results-info">
              <p>Hasil pencarian untuk: <span>"{searchTerm}"</span> ({filteredProducts.length} produk ditemukan)</p>
              <button className="clear-search" onClick={() => {
                setSearchTerm('');
                navigate('/shop', { replace: true });
              }}>
                <FontAwesomeIcon icon={faTimes} /> Hapus pencarian
              </button>
            </div>
          )}
        </div>

      <div className="filter-button-mobile" onClick={toggleFilters}>
        <FontAwesomeIcon icon={faFilter} /> Filter
      </div>

      <div className="shop-content">
        <div className={`shop-filters ${showFilters ? 'show' : ''}`} data-aos="fade-right">
          <h2>Filter</h2>
          
          <div className="filter-section">
            <h3>Kategori</h3>
            <ul className="category-filter">
              <li 
                className={activeCategory === 'all' ? 'active' : ''}
                onClick={() => filterByCategory('all')}
              >
                Semua Produk
              </li>
              <li 
                className={activeCategory === 'sneakers' ? 'active' : ''}
                onClick={() => filterByCategory('sneakers')}
              >
                Sneakers
              </li>
              <li 
                className={activeCategory === 'formal' ? 'active' : ''}
                onClick={() => filterByCategory('formal')}
              >
                Formal
              </li>
              <li 
                className={activeCategory === 'sports' ? 'active' : ''}
                onClick={() => filterByCategory('sports')}
              >
                Sports
              </li>
              <li 
                className={activeCategory === 'boots' ? 'active' : ''}
                onClick={() => filterByCategory('boots')}
              >
                Boots
              </li>
            </ul>
          </div>

          <div className="filter-section">
            <h3>Harga</h3>
            <div className="price-filter">
              <input 
                type="range" 
                min="500000" 
                max="3000000" 
                step="100000" 
                value={priceRange}
                onChange={(e) => filterByPrice(parseInt(e.target.value))}
              />
              <p>Maksimal: {formatPrice(priceRange)}</p>
            </div>
          </div>

          <div className="close-filters" onClick={toggleFilters}>
            Tutup Filter
          </div>
        </div>

        <div className="shop-products" data-aos="fade-up">
          <div className="products-header">
            <h2>Produk ({filteredProducts.length})</h2>
            <select className="sort-select">
              <option value="default">Urutan Default</option>
              <option value="price-low">Harga: Rendah ke Tinggi</option>
              <option value="price-high">Harga: Tinggi ke Rendah</option>
              <option value="rating">Rating Tertinggi</option>
            </select>
          </div>

          <div className="product-grid">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <div className="product-card" key={product.id} data-aos="fade-up">
                  <div className="product-image">
                    <img src={product.image} alt={product.name} />
                    <div className="product-actions">
                      <button className="action-btn wishlist">
                        <FontAwesomeIcon icon={faHeart} />
                      </button>
                      <Link to={`/product?id=${product.id}`} className="action-btn eye">
                        <FontAwesomeIcon icon={faEye} />
                      </Link>
                      <button 
                        className="action-btn cart"
                        onClick={() => addToCart(product, 1)}
                      >
                        <FontAwesomeIcon icon={faShoppingCart} />
                      </button>
                    </div>
                  </div>
                  <div className="product-info">
                    <h3>
                      <Link to={`/product?id=${product.id}`}>{product.name}</Link>
                    </h3>
                    <p className="product-description">{product.description ? product.description.substring(0, 60) + '...' : ''}</p>
                    <div className="product-rating">
                      {[...Array(5)].map((_, index) => (
                        <FontAwesomeIcon 
                          key={index} 
                          icon={faStar} 
                          className={index < Math.floor(product.rating) ? 'star-filled' : 'star-empty'}
                        />
                      ))}
                      <span>({product.rating})</span>
                    </div>
                    <div className="product-price-container">
                      {product.discount > 0 ? (
                        <>
                          <p className="product-price-original">{formatPrice(product.price)}</p>
                          <p className="product-price-discount">{formatPrice(product.price * (1 - product.discount / 100))}</p>
                          <span className="discount-badge">-{product.discount}%</span>
                        </>
                      ) : (
                        <p className="product-price">{formatPrice(product.price)}</p>
                      )}
                    </div>
                    <div className="product-details">
                      <div className="product-colors">
                        {product.colors && product.colors.slice(0, 3).map((color, index) => (
                          <span 
                            key={index} 
                            className="color-dot" 
                            title={color}
                            style={{ backgroundColor: color.toLowerCase().includes('black') ? '#000' : 
                                                    color.toLowerCase().includes('white') ? '#fff' :
                                                    color.toLowerCase().includes('red') ? '#e74c3c' :
                                                    color.toLowerCase().includes('blue') ? '#3498db' :
                                                    color.toLowerCase().includes('green') ? '#2ecc71' :
                                                    color.toLowerCase().includes('yellow') ? '#f1c40f' :
                                                    color.toLowerCase().includes('orange') ? '#e67e22' :
                                                    color.toLowerCase().includes('purple') ? '#9b59b6' :
                                                    color.toLowerCase().includes('pink') ? '#fd79a8' :
                                                    color.toLowerCase().includes('brown') ? '#795548' :
                                                    color.toLowerCase().includes('grey') ? '#95a5a6' :
                                                    color.toLowerCase().includes('navy') ? '#34495e' :
                                                    color.toLowerCase().includes('tan') ? '#d2b48c' :
                                                    color.toLowerCase().includes('olive') ? '#808000' :
                                                    color.toLowerCase().includes('khaki') ? '#f0e68c' :
                                                    color.toLowerCase().includes('burgundy') ? '#800020' : '#ddd' }}
                          ></span>
                        ))}
                        {product.colors && product.colors.length > 3 && <span className="more-colors">+{product.colors.length - 3}</span>}
                      </div>
                      <div className="product-stock">
                        {product.stock > 0 ? (
                          <span className="in-stock">Stok: {product.stock}</span>
                        ) : (
                          <span className="out-of-stock">Stok Habis</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-products">
                <p>Tidak ada produk yang sesuai dengan filter yang dipilih.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;