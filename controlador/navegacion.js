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
const usuario = require('../modelo/usuario');
const { use } = require('./login');
//const { getMaxListeners } = require('../modelo/usuario');
var cordenadas = new Cordenadas('loro', 'pepe');


var user = {
    nombre: {
        type: [String],
        required: [true, 'El nombre es necesario']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'El correo es necesario']
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    img: {
        type: String,
        required: false
    },


    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    },
    cordenadas: {
        type: [String]
    },
    velocidad: {
        type: [String]
    },
    hora: {
        type: [String]
    },
    hora_fin: {
        type: [String]
    },
    descripcion: {
        type: [String]
    },
    velMax: {
        type: [String]
    }

};

app.set('title', 'My Site')




app.get('/muro', verificatoken, (req, res) => {

    let body = req.usuario

    usuario.find({
        '_id': {
            $in: [
                mongoose.Types.ObjectId('60239fd098074541ac938da2'),
                mongoose.Types.ObjectId('6023a0a95979150fc878b1fe')
            ]
        }
    }).sort({ nombre: -1 }).exec(function(err, usuarioDB) {
        //console.log(usuarioDB);
        if (err) {
            console.log("error en find:")
                //console.log(usuarioDB)
            return res.status(400).json({
                ok: false,
                err
            });



        }

        var muro = user

        ///user = usuarioDB[0]
        //console.log(user)
        // user.cordenadas = null
        //  user.hora = null
        var u1 = 0
        var u2 = 0
        var i = 0
        var total = usuarioDB[0].hora.length + usuarioDB[1].hora.length


        user.nombre = ["sddsfs", "sdfsdfs"]

        var URL_geojson = []

        var sesion = 0

        while (i < total) {
            if (Date.parse(usuarioDB[0].hora[u1]) < Date.parse(usuarioDB[1].hora[u2])) {
                URL_geojson += `<div><br><h3>usuario: ${usuarioDB[0].nombre}, sesion: ${sesion} </h3> `
                URL_geojson += `<a href="/${sesion}${usuarioDB[0].nombre}"><img src="https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/geojson(%7B%22type%22%3A%22LineString%22%2C%22coordinates%22%3A${usuarioDB[0].cordenadas[u1]}%7D)/auto/1000x600?access_token=pk.eyJ1IjoiamphcmEiLCJhIjoiY2tkOGpkcDVzMGRuejJyb2RsYmUxcDZubCJ9.7-rob0zcnIsBcmy4SGL-_A"/>
                </a></div>`
                u1++

            } else {
                URL_geojson += `<div><br><h3>usuario: ${usuarioDB[1].nombre}, sesion: ${sesion} </h3> `
                URL_geojson += `<a href="/${sesion}${usuarioDB[1].nombre}">
                <img src="https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/geojson(%7B%22type%22%3A%22LineString%22%2C%22coordinates%22%3A${usuarioDB[1].cordenadas[u2]}%7D)/auto/1000x600?access_token=pk.eyJ1IjoiamphcmEiLCJhIjoiY2tkOGpkcDVzMGRuejJyb2RsYmUxcDZubCJ9.7-rob0zcnIsBcmy4SGL-_A"/>
                </a></div>`

                u2++

            }
            i++
            sesion++
        }
        /*
                while (i < total) {

                    if (Date.parse(usuarioDB[0].hora[u1]) < Date.parse(usuarioDB[1].hora[u2])) {
                        //  console.log("0 es más pequeño")
                        muro.nombre[i] = usuarioDB[0].nombre
                        muro.hora[i] = usuarioDB[0].hora[u1]
                        muro.cordenadas[i] = usuarioDB[0].cordenadas[u1]
                            //console.log(usuarioDB[0].hora[u1] + "para valor de i = " + i)

                        u1++;

                    } else {
                        // console.log("1 es más pequeño")
                        muro.nombre[i] = usuarioDB[1].nombre
                        muro.hora[i] = usuarioDB[1].hora[u1]
                        muro.cordenadas[i] = usuarioDB[1].cordenadas[u1]

                        u2++;
                        //console.log(usuarioDB[1].hora[u1] + "para valor de i = " + i)
                    }
                    i++

                }

        */
        //usuarioDB[0] = user
        // console.log(user._doc)


        /*

                // if (usuarioDB[0].cordenadas.length == 0) URL_geojson += ' completa tu primera sesión!! <br><br>'

                URL_geojson += '<input type="button" id = "botonCerrar"  value= "cerrar" onclick=cerrar()>'

                muro.cordenadas.forEach(function(element) {
                    //localhost no funciona en el movil...

                    URL_geojson += `<div><br><h3>usuario: ${usuarioDB[0].nombre[sesion]}, sesion: ${sesion} </h3> `
                    URL_geojson += `<a href="/${sesion}">
                    <img src="https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/geojson(%7B%22type%22%3A%22LineString%22%2C%22coordinates%22%3A${element}%7D)/auto/1000x600?access_token=pk.eyJ1IjoiamphcmEiLCJhIjoiY2tkOGpkcDVzMGRuejJyb2RsYmUxcDZubCJ9.7-rob0zcnIsBcmy4SGL-_A"/>
                    </a></div>`
                    sesion++

        */

        res.send(URL_geojson)
    });


});


