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


const vela_sesion = 'vela_usada.1'



app.get('/velaUsuario/:sesion_id', verificatoken, (req, res) => {
    let sesionID = req.params.sesion_id; //será el número de sesión
    let id = req.usuario._id
    Usuario.findById(id, function(err, usuarioDB) { //falta gestión de usuario...

        if (err) {
            console.log("error en velaUsuario, campo: " + id)

            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.render('eligeVela.hbs', {

            ok: true,
            sesion: sesionID,
            id,
            velas: JSON.stringify(usuarioDB.velas),
            tablas: JSON.stringify(usuarioDB.tablas)
        });
    });
});



app.post('/nuevaVela/:sesion_id/:nuevaVela', verificatoken, function(req, res) { //Crea un usuario nuevo con correo distinto

    this.body = req.body
    let id = req.body._id;
    var nuevaVela = req.params.nuevaVela

    Usuario.findOneAndUpdate({ _id: req.usuario._id }, {
        $push: {
            velas: nuevaVela,

        }
    }, { new: true }, (err, usuarioDB) => {

        if (err) {

            console.log("error al grabar coordenadas de usuario" + usuarioDB)
            return res.status(400).json({
                ok: false,
                err
            });
        } else {
            //console.log("cordenadas añadidas******")

            res.json({
                ok: true,

            });
        }

    })

});


app.post('/nuevaTabla/:sesion_id/:nuevaTabla', verificatoken, function(req, res) { //Crea un usuario nuevo con correo distinto

    this.body = req.body
    let id = req.body._id;
    var nuevaTabla = req.params.nuevaTabla

    Usuario.findOneAndUpdate({ _id: req.usuario._id }, {
        $push: {
            tablas: nuevaTabla,

        }
    }, { new: true }, (err, usuarioDB) => {

        if (err) {

            console.log("error al grabar coordenadas de usuario" + usuarioDB)
            return res.status(400).json({
                ok: false,
                err
            });
        } else {
            //console.log("cordenadas añadidas******")

            res.json({
                ok: true,

            });
        }

    })

});


app.post('/vela_sesion/:sesionID/:vela_selecionada/:tabla_selecionada', verificatoken, async(req, res) => {

    let sesionID = req.params.sesionID; //será el número de sesión
    let id = req.body._id;


    /*
        Usuario.findOneAndUpdate({ _id: req.usuario._id }, {

                // $unset { "vela_usada" : "1" }
                $unset: {

                    ["vela_usada." + sesionID]: {

                    }
                }



            }),*/
    Usuario.findOneAndUpdate({ _id: req.usuario._id }, {

            // $unset { "vela_usada" : "1" }

            $set: {

                ["vela_usada." + sesionID]: req.params.vela_selecionada,
                ["tabla_usada." + sesionID]: req.params.tabla_selecionada,
                ["aleta_usada." + sesionID]: "-"
            }




        }

        , { new: true }, (err, usuarioDB) => {

            if (err) {

                console.log("error al grabar vela_usada de usuario" + err)
                return res.status(400).json({
                    ok: false,
                    err
                });
            } else {
                console.log("vela añadida******")
                res.json({


                    ok: true,
                    //usuario: usuarioDB
                });
            }

        })

});



app.post('/borrarVela/:nombreVela', verificatoken, (req, res) => {
    // let sesionID = req.params.sesion_id; //será el número de sesión
    let nombreVela = req.params.nombreVela;

    console.log("borrando vela***************** : " + nombreVela)
    Usuario.findById(req.usuario._id, function(err, usuarioDB) { //falta gestión de usuario...

        if (err) {
            console.log("error en find, campo: " + id)
                // console.log(usuarioDB)
            return res.status(400).json({
                ok: false,
                err
            });
        }
        if (usuarioDB.velas.includes(nombreVela) != false) {
            Usuario.findOneAndUpdate({ _id: req.usuario._id }, { $pull: { velas: nombreVela } }, { new: true }, (err, usuarioDB) => {

                if (err) {
                    console.log("error en borrarVela")
                        //console.log(usuarioDB)
                    return res.status(400).json({
                        ok: false,
                        err
                    });

                }
                //console.log(req.usuario._id + "-------------------------------------no siguiendo--------------------------------" + req.params.id)
                // console.log(usuarioDB)

            });
        } else console.log("Vela borrada: " + nombreVela)

    });
    res.json({
        ok: true,
    });

});



app.post('/borrarTabla/:nombreTabla', verificatoken, (req, res) => {
    // let sesionID = req.params.sesion_id; //será el número de sesión
    let nombreTabla = req.params.nombreTabla;

    Usuario.findById(req.usuario._id, function(err, usuarioDB) { //falta gestión de usuario...

        if (err) {
            console.log("error en find, campo: " + id)
                // console.log(usuarioDB)
            return res.status(400).json({
                ok: false,
                err
            });
        }
        if (usuarioDB.tablas.includes(nombreTabla) != false) {
            Usuario.findOneAndUpdate({ _id: req.usuario._id }, { $pull: { tablas: nombreTabla } }, { new: true }, (err, usuarioDB) => {

                if (err) {
                    console.log("error en borrarVela")
                        //console.log(usuarioDB)
                    return res.status(400).json({
                        ok: false,
                        err
                    });

                }
                //console.log(req.usuario._id + "-------------------------------------no siguiendo--------------------------------" + req.params.id)
                // console.log(usuarioDB)

            });
        } else console.log("Vela borrada: " + nombreTabla)

    });
    res.json({
        ok: true,
    });

});



module.exports = app