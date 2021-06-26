// Simple weather app
// William T. Pate
// 9-April-2021  Start coding this script

const oneCallPath = "https://api.openweathermap.org/data/2.5/onecall";
const APIkey = "06d8f6fe2e2745ccf1ea96dd0ca1238c";
//var currLoc = {name:"Philadelphia", lat:39.9523, lon:-75.1625, valid: false};  // current location
var currLoc = {name:"Philadelphia", lat:39.9523, lon:-75.1625, valid: false};  // current location

var locIndex = 0;
var locList = document.querySelector("#location-list");  // ul
var locStored;   // Array of previously searched locations stored in local storage
locList.addEventListener("click", onClickLocList);

var addToRecent = false;

var summaryLoc = document.querySelector("#summary-loc");   // list of temp, humidity, wind and UV Index
let summary = [
  {id: "#temp", name: "Temperature: ", value: "0", units: " °F" },
  {id: "#humidity", name: "Humidity: ", value: "0", units: " %" },
  {id: "#wind-speed", name: "Wind Speed: ", value: "0", units: " MPH" },
  {id: "#uv-index", name: "UV Index: ", value: "0", units: "" },
  {id: "#current-sky", name: "Condition: ", value: "Sunny", units: "" }
]

let forecast = [
  {id: "day-1", date: "02/22/2021", min: "0", max: "100", sky: "Sunny", icon: "04d" },
  {id: "day-2", date: "02/23/2021", min: "0", max: "100", sky: "Sunny", icon: "04d" },
  {id: "day-3", date: "02/24/2021", min: "0", max: "100", sky: "Sunny", icon: "04d" },
  {id: "day-4", date: "02/25/2021", min: "0", max: "100", sky: "Sunny", icon: "04d" },
  {id: "day-4", date: "02/26/2021", min: "0", max: "100", sky: "Sunny", icon: "04d" }
]

Init();

var textInputEl = document.getElementById("tfnewsearch");   // name of form
textInputEl.addEventListener('submit',function(e) {
    e.preventDefault();
    var city = document.getElementById('search-textinput').value;
    if (city.length > 0) {
      currLoc.name = city;
      getOneCallAPIPart1();
    }
});

// Get previously search locations from local storage
function Init() {
    locStored = JSON.parse(localStorage.getItem("locStored") || "[]");
    if (locStored.length == 0) {
      localStorage.setItem("locStored", JSON.stringify(locStored));
      addToRecent = true;
    }
    else {
      currLoc.name = locStored[0];
      fillLocList();
    }
}

// This is handler for clicking one of the locations in the recent locations list
function onClickLocList(e) {
    var target = e.target; // Clicked element
    while (target && target.parentNode !== locList) {
        target = target.parentNode; // If the clicked element isn't a direct child
        if (!target) { return; } // If element doesn't exist
    }
    var city;
    if (target.tagName === "LI") {
      currLoc.name = target.innerHTML;
    }
    //var city = locStored[index];
    getOneCallAPIPart1();
}

function btnClearRecent() {
  while (locStored.length > 10) {
    var len = locStored.length;
    locStored.splice(len-1, 1);
  }

  fillLocList();
}

function getOneCallAPIPart2() {
    var endpoint2 = "https://api.openweathermap.org/data/2.5/onecall?lat=" + currLoc.lat + "&lon=" + currLoc.lon + "&units=imperial&exclude=minutely,hourly&appid=" + APIkey;

    // https://api.openweathermap.org/data/2.5/onecall?lat=33.441792&lon=-94.037689&units=imperial&exclude=minutely,hourly&appid=06d8f6fe2e2745ccf1ea96dd0ca1238c
    //var endpoint2 = "https://api.openweathermap.org/data/2.5/weather?q=London&APPID=06d8f6fe2e2745ccf1ea96dd0ca1238c";

    fetch(endpoint2)
        .then(function (response) {
          return response.json();
        })
        .then (function(data) {
            var current = data["current"];
            summary[0].value = current.temp;
            summary[1].value = current.humidity;
            summary[2].value = current.wind_speed;
            summary[3].value = current.uvi;
            var sky = current.weather[0].description;
            summary[4].value = sky;

            fillSummary();
            fillUVIndex();

            var daily = data["daily"];
            for (var i=0; i<5; i++) {
              var dt = daily[i].dt;  // Unix time
              forecast[i].date = moment.unix(dt).format("MM/DD/YYYY");
              forecast[i].min = daily[i].temp.min;
              forecast[i].max = daily[i].temp.max;
              var sky = daily[i].weather[0];
              forecast[i].sky = sky.description;
              forecast[i].icon = sky.icon;            }

            showFiveDayForecast();

            // The default city is Phildelphia
            
            if(addToRecent) {
              storeGoodLocation();
            }
            else {
              addToRecent = true;
            }
            
        })
        .catch(function (error) {
          alert('Error connecting to weather data source -- getOneCallAPIPart2');
        });
}

