document.getElementById("booking-form").addEventListener("submit", function(event) {
  event.preventDefault();

  const data = {
    nama:       document.getElementById("nama").value,
    tujuan:     document.getElementById("tujuan").value,
    bilik:      document.getElementById("bilik").value,
    tarikh:     document.getElementById("tarikh").value,
    masa:       document.getElementById("masaMula").value + " - " + document.getElementById("masaTamat").value,
    peserta:    document.getElementById("peserta").value
  };

  fetch("https://script.google.com/macros/s/AKfycbw3NBDlG5O_mXAOBnfnPyi7AlUAC1Vh1fZfbaAB5LXFW3N6YdqTaJ6DndaS8sRIPk0Elg/exec", {
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
