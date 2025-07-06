function to12HourFormat(time24) {
  const [hour, minute] = time24.split(":");
  const h = +hour;
  const suffix = h >= 12 ? "PM" : "AM";
  const hour12 = h % 12 || 12;
  return `${hour12}:${minute} ${suffix}`;
}

function getHariMelayu(dateObj) {
  const hariList = ["Ahad", "Isnin", "Selasa", "Rabu", "Khamis", "Jumaat", "Sabtu"];
  return hariList[dateObj.getDay()];
}

function setRekodMasaNow() {
  const now = new Date();
  const hariNow = getHariMelayu(now);
  const tarikhNow = now.toLocaleDateString("ms-MY");
  const masaNow = now.toLocaleTimeString("ms-MY", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
  const rekodHantar = `${hariNow}, ${tarikhNow} ${masaNow}`;
  document.getElementById("rekod").value = rekodHantar;
}

document.getElementById("booking-form").addEventListener("submit", function(event) {
  event.preventDefault();

  const masaMula = to12HourFormat(document.getElementById("masaMula").value);
  const masaTamat = to12HourFormat(document.getElementById("masaTamat").value);

  const data = {
    nama: document.getElementById("nama").value,
    tujuan: document.getElementById("tujuan").value,
    bilik: document.getElementById("bilik").value,
    hari: document.getElementById("hari").value,
    tarikh: document.getElementById("tarikh").value,
    masa: masaMula + " - " + masaTamat,
    peserta: document.getElementById("peserta").value,
    rekod: document.getElementById("rekod").value
  };

  fetch("https://v1.nocodeapi.com/aminshamsul/google_sheets/byAZzroxxheeHINn?tabId=Sheet1", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify([Object.values(data)])
  })
  .then(res => res.json())
  .then(response => {
    document.getElementById("booking-form").reset();
    setRekodMasaNow(); // Reset nilai rekod baru selepas submit
    const output = document.getElementById("output");
    output.style.display = "block";
    output.textContent = "✅ Rekod berjaya dihantar! Sila maklum penggunaan dalam MTAQ [RASMI]";
  })
  .catch(error => {
    alert("❌ Ralat semasa menghantar: " + error.message);
  });
});

window.addEventListener("DOMContentLoaded", setRekodMasaNow);