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

      if (nisnData === nisn) {
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
