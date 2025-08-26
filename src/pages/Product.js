import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faHeart, faShoppingCart, faMinus, faPlus, faCheck } from '@fortawesome/free-solid-svg-icons';
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../styles/Product.css';
import { useCart } from '../context/CartContext';

const Product = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const productId = queryParams.get('id') || '1';

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [addedToCart, setAddedToCart] = useState(false);
  
  const { addToCart } = useCart();

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
    });

    const sampleProducts = [
      {
        id: '1',
        name: 'Air Jordan Retro',
        category: 'sneakers',
        price: 899000,
        rating: 4.8,
        image: '/images/air_jordan.png',
        description: 'Sepatu Air Jordan Retro dengan desain klasik dan kualitas premium. Cocok untuk gaya kasual sehari-hari maupun untuk kegiatan olahraga ringan.',
        features: ['Bahan kulit premium', 'Sol karet anti-slip', 'Bantalan udara untuk kenyamanan', 'Desain klasik yang timeless'],
        stock: 15,
      },
      {
        id: '2',
        name: 'Pink Casual Sneakers',
        category: 'sneakers',
        price: 599000,
        rating: 4.5,
        image: '/images/Pinkky.png',
        description: 'Sepatu sneakers casual dengan warna pink yang trendy. Cocok untuk gaya kasual sehari-hari dan memberikan tampilan yang stylish.',
        features: ['Bahan kanvas berkualitas', 'Sol empuk', 'Desain modern', 'Ringan dan nyaman dipakai'],
        stock: 20,
      },
      {
        id: '3',
        name: 'Running Shoes Pro',
        category: 'sports',
        price: 799000,
        rating: 4.7,
        image: '/images/Sepatusliderr.png',
        description: 'Sepatu lari profesional dengan teknologi terkini. Dirancang untuk performa maksimal saat berlari dengan kenyamanan optimal.',
        features: ['Teknologi cushioning', 'Breathable mesh', 'Support arch yang baik', 'Ringan dan responsif'],
        stock: 12,
      },
      {
        id: '4',
        name: 'Classic Oxford',
        category: 'formal',
        price: 899000,
        rating: 4.6,
        image: '/images/sepatuboot.png',
        description: 'Sepatu formal klasik dengan desain oxford yang elegan. Cocok untuk acara formal dan penggunaan di kantor.',
        features: ['Kulit asli', 'Sol kulit', 'Jahitan rapi', 'Desain klasik'],
        stock: 8,
      },
      {
        id: '5',
        name: 'Hiking Boots',
        category: 'boots',
        price: 999000,
        rating: 4.9,
        image: '/images/casualSneakerr.png',
        description: 'Sepatu hiking dengan daya tahan tinggi untuk petualangan outdoor. Memberikan stabilitas dan perlindungan maksimal di berbagai medan.',
        features: ['Tahan air', 'Grip yang kuat', 'Perlindungan pergelangan kaki', 'Bahan tahan lama'],
        stock: 10,
      },
      {
        id: '6',
        name: 'Casual Loafers',
        category: 'formal',
        price: 699000,
        rating: 4.4,
        image: '/images/women gyat.png',
        description: 'Sepatu loafers casual yang nyaman dan stylish. Sempurna untuk penggunaan sehari-hari dengan tampilan yang tetap elegan.',
        features: ['Kulit lembut', 'Insole yang empuk', 'Desain slip-on', 'Fleksibel'],
        stock: 15,
      },
      {
        id: '7',
        name: 'Basketball Shoes',
        category: 'sports',
        price: 849000,
        rating: 4.7,
        image: '/images/sportt.jpeg',
        description: 'Sepatu basket dengan performa tinggi untuk pemain yang serius. Memberikan dukungan dan responsivitas yang dibutuhkan di lapangan.',
        features: ['Traksi superior', 'Bantalan yang responsif', 'Dukungan pergelangan kaki', 'Breathable'],
        stock: 7,
      },
      {
        id: '8',
        name: 'Leather Boots',
        category: 'boots',
        price: 1099000,
        rating: 4.8,
        image: '/images/product3-.jpg',
        description: 'Sepatu boots kulit premium dengan desain yang timeless. Kombinasi sempurna antara gaya dan fungsionalitas.',
        features: ['Kulit full-grain', 'Konstruksi tahan lama', 'Tahan air', 'Sol karet berkualitas tinggi'],
        stock: 5,
      },
      {
        id: '9',
        name: 'Japanese Style Sneakers',
        category: 'sneakers',
        price: 759000,
        rating: 4.6,
        image: '/images/japan.png',
        description: 'Sepatu sneakers dengan sentuhan desain Jepang yang minimalis dan elegan. Perpaduan sempurna antara tradisi dan modernitas.',
        features: ['Bahan premium', 'Desain minimalis', 'Kenyamanan sepanjang hari', 'Detail yang halus'],
        stock: 9,
      },
      {
        id: '10',
        name: 'Badminton Pro Shoes',
        category: 'sports',
        price: 689000,
        rating: 4.3,
        image: '/images/badminton.jpeg',
        description: 'Sepatu badminton profesional yang dirancang untuk performa maksimal di lapangan. Memberikan stabilitas dan kecepatan yang dibutuhkan.',
        features: ['Grip non-marking', 'Ringan', 'Dukungan lateral', 'Ventilasi yang baik'],
        stock: 11,
      },
      {
        id: '11',
        name: 'Elegant Formal Shoes',
        category: 'formal',
        price: 959000,
        rating: 4.7,
        image: '/images/sepatuboot.webp',
        description: 'Sepatu formal elegan untuk acara spesial. Dibuat dengan ketelitian tinggi untuk tampilan yang sempurna.',
        features: ['Kulit premium', 'Finishing mengkilap', 'Jahitan tangan', 'Sol kulit asli'],
        stock: 6,
      },
      {
        id: '12',
        name: 'Trendy Casual Boots',
        category: 'boots',
        price: 879000,
        rating: 4.5,
        image: '/images/boots BG-img.jpg',
        description: 'Sepatu boots casual dengan desain trendy untuk gaya sehari-hari. Kombinasi sempurna antara kenyamanan dan fashion.',
        features: ['Desain kontemporer', 'Bahan berkualitas', 'Nyaman dipakai seharian', 'Versatile untuk berbagai outfit'],
        stock: 14,
      },
    ];

    // Find the selected product
    const selectedProduct = sampleProducts.find(p => p.id === productId);
    setProduct(selectedProduct || sampleProducts[0]);

    // Get related products (same category)
    if (selectedProduct) {
      const related = sampleProducts
        .filter(p => p.category === selectedProduct.category && p.id !== selectedProduct.id)
        .slice(0, 3);
      setRelatedProducts(related);
    } else {
      setRelatedProducts(sampleProducts.slice(0, 3));
    }
  }, [productId]);

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    if (product && quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  // Format price to IDR
  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  if (!product) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="product-detail-container">
      <div className="product-detail">
        <div className="product-image-container" data-aos="fade-right">
          <img src={product.image} alt={product.name} className="product-detail-image" />
        </div>

        <div className="product-info-container" data-aos="fade-left">
          <h1 className="product-title">{product.name}</h1>
          
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
          
          <div className="product-price">{formatPrice(product.price)}</div>
          
          <div className="product-stock">
            <span className={product.stock > 0 ? 'in-stock' : 'out-of-stock'}>
              {product.stock > 0 ? `Stok: ${product.stock}` : 'Stok Habis'}
            </span>
          </div>
          
          <div className="product-actions">
            <div className="quantity-control">
              <button onClick={decreaseQuantity} disabled={quantity <= 1}>
                <FontAwesomeIcon icon={faMinus} />
              </button>
              <span>{quantity}</span>
              <button onClick={increaseQuantity} disabled={quantity >= product.stock}>
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </div>
            
            <div className="action-buttons">
              <button 
                className={`add-to-cart ${addedToCart ? 'added' : ''}`}
                onClick={() => {
                  addToCart(product, quantity);
                  setAddedToCart(true);
                  setTimeout(() => setAddedToCart(false), 2000);
                }}
              >
                <FontAwesomeIcon icon={addedToCart ? faCheck : faShoppingCart} />
                {addedToCart ? 'Ditambahkan' : 'Tambah ke Keranjang'}
              </button>
              <button className="add-to-wishlist">
                <FontAwesomeIcon icon={faHeart} />
              </button>
            </div>
          </div>
          
          <div className="product-tabs">
            <div className="tab-buttons">
              <button 
                className={activeTab === 'description' ? 'active' : ''}
                onClick={() => setActiveTab('description')}
              >
                Deskripsi
              </button>
              <button 
                className={activeTab === 'features' ? 'active' : ''}
                onClick={() => setActiveTab('features')}
              >
                Fitur
              </button>
            </div>
            
            <div className="tab-content">
              {activeTab === 'description' && (
                <div className="description-tab">
                  <p>{product.description}</p>
                </div>
              )}
              
              {activeTab === 'features' && (
                <div className="features-tab">
                  <ul>
                    {product.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="related-products" data-aos="fade-up">
        <h2>Produk Terkait</h2>
        <div className="related-products-grid">
          {relatedProducts.map((relatedProduct) => (
            <div className="related-product-card" key={relatedProduct.id}>
              <div className="related-product-image">
                <img src={relatedProduct.image} alt={relatedProduct.name} />
                <div className="related-product-actions">
                  <button className="action-btn wishlist">
                    <FontAwesomeIcon icon={faHeart} />
                  </button>
                  <button 
                    className="action-btn cart"
                    onClick={() => {
                      addToCart(relatedProduct, 1);
                    }}
                  >
                    <FontAwesomeIcon icon={faShoppingCart} />
                  </button>
                </div>
              </div>
              <div className="related-product-info">
                <h3>
                  <Link to={`/product?id=${relatedProduct.id}`}>{relatedProduct.name}</Link>
                </h3>
                <div className="related-product-rating">
                  {[...Array(5)].map((_, index) => (
                    <FontAwesomeIcon 
                      key={index} 
                      icon={faStar} 
                      className={index < Math.floor(relatedProduct.rating) ? 'star-filled' : 'star-empty'}
                    />
                  ))}
                  <span>({relatedProduct.rating})</span>
                </div>
                <p className="related-product-price">{formatPrice(relatedProduct.price)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Product;