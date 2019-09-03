/* ------------------------- VARIABLE DECLARATIONS ------------------------- */

/* ~~~ CURRENT LOCATION SECTION ~~~ */
var userLat = 0;
var userLon = 0;
var $locationName = $("#location-name");

var daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var currentWeekday = "";
var currentDate = "";
var $locationDate = $("#location-date");


/* ~~~~ DAILY WEATHER SECTION ~~~~ */
var localHour = 0;
var newTempFahrenheit = 0;

var $currentWeatherIconContainer = $("#current-weather-icon-container");
var $currentWeatherDescription = $("#current-weather-description");
var $currentWeatherTemp = $("#current-weather-temp");

var $hourlyTime1 = $("#hourly-time-1");
var $hourlyTime2 = $("#hourly-time-2");
var $hourlyTime3 = $("#hourly-time-3");
var $hourlyTime4 = $("#hourly-time-4");
var $hourlyTime5 = $("#hourly-time-5");
var hourlyTimeArray = [$hourlyTime1, $hourlyTime2, $hourlyTime3, $hourlyTime4, $hourlyTime5];

var $hourlyIcon1 = $("#hourly-icon-1");
var $hourlyIcon2 = $("#hourly-icon-2");
var $hourlyIcon3 = $("#hourly-icon-3");
var $hourlyIcon4 = $("#hourly-icon-4");
var $hourlyIcon5 = $("#hourly-icon-5");
var hourlyIconArray = [$hourlyIcon1, $hourlyIcon2, $hourlyIcon3, $hourlyIcon4, $hourlyIcon5];

var $hourlyTemp1 = $("#hourly-temp-1");
var $hourlyTemp2 = $("#hourly-temp-2");
var $hourlyTemp3 = $("#hourly-temp-3");
var $hourlyTemp4 = $("#hourly-temp-4");
var $hourlyTemp5 = $("#hourly-temp-5");
var hourlyTempArray = [$hourlyTemp1, $hourlyTemp2, $hourlyTemp3, $hourlyTemp4, $hourlyTemp5];


/* ~~ UPCOMING FORECAST SECTION ~~ */
var localDate = "";
var upcomingDateComparator = "";

var currentDayForecastCountArray = [];
var fiveDayForecastArray = [];

var $upcomingDate1 = $("#upcoming-date-1");
var $upcomingDate2 = $("#upcoming-date-2");
var $upcomingDate3 = $("#upcoming-date-3");
var $upcomingDate4 = $("#upcoming-date-4");
var $upcomingDate5 = $("#upcoming-date-5");
var upcomingDateArray = [$upcomingDate1, $upcomingDate2, $upcomingDate3, $upcomingDate4, $upcomingDate5];

var upcomingDay1IconArray = [];
var $upcomingIcon1 = $("#upcoming-icon-1");

var upcomingDay2IconArray = [];
var $upcomingIcon2 = $("#upcoming-icon-2");

var upcomingDay3IconArray = [];
var $upcomingIcon3 = $("#upcoming-icon-3");

var upcomingDay4IconArray = [];
var $upcomingIcon4 = $("#upcoming-icon-4");

var upcomingDay5IconArray = [];
var $upcomingIcon5 = $("#upcoming-icon-5");
var upcomingIconArray = [$upcomingIcon1, $upcomingIcon2, $upcomingIcon3, $upcomingIcon4, $upcomingIcon5];




/* ------------------------- FUNCTION DECLARATIONS ------------------------- */
function geoLocateSuccess(pos) {
  userLat = Math.round(pos.coords.latitude * 100) / 100;
  userLon = Math.round(pos.coords.longitude * 100) / 100;

  console.log("lat = " + userLat);
  console.log("lon = " + userLon);

  getCurrentWeatherAPI();
  getForecastWeatherAPI();
}


function geoLocateError() {
  console.log("geo blocked");
}


function kelvinToFahrenheit(temp) {
  newTempFahrenheit = (temp - 273.15) * 9/5 + 32;

  newTempFahrenheit = Math.round(newTempFahrenheit) + "&deg;";
}


function getCurrentWeatherAPI() {
  var apiAddress = `http://api.openweathermap.org/data/2.5/weather?lat=${userLat}&lon=${userLon}&APPID=1a21bb575add2b00bb03906bf2e18e87`;

  $.get(apiAddress).done(function(data) {
    console.log("");
    console.log("current weather api data loaded");

    appendCurrentLocationData(data);

    appendCurrentWeatherData(data);
  });
}


function appendCurrentLocationData(data) {
  $locationName.html(data.name + ", " + data.sys.country);

  getCurrentWeekday();
  $locationDate.html(currentWeekday);

  getCurrentDate();
  $locationDate.append(" - " + currentDate);
}


function getCurrentWeekday() {
  var today = new Date();
  var weekdayNum = today.getDay();

  currentWeekday = daysOfWeek[weekdayNum];
}


function getCurrentDate() {
  var date = new Date();
  var dd = String(date.getDate()).padStart(2, "0");
  var mm = String(date.getMonth() + 1).padStart(2, "0");
  var yyyy = date.getFullYear();

  currentDate = mm + "/" + dd + "/" + yyyy;
}


