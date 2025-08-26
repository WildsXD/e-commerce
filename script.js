let cartIcon = document.querySelectorAll(".cart_menu .fa-cart-shopping");
let cartMenu = document.querySelectorAll(".cart_container");
let closecart = document.querySelectorAll(".close_cart");
let clickdesc = document.querySelector(".descrip-link");
let clickinfo = document.querySelector(".info-link");
let showdes = document.querySelector(".desc");
let showdescdetail = document.querySelector(".descrip-c-detail");

// Hero Slider Functionality
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const playPauseBtn = document.getElementById('playPauseBtn');
const currentSlideTitle = document.querySelector('.current-slide-title');
const currentSlideNum = document.getElementById('currentSlideNum');
const totalSlides = document.getElementById('totalSlides');
let currentSlide = 0;
let slideInterval;
let isPlaying = true;

// Slide titles
const slideTitles = ['Air Jordan', 'Fashion Collection', 'Premium Gadgets'];

// Initialize slider
function initSlider() {
  // Set first slide as active
  showSlide(currentSlide);
  
  // Start automatic slideshow
  startSlideshow();
  
  // Add event listeners for navigation
  prevBtn.addEventListener('click', () => {
    stopSlideshow();
    showSlide(currentSlide - 1);
    if (isPlaying) startSlideshow();
  });
  
  nextBtn.addEventListener('click', () => {
    stopSlideshow();
    showSlide(currentSlide + 1);
    if (isPlaying) startSlideshow();
  });
  
  // Add event listeners for dots
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      stopSlideshow();
      showSlide(index);
      if (isPlaying) startSlideshow();
    });
  });
  
  // Pause slideshow when mouse enters the slider container
  const sliderContainer = document.querySelector('.slider-container');
  if (sliderContainer) {
    sliderContainer.addEventListener('mouseenter', () => {
      if (isPlaying) stopSlideshow();
    });
    
    sliderContainer.addEventListener('mouseleave', () => {
      if (isPlaying) startSlideshow();
    });
  }
  
  // Play/Pause button functionality
  if (playPauseBtn) {
    playPauseBtn.addEventListener('click', togglePlayPause);
  }
}

// Toggle play/pause functionality
function togglePlayPause() {
  isPlaying = !isPlaying;
  
  // Update button icon
  const icon = playPauseBtn.querySelector('i');
  if (isPlaying) {
    icon.className = 'fas fa-pause';
    startSlideshow();
  } else {
    icon.className = 'fas fa-play';
    stopSlideshow();
  }
}

// Show specific slide
function showSlide(index) {
  // Handle index out of bounds
  if (index < 0) {
    currentSlide = slides.length - 1;
  } else if (index >= slides.length) {
    currentSlide = 0;
  } else {
    currentSlide = index;
  }
  
  // Remove active class from all slides and dots
  slides.forEach(slide => slide.classList.remove('active'));
  dots.forEach(dot => dot.classList.remove('active'));
  
  // Add active class to current slide and dot
  slides[currentSlide].classList.add('active');
  dots[currentSlide].classList.add('active');
  
  // Reset animation for the active dot
  const activeDot = dots[currentSlide];
  activeDot.style.animation = 'none';
  setTimeout(() => {
    activeDot.style.animation = '';
  }, 10);
  
  // Update slide title and counter
  if (currentSlideTitle) {
    currentSlideTitle.textContent = slideTitles[currentSlide];
  }
  
  if (currentSlideNum) {
    currentSlideNum.textContent = currentSlide + 1;
  }
  
  if (totalSlides && slides.length > 0) {
    totalSlides.textContent = slides.length;
  }
}

// Start automatic slideshow
function startSlideshow() {
  slideInterval = setInterval(() => {
    showSlide(currentSlide + 1);
  }, 3000); // Change slide every 3 seconds
}

// Stop automatic slideshow
function stopSlideshow() {
  clearInterval(slideInterval);
}

// Initialize slider when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  if (slides.length > 0) {
    initSlider();
    initSwipeDetection();
  }
});

// Add swipe functionality for mobile devices
function initSwipeDetection() {
  const sliderContainer = document.querySelector('.slider-container');
  if (!sliderContainer) return;
  
  let touchStartX = 0;
  let touchEndX = 0;
  
  sliderContainer.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, false);
  
  sliderContainer.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, false);
  
  function handleSwipe() {
    const swipeThreshold = 50; // Minimum distance for swipe detection
    
    if (touchEndX < touchStartX - swipeThreshold) {
      // Swipe left - show next slide
      stopSlideshow();
      showSlide(currentSlide + 1);
      if (isPlaying) startSlideshow();
    }
    
    if (touchEndX > touchStartX + swipeThreshold) {
      // Swipe right - show previous slide
      stopSlideshow();
      showSlide(currentSlide - 1);
      if (isPlaying) startSlideshow();
    }
  }
}

// Original functionality
if (clickdesc) {
  clickdesc.addEventListener("click", () => {
    showdes.style.display = "block";
    showdescdetail.style.display = "none";
  });
}

if (clickinfo) {
  clickinfo.addEventListener("click", () => {
    showdescdetail.style.display = "block";
    showdes.style.display = "none";
  });
}

cartIcon.forEach((cart) => {
  cart.addEventListener("click", () => {
    cartMenu.forEach((cart) => {
      cart.classList.toggle("show_cart_menu");
    });
  });
});

closecart.forEach((cartclose) => {
  cartclose.addEventListener("click", () => {
    cartMenu.forEach((cartitem) => {
      cartitem.classList.remove("show_cart_menu"); // Fixed: removed dot before class name
    });
  });
});
