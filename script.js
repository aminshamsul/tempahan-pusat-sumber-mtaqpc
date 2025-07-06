function to12HourFormat(time24) {
  const [hour, minute] = time24.split(":"), h = +hour;
  return `${h % 12 || 12}:${minute} ${h >= 12 ? "PM" : "AM"}`;
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
    masa: `${masaMula} - ${masaTamat}`,
    peserta: document.getElementById("peserta").value
  };

  fetch("https://sheetdb.io/api/v1/lg94mwgyj3sex", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data })
  })
  .then(res => res.json())
  .then(response => {
    if (response.created) {
      document.getElementById("booking-form").reset();
      const output = document.getElementById("output");
      output.style.display = "block";
      output.textContent = "✅ Rekod berjaya dihantar!";
      loadTable(); // refresh jadual
    } else {
      alert("⚠️ Gagal hantar. Sila cuba lagi.");
    }
  })
  .catch(error => alert("❌ Ralat semasa menghantar: " + error.message));
});

function loadTable() {
  fetch("https://sheetdb.io/api/v1/lg94mwgyj3sex")
    .then(res => res.json())
    .then(data => {
      const tbody = document.querySelector("#jadualTempahan tbody");
      tbody.innerHTML = "";
      data.forEach(item => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${item.nama}</td>
          <td>${item.tujuan}</td>
          <td>${item.bilik}</td>
          <td>${item.hari}</td>
          <td>${item.tarikh}</td>
          <td>${item.masa}</td>
          <td>${item.peserta}</td>`;
        tbody.appendChild(row);
      });

      if (!$.fn.DataTable.isDataTable("#jadualTempahan")) {
        $('#jadualTempahan').DataTable();
      } else {
        $('#jadualTempahan').DataTable().clear().rows.add($('#jadualTempahan tbody tr')).draw();
      }
    });
}

loadTable();