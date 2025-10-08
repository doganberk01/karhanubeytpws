// =======================
// Sayaç
// =======================

// Başlangıç tarihi ve süre
const startDate = new Date("2025-10-06T09:00:00").getTime();
const durationDays = 180;

// localStorage kontrolü
let endDate = localStorage.getItem("countdownEndDate");
if (!endDate) {
  endDate = startDate + durationDays * 24 * 60 * 60 * 1000;
  localStorage.setItem("countdownEndDate", endDate);
}

const flipUnits = ["days", "hours", "minutes", "seconds"];

function flipUpdate(unit, value) {
  const card = document.getElementById(unit).querySelector(".top");
  card.textContent = value;
}

// Konfeti göster
function showConfetti() {
  const container = document.createElement("div");
  container.style.position = "fixed";
  container.style.top = "0";
  container.style.left = "0";
  container.style.width = "100%";
  container.style.height = "100%";
  container.style.pointerEvents = "none";
  container.style.zIndex = "9999";
  document.body.appendChild(container);

  for (let i = 0; i < 100; i++) {
    const confetti = document.createElement("div");
    confetti.style.position = "absolute";
    confetti.style.width = "8px";
    confetti.style.height = "8px";
    confetti.style.backgroundColor = `hsl(${Math.random()*360},70%,60%)`;
    confetti.style.top = "-10px";
    confetti.style.left = `${Math.random()*100}%`;
    confetti.style.opacity = Math.random()+0.5;
    confetti.style.transform = `rotate(${Math.random()*360}deg)`;
    confetti.style.borderRadius = "50%";
    container.appendChild(confetti);

    const duration = Math.random()*2000+2000;
    confetti.animate([
      { transform: confetti.style.transform + " translateY(0px)" },
      { transform: confetti.style.transform + ` translateY(${window.innerHeight + 50}px)` }
    ], { duration: duration, iterations: 1, easing: "linear", fill: "forwards" });

    setTimeout(()=>confetti.remove(), duration);
  }

  setTimeout(()=>container.remove(), 4000);
}

// Geri Döndüm mesajı
function showReturnMessage() {
  const message = document.createElement("div");
  message.textContent = "Geri Döndüm!";
  message.style.position = "fixed";
  message.style.top = "50%";
  message.style.left = "50%";
  message.style.transform = "translate(-50%, -50%)";
  message.style.fontSize = "60px";
  message.style.fontWeight = "900";
  message.style.color = "#ffeb3b";
  message.style.textShadow = "2px 2px 5px rgba(0,0,0,0.7)";
  message.style.zIndex = "99999";
  message.style.opacity = "0";
  message.style.transition = "opacity 1s ease, transform 1s ease";
  document.body.appendChild(message);

  requestAnimationFrame(() => {
    message.style.opacity = "1";
    message.style.transform = "translate(-50%, -50%) scale(1.1)";
  });

  setTimeout(() => {
    message.style.opacity = "0";
    message.style.transform = "translate(-50%, -50%) scale(1)";
    setTimeout(() => message.remove(), 1000);
  }, 4000);
}

function updateCountdown() {
  const now = new Date().getTime();
  const distance = endDate - now;

  if (distance <= 0) {
    flipUnits.forEach(u => flipUpdate(u, "00"));
    showConfetti();
    showReturnMessage();
    clearInterval(timer);
    return;
  }

  const days = String(Math.floor(distance / (1000*60*60*24))).padStart(2,"0");
  const hours = String(Math.floor((distance / (1000*60*60)) % 24)).padStart(2,"0");
  const minutes = String(Math.floor((distance / (1000*60)) % 60)).padStart(2,"0");
  const seconds = String(Math.floor((distance / 1000) % 60)).padStart(2,"0");

  const timeValues = { days, hours, minutes, seconds };
  flipUnits.forEach(u => flipUpdate(u, timeValues[u]));
}

const timer = setInterval(updateCountdown, 1000);
updateCountdown();

// =======================
// Ana mesaj animasyonu (sessionStorage)
// =======================
window.addEventListener("DOMContentLoaded", () => {
  const welcomeText = document.getElementById("welcome-text");

  const visited = sessionStorage.getItem("visited");
  if (!visited) {
    // Animasyonu tetikle
    setTimeout(() => {
      welcomeText.classList.add("slide-in");
    }, 300);
    sessionStorage.setItem("visited", "true");
  } else {
    // Daha önce geldiyse doğrudan görünür
    welcomeText.style.opacity = "1";
    welcomeText.style.transform = "translateX(0)";
  }
});

