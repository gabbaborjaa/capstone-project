import numeral from "numeral";
import { format } from "date-fns";
import parseISO from 'date-fns/parseISO';

const API_METHOD = 'search';
const API_URL = `http://api.geonames.org/${API_METHOD}`;
const API_KEY = process.env.GEONAMES_KEY;

const PARAM_TYPE = 'json';
const PARAM_MAXROWS = 10;
const PARAM_STYLE = 'full';
const PARAM_LANG = 'en';
const PARAM_USERNAME = API_KEY;
const PARAM_FORMATTED = true;

let travelDate = "";

// console.log(`API_KEY: ${API_KEY}`);

/**
 * Validate the input text.
 * 
 * @param {*} input 
 * @returns true if the input is valid, false otherwise
 */
function validateInput(input) {
    // console.log(":: validateInput(input)");

    // console.log(`input: ${input}`);

    // check if the input is not null and not empty
    const isInputValid = input ? input.length > 0 : false;

    return isInputValid;
}

/**
 * Get data from the geonames.org service.
 * 
 * @param {string} input city name
 * 
 * @returns text analysis results data
 */
async function fetchGeoData(input) {
    // console.log(":: fetchGeoData(input)");

    // check if the input is not null and not empty
    const isInputValid = validateInput(input);

    if (isInputValid) {

        // utf8-encode the input text to be used in the query string (e.g., replace spaces with utf8-encoded %20)
        let encodedInput = encodeURIComponent(input);

        try {

            const PARAM_URL = `${API_URL}?q=${encodedInput}&type=${PARAM_TYPE}&maxRows=${PARAM_MAXROWS}&style=${PARAM_STYLE}&lang=${PARAM_LANG}&username=${PARAM_USERNAME}&formatted=${PARAM_FORMATTED}`;

            // const response = await fetch(API_URL, fetchRequestOptions);
            const response = await fetch(`${PARAM_URL}`);

            // console.log(`response.ok: ${response.ok}`);
            // console.log(`response.status: ${response.status}`);
            // console.log(`response.statusText: ${response.statusText}`);

            if (!response.ok) {
                // API call not successful (not equal to 0 means API call did not return a 'success' code)
                // create error object and pass it to the error 'catch' clause
                // console.log(`response: ${JSON.stringify(response)}`);
                throw `Error: ${response.status} - ${response.statusText}`;
            }

            // convert response data to json format
            const data = await response.json();
            // console.log('data:', data);

            return data;

        } catch (error) {
            // console.log('Error in fetchGeoData()', error);
            throw error;
        }
        // } else {
        //   // console.log("Error: formData is empty");
        //   throw "Error: formData is empty";
        // }
    } else {
        // console.log("Error: Invalid input.");
        throw "Error: Invalid input.";
    }
}

/**
 * Display geonames result on the UI.
 * 
 * @param {*} results data from the geonames.org service
 */
async function updateUI(data) {
    // console.log(":: updateUI(data)");

    try {

        document.getElementById("travel-date").innerHTML = travelDate || "(Date Not Set)";
        document.getElementById("city").innerHTML = data.geonames[0].name;
        document.getElementById("country-code").innerHTML = data.geonames[0].countryName;
        document.getElementById("longitude").innerHTML = data.geonames[0].lng;
        document.getElementById("latitude").innerHTML = data.geonames[0].lat;
        document.getElementById("population").innerHTML = numeral(data.geonames[0].population).format('0,0');


        // console.log(data);
    } catch (error) {
        // console.log('Error in updateUI()', error);
        throw error;
    }
}

/**
 * Get data from the geonames.org service and display them on the UI.
 */
function getGeoNames() {
    // console.log(":: getGeoNames()");

    // get the input text from the input textarea
    const input = document.getElementById("destination").value;

    let date = document.getElementById("departDate").value;

    // format the date
    travelDate = date ? format(parseISO(date), 'MM/dd/yyyy') : '';

    try {
        // validate the input text (i.e., not nul and not empty)
        const isInputValid = validateInput(input);

        // console.log(`input: ${input}`);
        // console.log(`isInputValid: ${isInputValid}`);

        if (isInputValid) {
            // the input is valid, so get the text analysis data from the geonames.org service
            fetchGeoData(input)
                .then((data) => {
                    if (data) {
                        // response data from the geonames.org service is not null, so update the UI
                        updateUI(data);
                    }
                })
                .catch((error) => {
                    // console.log(error);
                    alert(error);
                });
        } else {
            // the input is not valid, so display an error message on the UI
            alert("Please enter a valid city name.");
        }
    } catch (error) {
        // console.log(error);
        alert(error);
    }
}

// create event listener for the submit button
document.getElementById("generate").addEventListener("click", getGeoNames);

export { getGeoNames }