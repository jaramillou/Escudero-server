const jwt = require('jsonwebtoken')



let verificatoken = (req, res, next) => {

    if (!req.headers.authorization) {
        return res
            .status(403)
            .send({ message: "Tu petición no tiene cabecera de autorización" });
    }
    let token = req.headers['authorization'];


    jwt.verify(token, process.env.semilla, (err, decode) => {

        if (err) {

            return res.status(401).json({
                ok: false,
                err
            })
        }

        req.usuario = decode.usuario //payload usuario está dentro del token usuario
            //  console.log("autentica.js usuario: " + decode.usuario._id)
    })

    next()
}

module.exports = verificatoken