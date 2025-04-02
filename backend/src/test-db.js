const mysql = require('mysql');

const db = mysql.createConnection({
    host: "localhost", // Change this if your MySQL server is on a different host
    user: "root", // Update with your MySQL username
    password: "", // Update with your MySQL password
    database: "ma_system",
    port: 3306 // Change this if your MySQL server is running on a different port
});

db.connect((err) => {
    if (err) {
        console.log("Error connecting to database:", err);
        console.log("Error details:", err.message);
        return;
    }
    console.log("Successfully connected to database");
    
    // Test query to verify database exists
    db.query('SHOW TABLES', (err, results) => {
        if (err) {
            console.log("Error running query:", err.message);
            return;
        }
        console.log("Available tables:", results);
        process.exit(0);
    });
});