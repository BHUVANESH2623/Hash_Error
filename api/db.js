import mysql from 'mysql';

const db=mysql.createConnection({
    user:'root',
    host:"localhost",
    password:"Bhuvi@123",
    database:"progressapp"
})

export default db;