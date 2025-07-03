const endpoint = "https://v1.nocodeapi.com/aminshamsul/google_sheets/byAZzroxxheeHINn?tabId=Sheet1";

document.getElementById("booking-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const data = [
    [
      document.getElementById("nama").value,
      document.getElementById("tujuan").value,
      document.getElementById("bilik").value,
      document.getElementById("hari").value,
      document.getElementById("tarikh").value,
      document.getElementById("masaMula").value,
      document.getElementById("masaTamat").value,
      document.getElementById("peserta").value
    ]
  ];

  fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ data: data })
  })
    .then(res => res.json())
    .then(() => {
      document.getElementById("booking-form").reset();
      document.getElementById("output").innerHTML = "<p><strong>Tempahan anda telah dihantar.</strong></p>";
      fetchData(); // refresh senarai tempahan
    })
    .catch(err => {
      document.getElementById("output").innerHTML = "<p style='color:red'>Ralat semasa menghantar data.</p>";
      console.error(err);
    });
});

function fetchData() {
  fetch(endpoint)
    .then(res => res.json())
    .then(rows => {
      let table = `<table>
        <thead>
          <tr>
            <th>Nama</th>
            <th>Tujuan</th>
            <th>Dewan/Bilik</th>
            <th>Hari</th>
            <th>Tarikh</th>
            <th>Masa Mula</th>
            <th>Masa Tamat</th>
            <th>Peserta</th>
          </tr>
        </thead>
        <tbody>`;

      // skip header (index 0)
      rows.slice(1).reverse().forEach(row => {
        table += `<tr>
          <td>${row[0]}</td>
          <td>${row[1]}</td>
          <td>${row[2]}</td>
          <td>${row[3]}</td>
          <td>${row[4]}</td>
          <td>${row[5]}</td>
          <td>${row[6]}</td>
          <td>${row[7]}</td>
        </tr>`;
      });

      table += `</tbody></table>`;
      document.getElementById("tempahan-list").innerHTML = table;
    })
    .catch(err => {
      console.error("Gagal ambil data:", err);
    });
}

// Papar data semasa mula
fetchData();
