let cartIcon = document.querySelectorAll(".cart_menu .fa-cart-shopping");
let cartMenu = document.querySelectorAll(".cart_container");
let closecart = document.querySelectorAll(".close_cart");
let clickdesc = document.querySelector(".descrip-link");
let clickinfo = document.querySelector(".info-link");
let showdes = document.querySelector(".desc");
let showdescdetail = document.querySelector(".descrip-c-detail");

clickdesc.addEventListener("click", () => {
  showdes.style.display = "block";
  showdescdetail.style.display = "none";
});
clickinfo.addEventListener("click", () => {
  showdescdetail.style.display = "block";
  showdes.style.display = "none";
});

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
      cartitem.classList.remove(".show_cart_menu");
    });
  });
});
