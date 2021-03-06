const weather = document.querySelector(".js-weather");
const tempMin = document.querySelector(".temp-min");
const tempMax = document.querySelector(".temp-max");

const COORDS = 'coords';
const API_KEY = "57078e5b759f8509bd7d48778de8911f";

function getWeather(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
        .then(function (response) {
            return response.json();
        })
        .then(function (myJson) {
        
            const temperature = myJson.main.temp;
            const temperature_min = myJson.main.temp_min;
            const temperature_max = myJson.main.temp_max;
            const place = myJson.name;
            weather.innerText = `${temperature}° @ ${place}`;
            tempMin.innerText = "↓"+temperature_min+"°";
            tempMax.innerText = "↑"+temperature_max+"°";

        });


}

function saveCoords(coordsObj) {
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    };

    saveCoords(coordsObj);
    getWeather(latitude, longitude);

}

function handleGeoErr() {
    console.log("error");
}

function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoErr);
}

function loadCoords() {
    const loadedCoords = localStorage.getItem(COORDS);
    if (loadedCoords === null) {
        askForCoords();
    } else {
        // getWeather
        const parsedCoords = JSON.parse(loadedCoords);
        getWeather(parsedCoords.latitude, parsedCoords.longitude);
    }
}


function init() {

    loadCoords();

}

init();