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
var newTempRawFahrenheit = 0;
var newTempFahrenheit = 0;

var $currentWeatherIconContainer = $("#current-weather-icon-container");
var $currentWeatherDescription = $("#current-weather-description");
var $currentWeatherTemp = $("#current-weather-temp");

var $currentWeatherMaxTemp = $("#current-weather-max-temp");
var $currentWeatherMinTemp = $("#current-weather-min-temp");
var $currentWeatherHumidity = $("#current-weather-humidity");
var $currentWeatherWindSpeed = $("#current-weather-wind-speed");

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


/* ~~~~~ HOURLY CHART SECTION ~~~~~ */
var hourlyChartTimeArray = [];
var hourlyChartTempArray = [];
var hourlyChartHumidityArray = [];
var hourlyChartWindArray = [];

var $hourlyChartLoadingSpinner = $("#hourly-chart-loading-spinner");



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
var upcomingDayIconMasterArray = [upcomingDay1IconArray, upcomingDay2IconArray, upcomingDay3IconArray, upcomingDay4IconArray, upcomingDay5IconArray];
var upcomingIconArray = [$upcomingIcon1, $upcomingIcon2, $upcomingIcon3, $upcomingIcon4, $upcomingIcon5];

var upcomingDay1TempArray = [];
var $upcomingTempHigh1 = $("#upcoming-temp-high-1");
var $upcomingTempLow1 = $("#upcoming-temp-low-1");
var upcomingDay2TempArray = [];
var $upcomingTempHigh2 = $("#upcoming-temp-high-2");
var $upcomingTempLow2 = $("#upcoming-temp-low-2");
var upcomingDay3TempArray = [];
var $upcomingTempHigh3 = $("#upcoming-temp-high-3");
var $upcomingTempLow3 = $("#upcoming-temp-low-3");
var upcomingDay4TempArray = [];
var $upcomingTempHigh4 = $("#upcoming-temp-high-4");
var $upcomingTempLow4 = $("#upcoming-temp-low-4");
var upcomingDay5TempArray = [];
var $upcomingTempHigh5 = $("#upcoming-temp-high-5");
var $upcomingTempLow5 = $("#upcoming-temp-low-5");
var upcomingDayTempMasterArray = [upcomingDay1TempArray, upcomingDay2TempArray, upcomingDay3TempArray, upcomingDay4TempArray, upcomingDay5TempArray];
var upcomingTempHighArray = [$upcomingTempHigh1, $upcomingTempHigh2, $upcomingTempHigh3, $upcomingTempHigh4, $upcomingTempHigh5];
var upcomingTempLowArray = [$upcomingTempLow1, $upcomingTempLow2, $upcomingTempLow3, $upcomingTempLow4, $upcomingTempLow5];



/* ------------------------- FUNCTION DECLARATIONS ------------------------- */
function geoLocateSuccess(pos) {
  userLat = Math.round(pos.coords.latitude * 100) / 100;
  userLon = Math.round(pos.coords.longitude * 100) / 100;

  console.log("lat = " + userLat);
  console.log("lon = " + userLon);

  getCurrentDate();
  getCurrentWeekday();
  console.log("");
  console.log(currentDate);

  getCurrentWeatherAPI();
  getForecastWeatherAPI();
}


function geoLocateError() {
  console.log("geo blocked");

  $hourlyChartLoadingSpinner.removeClass("rotate-loading-spinner");
  $hourlyChartLoadingSpinner.css("display", "none");
}


function getCurrentDate() {
  var date = new Date();
  var dd = String(date.getDate()).padStart(2, "0");
  var mm = String(date.getMonth() + 1).padStart(2, "0");
  var yyyy = date.getFullYear();

  currentDate = mm + "/" + dd + "/" + yyyy;
}


function getCurrentWeekday() {
  var today = new Date();
  var weekdayNum = today.getDay();

  currentWeekday = daysOfWeek[weekdayNum];
}


function kelvinToFahrenheit(temp) {
  newTempRawFahrenheit = (temp - 273.15) * 9/5 + 32;

  newTempFahrenheit = Math.round(newTempRawFahrenheit) + "&deg;";
}


