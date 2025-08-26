import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../styles/About.css';

const About = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
    });
  }, []);

  return (
    <div className="about-container">
      <div className="about-header">
        <h1 data-aos="fade-up">Tentang Kami</h1>
        <p data-aos="fade-up" data-aos-delay="200">
          Jingga Store adalah destinasi belanja online terpercaya untuk produk fashion berkualitas tinggi
        </p>
      </div>

      <div className="about-content">
        <div className="about-section" data-aos="fade-right">
          <h2>Visi Kami</h2>
          <p>
            Menjadi platform e-commerce terdepan yang menyediakan produk fashion berkualitas tinggi
            dengan harga terjangkau dan pengalaman belanja yang menyenangkan bagi pelanggan.
          </p>
        </div>

        <div className="about-section" data-aos="fade-left">
          <h2>Misi Kami</h2>
          <ul>
            <li>Menyediakan produk fashion berkualitas tinggi dengan harga terjangkau</li>
            <li>Memberikan pengalaman belanja online yang mudah dan menyenangkan</li>
            <li>Mengutamakan kepuasan pelanggan dalam setiap aspek layanan kami</li>
            <li>Mengikuti tren fashion terkini untuk memenuhi kebutuhan pelanggan</li>
            <li>Membangun hubungan jangka panjang dengan pelanggan dan mitra bisnis</li>
          </ul>
        </div>
      </div>

      <div className="team-section">
        <h2 data-aos="fade-up">Siapa Kami</h2>
        <div className="about-us-content" data-aos="fade-up" data-aos-delay="100">
          <img src="/images/SMK.png" alt="SMKN 1 Rongga" className="school-image" />
          <div className="about-us-text">
            <p>
              Kami adalah pelajar SMKN 1 Rongga yang mengembangkan projek 
              e-commerce ini. Yang beranggota 4 orang. Dengan latar belakang di 
              teknologi, kami akan berkomitmen untuk memberikan pengalaman belanja 
              online yang mudah, aman, dan terjangkau. Kami terus belajar dan 
              berinovasi untuk memberikan layanan terbaik bagi Anda.
            </p>
          </div>
        </div>
      </div>

      <div className="contact-section" data-aos="fade-up">
        <h2>Hubungi Kami</h2>
        <div className="contact-info">
          <div className="contact-item">
            <i className="fas fa-map-marker-alt"></i>
            <p>Jl. Pahlawan No. 123, Jakarta Pusat</p>
          </div>
          <div className="contact-item">
            <i className="fas fa-phone"></i>
            <p>+62 123 4567 890</p>
          </div>
          <div className="contact-item">
            <i className="fas fa-envelope"></i>
            <p>info@jinggastore.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;