<!DOCTYPE html>
<html lang="ms">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Tempahan Pusat Sumber MTAQPC</title>
  <link rel="stylesheet" href="style.css" />
</head>
<body>
  <header>
    <img src="logo-mtaqpc.png" alt="Logo MTAQPC" class="logo" />
    <h1>Tempahan Pusat Sumber MTAQPC</h1>
  </header>

  <main>
    <form id="booking-form">
      <label for="nama">Nama:</label>
      <input type="text" id="nama" name="nama" required />

      <label for="tujuan">Tujuan:</label>
      <input type="text" id="tujuan" name="tujuan" required />

      <label for="bilik">Pilih Bilik/Dewan:</label>
      <select id="bilik" name="bilik" required>
        <option value="" disabled selected>-- Sila Pilih --</option>
        <option value="Dewan Tok Guru">Dewan Tok Guru</option>
        <option value="Dewan As-Syatibiy">Dewan As-Syatibiy</option>
        <option value="Bilik Seminar">Bilik Seminar</option>
        <option value="Bilik ICT">Bilik ICT</option>
        <option value="Maktabah">Maktabah</option>
      </select>

      <label for="tarikh">Tarikh Tempahan:</label>
      <input type="date" id="tarikh" name="tarikh" required />

      <label for="masaMula">Masa Mula:</label>
      <input type="time" id="masaMula" name="masaMula" required />

      <label for="masaTamat">Masa Tamat:</label>
      <input type="time" id="masaTamat" name="masaTamat" required />

      <label for="peserta">Bilangan Peserta / Senarai Peserta:</label>
      <textarea id="peserta" name="peserta" rows="3" placeholder="Contoh: 30 orang / Senarai nama..." required></textarea>

      <button type="submit">Hantar Tempahan</button>
    </form>

    <div id="output" style="display: none;"></div>
  </main>

  <footer>
    <p>&copy; 2025 Amin Shamsul. Hak cipta terpelihara.</p>
  </footer>

  <!-- Skrip JavaScript terus di bawah -->
  <script>
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

      // Untuk debugging di console
      console.log("Data dihantar:", data);

      fetch("https://script.google.com/macros/s/AKfycbydTbB7AywwrNTGi55j9wIVRVsC6_BtjM9HayZJXxl9RJzkvfCsZILyGcd1jibDrVwj/exec", {
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
        console.error("Ralat fetch:", error);
      });
    });
  </script>
</body>
</html>
