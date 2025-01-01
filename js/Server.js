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
  database: 'SmilTidDB'
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


// save new customer
app.post('/customers', (req, res) => {
  const { name } = req.body;

  if (!name || name.trim() === '') {
    return res.status(400).json({ error: 'Customer name cannot be empty.' });
  }
  if (name.length < 3) {
    return res.status(400).json({ error: 'Customer name must be at least 3 characters long.' });
  }

  const query = 'INSERT INTO customer (Name) VALUES (?);';

  db.query(query, [name], (err, results) => {
    if (err) {
      console.error('Error saving customer:', err);
      return res.status(500).json({ error: 'Database query error' });
    }
    res.status(200).json({ message: 'Customer saved successfully', customerId: results.insertId });
  });
});

// save new task
app.post('/tasks', (req, res) => {
  const { customerId, name } = req.body;

  if (!customerId || !name || name.trim() === '') {
    return res.status(400).json({ error: 'Customer ID and task name are required.' });
  }

  const query = 'INSERT INTO task (customerID, Name) VALUES (?, ?);';

  db.query(query, [customerId, name], (err, results) => {
    if (err) {
      console.error('Error saving task:', err);
      return res.status(500).json({ error: 'Database query error' });
    }
    res.status(200).json({ message: 'Task saved successfully', taskId: results.insertId });
  });
});


//delete task
app.delete('/tasks/:taskId', (req, res) => {
  const taskId = req.params.taskId;
 console.log(req.params);
  if (!taskId) {
    return res.status(400).json({ error: 'Task ID is required.' });
  }

  // Delete related data first
  const deleteRelatedDataQuery = 'DELETE FROM time_registration WHERE taskID = ?';
  db.query(deleteRelatedDataQuery, [taskId], (err, results) => {
    if (err) {
      console.error('Error deleting related data:', err);
      return res.status(500).json({ error: 'Database query error' });
    }

    // Delete the task
    const deleteTaskQuery = 'DELETE FROM task WHERE taskID = ?';
    db.query(deleteTaskQuery, [taskId], (err, results) => {
      if (err) {
        console.error('Error deleting task:', err);
        return res.status(500).json({ error: 'Database query error' });
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ error: 'Task not found' });
      }
      res.status(200).json({ message: 'Task and related data deleted successfully' });
    });
  });
});






















//show customer data on index page
/*
app.get('/customers', (req, res) => {
  const query = 'SELECT customerID, Name FROM customer';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.status(200).json(results);
  });
});*/

//get task data to jobsite
app.get('/tasks', (req, res) => {
  const customerName = req.query.customer;
  if (!customerName) {
    return res.status(400).json({ error: 'Customer name is required.' });
  }

  const query = `
    SELECT t.name, t.taskID
    FROM task t
    JOIN customer c ON t.customerID = c.customerID
    WHERE c.Name = ?;
  `;

  db.query(query, [customerName], (err, results) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.status(200).json(results);
  });
});

app.get('/taskDetails', (req, res) => {
  const taskId = req.query.taskId;
  if (!taskId) {
    return res.status(400).json({ error: 'Task ID is required.' });
  }

  const query = `
    SELECT comment, timeFrom AS startTime, timeTo AS endTime
    FROM time_registration
    WHERE taskID = ?;
  `;

  db.query(query, [taskId], (err, results) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'Task not found or no time registered.' });
    }
    res.status(200).json(results[0]); // Return the first (and likely only) result
  });
});

app.get('/timeRegistrations/:taskId', (req, res) => {
  const taskId = req.params.taskId;
  const query = `
    SELECT comment, timeFrom, timeTo
    FROM time_registration
    WHERE taskID = ?;
  `;
  db.query(query, [taskId], (err, results) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).json({ error: 'Database query error' });
    }
    res.status(200).json(results);
  });
});
