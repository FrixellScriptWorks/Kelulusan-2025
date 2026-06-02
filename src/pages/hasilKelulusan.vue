<template>
  <div class="page">

    <div class="content">
    <template v-if="hasSiswa">
      <!-- Logo -->
      <img
        :src="logo"
        alt="Logo Sekolah"
        class="logo"
      >

      <div class="content-box">

      <!-- Header -->
      <!-- <h1 class="cap">
        🎓
      </h1> -->

      <h1 class="title">
        {{ siswa.status == 'Lulus' ? 'Selamat!' : 'Mohon Maaf!' }}
      </h1>
      
        <p class="subtitle" :class="{
        'lulus-bg': studentStatus === 'lulus',
        'tidak-lulus-bg': studentStatus === 'tidak-lulus',
        'administration-halt-bg': studentStatus === 'administration-halt'
      }">
        Anda dinyatakan
        <span
          class="status-text"
          :class="statusColor"
        >
          {{ siswa.status ? siswa.status.toUpperCase() : '---' }}
        </span>,
        <br>
        {{ statusMessage }}
      </p>

      <!-- Foto -->
      <div class="photo-wrapper">
        <img
          :src="fotoSiswa"
          alt="Foto Siswa"
          class="student-photo"
        >
      </div>

      <!-- Data -->
      <h2 class="student-name">
        {{ siswa.nama }}
      </h2>

      <p class="nisn">
        {{ siswa.nisn }}
      </p>

      </div>

      <!-- Button -->
      <div class="button-group">

          <a
          v-if= "siswa.nisn != '0141425374'"
          :href="pdfNilai"
          target="_blank"
          class="btn btn-primary"
        >
          📄 Lihat Nilai
        </a>

        <button
          class="btn btn-secondary"
          :class="{ 'btn-halted': isAdminHalt }"
          @click="$router.back()"
        >
          ← Kembali
        </button>

      </div>
    </template>

    <template v-else>
      <div class="missing-data">
        <h2>Data siswa tidak ditemukan</h2>
        <p>Silakan kembali ke halaman login dan masukkan NISN serta password yang benar.</p>
        <button class="btn btn-secondary" @click="$router.push('/')">← Kembali ke Login</button>
      </div>
    </template>

  </div>

  <footer class="page-footer" role="contentinfo">
    <p class="contact"> <span class="copyright">Jakarta Islamic School Joglo. </span> Hubungi kami: <a href="tel:+628118000362">+62 811-8000-362</a> · Website : <a href="https://www.jiscjoglo.sch.id" target="_blank" rel="noopener">www.jiscjoglo.sch.id</a></p>
    <p class="contact"><a href="https://github.com/frixellscriptworks" target="_blank" rel="noopener">FrixellScriptWorks</a> © Kelulusan 2026. Semua hak dilindungi.</p>
  </footer>

  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import logo from '../assets/LogoJisc.png'
import bgDesktop from '../assets/bg.jpeg'

const route = useRoute()

const siswa = route.query

const hasSiswa = computed(() => {
  return Boolean(siswa && siswa.nisn)
})

const studentStatus = computed(() => {
  if (!siswa.status) return null
  
  const status = siswa.status.toLowerCase().trim()
  
  if (status === 'lulus') {
    return 'lulus'
  } else if (status === 'tidak lulus' || status === '!lulus') {
    return 'tidak-lulus'
  } else if (status === 'administration halt' || status === 'pemberhentian administratif') {
    siswa.status = 'tertahan administratif'
    return 'administration-halt'
  }
  
  // Default fallback
  return 'tidak-lulus'
})

const isAdminHalt = computed(() => studentStatus.value === 'administration-halt')

const fotoSiswa = computed(() => {
  if (isAdminHalt.value) {
    return `${import.meta.env.BASE_URL}foto/admin_halted.jpg`
  }
  return siswa.nisn ? `${import.meta.env.BASE_URL}foto/${siswa.nisn}.jpg` : ''
})

const pdfNilai = computed(() => {
  return siswa.nisn ? `${import.meta.env.BASE_URL}nilai/${siswa.nisn}.pdf` : ''
})

const statusColor = computed(() => {
  switch (studentStatus.value) {
    case 'lulus':
      return 'success'
    case 'administration-halt':
      return 'warning'
    default:
      return 'danger'
  }
})

