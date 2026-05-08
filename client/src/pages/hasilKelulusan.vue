<template>
  <div class="page">

    <div class="content">

      <!-- Logo -->
      <img
        :src="logo"
        alt="Logo Sekolah"
        class="logo"
      >

      <!-- Header -->
      <!-- <h1 class="cap">
        🎓
      </h1> -->

      <h1 class="title">
        Selamat!
      </h1>
      
      <p class="subtitle">
        Anda dinyatakan
        <span
          class="status-text"
          :class="isLulus ? 'success' : 'danger'"
        >
          {{ siswa.status.toUpperCase() }}
        </span>,
        <br>
        Teruslah belajar dan raih masa depan yang gemilang.
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

      <!-- Button -->
      <div class="button-group">

        <a
          :href="pdfNilai"
          target="_blank"
          class="btn btn-primary"
        >
          📄 Lihat Nilai
        </a>

        <button
          class="btn btn-secondary"
          @click="$router.back()"
        >
          ← Kembali
        </button>

      </div>

    </div>

  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import logo from '../assets/LogoJisc.png'
import bgDesktop from '../assets/bg.jpeg'

const route = useRoute()

const siswa = route.query

const fotoSiswa = computed(() => {
  return `/foto/${siswa.nisn}.jpg`
})

const pdfNilai = computed(() => {
  return `/nilai/${siswa.nisn}.pdf`
})

const isLulus = computed(() => {
  return siswa.status === 'Lulus'
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
  justify-content: center;
  align-items: center;
}

.content {
  width: 100%;
  max-width: 700px;
  text-align: center;
  padding: 40px 20px;
}

/* LOGO */
.logo {
  width: 100%;
  max-width: 500px;
  margin-bottom: 10px;
}

/* TEXT */
.title {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 10px;
  color: #111;
}

.subtitle {
  font-size: 1.6rem;
  line-height: 1.6;
  color: #222;
  margin-bottom: 20px;
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
  margin-bottom: 25px;
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
  margin-bottom: 40px;
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

/* MOBILE */
@media (max-width: 768px) {
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
</style>