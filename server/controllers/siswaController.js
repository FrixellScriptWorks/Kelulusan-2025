const db = require('../config/db')

exports.loginSiswa = (req, res) => {

  const { nisn, password } = req.body

  const sql = `
    SELECT * FROM siswa
    WHERE nisn = ? AND password = ?
  `

  db.query(sql, [nisn, password], (err, results) => {

    if (err) {
      return res.status(500).json({
        success: false,
        message: 'Server error'
      })
    }

    if (results.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'NISN atau password salah'
      })
    }

    res.json({
      success: true,
      data: results[0]
    })

  })

}