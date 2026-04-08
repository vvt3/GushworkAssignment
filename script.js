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

// Sticky Header Functionality
let lastScroll = 0;
const stickyHeader = document.querySelector(".sticky-header");

window.addEventListener("scroll", () => {
  const currentScroll = window.scrollY;

  // show when scrolling past hero
  if (currentScroll > 200 && currentScroll > lastScroll) {
    stickyHeader.classList.add("show");
  } else {
    stickyHeader.classList.remove("show");
  }

  lastScroll = currentScroll;
});

// Modal functionality
function openModal(contentHTML) {
  const modal = document.createElement("div");
  modal.classList.add("modal-overlay");

  modal.innerHTML = `
    <div class="modal-box">
      <button class="close-btn" type="button">✕</button>
      ${contentHTML}
    </div>
  `;
  document.body.appendChild(modal);

  setTimeout(() => modal.classList.add("show"), 10);

  // disable page scrolling while modal is open
  document.body.style.overflow = "hidden";

  function closeModal() {
    modal.remove();
    document.body.style.overflow = "";
  }

  const closeButton = modal.querySelector(".close-btn");
  closeButton.addEventListener("click", closeModal);

  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  return modal;
}

function getCatalogueModalContent() {
  return `
    <div class="modal-header">
      <h2 class="modal-heading">Let us email the entire catalogue to you</h2>
    </div>

    <div class="modal-body">
      <form class="catalogue-form" id="catalogueForm">
        <div class="modal-field">
          <label for="emailInput">Your Email:</label>
          <input type="email" id="emailInput" class="modal-input" placeholder="example@email.com" required />
        </div>

        <div class="modal-field">
          <label for="contactInput">Your Contact: (Optional)</label>
          <input type="tel" id="contactInput" class="modal-input" placeholder="+91-0000000000" />
        </div>
      </form>
    </div>

    <div class="modal-footer">
      <button type="submit" form="catalogueForm" class="modal-submit">Download Brochure</button>
    </div>
  `;
}

function getQuoteModalContent() {
  return `
    <div class="modal-header">
      <h2 class="modal-heading">Request a Call Back</h2>
    </div>

    <div class="modal-body">
      <form class="quote-form" id="quoteForm">
        <div class="modal-field">
          <input type="text" id="nameInput" class="modal-input" placeholder="Full Name" required />
        </div>

        <div class="modal-field">
          <input type="text" id="companyInput" class="modal-input" placeholder="Company Name" required />
        </div>

        <div class="modal-field">
          <input type="email" id="emailInput" class="modal-input" placeholder="Email Address" required />
        </div>

        <div class="modal-field">
          <div class="phone-input-group">
            <span class="phone-prefix">+91</span>
            <input type="tel" id="phoneInput" class="modal-input phone-number-input" placeholder="7003026616" />
          </div>
        </div>

      </form>
    </div>

    <div class="modal-footer">
      <button type="submit" form="quoteForm" class="modal-submit">Submit Form</button>
    </div>

    `;
}

// not required to actually submit anywhere, just simulating form submission here
function handleCatalogueFormSubmit(event) {
  event.preventDefault();

  const form = event.currentTarget;
  const email = form.querySelector("#emailInput").value.trim();
  const contact = form.querySelector("#contactInput").value.trim();

  if (!email) {
    return;
  }

  const modal = form.closest(".modal-overlay");
  if (modal) {
    modal.remove();
    document.body.style.overflow = "";
  }

  console.log("Catalog request submitted:", { email, contact });
  alert("Thanks! We will email the catalogue to " + email + ".");
}

// Specs download button
const specsBtn = document.getElementById("specsBtn");

specsBtn.addEventListener("click", () => {
  const modal = openModal(getCatalogueModalContent());
  const catalogueForm = modal.querySelector("#catalogueForm");
  catalogueForm.addEventListener("submit", handleCatalogueFormSubmit);
});

// Request a call back button
const quoteBtn = document.getElementById("quoteBtn");

quoteBtn.addEventListener("click", () => {
  const modal = openModal(getQuoteModalContent());
  const quoteForm = modal.querySelector("#quoteForm");
  // Not implemented
  //quoteForm.addEventListener("submit", handleQuoteFormSubmit);
});

// FAQ arrow toggle
document.querySelectorAll(".faq-item").forEach(item => {
  const toggle = item.querySelector(".faq-toggle");

  toggle.addEventListener("click", () => {
    item.classList.toggle("active");
  });
});

// Image gallery functionality
const thumbs = document.querySelectorAll(".thumb");
const nextBtn = document.querySelector(".arrow.right");
const prevBtn = document.querySelector(".arrow.left");

let currentIndex = 0;

// convert thumbnails into image array
const images = Array.from(thumbs).map(img => img.src);

// show image
function showImage(index) {
  currentIndex = index;
  mainImg.src = images[currentIndex];
}

// next
nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % images.length;
  showImage(currentIndex);
});

// previous
prevBtn.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  showImage(currentIndex);
});

// thumbnail click
thumbs.forEach((thumb, index) => {
  thumb.addEventListener("click", () => {
    showImage(index);
  });
});

// Applications section horizontal scroll
const container = document.getElementById("cardContainer");
const leftBtn = document.querySelector(".scroll-left");
const rightBtn = document.querySelector(".scroll-right");

const scrollAmount = 300;

rightBtn.addEventListener("click", () => {
  container.scrollBy({
    left: scrollAmount,
    behavior: "smooth"
  });
});

leftBtn.addEventListener("click", () => {
  container.scrollBy({
    left: -scrollAmount,
    behavior: "smooth"
  });
});