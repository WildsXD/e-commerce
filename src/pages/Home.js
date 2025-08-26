import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faPause, faPlay } from '@fortawesome/free-solid-svg-icons';
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../styles/Home.css';

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const slideInterval = useRef(null);
  const navigate = useNavigate();
  
  const navigateToShopWithCategory = (category) => {
    navigate(`/shop?category=${category}`, { replace: true });
  };
  
  const slideTitles = ['Sneakers Premium', 'Koleksi Sepatu Terbaru', 'Boots Eksklusif'];
  const totalSlides = 3;

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
    });

    startSlideshow();

    return () => {
      if (slideInterval.current) {
        clearInterval(slideInterval.current);
      }
    };
  }, []);

  const startSlideshow = () => {
    if (slideInterval.current) {
      clearInterval(slideInterval.current);
    }
    
    slideInterval.current = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % totalSlides);
    }, 5000);
  };

  const stopSlideshow = () => {
    if (slideInterval.current) {
      clearInterval(slideInterval.current);
      slideInterval.current = null;
    }
  };

  const showSlide = (index) => {
    if (index < 0) {
      setCurrentSlide(totalSlides - 1);
    } else if (index >= totalSlides) {
      setCurrentSlide(0);
    } else {
      setCurrentSlide(index);
    }
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
    if (isPlaying) {
      stopSlideshow();
    } else {
      startSlideshow();
    }
  };

  return (
    <div className="home-container">
      <header className="header">
        <div className="slider-container">
          <div className="slider">
            <div className={`slide ${currentSlide === 0 ? 'active' : ''}`}>
              <div data-aos="fade-right" data-aos-duration="2000" className="hero_info">
                <div className="contain">
                  <h2>Sneakers Premium</h2>
                  <h1>Koleksi <span>Terbaik</span></h1>
                  <p>
                    Temukan koleksi sneakers premium dengan desain eksklusif dan kenyamanan maksimal.
                    Dibuat dengan material berkualitas tinggi untuk gaya casual yang selalu trendy.
                    Pilihan tepat untuk aktivitas sehari-hari dengan gaya yang maksimal.
                  </p>
                  <div className="shop-now-button">
                    <button className="shop-now_button" onClick={() => navigateToShopWithCategory('sneakers')}>
                      Lihat Koleksi
                    </button>
                  </div>
                </div>
              </div>
              <div className="hero-img" data-aos="fade-left" data-aos-duration="2000">
                <img src="/images/air_jordan.png" alt="Sneakers Premium" />
              </div>
            </div>
            
            <div className={`slide ${currentSlide === 1 ? 'active' : ''}`}>
              <div className="hero_info" data-aos="fade-right" data-aos-duration="2000">
                <div className="contain">
                  <h2>Sepatu Formal</h2>
                  <h1>Elegan & <span>Berkelas</span></h1>
                  <p>
                    Koleksi sepatu formal terbaik untuk pria dan wanita. Desain klasik dengan sentuhan modern
                    yang memberikan kesan elegan dan profesional. Sempurna untuk acara formal dan kebutuhan kantor.
                  </p>
                  <div className="shop-now-button">
                    <button className="shop-now_button" onClick={() => navigateToShopWithCategory('formal')}>
                      Temukan Sekarang
                    </button>
                  </div>
                </div>
              </div>
              <div className="hero-img" data-aos="fade-left" data-aos-duration="2000">
                <img src="/images/kasual.jpeg" alt="Sepatu Formal" />
              </div>
            </div>
            
            <div className={`slide ${currentSlide === 2 ? 'active' : ''}`}>
              <div className="hero_info" data-aos="fade-right" data-aos-duration="2000">
                <div className="contain">
                  <h2>Boots Eksklusif</h2>
                  <h1>Tangguh & <span>Stylish</span></h1>
                  <p>
                    Koleksi boots premium untuk berbagai medan dan kebutuhan. Kombinasi sempurna antara
                    ketahanan, kenyamanan, dan gaya yang timeless. Ideal untuk petualangan outdoor maupun gaya urban.
                  </p>
                  <div className="shop-now-button">
                    <button className="shop-now_button" onClick={() => navigateToShopWithCategory('boots')}>
                      Jelajahi Koleksi
                    </button>
                  </div>
                </div>
              </div>
              <div className="hero-img" data-aos="fade-left" data-aos-duration="2000">
                <img src="/images/sepatuboot.webp" alt="Boots Eksklusif" />
              </div>
            </div>
            
            <div className="slider-nav">
              <button className="prev-btn" onClick={() => showSlide(currentSlide - 1)}>
                <FontAwesomeIcon icon={faChevronLeft} />
              </button>
              <div className="slider-dots">
                <div className="slider-info">
                  <span className="current-slide-title">{slideTitles[currentSlide]}</span>
                  <span className="slide-counter">
                    <span id="currentSlideNum">{currentSlide + 1}</span>/
                    <span id="totalSlides">{totalSlides}</span>
                  </span>
                </div>
                {[...Array(totalSlides)].map((_, index) => (
                  <span 
                    key={index} 
                    className={`dot ${currentSlide === index ? 'active' : ''}`}
                    onClick={() => showSlide(index)}
                  />
                ))}
                <button className="slider-control-btn" onClick={togglePlayPause}>
                  <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
                </button>
              </div>
              <button className="next-btn" onClick={() => showSlide(currentSlide + 1)}>
                <FontAwesomeIcon icon={faChevronRight} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Categories Section */}
      <div className="container-kategori">
        <div className="title">
          KOLEKSI SEPATU TERBAIK
          <span className="subtitle">Temukan gaya yang sesuai dengan kepribadian Anda</span>
        </div>
        <div className="categories" data-aos="fade-up" data-aos-duration="1000">
          <div className="category">
            <div className="category-image">
              <img alt="Sneakers" src="/images/casualSneakerr.png"/>
            </div>
            <div className="category-info">
              <h3>Sneakers / Casual</h3>
              <p>Kenyamanan dan gaya untuk aktivitas sehari-hari</p>
              <small>low-top, high-top, slip-on, canvas</small>
              <button className="view-collection" onClick={() => navigateToShopWithCategory('sneakers')}>Lihat Koleksi</button>
            </div>
          </div>
          <div className="category">
            <div className="category-image">
              <img alt="Formal Shoes" src="/images/kasual.jpeg"/>
            </div>
            <div className="category-info">
              <h3>Formal Shoes</h3>
              <p>Elegan dan berkelas untuk acara formal</p>
              <small>oxford, derby, loafers, brogues</small>
              <button className="view-collection" onClick={() => navigateToShopWithCategory('formal')}>Lihat Koleksi</button>
            </div>
          </div>
          <div className="category">
            <div className="category-image">
              <img alt="Sports Shoes" src="/images/sportt.jpeg"/>
            </div>
            <div className="category-info">
              <h3>Sports Shoes</h3>
              <p>Performa maksimal untuk aktivitas olahraga</p>
              <small>running, training, basketball, football</small>
              <button className="view-collection" onClick={() => navigateToShopWithCategory('sports')}>Lihat Koleksi</button>
            </div>
          </div>
          <div className="category">
            <div className="category-image">
              <img alt="Boots" src="/images/sepatuboot.webp"/>
            </div>
            <div className="category-info">
              <h3>Boots</h3>
              <p>Tangguh dan stylish untuk berbagai medan</p>
              <small>chelsea, combat, hiking, work</small>
              <button className="view-collection" onClick={() => navigateToShopWithCategory('boots')}>Lihat Koleksi</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;