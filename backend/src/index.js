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
    const sql = "INSERT INTO user(`f_Name`,`l_Name`,`profession`,`semester`,`regNo`,`email`,`password`,`about`,`pic`,`subject1`,`subject2`,`subject3`,`subject4`,`subject5`,`subject6`,`subject7`,`subject8`,`subject9`,`subject10`) VALUES (?)";
    const values = [
        req.body.firstName,
        req.body.secondName,
        req.body.profession,
        req.body.semester,
        req.body.regNo,
        req.body.email,
        req.body.password,
        "No more details",
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
    const { condition, semester } = req.body;

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
})

//Delete queries
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


//Update queries
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
})

app.put('/user/:id', (req, res) => {
    const userId = req.params.id;
    const { password, condition } = req.body;

    if (condition === "pwdRecovery") {
        const sql = "UPDATE user SET `password` = ? WHERE `id` = ?";
        db.query(sql, [password, userId], (err, data) => {
            if (err) {
                return res.json("Error");
            }
            return res.json("Updates")
        })
    }
})

