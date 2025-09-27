import fs from "fs";
import mysql from "mysql2/promise";
import dotenv from "dotenv";
import path from "path";
dotenv.config();

const sql = fs.readFileSync(path.join(process.cwd(), "db", "schema.sql"), "utf8");

async function run() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || "db",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASS || "123456",
    database: process.env.DB_NAME || 'university',
    multipleStatements: true
  });

  try {
    await connection.query(sql);
    console.log("Schema executed successfully");
  } catch (err) {
    console.error("Error executing schema:", err);
  } finally {
    await connection.end();
  }
}

run();


//node scripts/run-schema.js