function getCurrentWeatherAPI() {
  var apiAddress = `https://api.openweathermap.org/data/2.5/weather?lat=${userLat}&lon=${userLon}&APPID=1a21bb575add2b00bb03906bf2e18e87`;

  $.get(apiAddress).done(function(data) {
    console.log("");
    console.log("current weather api data loaded");

    appendCurrentLocationData(data);

    appendCurrentWeatherData(data);
  });
}


function appendCurrentLocationData(data) {
  $locationName.html(data.name + ", " + data.sys.country);

  $locationDate.html(currentWeekday);

  $locationDate.append(" - " + currentDate);
}


function appendCurrentWeatherData(data) {
  $currentWeatherDescription.html(data.weather[0].main);

  $currentWeatherIconContainer.html("<img class=current-weather-icon src= https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png>");

  //$currentWeatherTemp.html(data.main.temp);
  kelvinToFahrenheit(data.main.temp);
  $currentWeatherTemp.html(newTempFahrenheit + "F");

  kelvinToFahrenheit(data.main.temp_max);
  $currentWeatherMaxTemp.html(newTempFahrenheit);
  kelvinToFahrenheit(data.main.temp_min);
  $currentWeatherMinTemp.html(newTempFahrenheit);

  $currentWeatherHumidity.html(data.main.humidity + "%");
  $currentWeatherWindSpeed.html(Math.round(data.wind.speed * 2.237) + "mph");
}


function getForecastWeatherAPI() {
  var apiAddress = `https://api.openweathermap.org/data/2.5/forecast?lat=${userLat}&lon=${userLon}&APPID=1a21bb575add2b00bb03906bf2e18e87`;

  $.get(apiAddress).done(function(data) {
    console.log("");
    console.log("5-day forecast api data loaded");

    appendHourlyWeatherData(data);

    loopThroughUpcomingData(data);

    appendUpcomingWeatherData(data);

    appendHourlyChartData();
  });
}


