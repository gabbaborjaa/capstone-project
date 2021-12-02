// API URL & Key // 
const weatherbitUrl = 'https://api.weatherbit.io/v2.0/current';
const weatherbitApi = '4e5f8ac1e15047d6aac9f136cfe47d89';

// Server to post Data //
const server = "http://localhost:6000";

// Getting Today's Date //
let dateToday = new Date().toLocaleDateString('en-US');

/**
 * 
 * @param {*} City 
 * 
 * @returns weather data
 * 
 */

async function getWeatherData(city) {
    try {
        const response = await fetch(`${weatherbitUrl}&city=${city}&key=${weatherbitApi}`);
        const data = await response.json();

        if (data.cod != 200) {

            throw `${data.cod}: ${data.message}`;
        }

        return data;

    } catch (error) {
        // Displaying Error through the console.
        console.log(error);
    }
};

/**
 * 
 * @param {*} weather service api endpoint
 * @param {*} info weather data to post
 * 
 * @returns weather data
 * 
 */

async function postWeathereData(url = "", info = {}) {

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "applicaton/json",
        },
        body: JSON.stringify(info),
    });

    try {
        const data = await response.json();

        console.log(`Saved data: ${data}`);

        return data;

    } catch (error) {
        // Displaying Error through the console.
        console.log(error);
    }
};

/**
 * Displaying Weather on UI
 */
async function updateUI() {

    const response = await fetch(server + "/all");

    try {
        const savedData = await response.json();

        document.getElementById("destination").innerHTML = savedData.placeGoing;
        document.getElementById("date").innerHTML = savedData.dateLeaving

    } catch (error) {
        // Displaying Error through the console.
        console.log(error);
    }
};
/**
 * Retrieves weather data from the API and displays them on the UI.
 */
function generateWeatherData() {

    const destination = document.getElementById("destination").value;
    const zip = document.getElementById("destination").value;

    getWeatherData(destination).then((data) => {

    })
};


// Event Listener
document.getElementById("generate").addEventListener("click", generateWeatherData);