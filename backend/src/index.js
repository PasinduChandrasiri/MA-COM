const express = require("express");
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));


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

app.listen(8081, () => {
    console.log("Server is running on port 8081");
})

// Insert queries
app.post('/ma_system/user', (req, res) => {
    const sql = "INSERT INTO user(`f_Name`,`l_Name`,`profession`,`semester`,`regNo`,`email`,`password`,`about`,`pic`,`subject1`,`subject2`,`subject3`,`subject4`,`subject5`,`subject6`,`subject7`,`subject8`,`subject9`,`subject10`) VALUES (?)";
    const values = [
        req.body.firstName,
        req.body.secondName,
        req.body.profession,
        req.body.semester,
        req.body.regNo,
        req.body.email,
        req.body.password,
        "Add about you",
        "",
        req.body.subject1,
        req.body.subject2,
        req.body.subject3,
        req.body.subject4,
        req.body.subject5,
        req.body.subject6,
        req.body.subject7,
        req.body.subject8,
        req.body.subject9,
        req.body.subject10,
    ]
    db.query(sql, [values], (err, data) => {
        if (err) {
            return res.status(500).json("Error");
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
            return res.status(500).json("Error");
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
            return res.status(500).json("Error");
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
            return res.status(500).json("Error");
        }
        return res.json(data);
    })
})

app.post('/ma_system/nonacademicdetails', (req, res) => {
    const sql = "INSERT INTO nonacademicdetails(`registerNumber`,`name`,`attendance`,`dailyCharge`,`month`) VALUES (?)";
    const values = [
        req.body.regNo,
        req.body.name,
        req.body.attendance,
        req.body.dailyCharge,
        req.body.month,
    ]
    db.query(sql, [values], (err, data) => {
        if (err) {
            return res.status(500).json("Error");
        }
        return res.json(data);
    })
})

app.post('/ma_system/subjects', (req, res) => {
    const sql = "INSERT INTO subjects(`semester`,`subjectId`,`subjectName`,`lecturer`) VALUES (?)";
    const values = [
        req.body.semester,
        req.body.subjectId,
        req.body.subjectName,
        req.body.lecturer,
    ]
    db.query(sql, [values], (err, data) => {
        if (err) {
            return res.status(500).json("Error");
        }
        return res.json(data);
    })
})

app.post('/ma_system/lecturers', (req, res) => {
    const sql = "INSERT INTO lecturers(`lecturerId`,`lecturerName`,`department`) VALUES (?)";
    const values = [
        req.body.lecturerId,
        req.body.lecturerName,
        req.body.department,
    ]
    db.query(sql, [values], (err, data) => {
        if (err) {
            return res.status(500).json("Error");
        }
        return res.json(data);
    })
})


