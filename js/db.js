//database connection

const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '23019912.Ax',
    database: 'smiltiddb'
});

//test connection

db.connect((err) => {
  if (err) {
    console.log('Error connecting to database' + err.stack);
    return;
  }
  console.log('Connection to database established' + db.threadId);
});

module.exports = db;
