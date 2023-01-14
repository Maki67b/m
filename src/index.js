navigator.geolocation.getCurrentPosition(showPosition);
let now = new Date();

let h3 = document.querySelector("h3");
function convertDay(d)
{let day = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday"
];
return day[d.getDay()];
}

h3.innerHTML =
  convertDay(now) + "  " + now.getHours() + ":" + now.getMinutes();

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
  forecast(city);
}
function find(response) {
    let lat = response.data.coord.lat;
    let lon = response.data.coord.lon;
    let apiUrl = "https://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&appid=f3887e262c88d1158f7e2ef4998e234c&units=metric";
    axios.get(apiUrl).then(getTempq);
    
}
function getTempq(response) {
 
    let tempp = document.querySelector("#now");
    let low = document.querySelector("#low");
    let high = document.querySelector("#high");
  let status = document.querySelector("#status");
  
  let h2 = document.querySelector("h2");
  h2.innerHTML = response.data.name;
   status.innerHTML = Math.round(response.data.main.temp)+" ° | "+response.data.weather[0].main;
 
  low.innerHTML = "L:"+Math.round(response.data.main.temp_min)+"°";
  high.innerHTML = "H:" + Math.round(response.data.main.temp_max) + "°";
  
  let pic = response.data.weather[0].icon;
  document.getElementById("status-pic").src = "http://openweathermap.org/img/wn/" + pic + "@2x.png";

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

function forecast(city) {
    let apiUr =
  "https://api.openweathermap.org/data/2.5/forecast?cnt=6&appid=f3887e262c88d1158f7e2ef4998e234c&units=metric&q="+city;
    axios.get(apiUr).then(showf);
}

function showf(response){

    document
        .querySelectorAll(".col-2")
        .forEach(function (element, index) {
            let day = new Date(response.data.list[index].dt_txt);
            element.querySelector("#day").innerHTML = convertDay(day);
            element.querySelector("#time").innerHTML = day.getHours()+":0"+day.getMinutes();
            let pic= response.data.list[index].weather[0].icon;
            element.querySelector("#pic").src = "http://openweathermap.org/img/wn/" + pic + "@2x.png";
            let temp=Math.round( response.data.list[index].main.temp);
            element.querySelector(".temp1").innerHTML=temp;


        });
    }