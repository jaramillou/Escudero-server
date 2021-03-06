const express = require('express')
const app = express()
const bodyParser = require('body-parser');

const Usuario = require('../modelo/usuario');
const hbs = require('hbs')
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')


const verificatoken = require('../autenticacion')


app.get('/amigos', verificatoken, (req, res) => {

    var id = req.usuario._id

    Usuario.findById(id, function(err, usuarioDB) { //falta gestión de usuario...

        if (err) {
            console.log("error en find, campo: " + id)
                // console.log(usuarioDB)
            return res.status(400).json({
                ok: false,
                err
            });
        }
        var cadenaAmigos = []
        Usuario.find({
            '_id': {
                $in: usuarioDB.amigos

            }
        }).sort({ nombre: 1 }).exec(function(err, amigosDB) {

            if (err) {
                console.log("error en find de muro:" + err)

                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            amigosDB.forEach(amigoN => {

                cadenaAmigos.push(amigoN.nombre)
            });
            //console.log("holaaa  " + cadenaAmigos)




            // console.log("valor de compis:::   " + usuarioDB.amigos)

            res.render('amigos.hbs', {
                ok: true,
                amigos: cadenaAmigos,
                id,
                amigos_id: JSON.stringify(usuarioDB.amigos)
            });
        });
    });

});




app.post('/buscarAmigos', (req, res) => {


    let palabra = req.body.busca


    //console.log("holaaaaaaaaaaaaaaaaaaaaaaaaa " + req.body.busca)
    Usuario.find({ nombre: { $regex: palabra, $options: "i" } }, (err, amigosDB) => {
        if (err) {
            return res.status(500).json({ // fallo mongoDB
                ok: false,
                err
            });
        }
        if (!amigosDB) {
            return res.status(400).json({
                ok: false,
                err: 'no se ha encontrado nadie' //luego quitar para no dar pistas
            })
        }


        var cadenaAmigos = ""
        amigosDB.forEach(amigoN => {

            cadenaAmigos += "amigo encontrado: " + amigoN.nombre
        });
        // console.log("holaaa  " + amigosDB)


        // res.send(cadenaAmigos)

        res.json({
            ok: true,
            amigosDB
        });

    });


});



app.post('/seguir/:id', verificatoken, (req, res) => {
    // let sesionID = req.params.sesion_id; //será el número de sesión
    let id = req.params.id;


    Usuario.findById(req.usuario._id, function(err, usuarioDB) { //falta gestión de usuario...

        if (err) {
            console.log("error en find, campo: " + id)
                // console.log(usuarioDB)
            return res.status(400).json({
                ok: false,
                err
            });
        }
        if (usuarioDB.amigos.includes(id) == false) {
            Usuario.findOneAndUpdate({ _id: req.usuario._id }, { $push: { amigos: req.params.id } }, { new: true }, (err, usuarioDB) => {

                if (err) {
                    console.log("error en añadir amigos")
                    console.log(usuarioDB)
                    return res.status(400).json({
                        ok: false,
                        err
                    });

                }
                console.log(req.usuario._id + "-------------------------------------siguiendo--------------------------------" + req.params.id)
                    // console.log(usuarioDB)

            });
        } else console.log("el amigo ya es nuestro amigo")

    });
    res.json({
        ok: true,
    });

});



app.post('/noSeguir/:id', verificatoken, (req, res) => {
    // let sesionID = req.params.sesion_id; //será el número de sesión
    let id = req.params.id;


    Usuario.findById(req.usuario._id, function(err, usuarioDB) { //falta gestión de usuario...

        if (err) {
            console.log("error en find, campo: " + id)
                // console.log(usuarioDB)
            return res.status(400).json({
                ok: false,
                err
            });
        }
        if (usuarioDB.amigos.includes(id) != false) {
            Usuario.findOneAndUpdate({ _id: req.usuario._id }, { $pull: { amigos: req.params.id } }, { new: true }, (err, usuarioDB) => {

                if (err) {
                    console.log("error en añadir amigos")
                    console.log(usuarioDB)
                    return res.status(400).json({
                        ok: false,
                        err
                    });

                }
                console.log(req.usuario._id + "-------------------------------------no siguiendo--------------------------------" + req.params.id)
                    // console.log(usuarioDB)

            });
        } else console.log("el amigo ya no es nuestro amigo")

    });
    res.json({
        ok: true,
    });

});

module.exports = app