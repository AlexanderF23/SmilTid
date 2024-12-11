//get data from the server test

const connection = require('./db.js');

connection.query('SELECT * FROM Customers', (err, rows) => {
  if (err) {
    console.error(err);
    return;
  }

  console.log('kundeliste:');
  rows.forEach((row) => {
    console.log(`ID: ${row.CustomerID}, Navn: ${row.Name}`);
  });

  connection.end();
});
