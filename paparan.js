async function loadTempahan() {
  const paparan = document.getElementById("paparan-tempahan");
  paparan.innerHTML = "⏳ Memuatkan data...";

  try {
    const res = await fetch("https://pocketbase-server-production-ec3b.up.railway.app/api/collections/tempahan/records?sort=-created");
    const data = await res.json();

    if (!data?.items?.length) {
      paparan.innerHTML = "❌ Tiada rekod tempahan.";
      return;
    }

    paparan.innerHTML = ""; // kosongkan sebelum paparan

    data.items.forEach(item => {
      const kad = document.createElement("div");
      kad.className = "kad-tempahan";
      kad.innerHTML = `
        <strong>🟩 Nama:</strong> ${item.nama}<br/>
        <strong>📅 Tarikh:</strong> ${item.tarikh} (${item.hari})<br/>
        <strong>🕒 Masa:</strong> ${item.masa}<br/>
        <strong>📍 Bilik:</strong> ${item.bilik}<br/>
        <strong>🎯 Tujuan:</strong> ${item.tujuan}<br/>
        <strong>👥 Peserta:</strong> ${item.peserta}<br/>
        <strong>🕓 Dihantar:</strong> ${item.rekod}
      `;
      paparan.appendChild(kad);
    });

  } catch (err) {
    paparan.innerHTML = "❌ Ralat memuatkan data: " + err.message;
  }
}

window.addEventListener("DOMContentLoaded", loadTempahan);
