// API Details
const geonameUrl = 'http://api.geonames.org/';
const username = 'gabbaborjaa';
/**
 * 
 * @param {*} City 
 * 
 * @returns City Name & Weather
 */

export async function getGeoCity(city) {
    const dataUrl = 'http://api.geonames.org/searchJSON?q=' + city + 'username=' + username
    try {
        const res = await fetch(dataUrl);
        if (res.ok) {
            const city = {};
            const data = await res.json();
            console.log(data);
            city.latitude = data.geonames[0].lat;
            city.longitude = data.geonames[0].lng;
            city.population = data.geonames[0].population;
            city.countryCode = data.geonames[0].countryCode;
            console.log(city);
            return city;
        }
    } catch (error) {
        console.log(error);
    }
}
document.getElementById("generate").addEventListener("click", getGeoCity);