// Ganti dengan endpoint NocodeAPI anda
const endpoint = "https://v1.nocodeapi.com/aminshamsul/google_sheets/byAZzroxxheeHINn?tabId=Sheet1";

document.getElementById("booking-form").addEventListener("submit", function (event) {
  event.preventDefault();

  const data = {
    Nama: document.getElementById("nama").value,
    Tujuan: document.getElementById("tujuan").value,
    "Dewan/Bilik": document.getElementById("bilik").value,
    Hari: document.getElementById("hari").value,
    Tarikh: document.getElementById("tarikh").value,
    "Masa Mula": document.getElementById("masaMula").value,
    "Masa Tamat": document.getElementById("masaTamat").value,
    Peserta: document.getElementById("peserta").value
  };

  fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify([Object.values(data)])
  })
    .then(response => response.json())
    .then(result => {
      document.getElementById("booking-form").reset();
      document.getElementById("output").innerHTML = `<h3>Tempahan berjaya dihantar!</h3>`;
    })
    .catch(error => {
      document.getElementById("output").innerHTML = `<p style="color:red;">Ralat: ${error.message}</p>`;
    });
});
