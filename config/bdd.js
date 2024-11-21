const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'Meii',
    password: 'abc123',
    database: 'todolist'
})

connection.connect((err) => {
    if (err) throw err;
    console.log('BDD OK');
})

module.exports = connection;