const { static } = require('express');
const fs = require('fs');
const readline = require('readline');
const pause = require('node-pause');
const { SSL_OP_EPHEMERAL_RSA } = require('constants');
const Cordenadas = require('./cordenada');
let vectorCordenadas = []
let nSesiones = 0
let nombreUsuario = "jesus"
    //let nombreFichero = "db/" + "nombreUsuario"

class Sesiones {



    set setCordenadas(usuario) {
        this.usuarioDB = usuario;

    }

    mostrar() {
        var sesion_usuario1 = 0
        var sesion_usuario2 = 0

        // var fecha_usuario1 = usuarioDB.hora[sesion_usuario1]
        //  var fecha_usuario2 = usuarioDB.hora[sesion_usuario2]

        /* if (fecha_usuario1 > fecha_usuario2) {
            console.log("mora 1 mayor")
        }
*/
        console.log(usuarioDB.hora)

    }
}
/*
    //usuario = "pepe"
    //spot = **
    //Cordenadas = require('./cordenada.js');


    //ordenadas = []



    cargarDatosUsuario(id, callback) {
        
        Usuario.findById(id, function(err, usuarioDB) { //falta gestión de usuario...

            if (err) {
                console.log("error en calse sesiones cargarDtosdeUsario find:")
                console.log(usuarioDB)
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            var rutas = UsuarioDB



        });
    };

    //cordenadas = new Cordenadas() 

    nuevaSesion(cordenadas) {
        if (cordenadas.coordinates === null) {
            cordenadas.coordinates = []

        } else {
            nSesiones++
            var nombreFichero = "db/" + nombreUsuario + nSesiones
                //this.cordenada.push(cordenada)
            fs.writeFile(`${nombreFichero}`, '\n' + cordenadas.coordinates, (err) => { //track.jsono se llamara poer el nombre de usuario, jsono para que no actualize nodemon
                if (err) throw new Error('No se pudo grabar', err);
            });
        }

        //***************falta sumar en la variable de usuario jesus el numero de sesiones****************************** 
    }



    async leerFichero(numeroSesion, cordenadas) { //las sesiones empiezan por 1
        //cordenadas = new Cordenadas()
        var nombreFichero = "db/" + nombreUsuario + numeroSesion
        console.log(nombreFichero)
        fs.readFile(`${nombreFichero}`, 'utf8', (err, data) => {
            if (err) throw new Error('No se pudo leer en leerFichero de la clase sesiones', err);
            cordenadas.coordinates = data
                //console.log(cordenadas.coordinates)
        });


    }

    sesionN(n) {
        console.log(vectorCordenadas[n].coordinates)
        return vectorCordenadas[n]
    }

    get numSesiones() {
        var aux = JSON.parse(this.cargarDatosUsuario('jesus'))
        console.log(console.log(aux.numSesiones))
        return aux.numSesiones
    }


    async cargarSesiones() { //mejor contar cuantos ficheros hay para obtener numSesiones o ir leyendo ficheros hasta error = numSesiones
        console.log("Empezamos en:" + nSesiones)
        for (var i = 1; i < 3 + 1; i++) { // ||
            console.log(i)
            vectorCordenadas[i] = new Cordenadas()
            this.leerFichero(i, vectorCordenadas[i])
                //setTimeout(() => { console.log(vectorCordenadas[i].coordinates) }, 1)

        }
    }

}




*/
module.exports = Sesiones