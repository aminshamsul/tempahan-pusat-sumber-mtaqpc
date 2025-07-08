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
  const hour = now.getHours();
  const minute = now.getMinutes().toString().padStart(2, "0");
  const suffix = hour >= 12 ? "PM" : "AM";
  const hour12 = hour % 12 || 12;
  const masaNow = `${hour12}:${minute} ${suffix}`;
  const rekodHantar = `${hariNow}, ${tarikhNow} ${masaNow}`;
  document.getElementById("rekod").value = rekodHantar;
}

document.getElementById("booking-form").addEventListener("submit", function(event) {
  event.preventDefault();

  const masaMula = to12HourFormat(document.getElementById("masaMula").value);
  const masaTamat = to12HourFormat(document.getElementById("masaTamat").value);
  const gabungMasa = masaMula + " - " + masaTamat;

  const data = {
    nama: document.getElementById("nama").value,
    tujuan: document.getElementById("tujuan").value,
    bilik: document.getElementById("bilik").value,
    hari: document.getElementById("hari").value,
    tarikh: document.getElementById("tarikh").value,
    masa: gabungMasa,
    peserta: document.getElementById("peserta").value,
    rekod: document.getElementById("rekod").value
  };

  fetch("https://pocketbase-server-production-ec3b.up.railway.app/api/collections/tempahan/records", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ ...data })
  })
  .then(res => {
    if (!res.ok) throw new Error("Gagal hantar ke PocketBase");
    return res.json();
  })
  .then(response => {
    const output = document.getElementById("output");
    output.style.display = "block";
    output.textContent = "✅ Rekod berjaya dihantar! Sila maklum penggunaan dalam MTAQ [RASMI]";
    const submitBtn = document.getElementById("submitBtn");
    submitBtn.disabled = true;
    submitBtn.textContent = "Rekod Telah Dihantar ✅";
  })
  .catch(error => {
    alert("❌ Ralat semasa menghantar: " + error.message);
  });
});

window.addEventListener("DOMContentLoaded", setRekodMasaNow);
