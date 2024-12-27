const IP = 'localhost'

const express = require('express')
const app = express()
const bodyParser = require('body-parser');



const jwt = require('jsonwebtoken')


const verificatoken = require('../autenticacion')


var simplify = require('../simplifica')


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))


// parse application/json
app.use(bodyParser.json())


const hbs = require('hbs')
const mongoose = require('mongoose');


const Cordenadas = require('../cordenada.js');
//const Sesiones = require('../sesiones.js');

const Usuario = require('../modelo/usuario');

const { use } = require('./login');
//const { getMaxListeners } = require('../modelo/usuario');
var cordenadas = new Cordenadas('loro', 'pepe');


app.set('title', 'ESCUDERO')




app.get('/muro', verificatoken, async(req, res) => {

    let body = req.usuario
    var amigos = []

    let usuario = await Usuario.findById(req.usuario._id, function(err, usuarioDB) { //falta gestión de usuario...

        if (!usuarioDB) {
            res.render('borraToken.hbs', {
                ok: true

            });
        }

    });
    usuario.amigos.forEach(element => {

        amigos.push(element)
            //console.log("añadimos amigo: " + element)
    })


    // console.log("amigos variable :  " + usuario.amigos)
    //console.log("amigos req :  " + amigos)
    amigos.push(usuario._id) //añadimos a sí mismo para mostrar en muro y a continuación sus amigos

    //console.log("numero de amigos:  " + amigos.length)
    // console.log("amigos total :  " + amigos)
    var URL_geojson = [] //coger el HTML de archivo mejor... mientras un poco de spaguettis:
    URL_geojson += `<head><script> function cerrar(){                    
             
        localStorage.removeItem('token')      
         location.href="/"
  
        }</script></head>`
    URL_geojson += `   <body>`
    URL_geojson += `<nav>`
    URL_geojson += `<p id="user">${usuario.nombre}</p>`


    var sesion = 0

    //for (var i = 0; i < 1000; i++) { console.log("_") }



    let user = Usuario.find({
        '_id': {
            $in: amigos

        }
    }).sort({ nombre: 1 }).exec(function(err, usuarioDB) {

        if (err) {
            console.log("error en find de muro:" + err)

            return res.status(400).json({
                ok: false,
                err
            });



        }



        res.render('muro.hbs', {

            muro: JSON.stringify(usuarioDB),
            usuario: body.nombre


        });


    });

});








app.get('/sesion/:sesion_id/:id', (req, res) => { //para introducir cabecera de token JWT a home.hbs (siguiente ruta)

    //res.header("Access-Control-Allow-Origin", '*');

    let sesionID = req.params.sesion_id; //será el número de sesión
    let id = req.params.id;
    //leerfichero de sesiones elegida en sesion_id

    res.render('home_header.hbs', {
        ok: true,
        sesion: sesionID,
        id




    });

});


app.get('/mapa_header/:sesion_id/:id', verificatoken, (req, res) => { //genera la sesión elegida. sesion_id será lo que responda el navegador del usuario

    //res.header("Access-Control-Allow-Origin", '*');

    let sesionID = req.params.sesion_id; //será el número de sesión
    let id_solicitada = req.params.id;
    let id_propia = req.usuario._id; //el token siempre identifica al solicitante
    var propia = 1;
    if (id_propia != id_solicitada) {
        propia = 0;
    }
    console.log("propia: " + propia + ", ids: " + id_propia + ", " + id_solicitada)

    //leerfichero de sesiones elegida en sesion_id

    //let body = req.usuario
    //console.log("parametros:: " + req.params.id)

    Usuario.findById(id_solicitada, function(err, usuarioDB) { //falta gestión de usuario...

        if (err) {
            // console.log("error en find, campo: " + id)
            // console.log(usuarioDB)
            return res.status(400).json({
                ok: false,
                err
            });
        }

        //  let tiempo_navegado = usuarioDB.hora_fin - usuarioDB.hora_fin
        let tiempo_ini = Date.parse(usuarioDB.hora[sesionID])
        let tiempo_fin = Date.parse(usuarioDB.hora_fin[sesionID])
        var tiempo_navegado = tiempo_fin - tiempo_ini
            //var date = new Date(tiempo_navegado);


        //convertimos milisengundos en legible
        var segundos = tiempo_navegado / 1000;
        var horas = parseInt(segundos / 3600);
        segundos = segundos % 3600;
        var minutos = parseInt(segundos / 60);
        segundos = segundos % 60;


        let sesion = "tiempo navegado: " + horas + " horas, " + minutos + " minutos, " + segundos + " segundos. "






        var aux_vela_selecionada = 0;
        //console.log(JSON.stringify(usuarioDB.velas))
        if (usuarioDB.vela_usada[sesionID].replace(/['"]+/g, '') != "-") { aux_vela_selecionada = 1 }

        console.log("distancia === " + usuarioDB.distancia[sesionID])

        res.render('home.hbs', { //CAMBIAR A HOME 1*******************************************
            ok: true,
            usuario: usuarioDB.nombre,
            coordinates: usuarioDB.cordenadas[sesionID],
            velocidad: usuarioDB.velocidad[sesionID],
            direccion: usuarioDB.direccion[sesionID],
            velMax: usuarioDB.velMax[sesionID],
            hora: usuarioDB.hora[sesionID],
            hora_fin: usuarioDB.hora_fin[sesionID],
            distancia: usuarioDB.distancia[sesionID],
            altitud: usuarioDB.altitud[sesionID],
            sesion: sesion,
            sesionID,
            id_propia, //no usada
            id_solicitada, //no usada
            propia,
            viento: usuarioDB.viento[sesionID],
            dir: usuarioDB.dir[sesionID],
            clima: usuarioDB.clima[sesionID],
            spot: usuarioDB.spot[sesionID],
            temp: usuarioDB.temp[sesionID],
            aux_vela_selecionada,
            velas: JSON.stringify(usuarioDB.velas),
            vela_usada: usuarioDB.vela_usada[sesionID].replace(/['"]+/g, ''),
            tablas: JSON.stringify(usuarioDB.tablas),
            tabla_usada: usuarioDB.tabla_usada[sesionID].replace(/['"]+/g, ''),
            aletas: JSON.stringify(usuarioDB.aletas),
            aleta_usada: usuarioDB.aleta_usada[sesionID].replace(/['"]+/g, ''),




        });
    })



});



app.get('/soloUsuario/:id', verificatoken, (req, res) => { //genera el muro con todas las sesiones

    let id = req.params.id;
    Usuario.findById(id, function(err, usuarioDB) {

        if (err) {
            console.log("error en find:")
                //console.log(usuarioDB)
            return res.status(400).json({
                ok: false,
                err
            });
        }



        res.render('soloUsuario.hbs', {

            muro: JSON.stringify(usuarioDB),
            usuario: usuarioDB.nombre


        });

    })
});

module.exports = app