function appendCurrentWeatherData(data) {
  $currentWeatherDescription.html(data.weather[0].main);

  $currentWeatherIconContainer.html("<img class=current-weather-icon src= http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png>");

  //$currentWeatherTemp.html(data.main.temp);
  kelvinToFahrenheit(data.main.temp);
  $currentWeatherTemp.html(newTempFahrenheit + "F");
}


function getForecastWeatherAPI() {
  var apiAddress = `http://api.openweathermap.org/data/2.5/forecast?lat=${userLat}&lon=${userLon}&APPID=1a21bb575add2b00bb03906bf2e18e87`;

  $.get(apiAddress).done(function(data) {
    console.log("");
    console.log("5-day forecast api data loaded");

    appendHourlyWeatherData(data);

    loopThroughUpcomingData(data);

    appendUpcomingWeatherData(data);
  });
}


function appendHourlyWeatherData(data) {
  for(var n = 0; n < 5; n++) {
    timestampToLocalHour(data.list[n].dt);
    hourlyTimeArray[n].html(localHour);

    hourlyIconArray[n].html("<img class='hourly-icon' src= http://openweathermap.org/img/wn/" + data.list[n].weather[0].icon + ".png>");

    kelvinToFahrenheit(data.list[n].main.temp);
    hourlyTempArray[n].html(newTempFahrenheit);
  }
}


function timestampToLocalHour(timestamp) {
  localHour = 0;

  var date = new Date( timestamp * 1000 );
  localHour = date.getHours();

  if(localHour === 0) {
    localHour = "12AM";
  }
  else if(localHour > 12) {
    localHour -= 12;
    localHour += "PM";
  }
  else {
    localHour += "AM";
  }
}


function loopThroughUpcomingData(data) {
  upcomingDateComparator = currentDate;

  data.list.forEach(function(i) {
    timestampToLocalDate(i.dt);

    fillFiveDayForecastArray(i);

    fillUpcomingIconArrays(i);
  });

  console.log("");
  console.log("current day data count : " + currentDayForecastCountArray.length);

  console.log(fiveDayForecastArray);
  console.log(upcomingDay1IconArray);
  console.log(upcomingDay2IconArray);
  console.log(upcomingDay3IconArray);
  console.log(upcomingDay4IconArray);
  console.log(upcomingDay5IconArray);
}


function timestampToLocalDate(timestamp) {
  var date = new Date( timestamp * 1000 );
  var dd = String(date.getDate()).padStart(2, "0");
  var mm = String(date.getMonth() + 1).padStart(2, "0");
  var yyyy = date.getFullYear();

  localDate = mm + "/" + dd + "/" + yyyy;
}


function fillFiveDayForecastArray(i) {
  if(localDate === currentDate) {
    currentDayForecastCountArray.push(i.dt);

    if(currentDayForecastCountArray.length === 8) {
      console.log("local date rollover!");

      fiveDayForecastArray.push(localDate);
    }
  }

  if(localDate !== upcomingDateComparator) {
    fiveDayForecastArray.push(localDate);

    upcomingDateComparator = localDate;
  }
}


function fillUpcomingIconArrays(i) {
  if(localDate === fiveDayForecastArray[0]) {
    upcomingDay1IconArray.push(i.weather[0].icon);
  }

  if(localDate === fiveDayForecastArray[1]) {
    upcomingDay2IconArray.push(i.weather[0].icon);
  }

  if(localDate === fiveDayForecastArray[2]) {
    upcomingDay3IconArray.push(i.weather[0].icon);
  }

  if(localDate === fiveDayForecastArray[3]) {
    upcomingDay4IconArray.push(i.weather[0].icon);
  }

  if(localDate === fiveDayForecastArray[4]) {
    upcomingDay5IconArray.push(i.weather[0].icon);
  }
}


function appendUpcomingWeatherData(data) {
  for(var v = 0; v < 5; v++) {
    upcomingDateArray[v].html( fiveDayForecastArray[v].slice(0, 5) );
  }

  /* upcomingIconArray[0].html("<img class='hourly-icon' src= http://openweathermap.org/img/wn/" + upcomingDay1IconArray[4] + ".png>");
  upcomingIconArray[1].html("<img class='hourly-icon' src= http://openweathermap.org/img/wn/" + upcomingDay2IconArray[4] + ".png>");
  upcomingIconArray[2].html("<img class='hourly-icon' src= http://openweathermap.org/img/wn/" + upcomingDay3IconArray[4] + ".png>");
  upcomingIconArray[3].html("<img class='hourly-icon' src= http://openweathermap.org/img/wn/" + upcomingDay4IconArray[4] + ".png>");
  upcomingIconArray[4].html("<img class='hourly-icon' src= http://openweathermap.org/img/wn/" + upcomingDay5IconArray[2] + ".png>"); */
}





/* ---------------------------- EVENT HANDLERS ---------------------------- */
$(document).ready(function() {
  navigator.geolocation.getCurrentPosition(geoLocateSuccess, geoLocateError);
});
