/**
 * 
 * @param {*} date
 * 
 * @returns date countdown
 */

// Pass in a date in the future
// this function will return the difference in number of days from the current date to the future date
const tripCountdown = (date) => {

    //updateUI(date);

    const timerDetails = document.getElementById('timer');

    const now = new Date();
    const difference = Date.parse(date) - Date.parse(now);

    //Time Calculation gotten from Sitepoint (https://www.sitepoint.com/build-javascript-countdown-timer-no-dependencies/)
    const minutes = Math.floor((difference / 1000 / 60) % 60);
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));


    // Have the description show up with the countdown in the sentence.
    timerDetails.innerHTML = `
    Your trip is ${days} <span class="bold">Days </span> ${hours} <span class="bold">Hours</span> ${minutes} <span class="bold">Minutes</span> away!`;

}

// Show the countdown on the UI
const updateUI = (date) => {
    const departureDetails = document.querySelector('.timer');

    //departureDetails.innerHTML = date;

    return data;
}

let date = document.getElementById("departDate")
console.log(null)
console.log(departDate)
    // create event listener for the "let's go" button 
document.getElementById("generate").addEventListener("click", tripCountdown(date));

export { tripCountdown }