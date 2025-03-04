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

app.listen(8081, () => {
    console.log("listening");
})

//Insert queries
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
    const sql = "INSERT INTO forgotpassword(`email`) VALUES (?)";
    const values = req.body.email;
    db.query(sql, [values], (err, data) => {
        if (err) {
            return res.json("Error");
        }
        return res.json(data);
    })
})

app.post("/ma_system/lecturerfeedbackrate", (req, res) => {
    const { semester, studentID, selectedData, feedback } = req.body;
    console.log("Received Data:", req.body);

    // Expect exactly 12 feedback items
    if (!semester || !studentID || !selectedData || !feedback || feedback.length !== 12) {
        return res.status(400).json({ error: "Invalid input data" });
    }

    const sql = `
      INSERT INTO lecturerfeedbackrate 
        (semester, studentID, lecturer_name, lq1_rate, lq2_rate, lq3_rate, lq4_rate, lq5_rate, lq6_rate, lq7_rate, lq8_rate, lq9_rate, lq10_rate, lq11_rate, lq12_rate)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [semester, studentID, selectedData, ...feedback.map((item) => item.rating)];

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
        db.query(avgQuery, [selectedData], (err, avgResults) => {
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

//Select queries
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

//select queries for student panel in feedback
/* 
  Endpoint: GET /api/lecturerDetails?semester=...
  Returns lecturer values and course values for the given semester.
*/
app.get('/lecturerdetails', (req, res) => {
    const { condition, semester, name } = req.query;

    if (condition === "For student dropdown") {
        if (!semester) {
            return res.status(400).json({ error: "Semester is required" });
        }

        const lecturerQuery = "SELECT lecturer_name FROM lecturerdetails WHERE semester = ?";
        const courseQuery = "SELECT course_name FROM lecturerdetails WHERE semester = ?";

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

        const lecturerQuery = "SELECT CONCAT(lecturer_name, ' - ', course_name) AS lecturer_course FROM lecturerdetails WHERE lecturer_name = ?";
        const courseQuery = "SELECT course_name FROM lecturerdetails WHERE lecturer_name = ?";

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

                return res.json({
                    lecturers: lecturerResults,
                    courses: courseResults,
                });
            });
        });
    }
});

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