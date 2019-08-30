/* ------------------------- VARIABLE DECLARATIONS ------------------------- */

/* ~~~ CURRENT LOCATION SECTION ~~~ */
var $locationName = $("#location-name");

var daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var currentWeekday = "";
var $locationDate = $("#location-date");

/* ~~~~ DAILY WEATHER SECTION ~~~~ */
var currentHour = 0;
var newTempFahrenheit = 0;

var $currentWeatherIcon = $("#current-weather-icon");
var $currentWeatherDescription = $("#current-weather-description");
var $currentWeatherTemp = $("#current-weather-temp");

var $hourlyTime1 = $("#hourly-time-1");
var $hourlyIcon1 = $("#hourly-icon-1");
var $hourlyTemp1 = $("#hourly-temp-1");
var $hourlyTime2 = $("#hourly-time-2");
var $hourlyIcon2 = $("#hourly-icon-2");
var $hourlyTemp2 = $("#hourly-temp-2");
var $hourlyTime3 = $("#hourly-time-3");
var $hourlyIcon3 = $("#hourly-icon-3");
var $hourlyTemp3 = $("#hourly-temp-3");
var $hourlyTime4 = $("#hourly-time-4");
var $hourlyIcon4 = $("#hourly-icon-4");
var $hourlyTemp4 = $("#hourly-temp-4");
var $hourlyTime5 = $("#hourly-time-5");
var $hourlyIcon5 = $("#hourly-icon-5");
var $hourlyTemp5 = $("#hourly-temp-5");





/* ------------------------- FUNCTION DECLARATIONS ------------------------- */
function getCurrentWeekday() {
  var today = new Date();
  var weekdayNum = today.getDay();

  currentWeekday = daysOfWeek[weekdayNum];

  $locationDate.html(currentWeekday);
}


function getCurrentDate() {
  var currentDate = new Date();
  var dd = String(currentDate.getDate()).padStart(2, "0");
  var mm = String(currentDate.getMonth() + 1).padStart(2, "0");
  var yyyy = currentDate.getFullYear();

  currentDate = mm + "/" + dd + "/" + yyyy;

  $locationDate.append(" - " + currentDate);
}


function convertTimestamp(timestamp) {
  currentHour = 0;

  var date = new Date( timestamp * 1000 );
  currentHour = date.getHours();

  if(currentHour === 0) {
    currentHour = "12AM";
  }
  else if(currentHour > 12) {
    currentHour -= 12;
    currentHour += "PM";
  }
  else {
    currentHour += "AM";
  }
}


function kelvinToFahrenheit(temp) {
  newTempFahrenheit = (temp - 273.15) * 9/5 + 32;

  newTempFahrenheit = Math.round(newTempFahrenheit) + "&deg;";
}


function apiTest() {
  var apiAddress = "http://api.openweathermap.org/data/2.5/weather?zip=25303&APPID=1a21bb575add2b00bb03906bf2e18e87";

  $.get(apiAddress).done(function(data) {
    console.log("api data loaded");

    $locationName.html(data.name + ", " + data.sys.country);

    kelvinToFahrenheit(data.main.temp);

    $currentWeatherIcon.html("<img src= http://openweathermap.org/img/w/" + data.weather[0].icon + ".png>");
    $currentWeatherDescription.html(data.weather[0].main);
    //$currentWeatherTemp.html(data.main.temp);
    $currentWeatherTemp.html(newTempFahrenheit + "F");
  });
}


function apiTestHourly() {
  var apiAddress = "http://api.openweathermap.org/data/2.5/forecast?zip=25303&APPID=1a21bb575add2b00bb03906bf2e18e87";

  $.get(apiAddress).done(function(data) {
    convertTimestamp(data.list[0].dt);
    $hourlyTime1.html(currentHour);

    $hourlyIcon1.html("<img class='hourly-icon' src= http://openweathermap.org/img/w/" + data.list[0].weather[0].icon + ".png>");

    kelvinToFahrenheit(data.list[0].main.temp);
    $hourlyTemp1.html(newTempFahrenheit);



    convertTimestamp(data.list[1].dt);
    $hourlyTime2.html(currentHour);

    $hourlyIcon2.html("<img class='hourly-icon' src= http://openweathermap.org/img/w/" + data.list[1].weather[0].icon + ".png>");

    kelvinToFahrenheit(data.list[1].main.temp);
    $hourlyTemp2.html(newTempFahrenheit);



    convertTimestamp(data.list[2].dt);
    $hourlyTime3.html(currentHour);

    $hourlyIcon3.html("<img class='hourly-icon' src= http://openweathermap.org/img/w/" + data.list[2].weather[0].icon + ".png>");

    kelvinToFahrenheit(data.list[2].main.temp);
    $hourlyTemp3.html(newTempFahrenheit);



    convertTimestamp(data.list[3].dt);
    $hourlyTime4.html(currentHour);

    $hourlyIcon4.html("<img class='hourly-icon' src= http://openweathermap.org/img/w/" + data.list[3].weather[0].icon + ".png>");

    kelvinToFahrenheit(data.list[3].main.temp);
    $hourlyTemp4.html(newTempFahrenheit);



    convertTimestamp(data.list[4].dt);
    $hourlyTime5.html(currentHour);

    $hourlyIcon5.html("<img class='hourly-icon' src= http://openweathermap.org/img/w/" + data.list[4].weather[0].icon + ".png>");

    kelvinToFahrenheit(data.list[4].main.temp);
    $hourlyTemp5.html(newTempFahrenheit);
  });
}





/* ---------------------------- EVENT HANDLERS ---------------------------- */
$(document).ready(function() {
  getCurrentWeekday();

  getCurrentDate();

  apiTest();

  apiTestHourly();
});
