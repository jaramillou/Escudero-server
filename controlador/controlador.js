const IP = 'localhost'

const express = require('express')
const app = express()
const bodyParser = require('body-parser');

var cors = require('cors')
const axios = require('axios');

const bcrypt = require('bcrypt') //pasar este bloque a controlador/login
const jwt = require('jsonwebtoken')
const verificatoken = require('../autenticacion')


require('../config');
const port = process.env.PORT || 3000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))


// parse application/json
app.use(bodyParser.json())


const hbs = require('hbs')
const mongoose = require('mongoose');


const Cordenadas = require('../cordenada.js');
const Sesiones = require('../Sesiones.js');
const Usuario = require('../modelo/usuario');
const { getMaxListeners } = require('../modelo/usuario');
var cordenadas = new Cordenadas('loro', 'pepe');
var sesiones = new Sesiones('jesus')

app.use(require('./login.js'))
app.use(require('./nuevoUsuario.js'))
app.use(require('./navegacion.js'))

app.use(express.static('public'));

//app.use(express.static(__dirname + '../public'));
//hbs.registerPartials(__dirname + '../views/parciales');
//app.set('view engine', 'hbs');
//hbs.registerPartials(__dirname + '../views/partials', function(err) {});








app.post('/envio', verificatoken, function(req, res) { // añade nueva cordenada al usuario
    res.header("Access-Control-Allow-Origin", '*');
    this.body = req.body



    let vel = this.body.velocidad
    let velMax = this.body.velMax

    let coord = JSON.stringify(this.body.GeoJson)
    console.log("enviado desde IOS: " + JSON.stringify(this.body.GeoJson))


    console.log("velMax: " + this.body.velMax)
    Usuario.findOneAndUpdate({ _id: req.usuario._id }, { $push: { cordenadas: coord } }, { new: true }, (err, usuarioDB) => {

        if (err) {
            console.log("error en push coordenadas")
            console.log(usuarioDB)
            return res.status(400).json({
                ok: false,
                err
            });
        }

        console.log("usuario cargadossss: " + usuarioDB)



        res.json({
            ok: true,
            usuario: usuarioDB
        });

    })
    Usuario.findOneAndUpdate({ _id: req.usuario._id }, { $push: { velocidad: vel } }, { new: true }, (err, usuarioDB) => {

        if (err) {
            console.log("error en push velocidad")
            console.log(usuarioDB)
            return res.status(400).json({
                ok: false,
                err
            });
        }
    });
    Usuario.findOneAndUpdate({ _id: req.usuario._id }, { $push: { velMax: this.body.velMax } }, { new: true }, (err, usuarioDB) => {

        if (err) {
            console.log("error en push velocidad")
            console.log(usuarioDB)
            return res.status(400).json({
                ok: false,
                err
            });
        }
    });
});



module.exports = app