function showFiveDayForecast( ) {
  const idArr = ["#fcdate-", "#fcsky-", "#fcmin-", "#fcmax-"];
  for (var i=0; i<5; i++) {
    var tagDateId = idArr[0]+i;
    var dateEl = document.querySelector(tagDateId);
    dateEl.textContent = forecast[i].date;

    var tagSkyId = idArr[1]+i;
    var skyEl = document.querySelector(tagSkyId);
    skyEl.textContent = forecast[i].sky;

    var tagMinId = idArr[2]+i;
    var minEl = document.querySelector(tagMinId);
    minEl.textContent = "Min: "+forecast[i].min;

    var tagMaxId = idArr[3]+i;
    var maxEl = document.querySelector(tagMaxId);
    maxEl.textContent = "Max: "+forecast[i].max;
  }
}

function storeGoodLocation() {
    // Get location from search box
    var locEl = document.getElementById('search-textinput');
    locEl.textContent = "";
    locEl.value = "";

    // Put most recent at beginning of array with array.splice
    for (var i=0; i<Math.min(locStored.length, 10); i++) {
        if (currLoc.name == locStored[i]) {
          locStored.splice(i, 1);
        }
    }

    locStored.unshift(currLoc.name);
    fillLocList();
    
    localStorage.setItem("locStored", JSON.stringify(locStored));
}

function fillLocList() {
    var locListLen = locStored.length;
    var items = locList.getElementsByTagName("li");

    // Clear list of question choices
    for (var i=0; i < items.length; i++) {
      items[i].textContent = "";
    }

    for (var i = 0; i < Math.min(locListLen, 10); i++) {
        items[i].textContent = locStored[i];
    }
}

// This function gets lat and long of currLoc and calls getOneCallAPIPart2 which gets weather data and displays it. 
function getOneCallAPIPart1() {
    var endpoint1 = "https://api.openweathermap.org/geo/1.0/direct?q=" + currLoc.name + "&APPID=" + APIkey;
    fetch(endpoint1)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var arr = data[0];
            currLoc.lon = arr.lon;
            currLoc.lat = arr.lat;

            currLoc.valid = true;
            getOneCallAPIPart2();
        })
        .catch(function (error) {
          alert('Error reported by the weather data source -- city not found');
        });
}   // end of function getOneCallPart1()

// Summary shows current temperature, humidity and windSpeed
function fillSummary() {
    var currDate = moment().format("MM/DD/YYYY");
    summaryLoc.textContent = currLoc.name + " (" + currDate + ")";

    var tempEl = document.querySelector(summary[0].id);
    tempEl.textContent = summary[0].name + summary[0].value + summary[0].units;

    var humidityEl = document.querySelector(summary[1].id);
    humidityEl.textContent = summary[1].name + summary[1].value + summary[1].units;

    var windSpeedEl = document.querySelector(summary[2].id);
    windSpeedEl.textContent = summary[2].name + summary[2].value + summary[2].units;

    var skyEl = document.querySelector(summary[4].id);
    skyEl.textContent = summary[4].name + summary[4].value;
}    // End of function fillSummary();

function fillUVIndex() {
    /* https://www.epa.gov/sites/production/files/documents/uviguide.pdf */
    var uvExpCat;
    var uvClass;
    if (summary[3].value <= 2.0 ) {
        uvExpCat = " (Low)";
        uvClass = "uv-low";
    }
    else if (summary[3].value <= 5.0) {
        uvExpCat = " (Moderate)";
        uvClass = "uv-mod";
    }
    else if (summary[3].value <= 7.0) {
        uvExpCat = " (High)";
        uvClass = "uv-high";
    }
    else if (summary[3].value <= 11.0) {
        uvExpCat = " (Very High)";
        uvClass = "uv-very-high";
  }
    else {
        uvExpCat = " (Extreme)";
        uvClass = "uv-extreme";
    }

    // UV Index
    var uvSpan1El = document.querySelector("#span-1");
    uvSpan1El.textContent = summary[3].name;

    // Value
    var uvSpan2El = document.querySelector("#span-2");
    uvSpan2El.textContent = "  "+summary[3].value + "  ";
    uvSpan2El.classList.add(uvClass);

    // Exposure category
    var uvSpan3El = document.querySelector("#span-3");
    uvSpan3El.textContent = uvExpCat;
}

function addSpan() {
  var price = document.getElementsById('uv-index')[0];
  var span = document.createElement('span');
  span.classList.add('whatever');
  span.innerText = 'uvi';
  //price.innerText = "UV Index"
  price.appendChild(span);
}

// Fill table with current weather
//getWeatherAPI();
getOneCallAPIPart1(); // All