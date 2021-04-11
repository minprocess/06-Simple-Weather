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

var summaryLoc = document.querySelector("#summary-loc");   // list of temp, humidity, wind and UV Index
let summary = [
  {id: "#temp", name: "Temperature: ", value: "0", units: " °F" },
  {id: "#humidity", name: "Humidity: ", value: "0", units: " %" },
  {id: "#wind-speed", name: "Wind Speed: ", value: "0", units: " MPH" },
  {id: "#uv-index", name: "UV Index: ", value: "0", units: "" }
]

Init();

var textInputEl = document.getElementById("tfnewsearch");
textInputEl.addEventListener('submit',function(e) {
  e.preventDefault();
  var city = document.getElementById('search-textinput').value;
  if (city.length > 0) {
    currLoc.name = city;
    getOneCallAPIPart1();
  }
  console.log("search-textinput", city);
});

// Get previously search locations from local storage
function Init() {
    locStored = JSON.parse(localStorage.getItem("locStored") || "[]");
    if (locStored.length == 0) {
      console.log("init locstorage length = 0");
      locStored[0] = "a";
      localStorage.setItem("locStored", JSON.stringify(locStored));
    }
    else {
      fillLocList();
    }
}

/*
function addLocToList(i, city) {
    var li = document.createElement("li");
    li.textContent = city;
    li.setAttribute("data-index", i);

    locList.appendChild(li);
}
*/

// This is handler for clicking one of the choices
function onClickLocList(e) {
    var target = e.target; // Clicked element
    while (target && target.parentNode !== locList) {
        target = target.parentNode; // If the clicked element isn't a direct child
        if (!target) { return; } // If element doesn't exist
    }
    var city;
    if (target.tagName === "LI") {
      currLoc.name = target.innerHTML;
      //var index = target.getAttribute("data-index");
    }
    //var city = locStored[index];
    getOneCallAPIPart1();
}

function getOneCallAPIPart2() {
    var endpoint2 = "https://api.openweathermap.org/data/2.5/onecall?lat=" + currLoc.lat + "&lon=" + currLoc.lon + "&units=imperial&exclude=minutely,hourly&appid=" + APIkey;
    console.log("endpoint2", endpoint2);
    //var endpoint5 = "https://api.openweathermap.org/data/2.5/onecall?lat=33.441792&lon=-94.037689&exclude=hourly,daily&appid=06d8f6fe2e2745ccf1ea96dd0ca1238c";
    //var endpoint2 = "https://api.openweathermap.org/data/2.5/weather?q=London&APPID=06d8f6fe2e2745ccf1ea96dd0ca1238c";

    fetch(endpoint2)
        .then(function (response) {
          return response.json();
        })
        .then (function(data) {
            //console.log("OneCall data: ", data);
            var current = data["current"];
            summary[0].value = current.temp;
            summary[1].value = current.humidity;
            summary[2].value = current.wind_speed;
            summary[3].value = current.uvi;

            fillSummary();
            fillUVIndex();            
            storeGoodLocation();
        })
        .catch(function (error) {
          alert('Error connecting to weather data source -- getOneCallAPIPart2');
        });
}

function storeGoodLocation() {
    // Get location from search box

    // Put most recent is at beginning of array
    console.log("locstored[0] before", locStored[0]);
    locStored.unshift(currLoc.name);
    console.log("locstored[0] after", locStored[0]);
    fillLocList();
    
    localStorage.setItem("locStored", JSON.stringify(locStored));
}

function fillLocList() {
    var locListLen = locStored.length;
    console.log("in fileLocList", locListLen);
    var items = locList.getElementsByTagName("li");
    console.log("items[0]", items[0]);
    console.log("items", items);
    console.log("fillLocList items.length", items.length)
    for (var i=0; i<3; i++) {
      console.log("items[i].value", i, items[i].value);
    }

    // Clear list of question choices
    for (var i=0; i < items.length; i++) {
      items[i].value = "";
    }
    for (var i = 0; i < Math.min(locListLen, 10); i++) {
      console.log("locStored[i]", i, locStored[i]);
        items[i].value = locStored[i];
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
            console.log("arr ",arr);
            currLoc.lon = arr.lon;
            currLoc.lat = arr.lat;

            currLoc.valid = true;
            getOneCallAPIPart2();
        })
        .catch(function (error) {
          alert('Error connecting to weather data source -- getOneCallAPIPart1');
        });
}   // end of function getOneCallPart1()

// Summary shows current temperature, humidity and windSpeed
function fillSummary() {
    summaryLoc.textContent = currLoc.name;

    var tempEl = document.querySelector(summary[0].id);
    tempEl.textContent = summary[0].name + summary[0].value + summary[0].units;

    var humidityEl = document.querySelector(summary[1].id);
    humidityEl.textContent = summary[1].name + summary[1].value + summary[1].units;

    var windSpeedEl = document.querySelector(summary[2].id);
    windSpeedEl.textContent = summary[2].name + summary[2].value + summary[2].units;
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
        uvExpCat = " (Very High";
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