const COORDS = 'coords';


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

}

function handleGeoErr() {
    console.log("error");
}

function askForCoords() {
    console.log("askForCords");
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoErr);
    console.log("askForCords -- end");
}

function loadCoords() {
    const loadedCords = localStorage.getItem(COORDS);
    if (loadedCords === null) {
        askForCoords();
    } else {
        // getWeather


    }
}


function init() {



}

init();