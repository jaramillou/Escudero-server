const express = require('express')
const app = express()
    //const bodyParser = require('body-parser');

require('./config');
const port = process.env.PORT || 3000;

// parse application/x-www-form-urlencoded
//app.use(bodyParser.urlencoded({ extended: false }))


// parse application/json
//app.use(bodyParser.json())


const hbs = require('hbs')
const mongoose = require('mongoose');


//const Cordenadas = require('./cordenada.js');
//const Sesiones = require('./Sesiones.js');
//const Usuario = require('./modelo/usuario');
//const { getMaxListeners } = require('./modelo/usuario');
//var cordenadas = new Cordenadas('loro', 'pepe');
//var sesiones = new Sesiones('jesus')


app.use(require('./controlador/controlador'))

app.use(express.static(__dirname + '/public'));
hbs.registerPartials(__dirname + '/views/parciales');
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials', function(err) {});
require('./controlador/controlador');









mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect(process.env.URLDB, (err, res) => {

    if (err) throw err;

    console.log('Base de datos ONLINE');

});


app.listen(process.env.PORT, () => {
    console.log('Escuchando puerto: ', process.env.PORT);
});