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

    /**
     * Get data from the Weatherbit service
     * 
     * @param
     * 
     * @return
     */
    async function fetchWeatherData(input) {

        const isInputvalid = validateInput(input);

        if (isInputValid) {
            let encodedInput = encodeURIComponent(input);

            try {

                const
            }
        }
    }