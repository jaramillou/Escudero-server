const IP = 'localhost'

const express = require('express')
const app = express()
const bodyParser = require('body-parser');



const jwt = require('jsonwebtoken')


const verificatoken = require('../autenticacion')




// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))


// parse application/json
app.use(bodyParser.json())


const hbs = require('hbs')
const mongoose = require('mongoose');


const Cordenadas = require('../cordenada.js');
const Sesiones = require('../sesiones.js');

const Usuario = require('../modelo/usuario');

const { use } = require('./login');
//const { getMaxListeners } = require('../modelo/usuario');
var cordenadas = new Cordenadas('loro', 'pepe');


app.set('title', 'My Site')




function menor(params) {
    var aux = params[0]
    var pos = 0
    for (var i = 0; i < params.length; i++) {

        if (aux < params[i] || aux == null) {
            console.log(aux + " > " + params[i] + "cambia pos...")
            aux = params[i]
            pos = i

        } else {
            console.log(aux + " < " + params[i])


        }

    }
    return pos
}



app.get('/muro', verificatoken, (req, res) => {

    let body = req.usuario
    var amigos = [
        '60314ad1c0d61c3d40814133'
    ]
    amigos.push(req.usuario._id)
    req.usuario.amigos.forEach(element => {
        amigos.push(element)
    });
    console.log("amigos:  " + amigos)
    var URL_geojson = [] //coger el HTML de archivo mejor...
    URL_geojson += `<head><script> function cerrar(){               
             
        localStorage.removeItem('token')      
         location.href="/"
  
        }</script></head><body><p id="user">usuario</p>
   <input type="button" id = "botonCerrar"  value= "cerrar" onclick=cerrar()>
   <a href="/amigos/${req.usuario._id}" target="_blank" title="amigos">Amigos</a>`

    var sesion = 0



    //console.log("amisgos = " + amigos)
    Usuario.find({
        '_id': {
            $in: amigos

        }
    }).sort({ nombre: 1 }).exec(function(err, usuarioDB) {
        //console.log(usuarioDB);
        if (err) {
            console.log("error en find de muro:" + err)
                //console.log(usuarioDB)
            return res.status(400).json({
                ok: false,
                err
            });



        }

        console.log("0 :" + usuarioDB[0].hora[0])
        console.log("1 :" + usuarioDB[1].hora[0])
        console.log("2 :" + usuarioDB[2].hora[0])
        var n = []
        var horas = []
        var total = 0

        for (var i = 0; i < amigos.length; i++) {

            n[i] = usuarioDB[i].hora.length - 1 //llebará la cuenta de los que ya se han puesto en cada vector
            total += usuarioDB[i].hora.length //número total de sesiones de los amiguetes
            console.log("sesiones de cada usuariuo== " + usuarioDB[i].nombre + " : " + n[i])

        }
        console.log("amigos total = " + total)
        for (var j = total - 1; j > -1; j--) { ///todos los campos de los amigos
            for (var i = 0; i < amigos.length; i++) { //cogemos cada amigo
                if (n[i] > -1) {
                    horas[i] = usuarioDB[i].hora[n[i]] //juntamos las horas que quedan
                    console.log("horas en usuario== " + usuarioDB[i].nombre + " : " + horas[i])
                } else horas[i] = null



            }
            //[usuarioDB[0].hora[0], usuarioDB[1].hora[0], usuarioDB[2].hora[0]]

            var m = menor(horas)


            console.log("menor = " + m)



            URL_geojson += `<div><br><br><h3>usuario: ${usuarioDB[m].nombre},   fecha: ${usuarioDB[m].hora[n[m]]} </h3> `
            URL_geojson += `<a href="/sesion/${n[m]}/${usuarioDB[m]._id}"><img src="https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/geojson(%7B%22type%22%3A%22LineString%22%2C%22coordinates%22%3A${usuarioDB[m].cordenadas[n[m]]}%7D)/auto/1000x600?access_token=pk.eyJ1IjoiamphcmEiLCJhIjoiY2tkOGpkcDVzMGRuejJyb2RsYmUxcDZubCJ9.7-rob0zcnIsBcmy4SGL-_A"/>
            </a></div>`
            n[m]--
        }





        setTimeout(function() {}, 300000);
        res.send(URL_geojson)
    });

});










