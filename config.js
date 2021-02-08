// ============================
//  Puerto
// ============================
process.env.PORT = process.env.PORT || 3000;


// ============================
//  Entorno
// ============================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';




//semilla de encriptacion
process.env.semilla = 'SEED de la aplicacion en practicas' || process.env.semilla

// ============================
//  Base de datos
// ============================
let urlDB;

if (process.env.NODE_ENV === 'dev') {
    //urlDB = 'mongodb://localhost:27017/escudero';
    urlDB = 'mongodb+srv://jjara:Jaramillo1978-@cluster0.1hqo7.mongodb.net/escudero?retryWrites=true&w=majority'


} else {
    //urlDB = process.env.MONGO_URI;
    urlDB = 'mongodb+srv://jjara:Jaramillo1978-@cluster0.1hqo7.mongodb.net/escudero?retryWrites=true&w=majority'
}
process.env.URLDB = urlDB;