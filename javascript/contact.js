const form = document.getElementById("contact-form");
const response = document.getElementById("form-response");

// Geri sayım göstergesi (form altına ekle)
let countdownDisplay = document.getElementById("form-countdown");
if (!countdownDisplay) {
  countdownDisplay = document.createElement("div");
  countdownDisplay.id = "form-countdown";
  form.insertAdjacentElement("afterend", countdownDisplay);
}

// Ana sayfadaki bitiş tarihini localStorage'dan al
const savedEndTime = parseInt(localStorage.getItem("countdownEndDate"), 10);

function updateFormCountdown() {
  const now = new Date().getTime();
  const diff = savedEndTime - now;

  if (isNaN(savedEndTime)) {
    countdownDisplay.textContent = "Sayaç verisi bulunamadı.";
    form.querySelectorAll("input, textarea, button").forEach(el => el.disabled = true);
    return;
  }

  if (diff <= 0) {
    countdownDisplay.textContent = "Form artık aktif! Mesaj gönderebilirsiniz.";
    form.querySelectorAll("input, textarea, button").forEach(el => el.disabled = false);
    return;
  }

  // Geri sayımı formatla
  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / (24 * 3600));
  const hours = Math.floor((totalSeconds % (24 * 3600)) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  countdownDisplay.textContent = `Form ${days}g ${hours}s ${minutes}d ${seconds}s sonra aktif olacak.`;

  // Formu devre dışı bırak
  form.querySelectorAll("input, textarea, button").forEach(el => el.disabled = true);
}

updateFormCountdown();
setInterval(updateFormCountdown, 1000);

// Form gönderme
form.addEventListener("submit", (e) => {
  e.preventDefault();
  response.textContent = "Mesajınız gönderildi! Teşekkürler 😊";
  form.reset();
});
