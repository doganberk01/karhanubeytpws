const form = document.getElementById("contact-form");
const response = document.getElementById("form-response");

// Form altındaki geri sayım yazısı
let countdownDisplay = document.getElementById("form-countdown");
if (!countdownDisplay) {
  countdownDisplay = document.createElement("div");
  countdownDisplay.id = "form-countdown";
  form.insertAdjacentElement("afterend", countdownDisplay);
}

// Ana sayfadaki geri sayım bitiş tarihi
const savedEndTime = parseInt(localStorage.getItem("countdown-end-date"), 10);

// Formu ve geri sayımı kontrol eden fonksiyon
function updateFormCountdown() {
  const now = new Date().getTime();
  const diff = savedEndTime - now;

  if (diff <= 0) {
    countdownDisplay.textContent = "Form artık aktif! Mesaj gönderebilirsiniz.";
    form.querySelectorAll("input, textarea, button").forEach(el => el.disabled = false);
    return;
  }

  // Formu devre dışı bırak
  form.querySelectorAll("input, textarea, button").forEach(el => el.disabled = true);

  // Geri sayımı göster
  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / (24 * 3600));
  const hours = Math.floor((totalSeconds % (24 * 3600)) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  countdownDisplay.textContent = `Form ${days}g ${hours}s ${minutes}d ${seconds}s sonra aktif olacak.`;
}

// Sayfa yüklendiğinde hemen çalıştır
updateFormCountdown();
setInterval(updateFormCountdown, 1000);

// Form gönderme
form.addEventListener("submit", (e) => {
  e.preventDefault();
  response.textContent = "Mesajınız gönderildi! Teşekkürler 😊";
  form.reset();
});
