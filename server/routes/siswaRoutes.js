const express = require('express')
const router = express.Router()

const {
  loginSiswa
} = require('../controllers/siswaController')

router.post('/login', loginSiswa)

module.exports = router