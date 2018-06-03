'use strict';

const request = require('request');
const Promise = require('bluebird');

class GoogleMapsService {

  /**
   * Get Geographical Coordinates from Geolocation service from Google Maps
   * @param {*} locationAddress 
   */
    static getGeocodesForLocation(locationAddress) {
        if (!locationAddress) {
            return Promise.reject('Missing location parameter');
        }

        if (global.config.GoogleMaps &&  global.config.GoogleMaps.GeoLocation.AddressURL) {
            var parsedUrl = global.config.GoogleMaps.GeoLocation.AddressURL.replace('##',encodeURIComponent(locationAddress)),
                options   = {
                    url: parsedUrl
                };

            return new Promise((resolve, reject) => {
                try {
                    request(options, function(err, res) {
                        if (err || res.statusCode !== 200) {
                            reject(err);
                        } else {
                            var response = JSON.parse(res.body);
                            if (response && response.results && response.results.length > 0) {
                                resolve(response.results[0].geometry.location);
                            }   
                            else {
                                var errorMsg = (response.error) ? response.error : 'Error fetching weather data from Google Maps';
                                reject(new Error(errorMsg));
                            }
                        }
                    });
                } catch(err) {
                    reject(new Error(err.message));
                }
            });
        }
        else {
            return Promise.reject(new Error('No Google Maps Configuration data found.'));
        }
    }

}

module.exports = GoogleMapsService;