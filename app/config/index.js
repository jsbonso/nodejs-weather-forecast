'use strict';

var config = {
	GoogleMaps: {
		GeoLocation: {
			ApiKey: 'AIzaSyDkxshSN0MoPMrMxAzHA0a9F5Wv-0DLB1k',
			AddressURL: 'https://maps.googleapis.com/maps/api/geocode/json?address=##&key=AIzaSyDkxshSN0MoPMrMxAzHA0a9F5Wv-0DLB1k'
		}
	},
	DarkSkyWeatherForecast: {
		LocationURL: 'https://api.forecast.io/forecast/a5e148d92d2fb36074aca8d5d5bd1822/LATITUDE,LONGITUDE',
		LocationTimeURL: 'https://api.forecast.io/forecast/a5e148d92d2fb36074aca8d5d5bd1822/LATITUDE,LONGITUDE,TIME'
	}
};

module.exports = config;