const express = require('express');
const mysql = require('mysql2');
const cors = require('cors'); // Tilføjet CORS
const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Database forbindelse
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '23019912.Ax',
  database: 'smiltiddb'
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to database');
});

// Hent kunder
app.get('/customers', (req, res) => {
  const query = 'SELECT customerID, Name FROM customer'; // Match kolonnenavne
  db.query(query, (err, results) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.status(200).json(results);
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
