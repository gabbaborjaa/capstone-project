// import { getGeoCity } from './js/geonameLocation.js';
import { calculateDaysToGo } from './js/tripCountdown.js';

// Imported Styles
import './styles/style.scss';


export {
    calculateDaysToGo,
    // getGeoCity
};

// Event Listeners
document.getElementById("generate").addEventListener("click", getGeoCity);