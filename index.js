import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import mysql from "mysql2"; 
import authRoutes from "./routes/auth.js";
import { authMiddleware } from "./middleware/authMiddleware.js";
const { calculateTotalScore, isValidScore } = require('./utils/calculations.js');


dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));


const pool = mysql.createPool({
  host: process.env.DB_HOST || "db",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "123456",
  database: process.env.DB_NAME || "university",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
}).promise();

app.use("/api/auth", authRoutes);

app.get("/signup", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "signup.html"));
});

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "signup.html"));
});

app.get("/api/test", (req, res) => {
  res.json({ message: "API is working", timestamp: new Date().toISOString() });
});

app.get("/api/test-db", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT 1 as test");
    res.json({ status: "DB connected", test: rows });
  } catch (err) {
    res.status(500).json({ error: "DB connection failed", details: err.message });
  }
});


app.post("/api/check-scores", authMiddleware, async (req, res) => {
  try {
    const { score1, score2, score3 } = req.body;

    if (
      isNaN(score1) || isNaN(score2) || isNaN(score3) ||
      score1 < 0 || score1 > 100 ||
      score2 < 0 || score2 > 100 ||
      score3 < 0 || score3 > 100
    ) {
      return res.status(400).json({ error: "Scores must be numbers between 0 and 100" });
    }

    const totalScore = parseInt(score1) + parseInt(score2) + parseInt(score3);

    const [rows] = await pool.query(`
      SELECT 
        p.name AS program, 
        u.name AS university, 
        t.free_threshold, 
        t.scholarship_threshold
      FROM programs p
      JOIN tuition t ON p.id = t.program_id
      JOIN universities u ON p.university_id = u.id
    `);

    const matchingPrograms = rows
      .map(program => {
        let admission = "❌ Didn't pass";

        if (totalScore >= program.free_threshold) {
          admission = "✅ Budget";
        }
        if (totalScore >= program.scholarship_threshold) {
          admission = "💰 Scholarship";
        }

        return {
          program: program.program,
          university: program.university,
          free_threshold: program.free_threshold,
          scholarship_threshold: program.scholarship_threshold,
          admission
        };
      })
      .filter(p => p.admission !== "❌ Didn't pass");

    res.json({
      enteredScores: { score1, score2, score3, total: totalScore },
      matchingPrograms
    });

  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: "Database error", details: err.message });
  }
});


app.get("/", authMiddleware, (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/", (req, res) => {
  res.redirect("/login");
});

async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log('✅ Database connected successfully');
    
    const [result] = await connection.query('SELECT COUNT(*) as count FROM programs');
    console.log(` Programs in database: ${result[0].count}`);
    
    connection.release();
  } catch (err) {
    console.error('❌ Database connection failed:', err.message);
  }
}



export default app;

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}