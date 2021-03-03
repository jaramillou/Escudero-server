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



/*
function menor(params) {
    var aux = params[0]
    var pos = 0
    for (var i = 0; i < params.length; i++) {

        if (aux < params[i] || aux == null) {
            // console.log(aux + " > " + params[i] + "cambia pos...")
            aux = params[i]
            pos = i

        } else {
            // console.log(aux + " < " + params[i])


        }

    }
    return pos
}
*/
app.get('/muro', verificatoken, async(req, res) => {

    let body = req.usuario
    var amigos = []

    let usuario = await Usuario.findById(req.usuario._id, function(err, usuarioDB) { //falta gestión de usuario...

        // console.log("amigos req :  " + amigos)

    });
    usuario.amigos.forEach(element => {

        amigos.push(element)
        console.log("añadimos amigo: " + element)
    })


    console.log("amigos variable :  " + usuario.amigos)
    console.log("amigos req :  " + amigos)
    amigos.push(usuario._id) //añadimos a sí mismo para mostrar en muro y a continuación sus amigos

    console.log("numero de amigos:  " + amigos.length)
    console.log("amigos total :  " + amigos)
    var URL_geojson = [] //coger el HTML de archivo mejor... mientras un poco de spaguettis:
    URL_geojson += `<head><script> function cerrar(){                    
             
        localStorage.removeItem('token')      
         location.href="/"
  
        }</script></head>`
    URL_geojson += `   <body>`
    URL_geojson += `<nav>`
    URL_geojson += `<p id="user">${usuario.nombre}</p>
   <input type="button" id = "botonCerrar"  value= "cerrar" onclick=cerrar()>`
    URL_geojson += '          '
    URL_geojson += `<a href="/amigos/${usuario._id}   "><br><h2> Amigos</h2></a>`

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
        /*
                //  console.log("0 :" + usuarioDB[0].hora[0])
                //  console.log("1 :" + usuarioDB[1].hora[0])
                //  console.log("2 :" + usuarioDB[2].hora[0])
                var n = [] //nos servirá como puntero o iterador de cada usuario amigo
                var horas = [] //para anotar la hora de cada iterador 
                var total = 0 //anotaremos el total de sesiones propias y de los amigos

                for (var i = 0; i < amigos.length; i++) {
                    if (usuarioDB[i]) {
                        n[i] = usuarioDB[i].hora.length - 1 //llevará la cuenta de los que ya se han puesto en cada vector
                        total += usuarioDB[i].hora.length //número total de sesiones de los amiguetes
                        console.log("sesiones de cada usuariuo== " + usuarioDB[i].nombre + " : " + n[i])
                    }
                }
                //console.log("amigos total = " + total)
                for (var j = total - 1; j > -1; j--) { ///todos los campos de los amigos
                    for (var i = 0; i < amigos.length; i++) { //cogemos cada amigo
                        if (n[i] > -1) {
                            horas[i] = usuarioDB[i].hora[n[i]] //juntamos las horas que quedan
                                // console.log("horas en usuario== " + usuarioDB[i].nombre + " : " + horas[i])
                        } else horas[i] = null



                    }
                    //[usuarioDB[0].hora[0], usuarioDB[1].hora[0], usuarioDB[2].hora[0]]

                    var m = menor(horas)


                    // console.log("menor = " + m)

                    //console.log("tamaño de cordenadas:  " + usuarioDB[m].cordenadas[n[m]].length)
                    // for (var i = 0; i < usuarioDB[m].cordenadas[n[m]].length; i++) {

                    var coord = new Cordenadas()
                        // console.log(usuarioDB[m].cordenadas[n[m]])
                    cordenadas.setCordenadas = usuarioDB[m].cordenadas[n[m]]
                    var aux = JSON.parse(usuarioDB[m].cordenadas[n[m]])
                        // var simplified = simplify(aux, 0.000000000000000000000000001)

                    var simplified = simplify(aux, 0.0001, false) //simplifico los datos con el algoritmo Douglas-Peucker para que "quepan" en la URL (~8K) 
                        //la variable tolerancia 0.0001 debería ser proporcianal al tamaño en la clase Cordenada 
                        //console.log(simplified)
                        // cordenadas.simple()
                        // };

                    URL_geojson += `<div><br><br><h3>usuario: ${usuarioDB[m].nombre},  fecha: ${usuarioDB[m].hora[n[m]]} </h3> `
                    URL_geojson += `<a href="/sesion/${n[m]}/${usuarioDB[m]._id}"><img src="https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/geojson(%7B%22type%22%3A%22LineString%22%2C%22coordinates%22%3A${JSON.stringify(simplified)}%7D)/auto/1000x600?access_token=pk.eyJ1IjoiamphcmEiLCJhIjoiY2tkOGpkcDVzMGRuejJyb2RsYmUxcDZubCJ9.7-rob0zcnIsBcmy4SGL-_A"/>
                    </a></div>`
                    n[m]--
                }



        */


        res.render('muro.hbs', {

            muro: JSON.stringify(usuarioDB)


        });

        //es.send(URL_geojson)
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
    let id = req.params.id;
    //leerfichero de sesiones elegida en sesion_id

    //let body = req.usuario
    //console.log("parametros:: " + req.params.id)

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
            //var date = new Date(tiempo_navegado);


        //convertimos milisengundos en legible
        var segundos = tiempo_navegado / 1000;
        var horas = parseInt(segundos / 3600);
        segundos = segundos % 3600;
        var minutos = parseInt(segundos / 60);
        segundos = segundos % 60;


        let sesion = "tiempo navegado: " + horas + " horas, " + minutos + " minutos, " + segundos + " segundos. "




        //cordenadas.coordinates = usuarioDB.cordenadas[sesionID]



        res.render('home.hbs', { //CAMBIAR A HOME 1*******************************************
            ok: true,
            usuario: usuarioDB.nombre,
            coordinates: usuarioDB.cordenadas[sesionID],
            velMax: usuarioDB.velMax[sesionID],
            hora: usuarioDB.hora[sesionID],
            hora_fin: usuarioDB.hora_fin[sesionID],
            sesion: sesion,
            sesionID,
            id


        });
    })



});





module.exports = app