import { response } from "express";

// API URL & Key
const geonameUrl = 'http://api.geonames.org/search?q=';
const username = 'gabbaborjaa';
/**
 * 
 * @param {*} City 
 * 
 * @returns City Name & Location
 */

export async function getGeoCity(city) {
    const dataUrl = `${geonameUrl}` + city + '&username=' + username
        // try {
        //     const data = await response.json();
        //     console.log(data);
        //     res.send(data);
        // } catch (error) {
        //     console.log(error)
        // }
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