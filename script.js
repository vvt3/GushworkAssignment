console.log("Script loaded successfully");

const prodBtn = document.getElementById("productsBtn");
const dropMenu = document.getElementById("dropdownMenu");

prodBtn.addEventListener("click", () => {
  dropMenu.classList.toggle("show");
});

// close if clicked outside
document.addEventListener("click", (e) => {
  if (!prodBtn.contains(e.target) && !dropMenu.contains(e.target)) {
    dropMenu.classList.remove("show");
  }
});

// Zoom box functionality
const mainImg = document.getElementById("mainImg");
const zoomBox = document.querySelector(".zoom-box");

mainImg.addEventListener("mousemove", (e) => {
  const rect = mainImg.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  const xPercent = (x / rect.width) * 100;
  const yPercent = (y / rect.height) * 100;

  zoomBox.style.backgroundImage = `url(${mainImg.src})`;
  zoomBox.style.backgroundPosition = `${xPercent}% ${yPercent}%`;
});