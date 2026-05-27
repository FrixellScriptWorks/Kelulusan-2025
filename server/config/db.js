const mysql = require('mysql2')

// koneksi awal tanpa database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234'
})

db.connect((err) => {
  if (err) {
    console.log('Database gagal terhubung')
    console.log(err)
    return
  }

  console.log('MySQL berhasil terhubung')

 // database
  db.query(
    `CREATE DATABASE IF NOT EXISTS kelulusan`,
    (err) => {
      if (err) {
        console.log(err)
        return
      }

      console.log('Database kelulusan siap')

      // gunakan database
      db.query(`USE kelulusan`, (err) => {
        if (err) {
          console.log(err)
          return
        }

        // buat tabel siswa
        const siswaTable = `
          CREATE TABLE IF NOT EXISTS siswa (
            id INT AUTO_INCREMENT PRIMARY KEY,
            nisn VARCHAR(20) UNIQUE,
            nama VARCHAR(150),
            status VARCHAR(20),
            password VARCHAR(100)
          )
        `

        db.query(siswaTable, (err) => {
          if (err) {
            console.log(err)
            return
          }

          console.log('Tabel siswa siap')
        })
      })
    }
  )
})

module.exports = db