app.get('/sesion/:sesion_id/:id', (req, res) => { //para introducir cabecera de token JWT a home.hbs

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
    let id = req.params.id;
    //leerfichero de sesiones elegida en sesion_id

    //let body = req.usuario
    console.log("parametros:: " + req.params.id)

    Usuario.findById(id, function(err, usuarioDB) { //falta gestión de usuario...

        if (err) {
            console.log("error en find, campo: " + id)
            console.log(usuarioDB)
            return res.status(400).json({
                ok: false,
                err
            });
        }

        //  let tiempo_navegado = usuarioDB.hora_fin - usuarioDB.hora_fin
        let tiempo_ini = Date.parse(usuarioDB.hora[sesionID])
        let tiempo_fin = Date.parse(usuarioDB.hora_fin[sesionID])
        var tiempo_navegado = tiempo_fin - tiempo_ini
        var date = new Date(tiempo_navegado);

        let sesion = "tiempo navegado: " + Math.trunc(tiempo_navegado / (1000 * 60 * 600)) + " horas, " + Math.trunc(tiempo_navegado / (1000 * 60)) + " minutoss, " + (tiempo_navegado / 1000) + " segundos. "
            // console.log("tiempo navegado: " + tiempo_navegado / 1000 + " segundos, " + Math.trunc(tiempo_navegado / (1000 * 60)) + " minutoss," + Math.trunc(tiempo_navegado / (1000 * 60 * 600)) + " horas. ")



        cordenadas.coordinates = usuarioDB.cordenadas[sesionID]
        console.log("usuario: " + usuarioDB.nombre)
        console.log("sesion: " + sesionID)
        console.log("cordenadas: " + usuarioDB.cordenadas[sesionID])


        res.render('home.hbs', {
            ok: true,
            coordinates: usuarioDB.cordenadas[sesionID],
            velMax: usuarioDB.velMax[sesionID],
            hora: usuarioDB.hora[sesionID],
            hora_fin: usuarioDB.hora_fin[sesionID],
            sesion: sesion


        });
    })



});

module.exports = app


