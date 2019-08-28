/* ------------------------- VARIABLE DECLARATIONS ------------------------- */

/* ~~~~~~~~~~~~ NAVBAR ~~~~~~~~~~~~ */
var $locationName = $("#location-name");

var $currentWeatherIcon = $("#current-weather-icon");
var $currentWeatherDescription = $("#current-weather-description");
var $currentWeatherTemp = $("#current-weather-temp");






/* ------------------------- FUNCTION DECLARATIONS ------------------------- */
function apiTest() {
  var apiAddress = "http://api.openweathermap.org/data/2.5/weather?zip=25303&APPID=1a21bb575add2b00bb03906bf2e18e87";

  $.get(apiAddress).done(function(data) {
    console.log("api data loaded");

    /* console.log("");
    console.log(data.name);
    console.log(data.sys.country);
    console.log(data.weather[0].main);
    console.log(data.weather[0].description);
    console.log(data.main.temp); */

    $locationName.html(data.name + ", " + data.sys.country);

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = mm + '/' + dd + '/' + yyyy;
    console.log(today);

    $currentWeatherIcon.html("<img src= http://openweathermap.org/img/w/" + data.weather[0].icon + ".png>");
    $currentWeatherDescription.html(data.weather[0].main);
    $currentWeatherTemp.html(data.main.temp);
  });
}





/* ---------------------------- EVENT HANDLERS ---------------------------- */
$(document).ready(function() {
  //apiTest();
});
