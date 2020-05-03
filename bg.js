const body = document.querySelector("body");
const IMG_NUMBER = 6;


function handleImgLoad() {
    console.log('finnished load to image')
}

function paintImage(imgNumber) {
    const image = new Image();
    image.src = `images/${imgNumber}.jpg`;
    image.classList.add("bgImage");
    body.prepend(image);
    // image load API 추가할 것 
    //image.addEventListener("loadend", handleImgLoad);

}

function genRandom() {
    const number = Math.floor(Math.random() * IMG_NUMBER) + 1;
    return number;
}

function init() {
    const randomNumber = genRandom();
    paintImage(randomNumber);
}

init();