// Select queries
app.post("/ma_system/lecturerfeedbackrate", (req, res) => {
    const { semester, studentID, newCourseName, newNames, selectedData, feedback } = req.body;
    console.log("Received Data:", req.body);

    // Expect exactly 12 feedback items
    if (!semester || !studentID || !newCourseName || !newNames || !selectedData || !feedback || feedback.length !== 12) {
        return res.status(400).json({ error: "Invalid input data" });
    }

    const sql = `
      INSERT INTO lecturerfeedbackrate 
        (semester, studentID, course_name, lecturer_name, lecture_course_name, lq1_rate, lq2_rate, lq3_rate, lq4_rate, lq5_rate, lq6_rate, lq7_rate, lq8_rate, lq9_rate, lq10_rate, lq11_rate, lq12_rate)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [semester, studentID, newCourseName, newNames, selectedData, ...feedback.map((item) => item.rating)];

    db.query(sql, values, (err) => {
        if (err) {
            console.error("Error inserting lecturer feedback:", err);
            return res.status(500).send("Error saving feedback");
        }
        // After insertion, recalc averages from lecturerfeedbackrate table
        const avgQuery = `
        SELECT 
        semester AS semester,
          AVG(lq1_rate) AS avg1,
          AVG(lq2_rate) AS avg2,
          AVG(lq3_rate) AS avg3,
          AVG(lq4_rate) AS avg4,
          AVG(lq5_rate) AS avg5,
          AVG(lq6_rate) AS avg6,
          AVG(lq7_rate) AS avg7,
          AVG(lq8_rate) AS avg8,
          AVG(lq9_rate) AS avg9,
          AVG(lq10_rate) AS avg10,
          AVG(lq11_rate) AS avg11,
          AVG(lq12_rate) AS avg12
        FROM lecturerfeedbackrate
        WHERE lecturer_name = ?
      `;
        db.query(avgQuery, [newNames], (err, avgResults) => {
            if (err) {
                console.error("Error calculating lecturer averages:", err);
            } else {
                const avgRow = avgResults[0];
                // Upsert the averages into lecturerfeedbackrate_avg table.
                const upsertQuery = `
            INSERT INTO lecturerfeedbackrate_avg 
              (semester, lecturer_name, avg1, avg2, avg3, avg4, avg5, avg6, avg7, avg8, avg9, avg10, avg11, avg12)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ON DUPLICATE KEY UPDATE
            semester = VALUES(semester),
              avg1 = VALUES(avg1),
              avg2 = VALUES(avg2),
              avg3 = VALUES(avg3),
              avg4 = VALUES(avg4),
              avg5 = VALUES(avg5),
              avg6 = VALUES(avg6),
              avg7 = VALUES(avg7),
              avg8 = VALUES(avg8),
              avg9 = VALUES(avg9),
              avg10 = VALUES(avg10),
              avg11 = VALUES(avg11),
              avg12 = VALUES(avg12)
          `;
                const upsertValues = [
                    semester,
                    newNames,
                    avgRow.avg1,
                    avgRow.avg2,
                    avgRow.avg3,
                    avgRow.avg4,
                    avgRow.avg5,
                    avgRow.avg6,
                    avgRow.avg7,
                    avgRow.avg8,
                    avgRow.avg9,
                    avgRow.avg10,
                    avgRow.avg11,
                    avgRow.avg12,
                ];
                db.query(upsertQuery, upsertValues, (err2) => {
                    if (err2) {
                        console.error("Error updating lecturer averages:", err2);
                    }
                    res.send("Feedback submitted successfully!");
                });
            }
        });
    });
});

app.post("/ma_system/coursefeedbackrate", (req, res) => {
    const { semester, studentID, selectedData, feedback } = req.body;
    console.log("Received Data:", req.body);

    // Expect exactly 15 feedback items
    if (!semester || !studentID || !selectedData || !feedback || feedback.length !== 15) {
        return res.status(400).json({ error: "Invalid input data" });
    }

    const sql = `
      INSERT INTO coursefeedbackrate 
        (semester, studentID, course_name, cq1_rate, cq2_rate, cq3_rate, cq4_rate, cq5_rate, cq6_rate, cq7_rate, cq8_rate, cq9_rate, cq10_rate, cq11_rate, cq12_rate, cq13_rate, cq14_rate, cq15_rate)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [semester, studentID, selectedData, ...feedback.map((item) => item.rating)];

    db.query(sql, values, (err) => {
        if (err) {
            console.error("Error inserting course feedback:", err);
            return res.status(500).send("Error saving feedback");
        }
        // After insertion, recalc averages from coursefeedbackrate table
        const avgQuery = `
        SELECT 
        semester AS semester,
          AVG(cq1_rate) AS avg1,
          AVG(cq2_rate) AS avg2,
          AVG(cq3_rate) AS avg3,
          AVG(cq4_rate) AS avg4,
          AVG(cq5_rate) AS avg5,
          AVG(cq6_rate) AS avg6,
          AVG(cq7_rate) AS avg7,
          AVG(cq8_rate) AS avg8,
          AVG(cq9_rate) AS avg9,
          AVG(cq10_rate) AS avg10,
          AVG(cq11_rate) AS avg11,
          AVG(cq12_rate) AS avg12,
          AVG(cq13_rate) AS avg13,
          AVG(cq14_rate) AS avg14,
          AVG(cq15_rate) AS avg15
        FROM coursefeedbackrate
        WHERE course_name = ?
      `;
        db.query(avgQuery, [selectedData], (err, avgResults) => {
            if (err) {
                console.error("Error calculating course averages:", err);
            } else {
                const avgRow = avgResults[0];
                // Upsert the averages into coursefeedbackrate_avg table.
                const upsertQuery = `
            INSERT INTO coursefeedbackrate_avg 
              (semester, course_name, avg1, avg2, avg3, avg4, avg5, avg6, avg7, avg8, avg9, avg10, avg11, avg12, avg13, avg14, avg15)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ON DUPLICATE KEY UPDATE
            semester = VALUES(semester),
              avg1 = VALUES(avg1),
              avg2 = VALUES(avg2),
              avg3 = VALUES(avg3),
              avg4 = VALUES(avg4),
              avg5 = VALUES(avg5),
              avg6 = VALUES(avg6),
              avg7 = VALUES(avg7),
              avg8 = VALUES(avg8),
              avg9 = VALUES(avg9),
              avg10 = VALUES(avg10),
              avg11 = VALUES(avg11),
              avg12 = VALUES(avg12),
              avg13 = VALUES(avg13),
              avg14 = VALUES(avg14),
              avg15 = VALUES(avg15)
          `;
                const upsertValues = [
                    semester,
                    selectedData,
                    avgRow.avg1,
                    avgRow.avg2,
                    avgRow.avg3,
                    avgRow.avg4,
                    avgRow.avg5,
                    avgRow.avg6,
                    avgRow.avg7,
                    avgRow.avg8,
                    avgRow.avg9,
                    avgRow.avg10,
                    avgRow.avg11,
                    avgRow.avg12,
                    avgRow.avg13,
                    avgRow.avg14,
                    avgRow.avg15,
                ];
                db.query(upsertQuery, upsertValues, (err2) => {
                    if (err2) {
                        console.error("Error updating course averages:", err2);
                    }
                    res.send("Feedback submitted successfully!");
                });
            }
        });
    });
});

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