/*
var sesion_usuario1 = 0
var sesion_usuario2 = 0
let tiempo_ini = Date.parse(usuarioDB.hora[sesionID])
let tiempo_ini = Date.parse(usuarioDB.hora[sesionID])
var usuarios = Object.assign({}, usuarioDB)



var fechas1 = [String]
var fechas2 = [String]
var count = 0
usuarioDB[0].hora.forEach(function(element) {
    fechas1[0] += element
    count++
});

*/

/*

app.get('/muro', verificatoken, (req, res) => { //genera el muro con todas las sesiones

    let body = req.usuario





    Usuario.findById(body._id, function(err, usuarioDB) {

        if (err) {
            console.log("error en find:")
            console.log(usuarioDB)
            return res.status(400).json({
                ok: false,
                err
            });
        }


        var geojson_foto


        var URL_geojson = []
        URL_geojson += `<head><script> function cerrar(){
             
            localStorage.removeItem('token')      
             location.href="/"
      
 }</script></head><body><p id="user">usuario</p>`
        var sesion = 0



        if (usuarioDB.cordenadas.length == 0) URL_geojson += ' completa tu primera sesión!! <br><br>'

        URL_geojson += '<input type="button" id = "botonCerrar"  value= "cerrar" onclick=cerrar()>'

        usuarioDB.cordenadas.forEach(function(element) {
            //localhost no funciona en el movil...

            URL_geojson += `<div><br><h3>usuario: ${body.nombre}, sesion: ${sesion} </h3> `
            URL_geojson += `<a href="/${sesion}">
            <img src="https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/geojson(%7B%22type%22%3A%22LineString%22%2C%22coordinates%22%3A${element}%7D)/auto/1000x600?access_token=pk.eyJ1IjoiamphcmEiLCJhIjoiY2tkOGpkcDVzMGRuejJyb2RsYmUxcDZubCJ9.7-rob0zcnIsBcmy4SGL-_A"/>
            </a></div>`
            sesion++


        })

        res.send(URL_geojson)


    })


});

*/


app.get('/:sesion_id:usuario', (req, res) => { //para introducir cabecera de token JWT a home.hbs

    //res.header("Access-Control-Allow-Origin", '*');

    let sesionID = req.params.sesion_id; //será el número de sesión
    //leerfichero de sesiones elegida en sesion_id
    console.log("parametros:: " + req.params.usuario)
    res.render('home_header.hbs', {
        ok: true,
        sesion: sesionID




    });

});


app.get('/mapa_header/:sesion_id', verificatoken, (req, res) => { //genera la sesión elegida. sesion_id será lo que responda el navegador del usuario

    //res.header("Access-Control-Allow-Origin", '*');

    let sesionID = req.params.sesion_id; //será el número de sesión
    //leerfichero de sesiones elegida en sesion_id

    let body = req.usuario


    Usuario.findById(body._id, function(err, usuarioDB) { //falta gestión de usuario...

        if (err) {
            console.log("error en find:")
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