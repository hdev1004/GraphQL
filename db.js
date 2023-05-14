
import mysql from "mysql";

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'tester',
    password: 'tester',
    database: 'test_database'
  });

connection.connect((err) => {
    if(err) {
        console.log("Error Connecting to database : ", err);
        return;
    } 
    console.log("Database connected successfully !");
})

export default connection;