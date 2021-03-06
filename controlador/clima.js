const axios = require('axios');







paramsWeather = {

    appid: 'f7f641be29e44557030d7f522dffc090',
    units: 'metric',
    lang: 'es'

}

async function climaSpot(lat, lon) {

    try {

        const instance = axios.create({
            baseURL: `https://api.openweathermap.org/data/2.5/weather`,
            params: {...paramsWeather, lat, lon }
        })

        const resp = await instance.get();
        const { weather, main, wind, name } = resp.data;

        return {
            clima: JSON.stringify(weather[0].description),
            viento: JSON.stringify(wind.speed),
            dir: JSON.stringify(wind.deg),
            temp: JSON.stringify(main.temp),
            spot: JSON.stringify(name)
        }

    } catch (error) {
        console.log(error);
    }

}
module.exports.climaSpot = climaSpot