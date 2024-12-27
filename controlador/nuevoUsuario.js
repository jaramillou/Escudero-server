const express = require('express')
const app = express()
const bodyParser = require('body-parser');


const bcrypt = require('bcrypt') //pasar este bloque a controlador/login
const jwt = require('jsonwebtoken')
const verificatoken = require('../autenticacion')


require('../config');


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))


// parse application/json
app.use(bodyParser.json())


const hbs = require('hbs')
const mongoose = require('mongoose');



const Usuario = require('../modelo/usuario');






app.get('/nuevoUsuario', (req, res) => {


    res.render('nuevoUsuario.hbs', {
        ok: true,
    });
});


app.get('/nuevo', (req, res) => {


    res.render('login.hbs', {
        ok: true,
    });
});


app.post('/nuevo', function(req, res) { //Crea un usuario nuevo con correo distinto
    /*
    let usuario = new Usuario({
        nombre: 'pepe',
        email: 'jaramilloussss@gmail.com',
        password: '1234',
        role: 'ADMIN_ROLE',
        //cordenadas: cordenadas.getCoordenadas
    });
*/
    this.body = req.body

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 5),
        role: 'ADMIN_ROLE',
        // amigos: '',
        //cordenadas: cordenadas.getCoordenadas
    });


    usuario.save((err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        usuarioDB.password = null //no queremos que vean la contraseña en la respuesta.
        res.render('login.hbs', {
            ok: true,




        });
        /*  res.json({
              ok: true,
              usuario: usuarioDB
          });*/
    });
});


module.exports = app