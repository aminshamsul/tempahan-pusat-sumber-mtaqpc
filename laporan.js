async function loadLaporan() {
  const jadual = document.getElementById("jadual-laporan");
  const tarikhCetak = document.getElementById("tarikh-cetak");

  try {
    const res = await fetch("https://pocketbase-server-production-ec3b.up.railway.app/api/collections/tempahan/records?sort=-created");
    const data = await res.json();

    if (!data?.items?.length) {
      jadual.innerHTML = "<p>❌ Tiada data tempahan dijumpai.</p>";
      return;
    }

    // Tarikh & masa cetakan (AM/PM)
    const now = new Date();
    const tarikh = now.toLocaleDateString('ms-MY');
    const masa = now.toLocaleTimeString('en-US', {
      hour: '2-digit', minute: '2-digit', hour12: true
    });
    tarikhCetak.innerHTML = `Cetakan pada: ${tarikh}, ${masa}`;

    // Bina jadual
    let html = "<table><thead><tr>" +
      "<th>Bil</th>" +
      "<th>Nama</th>" +
      "<th>Tarikh</th>" +
      "<th>Hari</th>" +
      "<th>Masa</th>" +
      "<th>Bilik</th>" +
      "<th>Tujuan</th>" +
      "<th>Peserta</th>" +
      "<th>Rekod</th>" +
      "</tr></thead><tbody>";

    data.items.forEach((item, index) => {
      html += `<tr>
        <td>${index + 1}</td>
        <td>${item.nama}</td>
        <td>${item.tarikh}</td>
        <td>${item.hari}</td>
        <td>${item.masa}</td>
        <td>${item.bilik}</td>
        <td>${item.tujuan}</td>
        <td>${item.peserta}</td>
        <td>${item.rekod}</td>
      </tr>`;
    });

    html += "</tbody></table>";
    jadual.innerHTML = html;

  } catch (err) {
    jadual.innerHTML = "<p>❌ Ralat memuatkan data: " + err.message + "</p>";
  }
}

window.addEventListener("DOMContentLoaded", () => {
  loadLaporan();
  document.getElementById("btn-cetak").addEventListener("click", () => {
    window.print();
  });
});
