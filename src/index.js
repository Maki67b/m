let now = new Date();

let h3 = document.querySelector("h3");
console.log(h3);
let day = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday"
];
h3.innerHTML =
  day[now.getDay()] + "  " + now.getHours() + ":" + now.getMinutes();

let form = document.querySelector("form");
form.addEventListener("submit", search);
function search(event) {
  event.preventDefault();
  let input = document.querySelector("#form-input");
  let city = input.value;
  let apiUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=f3887e262c88d1158f7e2ef4998e234c&units=metric";
 
  axios.get(apiUrl).then(find);
}
function find(response) {
    let lat = response.data.coord.lat;
    let lon = response.data.coord.lon;
    
    let apiUrk = "https://pro.openweathermap.org/data/2.5/forecast/hourly?lat=" + lat + "&lon=" + lon + "&appid=b4b4246dda70defe9829c2975022b771&units=metric";
    axios.get(apiUrk).then(getTempq);
}
function getTempq(response) {
    console.log(response);
  let tempp = document.querySelector("#temp");
  let status = document.querySelector("#status");
  let wind = document.querySelector("#wind");
  let hum = document.querySelector("#hum");
  let h2 = document.querySelector("h2");
  h2.innerHTML = response.data.name;
  console.log(response.data);
  status.innerHTML = response.data.weather[0].main;
  tempp.innerHTML = Math.round(response.data.main.temp);
  wind.innerHTML = response.data.wind.speed;
  hum.innerHTML = response.data.main.humidity;
}

let button = document.querySelector("button");
button.addEventListener("click", getCurrent);
function getCurrent() {
    navigator.geolocation.getCurrentPosition(showPosition);
}
function showPosition(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    console.log(position);
    let apiUrl1 =
      "https://api.openweathermap.org/data/2.5/weather?lat=" +
      lat +
      "&lon=" +
      lon +
      "&appid=f3887e262c88d1158f7e2ef4998e234c&&units=metric";
    axios.get(apiUrl1).then(getTempq);
}