app.post('/subjects', (req, res) => {
    const { condition, semester, lecturer } = req.body;

    if (condition === "subject") {
        const sql = "SELECT * FROM subjects WHERE `semester`=?";
        db.query(sql, [semester], (err, data) => {
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
    else if (condition === "all") {
        const sql = "SELECT * FROM subjects";
        db.query(sql, (err, data) => {
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
    else if (condition === "feedbackLecturer") {
        const sql = "SELECT * FROM subjects WHERE `lecturer`=?";
        db.query(sql, [lecturer], (err, data) => {
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

app.post('/lecturers', (req, res) => {
    const { condition } = req.body;

    if (condition === "all") {
        const sql = "SELECT * FROM lecturers";
        db.query(sql, (err, data) => {
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
    else if (condition === "lecturer") {
        const sql = "SELECT lecturerName FROM lecturers";
        db.query(sql, (err, data) => {
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

app.post('/nonacademicdetails', (req, res) => {
    const { condition } = req.body;

    if (condition === "all") {
        const sql = "SELECT * FROM nonacademicdetails";
        db.query(sql, (err, data) => {
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

app.post('/coursefeedbackrate', (req, res) => {
    const { condition } = req.body;

    if (condition === "all") {
        const sql = "SELECT * FROM coursefeedbackrate";
        db.query(sql, (err, data) => {
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

app.post('/lecturerfeedbackrate', (req, res) => {
    const { condition } = req.body;

    if (condition === "all") {
        const sql = "SELECT * FROM lecturerfeedbackrate";
        db.query(sql, (err, data) => {
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

app.post('/batchdetails', (req, res) => {
    const { condition } = req.body;

    if (condition === "all") {
        const sql = "SELECT * FROM batchdetails";
        db.query(sql, (err, data) => {
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


//Delete queries
app.delete('/notice/:id', (req, res) => {
    const id = req.params.id;

    const sql = "DELETE FROM notice WHERE id = ?";
    db.query(sql, id, (err, data) => {
        if (err) {
            return res.status(500).json("Error");
        }
        return res.json("Updates")
    })
});

app.delete('/comments/:id', (req, res) => {
    const id = req.params.id;

    const sql = "DELETE FROM comments WHERE id = ?";
    db.query(sql, id, (err, data) => {
        if (err) {
            return res.status(500).json("Error");
        }
        return res.json("Updates")
    })
});

app.delete('/nonacademicdetails/:id', (req, res) => {
    const id = req.params.id;

    const sql = "DELETE FROM nonacademicdetails WHERE id = ?";
    db.query(sql, id, (err, data) => {
        if (err) {
            return res.status(500).json("Error");
        }
        return res.json("Updates")
    })
});

app.delete('/subjects/:id', (req, res) => {
    const id = req.params.id;

    const sql = "DELETE FROM subjects WHERE id = ?";
    db.query(sql, id, (err, data) => {
        if (err) {
            return res.status(500).json("Error");
        }
        return res.json("Updates")
    })
});

app.delete('/lecturers/:id', (req, res) => {
    const id = req.params.id;

    const sql = "DELETE FROM lecturers WHERE id = ?";
    db.query(sql, id, (err, data) => {
        if (err) {
            return res.status(500).json("Error");
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
            return res.status(500).json("Error");
        }
        return res.json("Updates")
    })
})

app.put('/user/:id', (req, res) => {
    const userId = req.params.id;
    const { password, condition, name, semester, subject1, subject2, subject3, subject4, subject5, subject6, subject7, subject8, subject9, subject10, about, pic } = req.body;

    if (condition === "pwdRecovery") {
        const sql = "UPDATE user SET `password` = ? WHERE `id` = ?";
        db.query(sql, [password, userId], (err, data) => {
            if (err) {
                return res.status(500).json("Error");
            }
            return res.json("Updates")
        })
    }

    else if (condition === "editDetails") {
        const sql = "UPDATE user SET `f_Name` = ?,`l_Name` = ?,`semester` = ?,`subject1` = ?,`subject2` = ?,`subject3` = ?,`subject4` = ?,`subject5` = ?,`subject6` = ?,`subject7` = ?,`subject8` = ?,`subject9` = ?,`subject10` = ?,`about` = ?,`pic` = ? WHERE `id` = ?";
        db.query(sql, [name, "", semester, subject1, subject2, subject3, subject4, subject5, subject6, subject7, subject8, subject9, subject10, about, pic, userId], (err, data) => {
            if (err) {
                return res.status(500).json("Error");
            }
            return res.json("Updates")
        })
    }
})

app.put('/nonacademicdetails/:id', (req, res) => {
    const id = req.params.id;
    const { regNo, name, attendance, dailyCharge, month } = req.body;

    const sql = "UPDATE nonacademicdetails SET `registerNumber` = ?,`name` = ?,`attendance` = ?,`dailyCharge` = ?,`month` = ? WHERE `id` = ?";
    db.query(sql, [regNo, name, attendance, dailyCharge, month, id], (err, data) => {
        if (err) {
            return res.status(500).json("Error");
        }
        return res.json("Updates")
    })
})

app.put('/subjects/:id', (req, res) => {
    const id = req.params.id;
    const { semester, subjectId, subjectName, lecturer } = req.body;

    const sql = "UPDATE subjects SET `semester` = ?,`subjectId` = ?,`subjectName` = ?,`lecturer` = ? WHERE `id` = ?";
    db.query(sql, [semester, subjectId, subjectName, lecturer, id], (err, data) => {
        if (err) {
            return res.status(500).json("Error");
        }
        return res.json("Updates")
    })
})

app.put('/lecturers/:id', (req, res) => {
    const id = req.params.id;
    const { lecturerId, lecturerName, department } = req.body;

    const sql = "UPDATE lecturers SET `lecturerId` = ?,`lecturerName` = ?,`department` = ? WHERE `id` = ?";
    db.query(sql, [lecturerId, lecturerName, department, id], (err, data) => {
        if (err) {
            return res.status(500).json("Error");
        }
        return res.json("Updates")
    })
})

app.put('/batchdetails/:id', (req, res) => {
    const id = req.params.id;
    const { batchName, batchSemester } = req.body;

    const sql = "UPDATE batchdetails SET `batch` = ?,`semester` = ? WHERE `id` = ?";
    db.query(sql, [batchName, batchSemester, id], (err, data) => {
        if (err) {
            return res.status(500).json("Error");
        }
        return res.json("Updates")
    })
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

// Fetch subjects for dropdown
app.get('/api/subjects', (req, res) => {

    const sql = "SELECT subjectId, subjectName, lecturer FROM subjects";
    
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching subjects:', err);
            return res.status(500).json({ message: "Error fetching subjects" });
        }
        res.json(results);
    });
});

// Fetch attendance data for a selected subject
app.get('/api/attendance/:subjectId', (req, res) => {
    const { subjectId } = req.params;

    const sql = `
        SELECT 
            a.regNo, 
            u.f_Name, 
            u.l_Name,
            COUNT(*) as totalClasses,
            SUM(CASE WHEN a.attendance = 'present' THEN 1 ELSE 0 END) as presentClasses,
            ROUND((SUM(CASE WHEN a.attendance = 'present' THEN 1 ELSE 0 END) / COUNT(*)) * 100, 2) AS attendancePercentage
        FROM 
            attendance a
        JOIN 
            user u ON a.regNo = u.regNo
        WHERE 
            a.subjectId = ?
        GROUP BY 
            a.regNo, u.f_Name, u.l_Name
    `;

    db.query(sql, [subjectId], (err, results) => {
        if (err) {
            console.error('Error fetching attendance:', err);
            return res.status(500).json({ message: "Error fetching attendance" });
        }
        
        // Return empty array if no attendance records found
        if (results.length === 0) {
            console.log(`No attendance records found for subject: ${subjectId}`);
        }
        
        res.json(results);
    });
});


// Fetch attendance period (first and last date) for a subject
app.get('/api/attendance-period/:subjectId', (req, res) => {
    const { subjectId } = req.params;
    const sql = "SELECT MIN(date) AS firstDate, MAX(date) AS lastDate FROM attendance WHERE subjectId = ?";
    
    db.query(sql, [subjectId], (err, result) => {
        if (err) {
            console.error('Error fetching attendance period:', err);
            return res.status(500).json({ message: "Error fetching attendance period" });
        }
        if (result.length > 0) {
            res.json({
                firstDate: result[0].firstDate,
                lastDate: result[0].lastDate
            });
        } else {
            res.json({ firstDate: null, lastDate: null });
        }
    });
});

// Submit a cash request
app.post('/api/cash-requests', (req, res) => {
    const { userId, type, topic, description } = req.body;
    console.log('Received request body:', req.body); // Debugging log

    const sql = "INSERT INTO cash_requests (userId, type, topic, description, status) VALUES (?, ?, ?, ?, 'Pending')";
    db.query(sql, [userId, type, topic, description], (err, result) => {
        if (err) {
            console.error('Error submitting cash request:', err);
            return res.status(500).json({ message: "Error submitting cash request" });
        }

        console.log('Inserted request ID:', result.insertId); // Debugging log

        // Fetch the newly created request using the inserted ID
        const newRequestId = result.insertId;
        const fetchSql = "SELECT * FROM cash_requests WHERE id = ?";
        db.query(fetchSql, [newRequestId], (err, newRequest) => {
            if (err) {
                console.error('Error fetching new cash request:', err);
                return res.status(500).json({ message: "Error fetching new cash request" });
            }
            console.log('Fetched new request:', newRequest[0]); // Debugging log
            res.json(newRequest[0]); // Return the newly created request
        });
    });
});

// Get cash requests by status for a user
app.get('/api/cash-requests', (req, res) => {
    const sql = "SELECT * FROM cash_requests";

    db.query(sql, (err, results) => {
        if (err) {
            console.error('Database Query Error:', err);
            return res.status(500).json({ message: "Database query error", error: err });
        }

        if (!results || results.length === 0) {
            console.warn('⚠ No cash requests found in the database.');
            return res.json([]); // Return an empty array if no records found
        }

        console.log('✅ Cash Requests Fetched Successfully:', results);
        res.json(results);
    });
});

// Get all pending cash requests for Management Assistant
app.get('/api/cash-requests/pending', (req, res) => {
    const sql = "SELECT cr.*, u.f_Name, u.l_Name FROM cash_requests cr JOIN user u ON cr.userId = u.id WHERE cr.status = 'Pending'";
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching pending cash requests:', err);
            return res.status(500).json({ message: "Error fetching pending cash requests" });
        }
        res.json(results);
    });
});

// Approve or decline a cash request
app.put('/api/cash-requests/:id', (req, res) => {
    const { id } = req.params;
    const { status, funds, responseDescription } = req.body;

    console.log(`Updating request ID: ${id} with status: ${status}`); // Debugging log

    const sql = "UPDATE cash_requests SET status = ?, funds = ?, responseDescription = ? WHERE id = ?";
    db.query(sql, [status, funds, responseDescription, id], (err, result) => {
        if (err) {
            console.error('Error updating cash request:', err);
            return res.status(500).json({ message: "Error updating cash request" });
        }
        console.log('Cash request updated successfully:', result); // Debugging log
        res.json({ message: "Cash request updated successfully" });
    });
});

// Get user by ID
app.get('/api/user/:id', (req, res) => {
    const userId = req.params.id;
    
    const sql = "SELECT id, f_Name, l_Name, profession FROM user WHERE id = ?";
    db.query(sql, [userId], (err, results) => {
        if (err) {
            console.error('Error fetching user:', err);
            return res.status(500).json({ message: "Error fetching user details" });
        }
        
        if (results.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }
        
        res.json(results[0]);
    });
});
//select queries for student panel in feedback
/* 
  Endpoint: GET /api/lecturerDetails?semester=...
  Returns lecturer values and course values for the given semester.
*/
app.get('/subjects', (req, res) => {
    const { condition, semester, name } = req.query;

    if (condition === "For student dropdown") {
        if (!semester) {
            return res.status(400).json({ error: "Semester is required" });
        }

        const lecturerQuery = "SELECT CONCAT(lecturer, ' - ', subjectName) AS lecturer_course FROM subjects WHERE semester = ?";
        const courseQuery = "SELECT subjectName FROM subjects WHERE semester = ?";

        // Execute the lecturer query
        db.query(lecturerQuery, [semester], (err, lecturerResults) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: "Database error (lecturers)" });
            }

            // Execute the course query
            db.query(courseQuery, [semester], (err, courseResults) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ error: "Database error (courses)" });
                }

                // Send both results in one JSON response

                return res.json({
                    lecturers: lecturerResults,
                    courses: courseResults,
                });
            });
        });
    }
    else if (condition === "For lecturer dropdown") {
        if (!name) {
            return res.status(400).json({ error: "Lecturer name is required" });
        }

        const lecturerQuery = "SELECT CONCAT(lecturer, ' - ', subjectName) AS lecturer_course FROM subjects WHERE lecturer = ?";
        const courseQuery = "SELECT subjectName FROM subjects WHERE lecturer = ?";

        // Execute the lecturer query
        db.query(lecturerQuery, [name], (err, lecturerResults) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: "Database error (lecturers)" });
            }

            // Execute the course query
            db.query(courseQuery, [name], (err, courseResults) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ error: "Database error (courses)" });
                }

                // Send both results in one JSON response
                console.log("Lecturer Results:", lecturerResults);

                return res.json({
                    lecturers: lecturerResults,
                    courses: courseResults,
                });
            });
        });
    }
});

//-------------------------------------------------------------------------------------------------------------------------

app.get('/feedbackquestions', (req, res) => {
    const { qType } = req.query;

    if (qType === "Lecturer") {
        const sql = "SELECT * FROM feedbackquestions WHERE `qType`=?";
        db.query(sql, [qType], (err, data) => {
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
    else if (qType === "Course") {
        const sql = "SELECT * FROM feedbackquestions WHERE `qType`=?";
        db.query(sql, [qType], (err, data) => {
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

// Update (edit) a question
app.put('/feedbackquestions/:QID', (req, res) => {
    const { QID } = req.params;
    const { Questions } = req.body;
    const sql = "UPDATE feedbackquestions SET Questions = ? WHERE QID = ?";
    db.query(sql, [Questions, QID], (err, data) => {
        if (err) {
            return res.status(500).json("Error updating question");
        }
        res.json({ message: "Question updated successfully" });
    });
});

// Delete a question
app.delete('/feedbackquestions/:QID', (req, res) => {
    const { QID } = req.params;
    const sql = "DELETE FROM feedbackquestions WHERE QID = ?";
    db.query(sql, [QID], (err, data) => {
        if (err) {
            return res.status(500).json("Error deleting question");
        }
        res.json({ message: "Question deleted successfully" });
    });
});

// ADD a new question (including QGroup)
app.post('/feedbackquestions', (req, res) => {
    const { Questions, qType, QGroup } = req.body;
    // Adjust column names as needed. Here, QID is assumed to be auto-increment.
    const sql = "INSERT INTO feedbackquestions (Questions, qType, QGroup) VALUES (?, ?, ?)";
    db.query(sql, [Questions, qType, QGroup], (err, data) => {
      if (err) {
        return res.status(500).json("Error adding question");
      }
      // Return the new question's data including the auto-generated QID
      const newQuestion = { QID: data.insertId, Questions, qType, QGroup };
      res.json(newQuestion);
    });
  });
  

//-----------------------------------------------------------------------------------------------------------------------

//select queries of lecturer panel

// For Lecturer Feedback averages
app.get("/lecturerfeedbackrate_avg", (req, res) => {
    const { selectedData } = req.query;
    if (!selectedData) return res.status(400).json({ error: "Missing course parameter" });
    console.log("Selected Data:", selectedData);
    // Assuming selectedData is in the format "lecturer_name course_name"
    // and that lecturer_name does not include spaces.
    const lecturerName = selectedData.split(" - ")[0];

    const sql = `
      SELECT 
        avg1, avg2, avg3, avg4, avg5, avg6, avg7, avg8, avg9, avg10, avg11, avg12
      FROM lecturerfeedbackrate_avg
      WHERE lecturer_name = ?
    `;
    db.query(sql, [lecturerName], (err, results) => {
        if (err) {
            console.error("Error fetching lecturer averages:", err);
            return res.status(500).json({ error: "Database error" });
        }
        res.json(results);
        console.log("Results:", results);
    });
});

// For Course Feedback averages
app.get("/coursefeedbackrate_avg", (req, res) => {
    const { selectedData } = req.query;
    if (!selectedData) return res.status(400).json({ error: "Missing course parameter" });

    const sql = `
      SELECT 
        avg1, avg2, avg3, avg4, avg5, avg6, avg7, avg8, avg9, avg10, avg11, avg12, avg13, avg14, avg15
      FROM coursefeedbackrate_avg
      WHERE course_name = ?
    `;
    db.query(sql, [selectedData], (err, results) => {
        if (err) {
            console.error("Error fetching course averages:", err);
            return res.status(500).json({ error: "Database error" });
        }
        res.json(results);
        console.log("Results:", results);
    });
});



// --------------------- FILE HANDLING ENDPOINTS ----------------------------------
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure the 'uploads' folder exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Configure storage for uploaded files
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Ensure the 'uploads' folder exists
    },
    filename: (req, file, cb) => {
        // Create a unique filename using the current timestamp and original extension
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage });

// Lecturer uploads file endpoint
app.post('/ma_system/upload', upload.single('file'), (req, res) => {
    const lecturerId = req.body.lecturerId;
    const description = req.body.description;
    const destination = req.body.destination;
    const destinationType = req.body.destinationType; // 'internal' or 'external'
    const filePath = req.file ? req.file.path : null;

    if (!filePath) {
        return res.status(400).json({ error: "No file uploaded." });
    }

    const status = "pending"; // Initial status

    const sql = "INSERT INTO files (lecturer_id, file_name, file_path, description, destination, destination_type, status) VALUES (?, ?, ?, ?, ?, ?, ?)";
    const values = [lecturerId, req.file.originalname, filePath, description, destination, destinationType, status];

    db.query(sql, values, (err, data) => {
        if (err) {
            console.error("Error inserting file data:", err);
            return res.status(500).json({ error: "Database error" });
        }
        res.json({ message: "File uploaded successfully", fileId: data.insertId });
    });
});

// Get files for a specific lecturer
app.get('/ma_system/files', (req, res) => {
    const lecturerId = req.query.lecturerId;
    if (!lecturerId) {
        return res.status(400).json({ error: "Missing lecturerId parameter" });
    }
    const sql = "SELECT * FROM files WHERE lecturer_id = ?";
    db.query(sql, [lecturerId], (err, results) => {
        if (err) {
            console.error("Error fetching files:", err);
            return res.status(500).json({ error: "Database error" });
        }
        res.json(results);
    });
});

// Get all files (for the Managing Assistant)
app.get('/ma_system/all-files', (req, res) => {
    const sql = "SELECT * FROM files";
    db.query(sql, (err, results) => {
        if (err) {
            console.error("Error fetching all files:", err);
            return res.status(500).json({ error: "Database error" });
        }
        res.json(results);
    });
});

// Update file status (for MA)
app.put('/ma_system/files/:id', (req, res) => {
    const fileId = req.params.id;
    const { status } = req.body;
    const sql = "UPDATE files SET status = ? WHERE id = ?";
    db.query(sql, [status, fileId], (err, results) => {
        if (err) {
            console.error("Error updating file status:", err);
            return res.status(500).json({ error: "Database error" });
        }
        res.json({ message: "Status updated successfully" });
    });
});

// Delete file endpoint (for both Lecturer and MA)
app.delete('/ma_system/files/:id', (req, res) => {
    const fileId = req.params.id;
    // First, get the file path from the database
    const sqlSelect = "SELECT file_path FROM files WHERE id = ?";
    db.query(sqlSelect, [fileId], (err, results) => {
        if (err) {
            console.error("Error fetching file for deletion:", err);
            return res.status(500).json({ error: "Database error" });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: "File not found" });
        }
        const filePath = results[0].file_path;
        // Delete the record from the database
        const sqlDelete = "DELETE FROM files WHERE id = ?";
        db.query(sqlDelete, [fileId], (err, deleteResults) => {
            if (err) {
                console.error("Error deleting file from database:", err);
                return res.status(500).json({ error: "Database error" });
            }
            // Optionally delete the file from disk
            fs.unlink(filePath, (fsErr) => {
                if (fsErr) {
                    console.error("Error deleting file from disk:", fsErr);
                    // We continue even if file deletion fails
                }
                res.json({ message: "File deleted successfully" });
            });
        });
    });
});

