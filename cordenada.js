class Cordenadas {

    constructor(cordenada) {

        this.coordinates = cordenada;
    }




    get getCoordenadas() {
            return this.coordinates;
        }
        /*
            set setCordenadas(cordenada) {
                this.type = cordenada.type;
                this.coordinates = JSON.stringify(cordenada.coordinates);
                console.log("coordinates: " + String(cordenada.coordinates))

            }
        */
    set setCordenadas(cordenada) {
        this.type = cordenada.type;
        this.coordinates = cordenada;
        //console.log("coordinates: " + String(cordenada.coordinates))

    }

    set setVelocidad(velocidad) {
        this.type = velocidad.type;
        this.veloidad = JSON.stringify(velocidad.coordinates);
        //console.log(JSON.stringify(this.coordinates))

    }


    setCordenadasMongo(cordenada) {
        this.type = cordenada.type;
        this.coordinates = cordenada.coordinates;
        //console.log(JSON.stringify(this.coordinates))

    }

    simple() {
        var aux = [String]
        if (this.coordinates.length > 100) {
            console.log("mayor que 100")
            for (var i = 0; i < this.coordinates.length; i++)
                console.log(this.coordinates[i])
        }
    }

    get getGeoJson() {



        var geoJson = new String(`{ \"type\": \"FeatureCollection\",\"features\": {\"type\": \"Feature\",  \"properties\": {}, \"geometry\": { \"type\": \"LineString\",  \"coordinates\": `)
            //console.log(JSON.stringify(this.coordinates))
        var aux = geoJson + JSON.stringify(this.coordinates)
        geoJson = aux += '}}}'

        // obj['theTeam'].push({"teamId":"4","status":"pending"});
        //console.log(geoJson)
        //return JSON.parse(geoJson);
        return geoJson
    }
    get getGeoJson_simple() {

        var geoJson = new String(`{\"type\":\"LineString\",\"coordinates\":`)
            //console.log(JSON.stringify(this.coordinates))
        var aux = geoJson + JSON.stringify(this.coordinates)
        geoJson = aux += '}'


        //var static_foto = "https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/geojson(%7B%22type%22%3A%22LineString%22%2C%22coordinates%22%3A)/auto/500x300?access_token=pk.eyJ1IjoiamphcmEiLCJhIjoiY2tkOGpkcDVzMGRuejJyb2RsYmUxcDZubCJ9.7-rob0zcnIsBcmy4SGL-_A"


    }


    //https: //api.mapbox.com/styles/v1/mapbox/streets-v11/static/geojson(%7B%22type%22%3A%22LineString%22%2C%22coordinates%22%3A%5B%5B-5.3106541%2C35.8882908%5D%2C%5B-5.3106541%2C35.8882908%5D%2C%5B-5.3106681%2C35.8882818%5D%5D%7D)/auto/500x300?access_token=pk.eyJ1IjoiamphcmEiLCJhIjoiY2tkOGpkcDVzMGRuejJyb2RsYmUxcDZubCJ9.7-rob0zcnIsBcmy4SGL-_A





}


module.exports = Cordenadas
    /*
    var prueba = '{
        'type': 'geojson',
        'data': {
            'type': 'Feature',
            'properties': {},
            'geometry': {
                'type': 'LineString',
                'coordinates': [
                    [-122.48369693756104, 37.83381888486939],
                    [-122.48348236083984, 37.83317489144141],
                    [-122.48339653015138, 37.83270036637107],
                    [-122.48356819152832, 37.832056363179625],
                    [-122.48404026031496, 37.83114119107971],
                    [-122.48404026031496, 37.83049717427869],
                    [-122.48348236083984, 37.829920943955045],
                    [-122.48356819152832, 37.82954808664175],
                    [-122.48507022857666, 37.82944639795659],
                    [-122.48610019683838, 37.82880236636284],
                    [-122.48695850372314, 37.82931081282506],
                    [-122.48700141906738, 37.83080223556934],
                    [-122.48751640319824, 37.83168351665737],
                    [-122.48803138732912, 37.832158048267786],
                    [-122.48888969421387, 37.83297152392784],
                    [-122.48987674713133, 37.83263257682617],
                    [-122.49043464660643, 37.832937629287755],
                    [-122.49125003814696, 37.832429207817725],
                    [-122.49163627624512, 37.832564787218985],
                    [-122.49223709106445, 37.83337825839438],
                    [-122.49378204345702, 37.83368330777276]
                ]
            }
        }
    }'
    //var cadena = JSON.parse(prueba)
    // prueba.data.geometry.coordinates.push
    */