/*const IP = 'localhost'

const express = require('express')
const app = express()
const bodyParser = require('body-parser');



const jwt = require('jsonwebtoken')


const verificatoken = require('../autenticacion')




// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))


// parse application/json
app.use(bodyParser.json())


const hbs = require('hbs')
const mongoose = require('mongoose');


const Cordenadas = require('../cordenada.js');
const Sesiones = require('../sesiones.js');

const Usuario = require('../modelo/usuario');
const usuario = require('../modelo/usuario');
const { use } = require('./login');
//const { getMaxListeners } = require('../modelo/usuario');
var cordenadas = new Cordenadas('loro', 'pepe');


app.set('title', 'My Site')




function menor(params) {
    var aux = params[0]
    var pos = 0
    for (var i = 1; i < params.length; i++) {
        if (aux > params[i]) {
            aux = params[i]
            pos = i
            console.log(aux > params[i])
        }

    }
    return pos
}

function compare(a, b) {
    if (a.hora < b.hora) {
        return 1;
    }
    if (a.hora > b.hora) {
        return -1;
    }
    return 0;
}
/*
app.get('/muro', verificatoken, (req, res) => { //genera el muro con todas las sesiones

            let body = req.usuario



            var muro = [Usuario]

            /*
                // var amigos = Object.assign({}, usuarioDB)
                //var muro = Usuario

                // muro.cordenadas = Object.assign({}, usuarioDB.cordenadas)

                var siguiendo = ['6023a0a95979150fc878b1fe', '60239fd098074541ac938da2']

                for (var i = 0; i < siguiendo.length; i++) {

                    Usuario.findById(siguiendo[i], function(err, amigo) {

                        if (err) {
                            console.log("error en find:")
                            console.log(usuarioDB)
                            return res.status(400).json({
                                ok: false,
                                err
                            });
                        }
                        muro[i] = Object.assign({}, amigo)
                            //muro[i] = amigo
                        console.log("amigo añadido")

                    });

                }

                setTimeout(function() {
                    console.log(muro[0].hora)
                        //put your code in here to be delayed by 2 seconds
                }, 2000);


            });

            





app.get('/muro', verificatoken, (req, res) => {

    let body = req.usuario
    var URL_geojson = []

    var sesion = 0
    var amigos = [
        '6023a0cb5979150fc878b1ff',
        '60239fd098074541ac938da2',
        '6023a0a95979150fc878b1fe'

    ]
    usuario.find({
        '_id': {
            $in: amigos

        }
    }).sort({ nombre: 1 }).exec(function(err, usuarioDB) {
        //console.log(usuarioDB);
        if (err) {
            console.log("error en find:")
                //console.log(usuarioDB)
            return res.status(400).json({
                ok: false,
                err
            });



        }



        console.log("0 :" + usuarioDB[0].hora[0])
        console.log("1 :" + usuarioDB[1].hora[0])
        console.log("2 :" + usuarioDB[2].hora[0])
        var n = []
        var horas = []
        var total = 0

        for (var i = 0; i < amigos.length; i++) {

            n[i] = 0 //llebará la cuenta de los que ya se han puesto en cada vector
            total += usuarioDB[i].hora.length //número total de sesiones de los amiguetes

        }
        console.log("amigos total = " + total)
        for (var j = 0; j < total - 1; j++) { ///todos los campos de los amigos
            for (var i = 0; i < amigos.length - 1; i++) { //cogemos cada amigo

                horas[i] = usuarioDB[i].hora[n[i]] //juntamos las horas que quedan

            }
            //[usuarioDB[0].hora[0], usuarioDB[1].hora[0], usuarioDB[2].hora[0]]
            var m = menor(horas)


            console.log("usuario  = " + usuarioDB[m].nombre + " sesion = " + n[m] + " en m= " + m)

            URL_geojson += `<div><br><h3>usuario: ${usuarioDB[m].nombre} , sesion: ${n[m]} </h3> `
            URL_geojson += `<a href="/${n[m]}/${usuarioDB[m]._id}"><img src="https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/geojson(%7B%22type%22%3A%22LineString%22%2C%22coordinates%22%3A${usuarioDB[m].cordenadas[n[m]]}%7D)/auto/1000x600?access_token=pk.eyJ1IjoiamphcmEiLCJhIjoiY2tkOGpkcDVzMGRuejJyb2RsYmUxcDZubCJ9.7-rob0zcnIsBcmy4SGL-_A"/>
            </a></div>`
            n[m]++
        }




        console.log("usuario  = " + usuarioDB[m].nombre + " sesion = " + n[m])
        setTimeout(function() { res.send(URL_geojson) }, 300);

    });

});












app.get('/:sesion_id/:id', (req, res) => { //para introducir cabecera de token JWT a home.hbs

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
    let id = req.params.id;
    //leerfichero de sesiones elegida en sesion_id

    //let body = req.usuario
    console.log("parametros:: " + req.params.id)

    Usuario.findById(id, function(err, usuarioDB) { //falta gestión de usuario...

        if (err) {
            console.log("error en find, campo: " + id)
            console.log(usuarioDB)
            return res.status(400).json({
                ok: false,
                err
            });
        }

        //  let tiempo_navegado = usuarioDB.hora_fin - usuarioDB.hora_fin
        let tiempo_ini = Date.parse(usuarioDB.hora[sesionID])
        let tiempo_fin = Date.parse(usuarioDB.hora_fin[sesionID])
        var tiempo_navegado = tiempo_fin - tiempo_ini
        var date = new Date(tiempo_navegado);

        let sesion = "tiempo navegado: " + Math.trunc(tiempo_navegado / (1000 * 60 * 600)) + " horas, " + Math.trunc(tiempo_navegado / (1000 * 60)) + " minutoss, " + (tiempo_navegado / 1000) + " segundos. "
            // console.log("tiempo navegado: " + tiempo_navegado / 1000 + " segundos, " + Math.trunc(tiempo_navegado / (1000 * 60)) + " minutoss," + Math.trunc(tiempo_navegado / (1000 * 60 * 600)) + " horas. ")



        cordenadas.coordinates = usuarioDB.cordenadas[sesionID]
        console.log("usuario: " + usuarioDB.nombre)
        console.log("sesion: " + sesionID)
        console.log("cordenadas: " + usuarioDB.cordenadas[sesionID])


        res.render('home.hbs', {
            ok: true,
            coordinates: usuarioDB.cordenadas[sesionID],
            velMax: usuarioDB.velMax[sesionID],
            hora: usuarioDB.hora[sesionID],
            hora_fin: usuarioDB.hora_fin[sesionID],
            sesion: sesion


        });
    })



});

module.exports = app

*/