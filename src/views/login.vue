<template>
  <div class="page">

    <div class="card">

      <!-- LEFT -->
      <div class="left-side">

        <img
          :src="logo"
          alt="Logo Sekolah"
          class="logo"
        >

        <h1 class="title">
          Pengumuman Kelulusan
          <br>
          Tahun Angkatan 2025-2026
        </h1>

        <p class="description">
          Silakan masuk menggunakan
          NISN dan password untuk
          melihat hasil kelulusan.
        </p>

      </div>

      <!-- RIGHT -->
      <div class="right-side">

        <div class="form-container">

  <h2 class="form-title">
    Selamat Datang!
  </h2>

  <p class="form-subtitle">
    Silakan masuk untuk melanjutkan
  </p>

  <input
    v-model="nisn"
    type="text"
    placeholder="Masukkan NISN"
  >

  <input
    v-model="password"
    type="password"
    placeholder="Masukkan Password"
  >

  <button @click="cekKelulusan">
    Cek Kelulusan
  </button>

</div>



      </div>

    </div>

    <footer class="page-footer" role="contentinfo">
    <p class="contact"> <span class="copyright">Jakarta Islamic School Joglo. </span> Hubungi kami: <a href="tel:+628118000362">+62 811-8000-362</a> · Website : <a href="https://www.jiscjoglo.sch.id" target="_blank" rel="noopener">www.jiscjoglo.sch.id</a></p>
    <p class="contact"><a href="https://github.com/frixellscriptworks" target="_blank" rel="noopener">FrixellScriptWorks</a> © Kelulusan 2026. Semua hak dilindungi.</p>
  </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import logo from '../assets/LogoJisc.png'

const router = useRouter()

const KEY = 'kelulusan'
const nisn = ref('')
const password = ref('')

const decodeString = (payload) => {
  const decoded = atob(payload)
  return Array.from(decoded)
    .map((char, index) => {
      const code = char.charCodeAt(0)
      const keyCode = KEY.charCodeAt(index % KEY.length)
      return String.fromCharCode(code ^ keyCode)
    })
    .join('')
}

const decodeSiswaList = (rawList) => {
  return rawList.map(item => ({
    nisn: decodeString(item.nisn),
    password: decodeString(item.password),
    nama: decodeString(item.nama),
    status: decodeString(item.status)
  }))
}

const cekKelulusan = async () => {
  try {
    const response = await fetch(`${import.meta.env.BASE_URL}siswa.json`)
    const rawList = await response.json()
    const siswaList = decodeSiswaList(rawList)

    const siswa = siswaList.find(item => item.nisn === nisn.value.trim() && item.password === password.value)

    if (!siswa) {
      throw new Error('NISN atau password salah')
    }

    router.push({
      path: '/hasil',
      query: {
        nama: siswa.nama,
        nisn: siswa.nisn,
        status: siswa.status
      }
    })
  } catch (error) {
    alert('NISN atau password salah')
  }
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Inter', sans-serif;
}

