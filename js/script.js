const navbarNav = document.querySelector(".navbar-nav");
const hamburger = document.getElementById("hamburger-menu");
const searchButton = document.getElementById("search-button");
const searchForm = document.querySelector(".search-form");
const searchBox = document.getElementById("search-box");
const shoppingCart = document.getElementById("shopping-cart");
const cartButton = document.getElementById("shopping-cart-button");
const detailButton = document.querySelector(".detail-button");
const detailModal = document.getElementById("item-detail-modal");
const closeButton = document.querySelector(".close-icon");

// ketika icon hamburger di click
document.getElementById("hamburger-menu").onclick = (e) => {
  e.preventDefault();
  navbarNav.classList.toggle("active");
};

document.addEventListener("click", function (e) {
  if (!hamburger.contains(e.target) && !navbarNav.contains(e.target)) {
    navbarNav.classList.remove("active");
  }
  if (!searchForm.contains(e.target) && !searchButton.contains(e.target)) {
    searchForm.classList.remove("active");
  }
  if (!cartButton.contains(e.target) && !shoppingCart.contains(e.target)) {
    shoppingCart.classList.remove("active");
  }
});

// ketika tombol cart di klik
cartButton.onclick = (e) => {
  shoppingCart.classList.toggle("active");
  e.preventDefault();
};

// ketika tombol search di klik
searchButton.onclick = (e) => {
  searchForm.classList.toggle("active");
  searchBox.focus();
  e.preventDefault();
};

// ketika detail button di klik
detailButton.onclick = (e) => {
  detailModal.style.display = "flex";
  e.preventDefault();
};

detailModal.onclick = (e) => {
  if (e.target.contains(detailModal)) {
    detailModal.style.display = "none";
  }
};

// ketika close icon modal di klik
closeButton.onclick = (e) => {
  e.preventDefault();
  detailModal.style.display = "none";
};
