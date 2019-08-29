/* ------------------------- VARIABLE DECLARATIONS ------------------------- */

/* ~~~ CURRENT LOCATION SECTION ~~~ */
var $locationName = $("#location-name");

/* ~~~~ DAILY WEATHER SECTION ~~~~ */
var $currentWeatherIcon = $("#current-weather-icon");
var $currentWeatherDescription = $("#current-weather-description");
var $currentWeatherTemp = $("#current-weather-temp");

var $hourlyIcon1 = $("#hourly-icon-1");
var $hourlyTemp1 = $("#hourly-temp-1");
var $hourlyIcon2 = $("#hourly-icon-2");
var $hourlyTemp2 = $("#hourly-temp-2");
var $hourlyIcon3 = $("#hourly-icon-3");
var $hourlyTemp3 = $("#hourly-temp-3");
var $hourlyIcon4 = $("#hourly-icon-4");
var $hourlyTemp4 = $("#hourly-temp-4");
var $hourlyIcon5 = $("#hourly-icon-5");
var $hourlyTemp5 = $("#hourly-temp-5");





/* ------------------------- FUNCTION DECLARATIONS ------------------------- */
function kelvinToFahrenheit(temp) {
  var newTemp = (temp - 273.15) * 9/5 + 32;

  console.log(newTemp);
}


function apiTest() {
  var apiAddress = "http://api.openweathermap.org/data/2.5/weather?zip=25303&APPID=1a21bb575add2b00bb03906bf2e18e87";

  $.get(apiAddress).done(function(data) {
    console.log("api data loaded");

    $locationName.html(data.name + ", " + data.sys.country);

    /* var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = mm + '/' + dd + '/' + yyyy;
    console.log(today); */

    $currentWeatherIcon.html("<img src= http://openweathermap.org/img/w/" + data.weather[0].icon + ".png>");
    $currentWeatherDescription.html(data.weather[0].main);
    $currentWeatherTemp.html(data.main.temp);

    kelvinToFahrenheit(data.main.temp);

    $hourlyIcon1.html("<img class='hourly-icon' src= http://openweathermap.org/img/w/" + data.weather[0].icon + ".png>");
    $hourlyTemp1.html(data.main.temp);
  });
}


function apiTestHourly() {
  var apiAddress = "http://api.openweathermap.org/data/2.5/forecast?zip=25303&APPID=1a21bb575add2b00bb03906bf2e18e87";

  $.get(apiAddress).done(function(data) {
    $hourlyIcon2.html("<img class='hourly-icon' src= http://openweathermap.org/img/w/" + data.list[0].weather[0].icon + ".png>");
    $hourlyTemp2.html(data.list[0].main.temp);

    $hourlyIcon3.html("<img class='hourly-icon' src= http://openweathermap.org/img/w/" + data.list[1].weather[0].icon + ".png>");
    $hourlyTemp3.html(data.list[1].main.temp);

    $hourlyIcon4.html("<img class='hourly-icon' src= http://openweathermap.org/img/w/" + data.list[2].weather[0].icon + ".png>");
    $hourlyTemp4.html(data.list[2].main.temp);

    $hourlyIcon5.html("<img class='hourly-icon' src= http://openweathermap.org/img/w/" + data.list[3].weather[0].icon + ".png>");
    $hourlyTemp5.html(data.list[3].main.temp);
  });
}





/* ---------------------------- EVENT HANDLERS ---------------------------- */
$(document).ready(function() {
  //apiTest();

  //apiTestHourly();
});
