const galleryGrid = document.getElementById("gallery-grid");
const images = ["resim1.jpg", "resim2.jpg", "resim3.jpg",];
let currentIndex = 0;

// Galeri resimlerini ekle
images.forEach((src, index) => {
  const img = document.createElement("img");
  img.src = `../images/gallery/${src}`;  // <--- doğru path
  img.alt = `Galeri resmi ${index+1}`;
  img.addEventListener("click", () => openLightbox(index));
  galleryGrid.appendChild(img);
});

// Lightbox elementleri
const lightboxOverlay = document.getElementById("lightbox-overlay");
const lightboxImage = document.getElementById("lightbox-image");
const closeBtn = document.querySelector(".lightbox-close");
const prevBtn = document.querySelector(".lightbox-prev");
const nextBtn = document.querySelector(".lightbox-next");

function openLightbox(index) {
  currentIndex = index;
  lightboxImage.src = `../images/gallery/${images[currentIndex]}`;
  lightboxOverlay.classList.remove("hidden");
}

function closeLightbox() {
  lightboxOverlay.classList.add("hidden");
}

function showPrev() {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  lightboxImage.src = `../images/gallery/${images[currentIndex]}`;
}

function showNext() {
  currentIndex = (currentIndex + 1) % images.length;
  lightboxImage.src = `../images/gallery/${images[currentIndex]}`;
}

// Event listenerlar
closeBtn.addEventListener("click", closeLightbox);
prevBtn.addEventListener("click", showPrev);
nextBtn.addEventListener("click", showNext);

// Klavye kontrolleri
document.addEventListener("keydown", (e) => {
  if(lightboxOverlay.classList.contains("hidden")) return;
  if(e.key === "Escape") closeLightbox();
  if(e.key === "ArrowLeft") showPrev();
  if(e.key === "ArrowRight") showNext();
});
