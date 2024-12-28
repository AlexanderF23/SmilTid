const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
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

// Fetch customers
app.get('/customers', (req, res) => {
  const query = 'SELECT customerID, Name FROM customer';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.status(200).json(results);
  });
});

// Fetch tasks for a customer
app.get('/customers/:customerID/task', (req, res) => {
  const customerID = req.params.customerID;
  const query = `
    SELECT taskID, Name
    FROM task
    WHERE customerID = ?;
  `;
  db.query(query, [customerID], (err, results) => {
    if (err) {
      console.error('Error fetching task:', err);
      return res.status(500).json({ error: 'Database query error' });
    }
    res.status(200).json(results);
  });
});

// Save data
app.post('/save', (req, res) => {
  const { customerId, taskId, date, timeFrom, timeTo, comment } = req.body;
  const query = `
    INSERT INTO time_registration (customerID, taskID, date, timeFrom, timeTo, comment)
    VALUES (?, ?, ?, ?, ?, ?);
  `;
  db.query(query, [customerId, taskId, date, timeFrom, timeTo, comment], (err, results) => {
    if (err) {
      console.error('Error saving data:', err);
      return res.status(500).json({ error: 'Database query error' });
    }
    res.status(200).json({ message: 'Data saved successfully' });
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
