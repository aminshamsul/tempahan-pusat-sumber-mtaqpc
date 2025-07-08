async function loadLaporan() {
  const elemen = document.getElementById("jadual-laporan");
  elemen.innerHTML = "⏳ Memuatkan data...";

  try {
    const res = await fetch("https://pocketbase-server-production-ec3b.up.railway.app/api/collections/tempahan/records?sort=-created");
    const data = await res.json();

    if (!data?.items?.length) {
      elemen.innerHTML = "❌ Tiada rekod ditemui.";
      return;
    }

    let jadualHTML = `
      <div class="jadual-scroll">
        <table class="jadual">
          <thead>
            <tr>
              <th>Nama</th>
              <th>Tujuan</th>
              <th>Dewan/Bilik</th>
              <th>Hari</th>
              <th>Tarikh</th>
              <th>Masa</th>
              <th>Peserta</th>
              <th>Hantar Rekod</th>
            </tr>
          </thead>
          <tbody>
    `;

    data.items.forEach(item => {
      jadualHTML += `
        <tr>
          <td>${item.nama}</td>
          <td>${item.tujuan}</td>
          <td>${item.bilik}</td>
          <td>${item.hari}</td>
          <td>${item.tarikh}</td>
          <td>${item.masa}</td>
          <td>${item.peserta}</td>
          <td>${item.rekod}</td>
        </tr>
      `;
    });

    jadualHTML += `
          </tbody>
        </table>
      </div>
    `;

    elemen.innerHTML = jadualHTML;

  } catch (err) {
    elemen.innerHTML = "❌ Ralat semasa memuatkan: " + err.message;
  }
}

window.addEventListener("DOMContentLoaded", loadLaporan);