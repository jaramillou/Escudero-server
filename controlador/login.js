const IP = 'localhost'

const express = require('express')
const app = express()
const bodyParser = require('body-parser');


const bcrypt = require('bcrypt') //pasar este bloque a controlador/login
const jwt = require('jsonwebtoken')
const verificatoken = require('../autenticacion')







const Usuario = require('../modelo/usuario');



app.get('/', (req, res) => {


    res.render('login.hbs', {
        ok: true,
    });
});


app.post('/login', function(req, res) { //pasar a login
    this.body = req.body


    Usuario.findOne({ email: body.email }, (err, usuarioDB) => {
        if (err) {
            console.log("usuario no encontrado error mongo")
            return res.status(500).json({ // fallo mongoDB
                ok: false,
                err
            });
        }
        if (!usuarioDB) {
            console.log("usuario no encontrado no existe")
                //res.render('borraToken.hbs', {
                //   ok: true,
                //});
            return res.status(400).json({
                ok: false,
                err: `usuario no existe`,

            })

        }

        if (!bcrypt.compareSync(body.password, usuarioDB.password)) {
            console.log("usuario no encontrado contraseña mal")
            return res.status(400).json({
                ok: false,
                err: `cotraseña incorrecta `,

            })
        }
        console.log("usuario encontrado")
        usuarioDB.cordenadas = null
        usuarioDB.velocidad = null
        usuarioDB.hora = null
        usuarioDB.hora_fin = null
        usuarioDB.descripcion = null
        usuarioDB.velMax = null
        usuarioDB.direccion = null
        usuarioDB.altitud = null
        usuarioDB.distancia = null
        usuarioDB.amigos = null
        usuarioDB.viento = null
        usuarioDB.dir = null
        usuarioDB.temp = null
        usuarioDB.clima = null
        usuarioDB.spot = null

        let token = jwt.sign({
            usuario: usuarioDB
        }, process.env.semilla, { expiresIn: 60 * 60 * 24 * 365 });


        //enviarlo al muro
        // res.redirect('/muro')

        res.json({
            ok: true,
            token
        });



    });

});

module.exports = app