const statusMessage = computed(() => {
  switch (studentStatus.value) {
    case 'lulus':
      return 'Kelulusan adalah bonus dari prosesmu; tetaplah setia pada semangat bertumbuh.'
    case 'tidak-lulus':
      return 'Tetaplah tegar. Kamu jauh lebih kuat dari sekadar angka di atas kertas.'
    case 'administration-halt':
      return 'Penyelesaian Anda ditunda karena alasan administratif. Silakan hubungi tata usaha.'
    default:
      return 'Status tidak dikenali.'
  }
})
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.page {
  min-height: 100vh;
  background-image: url('../assets/bg.jpeg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 24px 16px;
}

.content {
  width: 100%;
  max-width: 700px;
  text-align: center;
  padding: 40px 20px;
}

/* LOGO */
.logo {
  width: 120%;
  max-width: 500px;
  min-width: 280px;
  margin-bottom: 10px;
  align-self: center;
}

/* TEXT */
.title {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 10px;
  letter-spacing: 1px;
  color: #111;
}

.subtitle {
  font-size: 1.6rem;
  line-height: 1.6;
  color: #222;
  margin-bottom: 10px;
}

.status-text {
  font-weight: 800;
}

.success {
  color: #16a34a;
}

.danger {
  color: #dc2626;
}

/* PHOTO */
.photo-wrapper {
  margin-bottom: 20px;
}

.student-photo {
  width: 220px;
  height: 280px;
  object-fit: cover;
  border-radius: 8px;
}

/* DATA */
.student-name {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 8px;
  color: #111;
}

.nisn {
  font-size: 1.4rem;
  margin-bottom: 20px;
}

/* BUTTON */
.button-group {
  display: flex;
  flex-direction: column;
  gap: 14px;
  align-items: center;
}

.btn {
  border: none;
  width: 320px;
  padding: 16px;
  border-radius: 12px;
  font-size: 1.2rem;
  text-decoration: none;
  cursor: pointer;
  font-weight: 600;
}

.btn-primary {
  background: #3b82f6;
  color: white;
}

.btn-primary:hover {
  background: #2563eb;
}

.btn-secondary {
  background: #f3f4f6;
  color: #111;
}

.btn-halted {
  background: transparent;
  border: 2px solid #f59e0b;
  color: #b45309;
  box-shadow: none;
}

.btn-halted:hover {
  background: rgba(245, 158, 11, 0.08);
}

/* MOBILE */
@media (max-width: 768px) {
  .page {
    background-image: url('../assets/bg2.jpg');
  }

  .logo {
    max-width: 280px;
  }

  .title {
    font-size: 2rem;
  }

  .subtitle {
    font-size: 1.1rem;
  }

  .student-photo {
    width: 170px;
    height: 220px;
  }

  .student-name {
    font-size: 1.4rem;
  }

  .btn {
    width: 100%;
  }
}

.content-box {
  background: transparent;
}

.lulus-bg {
  background: #16a34a;
  color: white;
  width: 100vw;
  margin-left: calc(-50vw + 50%);
  text-align: center;
  padding: 20px 0;
}

.lulus-bg .status-text {
  color: white;
}

.tidak-lulus-bg {
  background: #dc2626;
  color: white;
  width: 100vw;
  margin-left: calc(-50vw + 50%);
  text-align: center;
  padding: 20px 0;
}

.tidak-lulus-bg .status-text {
  color: white;
}

.administration-halt-bg {
  background: #f59e0b;
  color: white;
  width: 100vw;
  margin-left: calc(-50vw + 50%);
  text-align: center;
  padding: 20px 0;
}

.administration-halt-bg .status-text {
  color: white;
}

.warning {
  color: #fbbf24;
}

.page-footer {
  margin-top: 28px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  width: 100%;
  max-width: 700px;
  padding: 18px 0 8px;
  font-size: 0.95rem;
  color: rgba(17,24,39,0.72);
  text-align: center;
}

.page-footer .copyright {
  font-weight: 600;
  color: rgba(17,24,39,0.88);
}

.page-footer .contact {
  font-size: 0.92rem;
  color: rgba(17,24,39,0.64);
}

.page-footer .contact a {
  color: #2563eb;
  text-decoration: none;
  margin: 0 6px;
}

.page-footer .contact a:hover {
  text-decoration: underline;
}
</style>