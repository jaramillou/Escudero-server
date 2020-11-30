const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const cors = require('cors');
const port = process.env.PORT || 3000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))


// parse application/json
app.use(bodyParser.json())


const hbs = require('hbs')
const mongoose = require('mongoose');


var body;



const Cordenadas = require('./cordenada.js');
var cordenadas = new Cordenadas('loro', 'pepe');
//var cord = require('./cordenada.js');
//cord.Cordenadas("hola", "puta");
//cordenada = cordenadaLocal;

app.use(express.static(__dirname + '/public'));

hbs.registerPartials(__dirname + '/views/parciales');
app.set('view engine', 'hbs');



app.post('/envio', function(req, res) {

    res.header("Access-Control-Allow-Origin", '*');
    this.body = req.body

    var cordenadaLocal = require('./cordenada.js').default;
    // cordenadaLocal = new Cordenadas(req.body.pal, "puta");
    //cordenadas = cordenadaLocal;
    cordenadas.setCordenadas = this.body


    if (this.body === undefined) {

        res.status(400).json({
            ok: false,
            mensaje: 'El nombre es necesario'

        });

    } else {
        res.json({

            persona: this.body
        });
    }

    console.log(cordenadas);
    console.log("geson: ")
    console.log(cordenadas.getGeoJson)


});



app.get('/usuario', (req, res) => {

    res.header("Access-Control-Allow-Origin", "*");

    var nom = cordenadas;
    // console.log(cordenadas.getNombre);
    if (nom === undefined) {
        nom = "no hay nombre____";
        res.render('usuario.hbs', {
            nombre: nom.getNombre
        })
    } else {;
        res.render('usuario.hbs', {
            nombre: nom.getNombre

        });

    };
});



app.get('/', (req, res) => {
    // console.log("geson: ")
    //console.log(cordenadas.getGeoJson)
    res.render('home.hbs', {

        geoJson: cordenadas.getGeoJson.replace(/&quot;/, '"'),
        coordinates: cordenadas.coordinates //generea una cade de texto en vez de su valor real

    });

    /*
        app.get('/enviar', function(req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            // res.json("pimiento");
            let nom = body.nombre;
            res.render('usuario.hbs', {
                nombre: cordenadas.type,
                anio: new Date().getFullYear()
            });
        })
    */

});
app.get('/about', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.render('about.hbs', {
        nombre: 'JESUS',
        anio: new Date().getFullYear()
    });


});




app.get('/enviar', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    // res.json("pimiento");
    let nom;
    if (nom === undefined) {
        nom = "no hay nombre****";
        res.render('enviar.hbs', {
            nombre: req.body.pal
        })
    } else {
        nom = body.nombre;
        res.render('enviar.hbs', {
            nombre: this.body.pal,

        });

    };

});




/*

mongoose.connect('mongodb://localhost:27017/,mapas', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}, (err, res) => {
    if (err) throw err;

    console.log('base de datos ONLINE');
});
*/

//app.listen(3000, "0.0.0.0");
app.listen(port, () => 'escuchando en el puerto ${  port }');

hbs.registerPartials(__dirname + '/views/partials', function(err) {});

//export class { Cordenadas };