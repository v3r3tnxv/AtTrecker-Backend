// server/db.js

const { Pool } = require('pg');

// Настройка подключения к базе данных PostgreSQL
const pool = new Pool({
  user: 'postgres', // Ваше имя пользователя PostgreSQL
  host: 'localhost',    // Хост базы данных
  database: 'attrecker', // Имя базы данных
  password: '54540', // Пароль к базе данных
  port: 5432,           // Порт PostgreSQL (обычно 5432)
});

module.exports = pool;