function appendHourlyWeatherData(data) {
  for(var n = 0; n < 5; n++) {
    timestampToLocalHour(data.list[n].dt);
    hourlyTimeArray[n].html(localHour);

    hourlyIconArray[n].html("<img class='hourly-icon' src= https://openweathermap.org/img/wn/" + data.list[n].weather[0].icon + ".png>");

    kelvinToFahrenheit(data.list[n].main.temp);
    hourlyTempArray[n].html(newTempFahrenheit);

    fillHourlyChartArrays(data, n);
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


function fillHourlyChartArrays(data, n) {
  hourlyChartTimeArray.push(localHour);
  hourlyChartTempArray.push( Math.round(newTempRawFahrenheit) );
  hourlyChartHumidityArray.push( Math.round(data.list[n].main.humidity) );
  hourlyChartWindArray.push( Math.round(data.list[n].wind.speed * 2.237) );
}


function loopThroughUpcomingData(data) {
  upcomingDateComparator = currentDate;

  data.list.forEach(function(i) {
    timestampToLocalDate(i.dt);

    fillFiveDayForecastArray(i);

    if(i === data.list[39]) {
      data.list.forEach(function(j) {
        timestampToLocalDate(j.dt);

        fillUpcomingIconArrays(j);

        fillUpcomingTempArrays(j);
      });
    }
  });

  console.log("");
  console.log("current day data count : " + currentDayForecastCountArray.length);

  /* console.log(fiveDayForecastArray);
  console.log(upcomingDay1IconArray);
  console.log(upcomingDay2IconArray);
  console.log(upcomingDay3IconArray);
  console.log(upcomingDay4IconArray); */
  console.log(upcomingDay5IconArray);

  /* console.log(upcomingDay1TempArray);
  console.log(upcomingDay2TempArray);
  console.log(upcomingDay3TempArray);
  console.log(upcomingDay4TempArray); */
  console.log(upcomingDay5TempArray);
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


function fillUpcomingIconArrays(j) {
  for(var y = 0; y < 5; y++) {
    if(localDate === fiveDayForecastArray[y]) {
      upcomingDayIconMasterArray[y].push(j.weather[0].icon);
    }
  }
}


function fillUpcomingTempArrays(j) {
  for(var x = 0; x < 5; x++) {
    if(localDate === fiveDayForecastArray[x]) {
      upcomingDayTempMasterArray[x].push(j.main.temp);
    }
  }
}


function appendUpcomingWeatherData(data) {
  for(var v = 0; v < 5; v++) {
    upcomingDateArray[v].html( fiveDayForecastArray[v].slice(0, 5) );
  }


  for(var y = 0; y < 4; y++) {
    upcomingIconArray[y].html("<img class='hourly-icon' src= https://openweathermap.org/img/wn/" + upcomingDayIconMasterArray[y][4] + ".png>");
  }
  if(upcomingDay5IconArray.length >= 5) {
    upcomingIconArray[4].html("<img class='hourly-icon' src= https://openweathermap.org/img/wn/" + upcomingDay5IconArray[4] + ".png>");
  }
  else {
    upcomingIconArray[4].html("<img class='hourly-icon' src= https://openweathermap.org/img/wn/" + (upcomingDay5IconArray[upcomingDay5IconArray.length - 1]) + ".png>");
  }


  for(var x = 0; x < 5; x++) {
    kelvinToFahrenheit( Math.max(...upcomingDayTempMasterArray[x]) );
    upcomingTempHighArray[x].html(newTempFahrenheit);

    kelvinToFahrenheit( Math.min(...upcomingDayTempMasterArray[x]) );
    upcomingTempLowArray[x].html(newTempFahrenheit);
  }
}


function appendHourlyChartData() {
  $hourlyChartLoadingSpinner.removeClass("rotate-loading-spinner");
  $hourlyChartLoadingSpinner.css("display", "none");

  var myChart = Highcharts.chart("chart-container", {
    chart: {
      zoomType: "xy"
    },
    title: {
      text: "Detailed Hourly Weather"
    },
    xAxis: {
      categories: [hourlyChartTimeArray[0],
      hourlyChartTimeArray[1],
      hourlyChartTimeArray[2],
      hourlyChartTimeArray[3],
      hourlyChartTimeArray[4]],
      crosshair: true
    },
    yAxis: [{
      labels: {
        format: "{value}°F",
        style: {
          color: Highcharts.getOptions().colors[0]
        }
      },
      title: {
        text: ""
      },
      allowDecimals: false,
      opposite: true
    },
    {
      labels: {
        format: '{value}%',
        style: {
          color: Highcharts.getOptions().colors[1]
        }
      },
      title: {
        text: ""
      },
      allowDecimals: false,
      opposite: true
    },
    {
      labels: {
        format: '{value}mph',
        style: {
          color: Highcharts.getOptions().colors[2]
        }
      },
      title: {
        text: ""
      },
      allowDecimals: false
    }],
    tooltip: {
      shared: true
    },
    series: [{
      name: "Temperature",
      type: "spline",
      data: [hourlyChartTempArray[0],
        hourlyChartTempArray[1],
        hourlyChartTempArray[2],
        hourlyChartTempArray[3],
        hourlyChartTempArray[4]],
      tooltip: {
        valueSuffix: "°F"
      }
    },
    {
      name: "Humidity",
      type: "spline",
      yAxis: 1,
      data: [hourlyChartHumidityArray[0],
        hourlyChartHumidityArray[1],
        hourlyChartHumidityArray[2],
        hourlyChartHumidityArray[3],
        hourlyChartHumidityArray[4]],
      tooltip: {
        valueSuffix: "%"
      }
    },
    {
      name: "Wind Speed",
      type: "spline",
      yAxis: 2,
      data: [hourlyChartWindArray[0],
        hourlyChartWindArray[1],
        hourlyChartWindArray[2],
        hourlyChartWindArray[3],
        hourlyChartWindArray[4]],
      tooltip: {
        valueSuffix: "mph"
      }
    }]
  });
}





/* ---------------------------- EVENT HANDLERS ---------------------------- */
$(document).ready(function() {
  $hourlyChartLoadingSpinner.addClass("rotate-loading-spinner");

  navigator.geolocation.getCurrentPosition(geoLocateSuccess, geoLocateError);
});
