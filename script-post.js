// script-post.js

document.getElementById("booking-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const data = {
    nama: document.getElementById("nama").value,
    tujuan: document.getElementById("tujuan").value,
    bilik: document.getElementById("bilik").value,
    hari: document.getElementById("hari").value,
    tarikh: document.getElementById("tarikh").value,
    masa: document.getElementById("masaMula").value + " - " + document.getElementById("masaTamat").value,
    peserta: document.getElementById("peserta").value,
  };

  fetch("https://v1.nocodeapi.com/aminshamsul/google_sheets/byAZzroxxheeHINn?tabId=Sheet1", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify([data])
  })
    .then(response => {
      if (!response.ok) throw new Error("Gagal hantar data");
      return response.text();
    })
    .then(() => {
      document.getElementById("booking-form").reset();
      document.getElementById("output").style.display = "block";
      document.getElementById("output").innerHTML = "<strong>✅ Tempahan berjaya dihantar.</strong>";
    })
    .catch(error => {
      alert("❌ Ralat semasa menghantar: " + error.message);
    });
});
