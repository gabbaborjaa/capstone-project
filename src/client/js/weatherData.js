// API URL & Key
const API_URL = 'https://api.weatherbit.io/v2.0/current?';
const API_KEY = '08982352a66d46d5b0bbd4919b860415';

// Degree Fahrenheit Symbol
const metricSign = '&#8457;'


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
 * 
 * @param input city name
 * 
 * @returns weather data
 */
async function fetchWeatherData(input) {

    const isInputValid = validateInput(input);

    if (isInputValid) {

        let encodedInput = encodeURIComponent(input);

        try {

            // const PARAM_URL = `${API_URL}&city=${encodedInput}&key=${API_KEY}`;

            // const response = await fetch(`${PARAM_URL}`);
            const response = await fetch(`${API_URL}&city=${encodedInput}&key=${API_KEY}&units=I`);

            if (!response.ok) {

                throw `Error: ${response.status} - ${response.statusText}`;
            }

            const data = await response.json();

            return data;

        } catch (error) {

            throw error;
        }
    } else {

        throw "Error: Invalid input.";
    }
}

/**
 * Display weather results on the UI
 * 
 * @param {*} results data from api.weatherbit.io service
 */
async function updateUI(data) {
    //

    try {
        // Weather Data Function & Metric Unit
        let weatherData = data.data[0].app_temp
        let weatherIcon = data.data[0].weather.icon

        document.getElementById("weather").innerHTML = `Weather: ${weatherData} ${metricSign}`;
        // document.getElementById("weather-icon").setAttribute("src", weatherIcon);
        // console.log(data.data[0].weather.icon)

        // More Weather Details appear on the console
    } catch (error) {
        // Throw error if needed
        throw error;
    }
}

/**
 * 
 * 
 */
function getWeatherData() {

    const input = document.getElementById("destination").value;

    try {
        // validate the input text (i.e., not nul and not empty)
        const isInputValid = validateInput(input);

        // console.log(`input: ${input}`);
        // console.log(`isInputValid: ${isInputValid}`);

        if (isInputValid) {
            // the input is valid, so get the text analysis data from the geonames.org service
            fetchWeatherData(input)
                .then((data) => {
                    if (data) {
                        // response data from the weatherbit service is not null, so update the UI
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
document.getElementById("generate").addEventListener("click", getWeatherData);

export { getWeatherData }