const clockContainer = document.querySelector(".js-clock");
const clockTitle = document.querySelector(".js-title");
const jpClockTitle = document.querySelector(".js-jp-title");

function getTime() {
  const date = new Date();
  const minutes = date.getMinutes();
  const hours = date.getHours();
  const seconds = date.getSeconds();

  clockTitle.innerText = `${hours < 10 ? `0${hours}` : hours}:${
    minutes < 10 ? `0${minutes}` : minutes
  }:${seconds < 10 ? `0${seconds}` : seconds}`;
}

function setJpTitle() {
  const date = new Date();
  const hours = date.getHours();

  let jpTitle = "";
  if (hours < 12) {
    jpTitle = "お早う!";
  } else if (hours < 18) {
    jpTitle = "こんにちわ";
  } else {
    jpTitle = "こんばんわ:)";
  }

  jpClockTitle.innerText = jpTitle;
}

function init() {
  setJpTitle();
  getTime();

  setInterval(getTime, 100);
}

init();
