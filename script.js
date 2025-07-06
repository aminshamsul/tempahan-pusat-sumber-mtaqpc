function to12HourFormat(time24) {
  const [hour, minute] = time24.split(":");
  const h = +hour;
  const suffix = h >= 12 ? "PM" : "AM";
  const hour12 = h % 12 || 12;
  return `${hour12}:${minute} ${suffix}`;
}

function getHari(nomborHari) {
  const hariList = ["Ahad", "Isnin", "Selasa", "Rabu", "Khamis", "Jumaat", "Sabtu"];
  return hariList[nomborHari];
}

function getTarikhMasaRekod() {
  const sekarang = new Date();
  const hari = getHari(sekarang.getDay());
  const tarikh = sekarang.toLocaleDateString("ms-MY");
  const masa = sekarang.toLocaleTimeString("ms-MY", { hour: '2-digit', minute: '2-digit' });
  return `${hari}, ${tarikh} ${masa}`;
}

document.getElementById("booking-form").addEventListener("submit", function(event) {
  event.preventDefault();

  const masaMula = to12HourFormat(document.getElementById("masaMula").value);
  const masaTamat = to12HourFormat(document.getElementById("masaTamat").value);
  const rekodMasa = getTarikhMasaRekod();

  // Tampilkan nilai dalam input
  document.getElementById("rekodMasa").value = rekodMasa;

  const data = {
    nama: document.getElementById("nama").value,
    tujuan: document.getElementById("tujuan").value,
    bilik: document.getElementById("bilik").value,
    hari: document.getElementById("hari").value,
    tarikh: document.getElementById("tarikh").value,
    masa: masaMula + " - " + masaTamat,
    peserta: document.getElementById("peserta").value,
    rekodMasa: rekodMasa
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
    const output = document.getElementById("output");
    output.style.display = "block";
    output.textContent = "✅ Rekod berjaya dihantar! Sila maklum penggunaan dalam MTAQ [RASMI]";
  })
  .catch(error => {
    alert("❌ Ralat semasa menghantar: " + error.message);
  });
});