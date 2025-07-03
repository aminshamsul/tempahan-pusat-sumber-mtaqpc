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
    body: JSON.stringify([Object.values(data)]),
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then(res => res.json())
  .then(() => {
    document.getElementById("output").style.display = "block";
    document.getElementById("output").innerHTML = "<h3>Tempahan diterima. Terima kasih!</h3>";
    document.getElementById("booking-form").reset();
    loadSenaraiTempahan(); // Muat semula data
  })
  .catch(error => {
    document.getElementById("output").style.display = "block";
    document.getElementById("output").innerHTML = "<p>Ralat: " + error.message + "</p>";
  });
});

function loadSenaraiTempahan() {
  fetch("https://v1.nocodeapi.com/aminshamsul/google_sheets/byAZzroxxheeHINn?tabId=Sheet1")
    .then(res => res.json())
    .then(data => {
      const tbody = document.querySelector("#jadual-tempahan tbody");
      tbody.innerHTML = "";
      data.data.slice(1).reverse().forEach(row => {
        const tr = document.createElement("tr");
        row.forEach(item => {
          const td = document.createElement("td");
          td.textContent = item;
          tr.appendChild(td);
        });
        tbody.appendChild(tr);
      });
    });
}

// Auto load senarai bila buka
loadSenaraiTempahan();
