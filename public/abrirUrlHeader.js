function abrirUrlHeader(url) {
    var token1 = localStorage.getItem('token');
    if (token1 != null) { //este bloque realiza la petición si se envió token con su cabecera del authoritation: token

        let h = new Headers();
        h.append('authorization', `${token1}`);
        let req = new Request(url, {
            method: 'GET',
            mode: 'cors',
            headers: h
        });



        fetch(req)
            .then(resp => resp.text())
            .then(data => {

                document.write(data);


            })
            .catch(err => {
                console.log("error en funcion abrirUrlHeader")
            })
    }

}

module.exports = {
    "abrirUrl": abrirUrlHeader
}