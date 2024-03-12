require('dotenv').config();
const express = require('express');
var mysql = require('mysql');
const cors = require('cors');
const app = express();
const port = process.env.PORT;
const bcrypt = require('bcrypt');
const { restart } = require('nodemon');

// MIDDLEWARE FUNCION
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(express.json());

var pool  = mysql.createPool({
    connectionLimit : 10,
    host            : process.env.DBHOST,
    user            : process.env.DBUSER,
    password        : process.env.DBPASS,
    database        : process.env.DBNAME,
    timezone: 'UTC'
});

app.get('/', function (req, res) {
    res.send('AutoAlibi Alkatreszek');
});

app.post('/register', async function (req, res){
    let {name, email, password1, password2} = req.body
    if(!name || !email || !password1 || !password2) return res.status(400).send({msg: {description: "Hiányzó adatok!", type: "error"}})
    if(password1 != password2) return res.status(400).send({msg: {description: "Két jelszó nem egyezik!", type: "error"}})

    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password1, salt);

    pool.query(`INSERT INTO users(name, email, password) VALUES ('${name}','${email}','${hash}')`, (err, results)=>{
        if(err) {
            console.error(err);
            res.status(500).send({msg: {description: "Adatbázis hiba!", type: "error"}})
            return
        }
        res.send({msg: {description: "Sikeres regisztráció!", type: "success"}})
    })
})

app.post('/login', async function(req, res){
    let {email, password} = req.body
    if(!email || !password) return res.status(400).send({msg: {description: "Hiányzó adatok!", type: "error"}})

    pool.query(`SELECT * FROM users WHERE (email = '${email}')`, async (err, results)=>{
        if(err) {
            console.error(err);
            res.status(500).send({msg: {description: "Adatbázis hiba!", type: "error"}})
            return
        }
        if(!results[0]) return res.status(400).send({msg: {description: "Hibás e-mail/jelszó!", type: "error"}});
        const compare = await bcrypt.compare(password, results[0].password);
        if(!compare) return res.status(400).send({msg: {description: "Hibás e-mail/jelszó!", type: "error"}});
        res.send({msg: {description: "Sikeres bejelentkezés!", type: "success"}});
    })
})

  app.listen(port, () => {
    console.log(`Server listening on port ${port}...`);
});