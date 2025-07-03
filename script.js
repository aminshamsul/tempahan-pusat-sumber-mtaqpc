const endpoint = "https://v1.nocodeapi.com/aminshamsul/google_sheets/byAZzroxxheeHINn?tabId=Sheet1";

// Hantar data borang
document.getElementById("booking-form").addEventListener("submit", function(event) {
  event.preventDefault();

  const data = {
    Nama: document.getElementById("nama").value,
    Tujuan: document.getElementById("tujuan").value,
    "Dewan/Bilik": document.getElementById("bilik").value,
    Hari: document.getElementById("hari").value,
    Tarikh: document.getElementById("tarikh").value,
    "Masa Mula": document.getElementById("masaMula").value,
    "Masa Tamat": document.getElementById("masaTamat").value,
    Peserta: document.getElementById("peserta").value,
  };

  fetch(endpoint, {
    method: "POST",
    body: JSON.stringify([Object.values(data)]),
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then(res => res.json())
  .then(() => {
    document.getElementById("booking-form").reset();
    document.getElementById("output").innerHTML = "<h3>Tempahan berjaya dihantar!</h3>";
    loadCalendar(); // Papar semula data
  })
  .catch(err => {
    document.getElementById("output").innerHTML = "<p style='color:red;'>Ralat semasa menghantar.</p>";
    console.error(err);
  });
});

// Papar event dalam kalendar
function loadCalendar() {
  fetch(endpoint)
    .then(res => res.json())
    .then(rows => {
      const events = rows.data.slice(1).map(row => {
        const [Nama, Tujuan, Bilik, Hari, Tarikh, MasaMula, MasaTamat, Peserta] = row;
        return {
          title: `${Tujuan} (${Bilik})`,
          start: `${Tarikh}T${MasaMula}`,
          end: `${Tarikh}T${MasaTamat}`,
          extendedProps: { Nama, Peserta }
        };
      });

      const calendarEl = document.getElementById("calendar");
      calendarEl.innerHTML = ""; // Kosongkan dahulu

      const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: "dayGridMonth",
        height: 500,
        events: events,
        eventClick: function(info) {
          alert(
            `Tempahan oleh: ${info.event.extendedProps.Nama}\n` +
            `Tujuan: ${info.event.title}\n` +
            `Peserta: ${info.event.extendedProps.Peserta}`
          );
        }
      });

      calendar.render();
    })
    .catch(err => console.error("Gagal papar kalendar:", err));
}

document.addEventListener("DOMContentLoaded", loadCalendar);
