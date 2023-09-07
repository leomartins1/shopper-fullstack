const mysql = require('mysql2/promise')

const pool = mysql.createPool({
  host: 'localhost',
  port: '3306',
  user: 'admin',
  password: 'my-secret-password',
  database: 'my-database',
});


module.exports = { pool };
