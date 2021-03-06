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
            return res.status(500).json({ // fallo mongoDB
                ok: false,
                err
            });
        }
        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                err: 'correo incorrecto' //luego quitar para no dar pistas
            })
        }

        if (!bcrypt.compareSync(body.password, usuarioDB.password)) {
            return res.status(400).json({
                ok: false,
                err: `cotraseña incorrecta `,

            })
        }
        usuarioDB.cordenadas = null
        usuarioDB.velocidad = null
        usuarioDB.hora = null
        usuarioDB.hora_fin = null
        usuarioDB.descripcion = null
        usuarioDB.velMax = null
            //usuarioDB.amigos = null
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