require('dotenv').config();
const express = require('express');
var mysql = require('mysql');
const cors = require('cors');
const app = express();
const port = process.env.PORT;
const bcrypt = require('bcrypt');
const { restart } = require('nodemon');
const utils = require('./utils/utils.js');
const {transporter} = require('./utils/mailer.js');

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
    const verifyEmail = utils.randomString(100);

    pool.query(`SELECT email from users WHERE email = '${email}'`, (err, results) =>{
        if(err){
            console.error(err);
            res.status(500).send({msg: {description: "Adatbázis hiba!", type: "error"}})
            return 
        }
        if(results[0]) return res.status(400).send({msg: {description: "Ez az Email már regisztrálva van!", type: "error"}});

        pool.query(`INSERT INTO users(name, email, password, verifyEmail) VALUES ('${name}','${email}','${hash}', '${verifyEmail}')`, (err, results)=>{
            if(err) {
                console.error(err);
                res.status(500).send({msg: {description: "Adatbázis hiba!", type: "error"}})
                return
            }
            transporter.sendMail({
                from: "Auto Alibi <autoalibi2024@gmail.com>",
                to: email,
                subject: "Sikeres regisztráció!",
                html: `<h1>Sikeresen regisztrált az AutóAlibi weboldalra!</h1>
                <hr>
                <p>Az E-mail címed megerősítéséhez kattinst az alábbi linkre:</p>
                <a href="http://localhost:5500/frontend/#!/verifyEmail?token=${verifyEmail}">http://localhost:5500/frontend/#!/verifyEmail?token=${verifyEmail}</a>
                `
            })
            res.send({msg: {description: "Sikeres regisztráció!", type: "success"}})
        })
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
        
        res.send({msg: {description: "Sikeres bejelentkezés!", type: "success"}, user: {nev: results[0].name, email: results[0].email, id: results[0].id}});
    })
})

app.post('/forgetPass', async function (req, res){
    let {email} = req.body
    if(!email || email.length == 0){
        return res.status(400).send({msg: {description: "Nincs ilyen E-mail!", type: "error"}});
    }
    pool.query(`SELECT * FROM users WHERE (email = '${email}')`, async (err, results) =>{
        if(err){
            console.error(err);
            res.status(500).send({msg: {description: "Adatbázis hiba!", type: "error"}})
            return
        }
        if(!results[0]) return res.status(400).send({msg: {description: "Az E-mail cím nincs regisztrálva!", type: "error"}});
        const passToken = utils.randomString(100);
        pool.query(`UPDATE users SET passToken = '${passToken}' WHERE email = '${email}'`, async (err, results) =>{
            if(err){
                console.error(err);
                res.status(500).send({msg: {description: "Adatbázis hiba!", type: "error"}})
                return
            }
            transporter.sendMail({
                from: "Auto Alibi <autoalibi2024@gmail.com>",
                to: email,
                subject: "Elfelejtett jelszó!",
                html: `<h1>Elfelejtett jelszó</h1>
                <hr>
                <p>Új jelszó megadásához, kattints az alábbi linkre:</p>
                <a href="http://localhost:5500/frontend/#!/newPass?token=${passToken}">http://localhost:5500/frontend/#!/newPass?token=${passToken}</a>
                `
            })
            res.send({msg: {description: "E-mail sikeresen elküldve!", type:"success"}, passToken})
        })
    })
})

app.post('/newPass', async function (req, res){
    const {token} = req.query
    console.log(req.body)
    if(!token){
        return res.status(400).send({msg: {description: "Nincs token megadva!", type: "error"}});
    }
    pool.query(`SELECT * FROM users WHERE passToken = '${token}'`, async (err, results) =>{
        if(err){
            console.error(err);
            res.status(500).send({msg: {description: "Adatbázis hiba!", type: "error"}})
            return
        }
        if(!results[0]) return res.status(400).send({msg: {description: "Ez a token nincs az adatbázisban!", type: "error"}});
        const {pass1, pass2} = req.body
        if(!pass1 || !pass2){
            return res.status(400).send({msg: {description: "Minden mezőt ki kell tölteni!", type: "error"}});
        }
        if(pass1 != pass2){
            return res.status(400).send({msg: {description: "Két jelszó nem egyezik!", type: "error"}});
        }
        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(pass1, salt);

        pool.query(`UPDATE users SET password = '${hash}', passToken = NULL WHERE passToken = '${token}'`, async (err, results) =>{
            if(err){
                console.error(err);
                res.status(500).send({msg: {description: "Adatbázis hiba!", type: "error"}})
                return
            }
            res.send({msg: {description: "Jelszó sikeresen megváltoztatva!", type:"success"}})
        })
    })
})
app.post('/verifyEmail', async function (req, res){
    const {token} = req.body
    if(!token){
        return res.sendStatus(400)
    }
    pool.query(`SELECT * FROM users WHERE verifyEmail = '${token}'`, async (err, results) =>{
        if(err){
            return res.sendStatus(400)
        }
        if(!results[0]) return res.sendStatus(400);
        pool.query(`UPDATE users SET verifyEmail = null WHERE verifyEmail = '${token}'`, async (err, results)=>{
            if(err){
                return res.sendStatus(400)
            }
            res.sendStatus(200)
        })
    })

})

