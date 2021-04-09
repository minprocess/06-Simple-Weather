// get location

function getWeather2() {
    var locQueryUrl = "https://api.openweathermap.org/data/2.5/weather?q=London&APPID=06d8f6fe2e2745ccf1ea96dd0ca1238c";

    fetch(locQueryUrl)
      .then(function (response) {
        console.log("In first .then after fetch");
        if (!response.ok) {
          throw response.json();
        }
    
        return response.json();
      })
      .then(function (locRes) {
        console.log("In seconds .then after fetch");
        // write query to page so user knows what they are viewing
    
    
        //resultTextEl.textContent = locRes.search.query;
    
        console.log(locRes);
    /*
        if (!locRes.results.length) {
          console.log('No results found!');
          resultContentEl.innerHTML = '<h3>No results found, search again!</h3>';
        } else {
          resultContentEl.textContent = '';
          for (var i = 0; i < locRes.results.length; i++) {
            printResults(locRes.results[i]);
          }   // end of for i
        }*/    //end of else
      }    // end of second .then
      )    // end of pararentheses for second then
      .catch(function (error) {
        console.error(error);
      });
    
}

// HOF = Hall of Fame
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
    const APIkey = "06d8f6fe2e2745ccf1ea96dd0ca1238c";
    const endpoint1 = "https://api.openweathermap.org/data/2.5/forecast?q={city}&appid={APIkey}";

    
    let summary = [
        {name: "Termperature:", value: "0 F" },
        {name: "Humidity:", value: "0 %" },
        {name: "Wind Speed:", value: "0 MPH" },
        {name: "UV Index", value: "0" }
    ]

    var searcharg = document.getElementById("searchbar").value;
    //var endpoint = `https://api.openweathermap.org/data/2.5/weather?q=${searcharg}&units=metric&appid=06d8f6fe2e2745ccf1ea96dd0ca1238c`;
    const endpoint2 = "https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&appid={APIkey}";

    fetch(endpoint)
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


/*
    summary[0].value = "0 F"

    var tbl = document.querySelector("#hofTable");
    var tblBody = document.createElement("tbody");
  
    // Heading row
    var row = document.createElement("tr");
    var msg3 = ["Initials", "Score", "Correct answers"];
  
    for (var j = 0; j < 3; j++) {
      // Create a <td> element and a text node, make the text
      // node the contents of the <td>, and put the <td> at
      // the end of the table row
      var cell = document.createElement("td");
      var cellText = document.createTextNode(msg3[j]);
      cell.appendChild(cellText);
      row.appendChild(cell);
    }
  
    // add the row to the end of the table body
    tblBody.appendChild(row);
    //tbl.appendChild(row);
  
  
    // creating all cells
    for (var i = 0; i < Math.min(10, hofStored.length); i++) {
      // creates a table row
      var row = document.createElement("tr");
  
      var msg2 = [hofStored[i].initials, hofStored[i].score, hofStored[i].corrans];
  
      for (var j = 0; j < 3; j++) {
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
*/  
}

getWeather();