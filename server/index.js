const express = require('express');
const mysql = require('mysql');
const app = express();
const cors = require('cors');
const port = 5000;
require('dotenv').config()

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

app.get('/', (req, res) => {
    //Select all customers and return the result object:
    con.query("SELECT * FROM users", function (err, result, fields) {
        if (err) throw err;
        if (!result[0]) {
            res.send("aucun utilisateur a afficher");
        }
        res.send(result);
    });
})