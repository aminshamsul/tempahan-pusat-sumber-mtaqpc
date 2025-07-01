
document.getElementById("booking-form").addEventListener("submit", function(e) {
  e.preventDefault();
  const nama = this.nama.value;
  const bilik = this.bilik.value;
  const tarikh = this.tarikh.value;
  document.getElementById("output").innerHTML = `<p><strong>${nama}</strong>, tempahan untuk <strong>${bilik}</strong> pada <strong>${tarikh}</strong> telah dihantar.</p>`;
  this.reset();
});
