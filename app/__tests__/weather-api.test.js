var assert = require('chai').assert;
var expect = require('chai').expect;
var weatherService = require(global.appRoot + '/app/services/darkskyWeatherService');
var missingLatLongErr = 'Missing latitude and longitude parameters';
var sydneyLat = -33.8688197;
var sydneyLong = 151.2092955;

var melbourneLat = -37.8136276;
var melbourneLong = 144.9630576;

var app = require('../app');
var chai = require('chai')
    , chaiHttp = require('chai-http');

chai.use(chaiHttp);


describe('Weather Forecaster Tests', function () {
    describe('Weather Service', () => {

        beforeEach(function () {
        });

        /**
         * Validation Tests
         */
        it('Should throw error if no latitude and longitude provided', function () {
            return weatherService.getWeatherForLocationAndTime(null, null).catch(function (error) {
                expect(error).to.be.equal(missingLatLongErr);
            });
        });

        it('Should throw error if no longitude provided', function () {
            return weatherService.getWeatherForLocationAndTime(sydneyLat, null).catch(function (error) {
                expect(error).to.be.equal(missingLatLongErr);
            });
        });

        it('Should throw error if no latitude provided', function () {
            return weatherService.getWeatherForLocationAndTime(null, sydneyLong).catch(function (error) {
                expect(error).to.be.equal(missingLatLongErr);
            });
        });


        it('Should return weather data for a Sydney', function () {
            chai.request(app)
                .get('/api/weather/Sydney')
                .end(function (err, res) {
                    expect(res.body).to.have.deep.property('latitude').eql(sydneyLat);
                    expect(res.body).to.have.deep.property('longitude').eql(sydneyLong);
                    expect(res.body).to.have.property('currently');
                    expect(res.body).to.have.property('hourly');
                    expect(res.body).to.have.property('daily');
                });
        });

        it('Should return weather data for a Melbourne', function () {
            chai.request(app)
                .get('/api/weather/Melbourne')
                .end(function (err, res) {
                    expect(res.body).to.have.deep.property('latitude').eql(melbourneLat);
                    expect(res.body).to.have.deep.property('longitude').eql(melbourneLong);
                    expect(res.body).to.have.property('currently');
                    expect(res.body).to.have.property('hourly');
                    expect(res.body).to.have.property('daily');

                });
        });

        it('Should return weather data for a Sydney for Today', function () {
            chai.request(app)
                .get('/api/weather/Sydney/Today')
                .end(function (err, res) {
                    expect(res.body).to.have.deep.property('latitude').eql(sydneyLat);
                    expect(res.body).to.have.deep.property('longitude').eql(sydneyLong);
                    expect(res.body).to.have.property('currently');
                    expect(res.body).to.have.property('hourly');
                    expect(res.body).to.have.property('daily');
                });
        });

        it('Should return weather data for a Melbourne for Today', function () {
            chai.request(app)
                .get('/api/weather/Melbourne/Today')
                .end(function (err, res) {
                    expect(res.body).to.have.deep.property('latitude').eql(melbourneLat);
                    expect(res.body).to.have.deep.property('longitude').eql(melbourneLong);
                    expect(res.body).to.have.property('currently');
                    expect(res.body).to.have.property('hourly');
                    expect(res.body).to.have.property('daily');

                });
        });

        it('Should return weather data for a Sydney for Wednesday', function () {
            chai.request(app)
                .get('/api/weather/Sydney/Wednesday')
                .end(function (err, res) {
                    expect(res.body).to.have.deep.property('latitude').eql(sydneyLat);
                    expect(res.body).to.have.deep.property('longitude').eql(sydneyLong);
                    expect(res.body).to.have.property('currently');
                    expect(res.body).to.have.property('hourly');
                    expect(res.body).to.have.property('daily');
                });
        });

        it('Should return weather data for a Melbourne for Wednesday', function () {
            chai.request(app)
                .get('/api/weather/Melbourne/Wednesday')
                .end(function (err, res) {
                    expect(res.body).to.have.deep.property('latitude').eql(melbourneLat);
                    expect(res.body).to.have.deep.property('longitude').eql(melbourneLong);
                    expect(res.body).to.have.property('currently');
                    expect(res.body).to.have.property('hourly');
                    expect(res.body).to.have.property('daily');

                });
        });



    });

});