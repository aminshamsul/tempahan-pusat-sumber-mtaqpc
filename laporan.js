
async function loadLaporan() {
  const paparan = document.getElementById("paparan-jadual");
  paparan.innerHTML = "⏳ Memuatkan data...";

  try {
    const res = await fetch("https://pocketbase-server-production-ec3b.up.railway.app/api/collections/tempahan/records?sort=-created");
    const data = await res.json();

    if (!data?.items?.length) {
      paparan.innerHTML = "❌ Tiada rekod ditemui.";
      return;
    }

    let html = `<table><thead><tr>
      <th>Nama</th>
      <th>Tarikh</th>
      <th>Hari</th>
      <th>Masa</th>
      <th>Bilik</th>
      <th>Tujuan</th>
      <th>Peserta</th>
      <th>Dihantar</th>
    </tr></thead><tbody>`;

    data.items.forEach(item => {
      html += `<tr>
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

    html += `</tbody></table>`;
    paparan.innerHTML = html;

  } catch (err) {
    paparan.innerHTML = "❌ Ralat semasa memuatkan data: " + err.message;
  }
}

window.addEventListener("DOMContentLoaded", loadLaporan);