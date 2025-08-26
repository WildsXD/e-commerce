import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../styles/Login.css';
import { useUser } from '../context/UserContext';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login, register } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const returnUrl = location.state?.returnUrl || '/user';

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
 
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email diperlukan';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Format email tidak valid';
    }
    
  
    if (!formData.password) {
      newErrors.password = 'Kata sandi diperlukan';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Kata sandi minimal 6 karakter';
    }
    

    if (!isLogin) {
      if (!formData.name) {
        newErrors.name = 'Nama diperlukan';
      }
      
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Kata sandi tidak cocok';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setLoading(true);
      
      // Simulate API call with timeout
      setTimeout(() => {
        if (isLogin) {
          // Login logic
          login({
            email: formData.email,
            name: formData.email.split('@')[0], // Use part of email as username for demo
            profileImage: '/images/user-profile.jpg' // Default profile image
          });
          console.log('Login successful:', formData.email);
        } else {
          // Register logic
          register({
            name: formData.name,
            email: formData.email,
            profileImage: '/images/user-profile.jpg' // Default profile image
          });
          console.log('Registration successful:', formData.name);
        }
        
        setLoading(false);
        
        // Show success message and navigate to user dashboard
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.textContent = isLogin ? 'Masuk berhasil!' : 'Pendaftaran berhasil!';
        document.body.appendChild(successMessage);
        
        setTimeout(() => {
          document.body.removeChild(successMessage);
          navigate(returnUrl);
        }, 2000);
        
        // Reset form after successful submission
        setFormData({
          email: '',
          password: '',
          name: '',
          confirmPassword: '',
          rememberMe: false
        });
      }, 1500);
    }
  };
  
  const handleSocialLogin = (platform) => {
    setLoading(true);
    
    // Simulate social login
    setTimeout(() => {
      setLoading(false);
      login({
        email: `user@${platform}.com`,
        name: `${platform.charAt(0).toUpperCase() + platform.slice(1)} User`,
        profileImage: '/images/user-profile.jpg'
      });
      
      // Show success message and navigate
      const successMessage = document.createElement('div');
      successMessage.className = 'success-message';
      successMessage.textContent = `Masuk dengan ${platform} berhasil!`;
      document.body.appendChild(successMessage);
      
      setTimeout(() => {
        document.body.removeChild(successMessage);
        navigate(returnUrl);
      }, 2000);
    }, 1500);
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    // Clear errors when switching forms
    setErrors({});
  };

  return (
    <div className="login-container">
      {loading && <div className="loading-overlay">
        <div className="spinner"></div>
      </div>}
      
      <div className="login-wrapper" data-aos="fade-up">
        <div className="form-container">
          <div className="brand-logo">
            <span>jinggastore</span>
          </div>
          
          <div className="form-tabs">
            <button 
              className={isLogin ? 'active' : ''} 
              onClick={() => setIsLogin(true)}
            >
              Masuk
            </button>
            <button 
              className={!isLogin ? 'active' : ''} 
              onClick={() => setIsLogin(false)}
            >
              Daftar
            </button>
          </div>
          
          <form onSubmit={handleSubmit}>
            <h2>{isLogin ? 'Masuk ke Akun Anda' : 'Buat Akun Baru'}</h2>
            <p className="form-subtitle">
              {isLogin 
                ? 'Selamat datang kembali! Silakan masukkan detail Anda untuk mengakses akun Anda.' 
                : 'Isi formulir di bawah ini untuk membuat akun Anda dan mulai berbelanja.'}
            </p>
            
            {!isLogin && (
              <div className="form-group">
                <label htmlFor="name">Nama Lengkap</label>
                <div className="input-wrapper">
                  <input
                    id="name"
                    type="text"
                    name="name"
                    placeholder="Masukkan nama lengkap Anda"
                    value={formData.name}
                    onChange={handleChange}
                    className={errors.name ? 'error' : ''}
                  />
                </div>
                {errors.name && <div className="error-message">{errors.name}</div>}
              </div>
            )}
            
            <div className="form-group">
              <label htmlFor="email">Alamat Email</label>
              <div className="input-wrapper">
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Masukkan email Anda"
                  value={formData.email}
                  onChange={handleChange}
                  className={errors.email ? 'error' : ''}
                />
              </div>
              {errors.email && <div className="error-message">{errors.email}</div>}
            </div>
            
            <div className="form-group">
              <label htmlFor="password">Kata Sandi</label>
              <div className="input-wrapper">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Masukkan kata sandi Anda"
                  value={formData.password}
                  onChange={handleChange}
                  className={errors.password ? 'error' : ''}
                />
                <button 
                  type="button" 
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Sembunyikan" : "Tampilkan"}
                </button>
              </div>
              {errors.password && <div className="error-message">{errors.password}</div>}
            </div>
            
            {!isLogin && (
              <div className="form-group">
                <label htmlFor="confirmPassword">Konfirmasi Kata Sandi</label>
                <div className="input-wrapper">
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Konfirmasi kata sandi Anda"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={errors.confirmPassword ? 'error' : ''}
                  />
                  <button 
                    type="button" 
                    className="toggle-password"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? "Sembunyikan" : "Tampilkan"}
                  </button>
                </div>
                {errors.confirmPassword && <div className="error-message">{errors.confirmPassword}</div>}
              </div>
            )}
            
            <div className="form-options">
              {isLogin && (
                <>
                  <div className="remember-me">
                    <input
                      type="checkbox"
                      id="rememberMe"
                      name="rememberMe"
                      checked={formData.rememberMe}
                      onChange={(e) => setFormData({...formData, rememberMe: e.target.checked})}
                    />
                    <label htmlFor="rememberMe">Ingat saya</label>
                  </div>
                  <div className="forgot-password">
                    <Link to="/forgot-password">Lupa Kata Sandi?</Link>
                  </div>
                </>
              )}
            </div>
            
            <button type="submit" className="submit-btn">
              {isLogin ? 'Masuk' : 'Daftar'}
            </button>
            
            <div className="social-login">
              <p className="divider"><span>Atau lanjutkan dengan</span></p>
              <div className="social-buttons">
                <button 
                  type="button" 
                  className="social-btn google" 
                  onClick={() => handleSocialLogin('google')}
                >
                  <span>Google</span>
                </button>
              </div>
            </div>
            
            <div className="form-footer">
              <p>
                {isLogin ? "Belum punya akun?" : "Sudah punya akun?"}
                <button type="button" className="toggle-btn" onClick={toggleForm}>
                  {isLogin ? 'Daftar' : 'Masuk'}
                </button>
              </p>
            </div>
          </form>
        </div>
        
        <div className="login-image">
          <img src="/images/model.jpeg" alt="Login" />
          <div className="overlay">
            <h2>{isLogin ? 'Selamat Datang Kembali!' : 'Bergabunglah Dengan Kami!'}</h2>
            <p>
              {isLogin 
                ? 'Masuk untuk mengakses akun Anda dan lanjutkan berbelanja bersama kami.'
                : 'Buat akun untuk menikmati penawaran eksklusif dan pengalaman berbelanja yang dipersonalisasi.'}
            </p>
            <div className="features">
              <div className="feature-item">
                <span className="feature-icon">🛒</span>
                <span>Belanja Mudah</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">🔒</span>
                <span>Pembayaran Aman</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">🎁</span>
                <span>Penawaran Eksklusif</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;