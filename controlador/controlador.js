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
//app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));


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
app.use(require('./Velas.js'))
app.use(require('./Velocidad.js'))


app.use(express.static('public'));










app.post('/envio', verificatoken, async(req, res) => { // añade nueva cordenada al usuario
    res.header("Access-Control-Allow-Origin", '*');
    this.body = req.body
    if (this.body.GeoJson.length < 2) { //no guardamos cuando son menosde dos coordendas, por fallo en conversion multystring
        res.json({
            ok: false,
            //usuario: usuarioDB
        });
    } else {

       

        let vel = JSON.stringify(this.body.velocidad)
        let dir = JSON.stringify(this.body.direccion)
        let alt = JSON.stringify(this.body.altitud)
        let velMax = this.body.velMax

        let vel2seg = velocidad2Segundos(vel)
        let vel10s = velocidad10Segundos(vel)
        let vel500m = velocidad500(vel)

        console.log(req.usuario.nombre + " este usuario con hora enviado desde IOS: " + (this.body.hora))

        let coord = JSON.stringify(this.body.GeoJson)


        var a = await tiempo.climaSpot(this.body.GeoJson[0][1], this.body.GeoJson[0][0])

        console.log("tiempo en: " + this.body.GeoJson[0][1] + ' , ' + this.body.GeoJson[0][0] + " = " + a.dir)






        console.log("usuario: " + this.body.nombre)
        let direccion = Number(a.dir) + 180 //los grados de dirección meteorológicos son al revés de la flecha.
        let vMax = this.body.velMax * 1.94384
        Usuario.findOneAndUpdate({ _id: req.usuario._id }, {
            $push: {
                cordenadas: coord,
                velocidad: vel, // * 1.94384,
                direccion: dir,
                altitud: alt,
                velMax: vMax.toFixed(2),
                vel2Seg: vel2seg,
                hora: this.body.hora,
                hora_fin: this.body.hora_fin,
                distancia: this.body.distancia.toFixed(1),
                viento: Math.round(a.viento * 1.94384),
                dir: direccion,
                temp: a.temp,
                spot: a.spot,
                clima: a.clima,
                vela_usada: "-",
                tabla_usada: "-",
                aleta_usada: "-"

                //ssc

            }
        }, { new: true }, (err, usuarioDB) => {

            if (err) {

                console.log("error al grabar coordenadas de usuario" + usuarioDB)
                return res.status(400).json({
                    ok: false,
                    err
                });
            } else {
                console.log("cordenadas añadidas******")
                res.json({
                    ok: true,
                    //usuario: usuarioDB
                });
            }

        })
    } //else
});





app.post('/borrar/:sesionID', verificatoken, async(req, res) => {


    let sesionID = req.params.sesionID; //será el número de sesión
    let id = req.body._id;

    console.log("cordenadas  borrando elemento: " + sesionID)



    var usuario = await Usuario.findById(req.usuario._id, function(err, usuarioDB) { //falta gestión de usuario...

        // console.log("amigos req :  " + amigos)

    });

    usuario.cordenadas.splice([sesionID], 1)
    usuario.velocidad.splice([sesionID], 1) //reparar velocidad en matriz como cordenadas
    usuario.altitud.splice([sesionID], 1)
    usuario.direccion.splice([sesionID], 1)
    usuario.hora.splice(sesionID, 1)
    usuario.hora_fin.splice(sesionID, 1)
    usuario.velMax.splice(sesionID, 1)
    usuario.descripcion.splice(0, 1)
    usuario.distancia.splice(sesionID, 1)
    usuario.viento.splice(sesionID, 1)
    usuario.dir.splice(sesionID, 1)
    usuario.temp.splice(sesionID, 1)
    usuario.clima.splice(sesionID, 1)
    usuario.spot.splice(sesionID, 1)
    usuario.vela_usada.splice(sesionID, 1)
    usuario.tabla_usada.splice(sesionID, 1)
    usuario.aleta_usada.splice(sesionID, 1)


    usuario.save(function(err) {
        if (err) {
            console.log(err);
        } else {
            console.log("cordenadas  borrado elemento: ")
            res.json({
                ok: true,
            });
        }

    });


});




module.exports = app