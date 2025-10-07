import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const dbConfig = {
  host: process.env.NODE_ENV === 'test' ? 'localhost' : (process.env.DB_HOST || 'db'),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || '123456',
  database: process.env.DB_NAME || 'university',
  port: process.env.NODE_ENV === 'test' ? 3307 : (process.env.DB_PORT || 3306),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

console.log(`🔌 Connecting to database: ${dbConfig.database} on ${dbConfig.host}:${dbConfig.port} (NODE_ENV: ${process.env.NODE_ENV})`);

const pool = mysql.createPool(dbConfig);

export default pool;
