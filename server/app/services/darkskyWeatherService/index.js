'use strict';

const request = require('request');
const Promise = require('bluebird');

class WeatherService {


    /**
     * Fetch Weather Information
     * 
     * @param {*} latitude 
     * @param {*} longitude 
     * @param {*} dateValue 
     */
    static getWeatherForLocationAndTime(latitude, longitude, dateValue) {
        if (!latitude || !longitude) {
            return Promise.reject('Missing latitude and longitude parameters');
        }

        if (global.config.DarkSkyWeatherForecast &&  global.config.DarkSkyWeatherForecast.LocationURL 
                &&  global.config.DarkSkyWeatherForecast.LocationTimeURL) {
            
            var weatherUrl = (dateValue) ? global.config.DarkSkyWeatherForecast.LocationTimeURL 
                            : global.config.DarkSkyWeatherForecast.LocationURL;
            
            var parsedUrl  = weatherUrl.replace('LATITUDE',latitude);
            parsedUrl      = parsedUrl.replace('LONGITUDE',longitude);
           
            parsedUrl = (dateValue) ? parsedUrl.replace('TIME',dateValue) : parsedUrl;
            
            var options    = {
                url: parsedUrl
            };

            return new Promise((resolve, reject) => {
            	try {
	                request(options, function(err, res) {
	                    if (err || res.statusCode !== 200) {
	                        reject(err);
	                    } else {
	                        resolve(JSON.parse(res.body));
	                    }
	                });
            	} catch (err) {
            		reject(new Error(err.message));
            	}
            });
        }
        else {
            return Promise.reject(new Error('Error fetching weather data'));
        }
    }

}

module.exports = WeatherService;