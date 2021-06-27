# Simple Weather Dashboard
## Description
Simple Weather Dashboard shows a few simple weather details for a location given by the user. The weather data is provided by openweathermap.org using the One Call API. 

The calls to the Open Weather Map API are made with fetch which is an asynchronous method. 

## Installation
This app uses: HTML, CSS, JavaScript, Bootstrap 4.5, font-awesome 4.7, jQuery and Moment
<br>
Source on GitHub: https://github.com/minprocess/06-Simple-Weather
<br>
Published on GitHub pages: https://minprocess.github.io/06-Simple-Weather/


## Usage
When the Simple Weather Dashboard is started the current weather and 5-day forecast of the first city in the recent city list is displayed. To get the current weather and 5-day forecast of another city enter the name into the search field and either press Enter or click the Search button. If the city is found the current weather and 5-day forcast will be shown. Then the name of that city will appear at the top of the recent city list. The list will be updated in local storage. 

If the city name is not recognized, an alert pops up and the search text field is not cleared to give the user a chance to fix the name

The UV-Index Exposure categories are given here
 https://www.epa.gov/sites/production/files/documents/uviguide.pdf

| Exposure category | UV Index |
--- | --- 
| Low | 1-2|
| Moderate | 3-5 |
| High | 6-7 |
| Very High | 8-10 |
| Extreme | 11+ |

A screenshot of the application is shown below.

![Screen capture of the weather app page](./assets/images/screenshot.png)

## Wish list
1. Replace sky conditions (cloudy, rain, etc with an icon instead of text)
2. Use google maps api to autocomplete the search text field.
3. Refactor extensively to use bootstrap more often.
4. Test on mobile phone.
5. Clean up style.css, it is a mess.
6. Use JavaScript to write the forecast details instead of a bunch of divs

## License
MIT License

Copyright (c) [2021] [William T. Pate]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

