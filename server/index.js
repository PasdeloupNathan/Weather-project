const express = require('express');
const mysql = require('mysql');
const app = express();
const bcrypt = require('bcrypt');
const cors = require('cors');
const port = 5000;
require('dotenv').config()
const secret = process.env.hash;
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

const con = mysql.createConnection({
    host: "localhost",
    user: process.env.dbuser,
    password: process.env.dbpassword,
    database: "weather"
});

const corsOptions = {
    origin: '*',
    credentials: false, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
}

app.use(cors(corsOptions)) // Use this after the variable declaration
app.set('trust proxy', true);

app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`);
})
con.connect(function (err) {
    if (err) throw err;
});

app.post('/login', (req, res) => {
    //Select all customers and return the result object:
    const username = req.body.username;
    const password = req.body.password;
    con.query(`SELECT * FROM user WHERE name = '${username}'`, function (err, result) {
        if (err) throw err;
        if (!result[0]) {
            res.send({
                data: "cet utilisateur n'existe pas",
                success: "fail"
            });
        } else {
            compare(result[0].password).then(passwd => {
                if (passwd === true) {
                    res.send({
                        data: "connexion reussie",
                        success: "success"
                    });
                } else {
                    res.send({
                        data: "mot de passe incorrect",
                        success: "fail"
                    });
                }
            })
        }

    });
})

app.get('/get-favorites/:id', (req, res) => {
    //Select all customers and return the result object:
    con.query(`SELECT ville FROM favoriuserlink JOIN favoris ON favoris.IDfavori = favoriuserlink.IDfavori WHERE IDuser = ${req.params.id}; `, function (err, result) {
        if (err) throw err;
        if (!result[0]) {
            res.send("aucun utilisateur a afficher");
        }
        res.send(result);
    });
})

app.post('/create-user', async (req, res) => {
    //Select all customers and return the result object:
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
    con.query(`SELECT * FROM user WHERE name = '${username}'`, function (err, result) {
        if (err) throw err;
        if (!result[0]) {
            hash(password).then(passwd => {
                con.query(`INSERT INTO user (name, password, email) VALUES ("${username}", "${passwd}", "${email}")`, function (err, result) {
                    res.send({
                        success: "success"
                    });
                });
            })

        } else {
            res.send({
                data: "utilisateur existe deja",
                success: "error"
            });
        }
    });
})

app.post('/create-favorite', (req, res) => {
    con.query(`SELECT ville FROM favoris WHERE ville = "Test"`, function (err, resp) {
        if (!resp[0]) {
            con.query(`INSERT INTO favoris (ville) VALUES ("Test")`, function (err, result) {
                if (err) {
                    res.send("erreur lors de l'ajout");
                    throw err;
                }
                con.query(`SELECT * from favoriuserlink WHERE IDuser = 1 AND IDfavori = 10`, function (err, resp) {
                    if (!resp[0]) {
                        con.query(`INSERT INTO favoriuserlink (IDuser, IDfavori) VALUES (1, 10)`, function (err, response) {
                            res.send("success");
                        })
                    } else {
                        res.send("deja present");
                    }
                });
            });
        } else {
            con.query(`SELECT * from favoriuserlink WHERE IDuser = 1 AND IDfavori = 10`, function (err, resp) {
                if (!resp[0]) {
                    con.query(`INSERT INTO favoriuserlink (IDuser, IDfavori) VALUES (1, 10)`, function (err, response) {
                        res.send("success");
                    })
                } else {
                    res.send("deja present");
                }
            });
        }

    });
})

app.get('/delete-favorite/:id', (req, res) => {
    //Select all customers and return the result object:
    con.query(`SELECT * FROM favoris WHERE ville = '${req.params.id}'`, function (err, result) {
        if (err) throw err;
        if (!result[0]) {
            res.send("la ville n'exist pas n'existe pas");
        } else {
            con.query(`SELECT * FROM favoriuserlink WHERE IDfavori = 9 AND IDuser = 1`, function (err, resp) {
                if (resp[0]) {
                    con.query(`DELETE FROM favoriuserlink WHERE IDfavori = 9`, function (err, result) {
                        res.send("success");
                    });
                } else {
                    res.send("ce favoris n'existe pas");
                }
            });
        }
    });
})

app.post('/add-history', (req, res) => {
    //Select all customers and return the result object:
    con.query(`INSERT INTO weather (temperature, ville ,humidité, icone, vent, description ) VALUES (18, "test", 97, "01d", 18, "test")`, function (err, result, fields) {
        if (err) throw err;
        result.insertId;
        con.query(`INSERT INTO historique (data, date ,IDuser) VALUES ("${result.insertId}", NOW(), 1)`, function (err, result, fields) {
            if (err) throw err;
            res.send("success");
        });
    });
})

async function hash(password) {
    return await new Promise((resolve, reject) => {
        bcrypt.hash(password, 10, function (err, hash) {
            if (err) reject(err)
            resolve(hash)
        })
    });
}

async function compare(password) {
    return await new Promise((resolve, reject) => {
        bcrypt.compare(password, "$2b$10$kWoHStUFGAJUEc5OtxZkeuXTKQRwiWp6MbXBRm6wHqm/69O2pm.Cq", function (err, result) {
            if (err) reject(err)
            resolve(result);
        });
    })
}

app.post("/test", (req, res) => {
    console.log(req.body);
    res.send("ok");
})