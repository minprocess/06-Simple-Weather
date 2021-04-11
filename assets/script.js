// Simple weather app
// William T. Pate
// 9-April-2021  Start coding this script

const oneCallPath = "https://api.openweathermap.org/data/2.5/onecall";
const APIkey = "06d8f6fe2e2745ccf1ea96dd0ca1238c";
var currLoc = {name:"Philadelphia", lat:39.9523, lon:-75.1625, valid: false};  // current location

let locTextBox = document.getElementById('location'),
btnSearch = document.getElementById('btn-search');

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

var test = true;

Init();

locTextBox.addEventListener('keydown', (e) => {
    if (!e.repeat) {
        if (e.code == "Enter") {
          var currLocName = locTextBox.value;
          console.log("Enter key struck, location is: ", currLoc);
          // Add 
        }
    }
});

btnSearch.addEventListener('click', (e) => {
    var city = locTextBox.textContent;
    var loc;  // loc.lon, log.lat, loc.valid
    getCoords(city, loc);
    if (!loc.valid) {
        console.log ("not a valid city");
        return;
    }
    locStored.push
    addLocToList(locIndex, loc);
});

// Get previously search locations from local storage
function Init() {
    locStored = JSON.parse(localStorage.getItem("locStored") || "[]");
    fillLocList();
}

function addLocToList(i, city) {
    var li = document.createElement("li");
    li.textContent = city;
    li.setAttribute("data-index", i);

    locList.appendChild(li);
}

function fillLocList() {
    // Create six choices that user can choose from
    for (var i = 0; i < locStored.length; i++) {
      addLocToList(i, locStored[i]);
    }
}    // end of setAtributes

// This is handler for clicking one of the choices
function onClickLocList(e) {
    var target = e.target; // Clicked element
    while (target && target.parentNode !== locList) {
        target = target.parentNode; // If the clicked element isn't a direct child
        if (!target) { return; } // If element doesn't exist
    }
    var city;
    if (target.tagName === "LI") {
      city = target.innerHTML;
      var index = target.getAttribute("data-index");
    }
    var city = locStored[index];
}

/*
function onClickLoc (form) {
    currLoc = form.inputbox.value;
    console.log ("You typed: " + TestVar);
}
*/

function getWeatherAPI() {
    //https://api.openweathermap.org/data/2.5/weather?q=Philadelphia&appid=06d8f6fe2e2745ccf1ea96dd0ca1238c
    var endpoint2 = "https://api.openweathermap.org/data/2.5/weather?q=" + currLoc.name + "&units=imperial&appid=06d8f6fe2e2745ccf1ea96dd0ca1238c";
    console.log("in getwweatherapi", endpoint2);

    fetch(endpoint2)
        .then(function (response) {
            return response.json();
        })
        .then (function(data) {
            console.log("getWeatherAPI data: ", data);
            console.log("getweatherapi data[main]", data["main"]);
            var main = data["main"];
            summary[0].value = main.temp;
            summary[1].value = main.humidity;
            var wind = data["wind"];
            summary[2].value = wind.speed;
            summary[3].value = -1.0;
            console.log("temp",summary[0].value);
            fillSummary();
            /*
            	"main": {
                  "temp": 295.57,
                  "feels_like": 295.54,
                  "temp_min": 294.15,
                  "temp_max": 296.48,
                  "pressure": 1012,
                  "humidity": 64
                },

            */

        })
        .catch(err => alert("api one call fetch failed"));
    fillSummary();
}

function KelvinToDegF(K)
{

}


function getOneCallAPIPart2() {
    var endpoint2 = "https://api.openweathermap.org/data/2.5/onecall?lat=" + currLoc.lat + "&lon=" + currLoc.lon + "&appid=" + APIkey;

    //var endpoint5 = "https://api.openweathermap.org/data/2.5/onecall?lat=33.441792&lon=-94.037689&exclude=hourly,daily&appid=06d8f6fe2e2745ccf1ea96dd0ca1238c";
    //var endpoint2 = "https://api.openweathermap.org/data/2.5/weather?q=London&APPID=06d8f6fe2e2745ccf1ea96dd0ca1238c";
    console.log("in getonecall", endpoint2);

    fetch(endpoint2)
        .then(function (response) {
          return response.json();
        })
        .then (function(data) {
            //console.log("OneCall data: ", data);
            var current = data["current"];
            console.log("current", current);
            console.log("current.uvi", current.uvi);
            summary[3].value = current.uvi;
            fillUVIndex();
        })
        .catch(err => alert("api one call fetch failed"));
}

function getOneCallAPIPart1() {
    
    //https://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
    
    //if (test) {
    //  city = "lksjdlfj";
    //}

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
        console.log("lon lat", currLoc.lon, currLoc.lat)
        console.log("Part 1 data ",data);

        currLoc.valid = true;
        getOneCallAPIPart2();
    });
}   // end of function getOneCallPart1()

function fillSummary() {
    if (test) {
        var testEl = document.querySelector("#test-2");
        testEl.textContent = "*********** T E S T *******************";
    }
    summaryLoc.textContent = currLoc.name;

    var tempEl = document.querySelector(summary[0].id);
    tempEl.textContent = summary[0].name + summary[0].value + summary[0].units;

    var humidityEl = document.querySelector("#humidity");
    humidityEl.textContent = summary[1].name + summary[1].value + summary[1].units;

    var windSpeedEl = document.querySelector("#wind-speed");
    windSpeedEl.textContent = summary[2].name + summary[2].value + summary[2].units;
/*
    <p id="temp"></p>
    <p id="humidity"></p>
    <p id="wind-speed"></p>
    <p id="uv-index"></p>
*/
}    // End of function fillSummary();

function fillUVIndex() {

    /* https://www.epa.gov/sites/production/files/documents/uviguide.pdf */
    var uvBgdCol;
    var uvExpCat;
    var uvClass;
    if (summary[3].value <= 2.0 ) {
        uvBgdCol = "lightgreen";
        uvExpCat = " (Low)";
        uvClass = "uv-low";
    }
    else if (summary[3].value <= 5.0) {
        uvBgdCol = "yellow";
        uvExpCat = " (Moderate)";
        uvClass = "uv-mod";
    }
    else if (summary[3].value <= 7.0) {
        uvBgdCol = "orange";
        uvExpCat = " (High)";
        uvClass = "uv-high";
    }
    else if (summary[3].value <= 11.0) {
        uvBgdCol = "red";
        uvExpCat = " (Very High";
        uvClass = "uv-very-high";
  }
    else {
        uvBgdCol = "purple";
        uvExpCat = " (Extreme)";
        uvClass = "uv-extreme";
    }
    var uvIndexEl = document.querySelector("#uv-index");
    var uvSpan1El = document.querySelector("#span-1");
    uvSpan1El.textContent = summary[3].name;
    var uvSpan2El = document.querySelector("#span-2");
    uvSpan2El.textContent = "  "+summary[3].value + "  ";
    uvSpan2El.classList.add(uvClass);
    //uvSpan2El.setAttribute("background", uvBgdCol);
    //uvSpan2El.style.margin-left = "2em";
    //uvSpan2El.style.backgroundColor = uvBgdCol;
    var uvSpan3El = document.querySelector("#span-3");
    uvSpan3El.textContent = uvExpCat;
    //addSpice();
    //uvIndexEl.textContent = summary[3].name + summary[3].value + uvExpCat;

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
getWeatherAPI();
getOneCallAPIPart1(); // All