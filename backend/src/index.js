const express = require("express");
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "ma_system"
})

db.connect((err) => {
    if (err) {
        console.log("Error connecting to database:", err);
        return;
    }
    console.log("Successfully connected to database");
});

app.listen(8082, () => {
    console.log("Server is running on port 8082");
})

// Insert queries
app.post('/ma_system/user', (req, res) => {
    const sql = "INSERT INTO user(`f_Name`,`l_Name`,`profession`,`semester`,`email`,`password`,`about`,`pic`) VALUES (?)";
    const values = [
        req.body.firstName,
        req.body.secondName,
        req.body.profession,
        req.body.semester,
        req.body.email,
        req.body.password,
        "No more details",
        "",
    ]
    db.query(sql, [values], (err, data) => {
        if (err) {
            return res.json("Error");
        }
        return res.json(data);
    })
})

app.post('/ma_system/forgotpassword', (req, res) => {
    const sql = "INSERT INTO forgotpassword(`title`,`content`) VALUES (?)";
    const values = [
        req.body.title,
        req.body.content,
    ]
    db.query(sql, [values], (err, data) => {
        if (err) {
            return res.json("Error");
        }
        return res.json(data);
    })
})

app.post('/ma_system/notice', (req, res) => {
    const sql = "INSERT INTO notice(`title`,`content`) VALUES (?)";
    const values = [
        req.body.title,
        req.body.content,
    ]
    db.query(sql, [values], (err, data) => {
        if (err) {
            return res.json("Error");
        }
        return res.json(data);
    })
})

app.post('/ma_system/comments', (req, res) => {
    const sql = "INSERT INTO comments(`name`,`comment`,`pic`) VALUES (?)";
    const values = [
        req.body.name,
        req.body.comment,
        req.body.pic,
    ]
    db.query(sql, [values], (err, data) => {
        if (err) {
            return res.json("Error");
        }
        return res.json(data);
    })
})

// Select queries
app.post('/user', (req, res) => {
    const { condition, email } = req.body;

    if (condition === "normal") {
        const sql = "SELECT * FROM user WHERE `email`=?";
        db.query(sql, [email], (err, data) => {
            if (err) {
                return res.status(500).json("Error");
            }
            if (data.length > 0) {
                return res.json(data);
            } else {
                return res.json("unavailable");
            }
        })
    }
})

app.post('/forgotPassword', (req, res) => {
    const { condition, email } = req.body;

    if (condition === "check") {
        const sql = "SELECT * FROM forgotPassword WHERE `email`=?";
        db.query(sql, [email], (err, data) => {
            if (err) {
                return res.status(500).json("Error");
            }
            if (data.length > 0) {
                return res.json(data);
            } else {
                return res.json("unavailable");
            }
        });
    }
});

app.post('/notice', (req, res) => {
    const { condition } = req.body;

    if (condition === "all") {
        const sql = 'SELECT * FROM notice';

        db.query(sql, (err, results) => {
            if (err) {
                return res.json("Error");
            }
            res.json(results);
        });
    }
})

app.post('/comments', (req, res) => {
    const { condition } = req.body;

    if (condition === "all") {
        const sql = 'SELECT * FROM comments';

        db.query(sql, (err, results) => {
            if (err) {
                return res.json("Error");
            }
            res.json(results);
        });
    }
})

// Delete queries
app.delete('/notice/:id', (req, res) => {
    const id = req.params.id;

    const sql = "DELETE FROM notice WHERE id = ?";
    db.query(sql, id, (err, data) => {
        if (err) {
            return res.json("Error");
        }
        return res.json("Updates")
    })
});

app.delete('/comments/:id', (req, res) => {
    const id = req.params.id;

    const sql = "DELETE FROM comments WHERE id = ?";
    db.query(sql, id, (err, data) => {
        if (err) {
            return res.json("Error");
        }
        return res.json("Updates")
    })
});

// Update queries
app.put('/notice/:id', (req, res) => {
    const id = req.params.id;
    const { title, content } = req.body;

    const sql = "UPDATE notice SET `title` = ?, `content` = ? WHERE `id` = ?";
    db.query(sql, [title, content, id], (err, data) => {
        if (err) {
            return res.json("Error");
        }
        return res.json("Updates")
    })
});

