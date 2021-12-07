// API URL & Key //
const API_URL = 'https://pixabay.com/api/?';
const API_KEY = process.env.PIXABAY_KEY;

const imageType = 'photo';
/**
 * 
 * @param {*} input 
 * 
 * @returns picture data
 */
function validateInput(input) {
    const isInputValid = input ? input.length > 0 : false;

    return isInputValid;
}
/**
 * 
 * 
 * 
 */
async function fetchPixabayPicture(input) {
    const isInputValid = validateInput(input);

    if (isInputValid) {

        let encodedInput = encodeURIComponent(input);

        try {

            const response = await fetch(`${API_URL}key=${API_KEY}&q=${encodedInput}&image_type=${imageType}`);

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
 * Display results on the UI
 * 
 * @param {*} results from service to page
 * 
 */
async function updateUI(data) {

    try {

        const pixabayData = data.hits[0].webformatURL
        const imageUrl = pixabayData

        // document.getElementById("image").innerHTML = data.hits[0].webformatURL
        document.getElementById("pixabay-img").setAttribute("src", imageUrl);

        console.log(data.hits[0].webformatURL);


    } catch (error) {

        throw error;
    }
}

function getPictureData() {

    const input = document.getElementById("destination").value;

    try {
        // validate the input text (i.e., not nul and not empty)
        const isInputValid = validateInput(input);

        // console.log(`input: ${input}`);
        // console.log(`isInputValid: ${isInputValid}`);

        if (isInputValid) {
            // the input is valid, so get the text analysis data from the geonames.org service
            fetchPixabayPicture(input)
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
document.getElementById("generate").addEventListener("click", getPictureData);

export { getPictureData }