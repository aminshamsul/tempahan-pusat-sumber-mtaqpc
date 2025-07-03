document.getElementById("booking-form").addEventListener("submit", function(event) {
  event.preventDefault();

  const data = {
    nama: document.getElementById("nama").value,
    tujuan: document.getElementById("tujuan").value,
    bilik: document.getElementById("bilik").value,
    hari: document.getElementById("hari").value,
    tarikh: document.getElementById("tarikh").value,
    masa: document.getElementById("masaMula").value + " - " + document.getElementById("masaTamat").value,
    peserta: document.getElementById("peserta").value
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
    output.textContent = "✅ Tempahan berjaya dihantar!";
  })
  .catch(error => {
    alert("❌ Ralat semasa menghantar: " + error.message);
  });
});