.page {
  width: 100%;
  min-height: 100vh;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  padding: 40px 24px;

  overflow: hidden;

  /* BACKGROUND IMAGE */
  background-image: url('../assets/bg.jpeg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

/* MAIN CONTAINER */
.card {
  width: 100%;
  max-width: 1250px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  gap: 70px;
}

/* LEFT SIDE */
.left-side {
  width: 52%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

/* LOGO */
.logo {
  width: 120%;
  width: clamp(340px, 45vw, 760px);

  object-fit: contain;

  margin-bottom: 35px;

  filter:
    drop-shadow(0 10px 20px rgba(0,0,0,0.08));
}

/* TITLE */
.title {
  font-size: 40px;
  font-weight: 800;

  line-height: 1.3;

  text-align: center;

  color: #0f172a;

  margin-bottom: 18px;

  text-shadow:
    0 2px 8px rgba(255,255,255,0.3);
}

/* DESCRIPTION */
.description {
  max-width: 480px;

  text-align: center;

  font-size: 1.08rem;
  line-height: 1.8;

  color: #334155;
}

/* RIGHT SIDE */
.right-side {
  width: 100%;
  max-width: 460px;
  margin-top: 45px;

  position: relative;

  background: rgba(255,255,255,0.92);

  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);

  border-radius: 34px;

  padding:
    90px
    40px
    45px;

  box-shadow:
    0 20px 45px rgba(15,23,42,0.08);

  border:
    1px solid rgba(255,255,255,0.95);
}

/* ICON CIRCLE */
.right-side::before {
  content: '🔒';

  position: absolute;

  top: -45px;
  left: 50%;

  transform: translateX(-50%);

  width: 90px;
  height: 90px;
  margin-bottom: 10px;

  border-radius: 50%;

  background:
    linear-gradient(
      135deg,
      #dbeafe,
      #eff6ff
    );

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 38px;

  box-shadow:
    0 10px 25px rgba(59,130,246,0.12);
}

/* FORM */
.form-container {
  width: 100%;
}

/* TITLE */
.form-title {
  font-size: 2.5rem;
  font-weight: 800;

  color: #0f172a;

  text-align: center;

  margin-bottom: 10px;
  margin-top: 1px;
  padding-top: 2px;
}

/* SUBTITLE */
.form-subtitle {
  text-align: center;

  color: #64748b;

  font-size: 1rem;

  margin-bottom: 38px;

  line-height: 1.7;
}

/* INPUT */
input {
  width: 100%;

  height: 58px;

  padding: 0 18px;

  margin-bottom: 18px;

  border-radius: 14px;

  border: 1px solid #dbe3f0;

  background: white;

  font-size: 15px;

  color: #0f172a;

  outline: none;

  transition: all 0.25s ease;
}

input::placeholder {
  color: #94a3b8;
}

input:focus {
  border-color: #3b82f6;

  box-shadow:
    0 0 0 4px rgba(59,130,246,0.10);
}

/* BUTTON */
button {
  width: 100%;

  height: 58px;

  border: none;
  border-radius: 14px;

  background:
    linear-gradient(
      135deg,
      #3b82f6,
      #2563eb
    );

  color: white;

  font-size: 16px;
  font-weight: 700;

  cursor: pointer;

  transition: all 0.25s ease;

  margin-top: 8px;
}

button:hover {
  transform: translateY(-2px);

  box-shadow:
    0 12px 24px rgba(37,99,235,0.22);
}

.page-footer {
  margin-top: 28px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  width: 100%;
  max-width: 1250px;
  padding: 18px 0 8px;
  font-size: 0.95rem;
  color: rgba(15,23,42,0.72);
  text-align: center;
}

.page-footer .copyright {
  font-weight: 600;
  color: rgba(15,23,42,0.88);
}

.page-footer .contact {
  font-size: 0.92rem;
  color: rgba(15,23,42,0.64);
}

.page-footer .contact a {
  color: #2563eb;
  text-decoration: none;
  margin: 0 6px;
}

.page-footer .contact a:hover {
  text-decoration: underline;
}

button:active {
  transform: scale(0.98);
}

/* TABLET */
@media (max-width: 1100px) {

  .card {
    gap: 40px;
  }

  .title {
    font-size: 2.4rem;
  }

  .logo {
    max-width: 420px;
  }

}

/* MOBILE */
@media (max-width: 900px) {

  .page {
    padding: 25px 18px;
  }

  .card {
    flex-direction: column;

    gap: 28px;
  }

  .left-side {
    width: 100%;
  }

  .right-side {
    width: 100%;
    max-width: 470px;
  }

  .logo {
    max-width: 320px;

    margin-bottom: 24px;
  }

  .title {
    font-size: 2rem;

    margin-bottom: 14px;
  }

  .description {
    font-size: 1rem;

    max-width: 90%;
  }

}

/* SMALL MOBILE */
@media (max-width: 600px) {

  .page {
    padding: 16px;
  }

  .card {
    gap: 22px;
  }

  .right-side {
    padding: 35px 22px;

    border-radius: 24px;
  }

  .logo {
    max-width: 260px;

    margin-bottom: 18px;
  }

  .title {
    font-size: 1.45rem;

    line-height: 1.5;
  }

  .description {
    font-size: 0.95rem;

    line-height: 1.7;
  }

  .form-title {
    font-size: 1.7rem;
  }

  .form-subtitle {
    font-size: 0.92rem;

    margin-bottom: 28px;
  }

  input {
    padding: 15px;

    font-size: 14px;

    border-radius: 14px;
  }

  button {
    padding: 15px;

    font-size: 15px;

    border-radius: 14px;
  }

}
</style>