// Get all subjects
app.get('/api/subjects', (req, res) => {
    const sql = "SELECT subjectId as subjectId, subjectName as subjectName, lecturer as lecturer FROM subjects";
    
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching subjects:', err);
            return res.status(500).json({ message: "Error fetching subjects" });
        }
        res.json(results);
    });
});

// Get specific subject details and enrolled students
app.get('/api/subjects/:subjectId', (req, res) => {
    const { subjectId } = req.params;

    // Query for subject details
    const subjectQuery = `
        SELECT subjectId, subjectName, lecturer
        FROM subjects
        WHERE subjectId = ?
    `;

    // Query for enrolled students
    const studentsQuery = `
        SELECT DISTINCT regNo, f_Name, l_Name 
        FROM user
        WHERE profession = 'Student'
        AND (
            subject1 LIKE CONCAT('%', ?, '%') OR
            subject2 LIKE CONCAT('%', ?, '%') OR
            subject3 LIKE CONCAT('%', ?, '%') OR
            subject4 LIKE CONCAT('%', ?, '%') OR
            subject5 LIKE CONCAT('%', ?, '%') OR
            subject6 LIKE CONCAT('%', ?, '%') OR
            subject7 LIKE CONCAT('%', ?, '%') OR
            subject8 LIKE CONCAT('%', ?, '%') OR
            subject9 LIKE CONCAT('%', ?, '%') OR
            subject10 LIKE CONCAT('%', ?, '%')
        )
    `;

    db.query(subjectQuery, [subjectId], (err, subjectDetails) => {
        if (err) {
            console.error('Error fetching subject details:', err);
            return res.status(500).json({ message: "Error fetching subject details" });
        }

        const params = Array(10).fill(subjectId);
        db.query(studentsQuery, params, (err, students) => {
            if (err) {
                console.error('Error fetching students:', err);
                return res.status(500).json({ message: "Error fetching students" });
            }

            res.json({
                subject: subjectDetails[0],
                timeSlots: [
                    { startTime: "08:00 AM", endTime: "08:55 AM" },
                    { startTime: "08:55 AM", endTime: "09:50 AM" },
                    { startTime: "10:10 AM", endTime: "11:05 AM" },
                    { startTime: "11:05 AM", endTime: "12:00 PM" },
                    { startTime: "01:00 PM", endTime: "01:55 PM" },
                    { startTime: "01:55 PM", endTime: "02:50 PM" },
                    { startTime: "03:10 PM", endTime: "04:00 PM" }
                ],
                students
            });
        });
    });
});


// Save attendance records
app.post('/api/attendance', (req, res) => {
    const { subjectId, date, timeSlot, attendanceData } = req.body;

    console.log("Received attendance submission:", req.body);

    if (!subjectId || !date || !timeSlot || Object.keys(attendanceData).length === 0) {
        console.error("Missing required fields in request");
        return res.status(400).json({ message: "Missing required fields" });
    }

    db.beginTransaction(err => {
        if (err) {
            console.error('Transaction error:', err);
            return res.status(500).json({ message: "Error starting transaction" });
        }

        const values = Object.entries(attendanceData).map(([regNo, status]) => [
            regNo,
            subjectId,
            date,
            timeSlot,
            status === 'present' ? 'present' : 'absent'
        ]);

        console.log("Saving attendance with values:", values);

        const sql = `
            INSERT INTO attendance (regNo, subjectId, date, time_slot, attendance) 
            VALUES ?
        `;

        db.query(sql, [values], (err, result) => {
            if (err) {
                console.error('Error saving attendance:', err);
                return db.rollback(() => {
                    res.status(500).json({ message: "Error saving attendance" });
                });
            }

            db.commit(err => {
                if (err) {
                    console.error('Error committing transaction:', err);
                    return db.rollback(() => {
                        res.status(500).json({ message: "Error committing transaction" });
                    });
                }
                console.log("Attendance saved successfully");
                res.json({ message: "Attendance saved successfully" });
            });
        });
    });
});
