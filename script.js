// Waktu target (UTC+7 -> WIB)
const bukaTanggal = new Date("2025-05-30T15:00:00Z"); // 08.00 WIB == 01.00 UTC

const now = new Date();
const aksesTertutup = document.getElementById('akses-tertutup');
const kontenUtama = document.getElementById('main-content'); // pastikan bagian utama kamu dibungkus

// Sembunyikan isi utama saat belum waktunya
if (now < bukaTanggal) {
  if (kontenUtama) kontenUtama.style.display = "none";
  aksesTertutup.style.display = "block";

  // Jalankan countdown
  const countdownEl = document.getElementById("countdown");

  const countdownInterval = setInterval(() => {
    const now = new Date();
    const selisih = bukaTanggal - now;

    if (selisih <= 0) {
      clearInterval(countdownInterval);
      aksesTertutup.style.display = "none";
      if (kontenUtama) kontenUtama.style.display = "block";
      return;
    }

    const hari = Math.floor(selisih / (1000 * 60 * 60 * 24));
    const jam = Math.floor((selisih / (1000 * 60 * 60)) % 24);
    const menit = Math.floor((selisih / (1000 * 60)) % 60);
    const detik = Math.floor((selisih / 1000) % 60);

    countdownEl.textContent = `${hari} hari ${jam} jam ${menit} menit ${detik} detik`;
  }, 1000);
} else {
  aksesTertutup.style.display = "none";
  if (kontenUtama) kontenUtama.style.display = "block";
}
document.getElementById('result').style.display = 'none';
document
  .getElementById('form-nisn')
  .addEventListener('submit', async function (e) {
    // Sembunyikan hasil saat halaman pertama kali dimuat
    e.preventDefault();
    const nisn = document.getElementById('nisn-input').value.trim();
    const response = await fetch('data/siswa.csv');
    const data = await response.text();

    const rows = data.split('\n').slice(1);
    let found = false;

    for (const row of rows) {
      const [nisnData, nama, status] = row.split(';');

      if (nisnData === nisn.toString()) {
        document.getElementById('foto-siswa').src = `img/${nisn}.jpg`;
        document.getElementById('nama-siswa').textContent = `Nama: ${nama}`;
        document.getElementById('status-kelulusan').textContent = `${status}`;
        document.getElementById('pdf-viewer').src = `pdf/${nisn}.pdf`;
        document.getElementById('download-link').href = `pdf/${nisn}.pdf`;

        // ⬇ Tambahkan pengecekan di sini:
        if (status.trim().toLowerCase() === 'lulus') {
          document.querySelector('.ucapan-selamat').textContent =
            'Selamat! Kamu dinyatakan:';
          document.getElementById('status-kelulusan').style.color = '#2563eb'; // biru
          document.getElementById('status-kelulusan').style.fontSize ='xx-large';
        } else {
          document.querySelector('.ucapan-selamat').textContent =
            'Mohon Maaf. Kamu dinyatakan:';
          document.getElementById('status-kelulusan').style.color = '#dc2626'; // merah
        }
        document.getElementById('result').style.display = 'block';
        found = true;
        break;
      }
    }

    if (!found) {
      alert('NISN tidak ditemukan!');
      document.getElementById('result').style.display = 'none';
    }
  });
