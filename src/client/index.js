// Style Imports
import './styles/style.scss'
// API Function Imports
import { getGeoNames } from './js/geoLocation.js'
import { getWeatherData } from './js/weatherData.js'
import { getPictureData } from './js/cityPictures.js'
import { tripCountdown } from './js/tripCountdown.js'


// export {
//     tripCountdown,
//     getGeoNames,
//     getWeatherData,
//     getPictureData
// }

function registerServiceWorker() {
    // console.log(":: registerServiceWorker()");

    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/service-worker.js')
                .then(registration => {
                    console.log('Service Worker registered: ', registration);
                })
                .catch(registrationError => {
                    console.log('Service Worker registration failed: ', registrationError);
                });
        });
    }
}

registerServiceWorker();