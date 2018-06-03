'use strict';

const express   = require('express');
const router    = express.Router();
const moment    = require('moment');

// Services
const GoogleMapsService = require(global.appRoot + '/app/services/googleMapsService');
const WeatherService  = require(global.appRoot + '/app/services/darkSkyWeatherService');

const weatherServiceErrMsg = 'Error fetching weather data from Forecast.io service';
const googleMapsErrMsg = 'Error fetching geographical coordinates from Google Maps';

/**
 * Calculate Date
 * @param {*} inputDoW 
 */
function calculateDate(inputDoW) {
    var today     = moment(new Date()).format('dddd MMM-DD-YYYY');
    var increment = 0;

    const daysOfWeek = [
        'sunday',
        'monday',
        'tuesday',
        'wednesday',
        'thursday',
        'friday',
        'saturday'
    ];

    if (inputDoW && inputDoW !== 'today') {
        var currentDoW  = today.split(' ')[0].toLocaleLowerCase();

        if (daysOfWeek.indexOf(inputDoW) < daysOfWeek.indexOf(currentDoW)) {
            console.log('tinapa: ' + (moment().add(increment,'days').format()));
            increment = daysOfWeek.length - (daysOfWeek.indexOf(currentDoW) - daysOfWeek.indexOf(inputDoW));
        }
        else {
            if (daysOfWeek.indexOf(inputDoW) > daysOfWeek.indexOf(currentDoW)) {
                increment = daysOfWeek.indexOf(inputDoW) - daysOfWeek.indexOf(currentDoW);
            }
        }
    }
    return (moment().add(increment,'days').format());
}

/**
 * Format Weather TIme
 * @param {*} weatherObj 
 */
function formatWeatherTime(weatherObj) {
    weatherObj.currently.time = moment.unix(weatherObj.currently.time).format('ddd, MMM Do YYYY, hh:mm a');
    weatherObj.hourly.data.forEach(function(data) { 
        data.time = moment.unix(data.time).format('hh:mm A');
    });
    weatherObj.daily.data.forEach(function(data) { 
        data.time = moment.unix(data.time).format('ddd, MMM Do');
    });
    return weatherObj;
}

/**
 * Display Weather by location
 */
router.use('/:location', function (req, res, next) {
    if (req.url === '/') {
        GoogleMapsService.getGeocodesForLocation(req.params.location)
        .then((location) => {
            WeatherService.getWeatherForLocationAndTime(location.lat, location.lng, null)
                .then((weather) => {
                    res.status(200).json(formatWeatherTime(weather));
                })
                .catch((error) => {
                    console.log(weatherServiceErrMsg, new Error(error));
                    res.status(500).json({message: weatherServiceErrMsg, error: error});
                });
        })
        .catch((error) => {
            console.log(googleMapsErrMsg, new Error(error));
            res.status(500).json({message: googleMapsErrMsg, error: error});
        });
    }
    else
        next();
});

/**
 * Display Weather by location + today & weekday 
 */
router.use('/:location/:weekday', function (req, res) {
    GoogleMapsService.getGeocodesForLocation(req.params.location)
    .then((location) => {
        WeatherService.getWeatherForLocationAndTime(location.lat, location.lng, calculateDate(req.params.weekday.toLowerCase()) )
            .then((weather) => {
                res.status(200).json(formatWeatherTime(weather));
            })
            .catch((error) => {
                console.log(weatherServiceErrMsg, new Error(error));
                res.status(500).json({message: weatherServiceErrMsg, error: error});
            });
    })
    .catch((error) => {
        console.log(googleMapsErrMsg, new Error(error));
        res.status(500).json(
            {
                message: googleMapsErrMsg, error: error
            }
        );
    });
});

module.exports = router;