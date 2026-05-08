<template>
  <div class="page">
    <div class="card">

      <!-- Logo -->
      <img
        :src="logo"
        alt="Logo Sekolah"
        class="logo"
      >

      <!-- Judul -->
      <h1 class="title">
        Pengumuman Kelulusan
        <br>
        Tahun Angkatan 2024-2025
      </h1>

      <!-- Form -->
      <div class="form-container">

        <input
          v-model="nisn"
          type="text"
          placeholder="Masukkan NISN Anda"
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
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import logo from '../assets/LogoJisc.png'
import api from '../services/api'

const router = useRouter()

const nisn = ref('')
const password = ref('')

const cekKelulusan = async () => {

  try {

    const response = await api.post('/siswa/login', {
      nisn: nisn.value,
      password: password.value
    })

    const data = response.data.data

    router.push({
      path: '/hasil',
      query: {
        nama: data.nama,
        nisn: data.nisn,
        status: data.status
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
}

.page {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: white;
  padding: 20px;
}

.card {
  width: 100%;
  max-width: 1100px;
  text-align: center;
}

.logo {
  width: 100%;
  max-width: 650px;
  margin: 0 auto 40px;
  display: block;
  padding: 20px;
}

.title {
  margin-bottom: 50px;
  font-size: 4rem;
  font-weight: bold;
  line-height: 1.2;
  color: #111827;
}

.form-container {
  width: 100%;
  max-width: 500px;
  margin: auto;
  display: flex;
  flex-direction: column;
  gap: 18px;
}

input {
  width: 100%;
  padding: 18px 20px;
  font-size: 20px;
  border: none;
  border-radius: 14px;
  outline: none;
  transition: 0.3s ease;
  background: #f4f6f8;
}

input:focus {
  border: 2px solid #3b82f6;
}

button {
  width: 100%;
  padding: 18px 20px;
  border: none;
  border-radius: 14px;
  background: #3b82f6;
  color: white;
  font-size: 20px;
  font-weight: 600;
  cursor: pointer;
  transition: 0.3s ease;
}

button:hover {
  background: #2563eb;
}

/* Responsive */
@media (max-width: 768px) {

  .card {
    padding: 35px 20px;
  }

  .logo {
    max-width: 100%;
    margin-bottom: 30px;
  }

  .title {
    font-size: 2.2rem;
    margin-bottom: 35px;
  }

  input {
    padding: 15px;
    font-size: 16px;
  }

  button {
    padding: 15px;
    font-size: 18px;
  }

}
</style>