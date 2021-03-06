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

const tiempo = require('./clima.js');
const Cordenadas = require('../cordenada.js');

//const Sesiones = require('../Sesiones.js');
const Usuario = require('../modelo/usuario');
const { getMaxListeners } = require('../modelo/usuario');
var cordenadas = new Cordenadas('loro', 'pepe');


app.use(require('./login.js'))
app.use(require('./nuevoUsuario.js'))
app.use(require('./navegacion.js'))
app.use(require('./amigos.js'))



app.use(express.static('public'));

//app.use(express.static(__dirname + '../public'));
//hbs.registerPartials(__dirname + '../views/parciales');
//app.set('view engine', 'hbs');
//hbs.registerPartials(__dirname + '../views/partials', function(err) {});








app.post('/envio', verificatoken, async(req, res) => { // añade nueva cordenada al usuario
    res.header("Access-Control-Allow-Origin", '*');
    this.body = req.body







    let vel = this.body.velocidad
    let velMax = this.body.velMax

    console.log(req.usuario.nombre + " este usuario con hora enviado desde IOS: " + (this.body.hora))

    let coord = JSON.stringify(this.body.GeoJson)


    var a = await tiempo.climaSpot(this.body.GeoJson[0][1], this.body.GeoJson[0][0])

    console.log("tiempo en: " + this.body.GeoJson[0][1] + ' , ' + this.body.GeoJson[0][0] + " = " + a.dir)

    //var usuario = await Usuario.findOneAndUpdate(req.usuario._id, function(err, usuarioDB) { //falta gestión de usuario...

    // console.log("amigos req :  " + amigos)

    //);
    //usuario.viento.$push(a.desc)




    console.log("velMax: " + this.body.velMax)
    Usuario.findOneAndUpdate({ _id: req.usuario._id }, {
            $push: {
                cordenadas: coord,
                velocidad: vel,
                velMax: this.body.velMax,
                hora: this.body.hora,
                hora_fin: this.body.hora_fin,
                viento: a.viento,
                dir: a.dir,
                temp: a.temp,
                spot: a.spot,
                clima: a.clima



            }
        }, { new: true }, (err, usuarioDB) => {

            if (err) {

                console.log(usuarioDB)
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            //console.log("usuario cargadossss: " + usuarioDB)

            console.log("cordenadas añadidas******")

            res.json({
                ok: true,
                usuario: usuarioDB
            });

        })
        /*
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
        Usuario.findOneAndUpdate({ _id: req.usuario._id }, { $push: { hora: this.body.hora } }, { new: true }, (err, usuarioDB) => {

            if (err) {
                console.log("error en push velocidad")
                console.log(usuarioDB)
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
        });
        Usuario.findOneAndUpdate({ _id: req.usuario._id }, { $push: { hora_fin: this.body.hora_fin } }, { new: true }, (err, usuarioDB) => {

            if (err) {
                console.log("error en push velocidad")
                console.log(usuarioDB)
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
        });
        */
});





app.post('/borrar/:sesionID', verificatoken, async(req, res) => {


    let sesionID = req.params.sesionID; //será el número de sesión
    let id = req.body._id;

    console.log("cordenadas  borrando elemento: " + sesionID)



    var usuario = await Usuario.findById(req.usuario._id, function(err, usuarioDB) { //falta gestión de usuario...

        // console.log("amigos req :  " + amigos)

    });
    console.log("cordenadas  borrado elemento: " + usuario.cordenadas[sesionID])
    usuario.cordenadas.splice([sesionID], 1)
    usuario.velocidad.splice(0, 1) //reparar velocidad en matriz como cordenadas
    usuario.hora.splice(sesionID, 1)
    usuario.hora_fin.splice(sesionID, 1)
    usuario.velMax.splice(sesionID, 1)
    usuario.descripcion.splice(0, 1)

    usuario.save(function(err) {
        if (err) {
            console.log(err);
        } else {
            console.log("cordenadas  borrado elemento: " + usuario.cordenadas)
        }

    });

    /*
        var borrado = Usuario.findOneAndUpdate({ _id: req.usuario._id }, { $pull: { cordenadas: {cordenadas.0} } }, (err, usuarioDB) => {

            if (err) {

                console.log("cordenadas no borradas")
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            console.log("cordenadas  borrado elemento: " + usuarioDB)

            res.json({
                ok: true,
                usuario: usuarioDB
            });

        });

        
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
            Usuario.findOneAndUpdate({ _id: req.usuario._id }, { $push: { hora: this.body.hora } }, { new: true }, (err, usuarioDB) => {

                if (err) {
                    console.log("error en push velocidad")
                    console.log(usuarioDB)
                    return res.status(400).json({
                        ok: false,
                        err
                    });
                }
            });
            Usuario.findOneAndUpdate({ _id: req.usuario._id }, { $push: { hora_fin: this.body.hora_fin } }, { new: true }, (err, usuarioDB) => {

                if (err) {
                    console.log("error en push velocidad")
                    console.log(usuarioDB)
                    return res.status(400).json({
                        ok: false,
                        err
                    });
                }
                */
});




module.exports = app