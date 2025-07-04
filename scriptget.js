// script-get.js

document.getElementById("reload").addEventListener("click", function () {
  fetch("https://sheetdb.io/api/v1/lg94mwgyj3sex")
    .then(res => res.json())
    .then(data => {
      const tableBody = document.getElementById("tempahanBody");
      tableBody.innerHTML = "";

      data.forEach(row => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td>${row.nama}</td>
          <td>${row.tujuan}</td>
          <td>${row.bilik}</td>
          <td>${row.hari}</td>
          <td>${row.tarikh}</td>
          <td>${row.masa}</td>
          <td>${row.peserta}</td>
        `;
        tableBody.appendChild(tr);
      });
    })
    .catch(err => {
      alert("Ralat semasa mengambil data: " + err.message);
    });
});
