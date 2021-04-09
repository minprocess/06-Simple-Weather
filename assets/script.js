// get location

var currLoc = {name:London, lat:};  // current location
var currLocTemp;

let locTextBox = document.getElementById('location'),
btnSearch = document.getElementById('btn-search');

var locList = document.querySelector("#location-list");  // ul
var locStored;   // initials, score, correct answers; equivalent to hofInitials, hofScores, hofCorrAns

var summaryLoc = document.querySelector("summary-loc");

Init();

locTextBox.addEventListener('keydown', (e) => {
    if (!e.repeat) {
      if (e.code == "Enter") {
        currLoc = locTextBox.value;
        console.log("Enter key struck, location is: ", currLoc);
      }
    }
});

function Init() {
  locStored = JSON.parse(localStorage.getItem("locStored") || "[]");
  fillLocList();
}

function addLocToList(i, loc) {
  var valid = validateLocation(loc);
  if (!valid) { return; }
  var li = document.createElement("li");
  li.textContent = locStored[i];
  li.setAttribute("data-index", i);

  locList.appendChild(li);
}

function validateLocation(loc) {

}

function fillLocList() {
    // Create six choices that user can choose from
    for (var i = 0; i < locStored.length; i++) {
      addLocToList(i, locStored[i]);
    }
}    // end of setAtributes

btnSearch.addEventListener('click', (e) => {
  currLocTemp
  let child = consoleLog.firstChild;
  while (child) {
   consoleLog.removeChild(child);
   child = consoleLog.firstChild;
  }
});

/*
function onClickLoc (form) {
    currLoc = form.inputbox.value;
    console.log ("You typed: " + TestVar);
}
*/

function getOneCall() {

}

function getCoords(currLoc.city) {
  var data = getWeather
}

function getWeather() {
    /*
    var geocoder = new google.maps.Geocoder();
    var address = "new york";
    var lat;
    var lon;

    geocoder.geocode( { 'address': address}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
        lat = results[0].geometry.location.lat();
        lon = results[0].geometry.location.lng();
        //alert(lat);
        } 
    }); 
    */

    var city = "London";
    //var city = document.getElementById("searchbar").value;
    const APIkey = "06d8f6fe2e2745ccf1ea96dd0ca1238c";
    //const endpoint1 = "https://api.openweathermap.org/data/2.5/forecast?q={city}&appid={APIkey}";
    const endpoint1 = "http://api.openweathermap.org/data/2.5/weather?q=London&APPID=06d8f6fe2e2745ccf1ea96dd0ca1238c";
    console.log("endpoint1", endpoint1);
    fetch(endpoint1)
        .then(response => response.json())
        .then (data => {
            console.log("by name");
            console.log(data);
        })
        .catch(err => alert(err))

        var lat = 39.9523;
        var lon = -76.1638;
    
    let summary = [
        {name: "Termperature:", value: "0 F" },
        {name: "Humidity:", value: "0 %" },
        {name: "Wind Speed:", value: "0 MPH" },
        {name: "UV Index", value: "0" }
    ]


    //var endpoint = `https://api.openweathermap.org/data/2.5/weather?q=${searcharg}&units=metric&appid=06d8f6fe2e2745ccf1ea96dd0ca1238c`;
    //const endpoint2 = "https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&appid={APIkey}";
    const endpoint2 = "https://api.openweathermap.org/data/2.5/onecall?lat=39.9523&lon=-76.1638&appid=06d8f6fe2e2745ccf1ea96dd0ca1238c";

    fetch(endpoint2)
        .then(response => response.json())
        .then (data => {
            console.log("Click");
            console.log(data);
        })
        .catch(err => alert(err))

    /*
    console.log("jquery loaded");
    $.getJSON("http://api.openweathermap.org/data/2.5/weather?q=London&APPID=06d8f6fe2e2745ccf1ea96dd0ca1238c", function(json) {
        console.log(JSON.stringify(json));
    });
    */



}

function fillSummary() {

  summaryLoc.textContent = currLoc;

  summary[0].value = "0 deg F";
  summary[0].value = "31%";
  summary[2].value = "13 MPH";
  summary[3].value = "9.36";  // UV index

  var uvBgdC = "lightgreen";
  if (summary[3].value > 4.0 && summary[3].value <= 7.0) {
      var uvBgdC = "yellow";
  }
  else if (summary[3].value > 7.0) {
      var uvBgdC = "red";
  }

  var tbl = document.querySelector("#summary-table");
  var tblBody = document.createElement("tbody");

  // creating all cells
  //for (var i = 0; i < Math.min(10, hofStored.length); i++) {
  for (var i = 0; i < 4; i++) {
    // creates a table row
    var row = document.createElement("tr");

    var msg2 = [summary[i].name, summary[i].value];

    for (var j = 0; j < 2; j++) {
      // Create a <td> element and a text node, make the text
      // node the contents of the <td>, and put the <td> at
      // the end of the table row
      var cell = document.createElement("td");
      var cellText = document.createTextNode(msg2[j]);
      cell.appendChild(cellText);
      row.appendChild(cell);
    }

    // add the row to the end of the table body
    tblBody.appendChild(row);
    //tbl.appendChild(row);
  }
  
  // put the <tbody> in the <table>
  tbl.appendChild(tblBody);

  // appends <table> into <body>
  document.body.appendChild(tbl);

}

generateBtn.addEventListener('click', writePassword);
getWeather();