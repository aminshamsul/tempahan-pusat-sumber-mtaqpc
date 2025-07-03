document.getElementById("booking-form").addEventListener("submit", function(event) {
  event.preventDefault();

  const data = {
    nama:       document.getElementById("nama").value,
    tujuan:     document.getElementById("tujuan").value,
    bilik:      document.getElementById("bilik").value,
    hari:       document.getElementById("hari").value,
    tarikh:     document.getElementById("tarikh").value,
    masa:       document.getElementById("masaMula").value + " - " + document.getElementById("masaTamat").value,
    peserta:    document.getElementById("peserta").value
  };

  fetch("https://v1.nocodeapi.com/aminshamsul/google_sheets/byAZzroxxheeHINn?tabId=Sheet1", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then(res => res.text())
  .then(response => {
    document.getElementById("booking-form").style.display = "none";
    document.getElementById("output").style.display = "block";
    document.getElementById("output").innerHTML = "<h2>Tempahan anda telah diterima!</h2><p>Terima kasih.</p>";
  })
  .catch(error => {
    alert("Ralat semasa menghantar: " + error);
  });
});
