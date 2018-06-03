# Weather Forecaster - NodeJS + Express App

Author: Jon Bonso

## App Summary
This is a simple Weather Forecast app written in NodeJS with a JQuery/Bootstrap UI.
The user can simply input the name of the city/location and this app will fetch the 
geographical location of the that place using Google GeoLocation API. Once that is done,
the app will then use the Latitude and Longitude data to get it from the Dark Sky API: https://developer.forecast.io/


<p align="center">
    <img src="https://github.com/jsbonso/nodejs-weather-forecast/blob/master/WeatherForecast-NodeJS.gif" alt="Weather Forecast">
</p>

## How to Run: 

Start app: `npm start`<br />
Run Tests: `npm test`<br />


#### Scenario One: Display a weather forecast by Location

A weather forcast should be displayed based upon the location specified in the url. <br />
Expected URL: `http://localhost:/weather/:location`<br />
Example URL:  `http://localhost:/weather/( sydney | brisbane )`<br />


#### Scenario Two: Display a weather forecast by Location filtered by Day

A weather forcast should be displayed based upon the location and day specified in the url.<br />
Expected URL: `http://localhost:<port>/weather/:location/:weekday`<br />
Example URL:  `http://localhost:<port>/weather/:location/( monday | tuesday | etc .. )`<br />


#### Scenario Three: Display a weather forecast for Today

A weather forcast should be displayed based upon the location and the current day<br />

Expected URL: `http://localhost:<port>/weather/:location/today`<br />
Example URL:  `http://localhost:<port>/weather/sydney/today`<br />

