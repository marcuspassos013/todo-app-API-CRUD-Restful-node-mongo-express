const express = require('express');
const bodyParser = require('body-parser');

// create express app
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())

// Configuring the database
const dbConfig = require(`./config/database.config.js`);
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("conectado ao bando de dados com sucesso");
}).catch(err => {
    console.log('Não foi possível se conectar ao banco de dados. Saindo agora...', err);
    process.exit();
});

// define a simple route
app.get('/', (req, res) => {
    res.json({ "message": "Bem vindo ao Todo App" });
});

require('./app/routes/todo.routes.js')(app);

// listen for requests
app.listen(4000, () => {
    console.log("Servidor rodando na porta 4000");
});