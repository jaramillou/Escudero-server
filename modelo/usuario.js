//*******modelo bd mongoDB******************** */
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


let rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol válido'
};


let Schema = mongoose.Schema;


let usuarioSchema = new Schema({
    nombre: {
        type: String,
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
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: rolesValidos
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
    //*********************************************no se te olvide quitar en login.js si metes un nuevo campo largo */
    direccion: {
        type: [String]
    },
    altitud: {
        type: [String]
    },
    hora: {
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
    distancia: {
        type: [String]
    },
    velMax: {
        type: [String]
    },
    vel2Seg: {
        type: [String]
    },
    amigos: {
        type: [String]
    },
    viento: {
        type: [String]
    },
    dir: {
        type: [String]
    },
    temp: {
        type: [String]
    },
    clima: {
        type: [String]
    },
    spot: {
        type: [String]
    },

    velas: {
        type: [String]
    },

    vela_usada: {
        type: [String]
    },

    tablas: {
        type: [String]
    },

    tabla_usada: {
        type: [String]
    },

    aletas: {
        type: [String]
    },

    aleta_usada: {
        type: [String]
    },




});


usuarioSchema.methods.toJSON = function() { //evitar que vean donde está guardada la contraseña al cliente y el token ocupe mucho

    let user = this;
    let userObject = user.toObject();
    delete userObject.password;
    // delete userObject.cordenadas;
    //delete userObject.velocidad;



    return userObject;
}


usuarioSchema.plugin(uniqueValidator, { message: '{PATH} debe de ser único' });


module.exports = mongoose.model('Usuario', usuarioSchema);