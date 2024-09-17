const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:'); // banco de dados

const app = express();
app.use(bodyParser.json());
app.use(express.static('public')); // arquivos estáticos

// tabela de usuários
db.serialize(() => {
    db.run("CREATE TABLE users (email TEXT UNIQUE, password TEXT)");
});

app.post('/register', (req, res) => {
    const { email, password } = req.body;

    bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Erro ao criar conta.' });
        }

        db.run("INSERT INTO users (email, password) VALUES (?, ?)", [email, hash], (err) => {
            if (err) {
                return res.status(400).json({ success: false, message: 'Email já registrado.' });
            }
            res.json({ success: true });
        });
    });
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;

    db.get("SELECT password FROM users WHERE email = ?", [email], (err, row) => {
        if (err || !row) {
            return res.status(400).json({ success: false, message: 'Email ou senha inválidos.' });
        }

        bcrypt.compare(password, row.password, (err, result) => {
            if (err || !result) {
                return res.status(400).json({ success: false, message: 'Email ou senha inválidos.' });
            }
            res.json({ success: true });
        });
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
