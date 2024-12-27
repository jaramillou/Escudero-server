const IP = 'localhost'
    /*
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



    app.use(express.static('public'));










    app.post('/envio', verificatoken, async(req, res) => { // añade nueva cordenada al usuario
        res.header("Access-Control-Allow-Origin", '*');
        this.body = req.body







        let vel = this.body.velocidad
        let velMax = this.body.velMax

        console.log(req.usuario.nombre + " este usuario con hora enviado desde IOS: " + (this.body.hora))

        let coords = this.body.GeoJson


        var a = await tiempo.climaSpot(this.body.GeoJson[0][1], this.body.GeoJson[0][0])

        console.log("tiempo en: " + this.body.GeoJson[0][1] + ' , ' + this.body.GeoJson[0][0] + " = " + a.dir)


        var fc = { "type": "FeatureCollection", "features": [] }
        var size = 1;

        for (var i = 0; i < coords.length; i += size - 1) {

            var smallarray = coords.slice(i, i + size);
            // Split the original linestring into chunks.
            // Each chunk goes in a specific feature.
            fc.features.push({
                "type": "Feature",
                // Fake elevation information.
                "properties": { "ele": vel[i] },
                "geometry": {
                    "type": "LineString",
                    "coordinates": smallarray
                }
            })
        }

        var multstring = JSON.stringify(fc)



        console.log("usuario: " + this.body.nombre)
        let direccion = Number(a.dir) + 180 //los grados de dirección meteorológicos son al revés de la flecha.
        Usuario.findOneAndUpdate({ _id: req.usuario._id }, {

            $push: {
                cordenadas: multstring,
                velocidad: vel,
                velMax: this.body.velMax,
                hora: this.body.hora,
                hora_fin: this.body.hora_fin,
                viento: a.viento,
                dir: direccion,
                temp: a.temp,
                spot: a.spot,
                clima: a.clima,
                vela_usada: "-",
                tabla_usada: "-",
                aleta_usada: "-"
            }

        }, { new: true }, (err, usuarioDB) => {

            if (err) {

                console.log("error al grabar coordenadas de usuario" + usuarioDB)
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            //console.log("usuario cargadossss: " + usuarioDB)

            console.log("cordenadas añadidas******")

            res.json({
                ok: true,
                //usuario: usuarioDB
            });

        })

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
        usuario.hora.splice(sesionID, 1)
        usuario.hora_fin.splice(sesionID, 1)
        usuario.velMax.splice(sesionID, 1)
        usuario.descripcion.splice(0, 1)
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
            }

        });
        res.json({
            ok: true,
        });

    });




    module.exports = app

    */