app.get('/webshopItems', async function(req, res){
    const {type, search} = req.query
    if(!type){
        return res.status(400).send({msg: {description: "Nincs típus megadva!", type: "error"}});
    }
    if (search) {
        // ha van search query akkor a keresés alapján kérjük le az elemeket
        pool.query(`SELECT * FROM items WHERE AlkatreszTipus = '${type}' AND nev LIKE '%${search}%'`, async (err, results)=>{
            if(err){
                return res.status(500).send({msg: {description: "Adatbázis hiba!", type: "error"}})
            }
            res.send(results)
        })
    } else {
        pool.query(`SELECT * FROM items WHERE AlkatreszTipus = '${type}'`, async (err, results)=>{
            if(err){
                return res.status(500).send({msg: {description: "Adatbázis hiba!", type: "error"}})
            }
            res.send(results)
        })
    }
})

app.post('/webshopCart', async function(req, res){
    const data = req.body;
    const IDs = Object.keys(data)
    pool.query(`SELECT * FROM items WHERE id IN (${IDs.join(", ")})`, async (err, results)=>{
        if(err){
            return res.status(500).send({msg: {description: "Adatbázis hiba!", type: "error"}})
        }
        res.send(results)
    })
})
app.post('/order', async function(req, res){
    const {szamlazasi, szallitasi, kosar, fizetesimod, userid} = req.body;
    if(!szallitasi || !szamlazasi || !kosar || !fizetesimod || !userid) return  res.status(400).send({msg: {description: "Hiányzó adatok!", type: "error"}})

    // Vásárló adatainak felvétele a vásárló adatokhoz.
    pool.query(`INSERT INTO customerdata (userId, sznev, sztel, szirsz, szvar, szcim, szallnev, szalltel, szallirsz, szallvar, szallcim, ftipus) VALUES ('${userid}', '${szamlazasi.nev}', '${szamlazasi.telephone}', '${szamlazasi.postalcode}', '${szamlazasi.city}', '${szamlazasi.address}', '${szallitasi.nev}', '${szallitasi.telephone}', '${szallitasi.postalcode}', '${szallitasi.city}', '${szallitasi.address}', '${fizetesimod}')`, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send({ msg: { description: "Adatbázis hiba!", type: "error" } })
        }

        // Felvétel után elmentjük az új sor ID-jét
        const customerDataId = results.insertId;

        // Végigmegyünk a kosár elemein és felvesszük a rendelésekhez a megfelelő customerDataId-vel
        for (let i = 0; i < Object.keys(kosar).length; i++) {
            const itemId = Object.keys(kosar)[i];
            const count = kosar[`${itemId}`].count;

            pool.query(`INSERT INTO orders (userId, customerDataId, itemId, count) VALUES ('${userid}', '${customerDataId}', '${itemId}', '${count}')`, (err, results) => {
                if (err) {
                    console.error(err);
                    return res.status(500).send({msg: { description: "Adatbázis hiba!", type: "error" } });
                }
            });
        }
        res.send({ msg: { description: "Rendelés sikeresen elküldve!", type: "success" } });
    })
})
app.get('/orders/:userid', async function(req, res){
    const {userid} = req.params;
    let rendelesek = [];
    if(!userid) return  res.status(400).send({msg: {description: "UserID hiányzik!", type: "error"}})
    
    // Lekérdezzük az összes felhasználóhoz tartozó rendelés összes adatát, valamint a rendelésben lévő item adatait is
    pool.query(`SELECT * FROM orders INNER JOIN items ON items.id = orders.itemId WHERE userId = ${userid}`, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send({ msg: { description: "Adatbázis hiba!", type: "error" } });
        }

        // csinálunk egy tömböt amiben csak a rendelés számok szerepelnek egyszer.
        const rendelesIds = [...new Set(results.map(r => r.customerDataId))];

        // Végigmegyünk a rendelés ID-ken
        rendelesIds.forEach(id => {
            // Felvesszük az elemeket a megfelelő rendelés ID-hez
            rendelesek.push({
                // rendelés száma
                rszam: `#${id.toString().padStart(10, '0')}`,
                // rendelésben található elemek darabszáma
                db: results.filter(r => r.customerDataId == id).length,
                // rendelés teljes összege
                teljesOsszeg: results.map(r => {
                    // csak akkor vesszük fel a tömbbe az elemet ha a megfelelő rendelés ID-vel rendelkezik
                    if (r.customerDataId == id) {
                        return r.ar * r.count
                    }
                }).filter(r => r !== undefined).reduce((acc, curr) => {return curr + acc}),
                // hozzáadjuk az összes rendelésben lévő elem adatait, amelyeket megjelenítünk
                items: results.map(r => {
                    if (r.customerDataId == id) {
                        return {
                            nev: r.nev,
                            kep: r.kep,
                            ar: r.ar,
                            mennyiseg: r.count
                        }
                    }
                }).filter(r => r !== undefined) // elemek szűrése
            });
        });

        res.send(rendelesek);
    });
})
app.listen(port, () => {
    console.log(`Server listening on port ${port}...`);
});