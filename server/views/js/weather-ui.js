; (function ($) {

	var $buttonSpinner = $('#_submit i.fa-spinner');
	var address = '';

	/**
	 * Google Maps
	 */
	google.maps.event.addDomListener(window, 'load', function () {
		var places = new google.maps.places.Autocomplete(document.getElementById('locationInput'));
		google.maps.event.addListener(places, 'place_changed', function () {
			var place = places.getPlace();
			address = place.formatted_address;
		});
	});


	var currentlyFields = [
		'Summary',
		'Rain',
		'Chances',
		'Temp',
		'Dew',
		'Humidity',
		'Pressure',
		'Wind Speed',
		'Wind Direction'
	];

	/**
	 * Populate Tables
	 */
	$(document).ready(function () {
		$('form#fetchWeatherData').submit(function (e) {
			e.preventDefault();

			var $form = $(this);
			var action = 'api/weather/';
			var dayOfWeek = $('#dayofweekSelect').val();
			action = action + address;
			action = action + '/' + dayOfWeek;

			postForm(action, function (err, response) {
				$('#_submit').addClass('fa-spin fa-spinner')
				if (err) {
					alert('Error fetching weather data');
				}
				else {
					populateView(response);
				}

				$('.fa').removeClass('fa-cog fa-spin')
				$buttonSpinner.show();
			});

		});
	});


	/**
	 * Handles form submission
	 * @param {*} action 
	 * @param {*} callback 
	 */
	var postForm = function (action, callback) {
		$.ajax({
			type: 'GET',
			url: action,
			dataType: 'json',
			beforeSend: function () {
				$buttonSpinner.show();
			},
			success: function (data, textStatus, xhr) {
				$buttonSpinner.hide();
				if (xhr.status === 200) {
					callback(null, data);
				}
			},
			error: function (xhr, textStatus, error) {
				$buttonSpinner.hide();
				alert('Error fetching weather data');
				callback(error, xhr.responseText);
			}
		});
	};

	/**
	 * Populate View
	 * @param {*} weatherData 
	 */
	function populateView(weatherData) {
		populateCurrentlyView(weatherData.currently);
		populateWeeklyView(weatherData.daily);
	}

	/**
	 * Populate Current View
	 * @param {*} data 
	 */
	function populateCurrentlyView(data) {
		$("#weatherData h2").html("Your weather for " + data.time);
		var table = $("#weatherCurrentlyTable table");
		table.empty();
		table.attr("summary", data.summary);
		drawHeader(currentlyFields, table);
		drawRow(data, table);
	}

	/**
	 * Populate Weekly View
	 * @param {*} daily 
	 */
	function populateWeeklyView(daily) {
		var table = $("#weatherWeeklyTable table");
		table.empty();
		; table.attr("summary", daily.summary);
		var data = daily.data;
		var colArray = ['Week Day'];
		for (var i = 0; i < data.length; i++) {
			colArray.push(data[i].time.split(',')[0].toUpperCase());
		}
		drawHeader(colArray, table);

		var weeklyFields = [
			{ 'summary': 'Summary' },
			{ 'ozone' : 'Ozone'},
			{ 'precipIntensity': 'Rain' },
			{ 'precipProbability': 'Chances' },
			{ 'temperatureMin': 'Minimum Temperature' },
			{ 'temperatureMax': 'Maximum Temperature' },
			{ 'dewPoint': 'Dew' },
			{ 'humidity': 'Humidity' },
			{ 'pressure': 'Pressure' },
			{ 'windSpeed': 'Wind Speed' },
			{ 'windBearing': 'Wind Direction' },
			{ 'uvIndex' : 'UV Index'}
		];

		for (var i = 0; i < weeklyFields.length; i++) {
			var rowData = $("<tr />"),
				fieldObj = weeklyFields[i],
				field = Object.keys(fieldObj)[0];

			$(table).append(rowData);
			rowData.append("<td>" + fieldObj[field] + "</td>");
			for (var index in data) {
				var weekDay = data[index];
				if (weekDay.hasOwnProperty(field)) {
					rowData.append("<td>" + weekDay[field] + "</td>");
				}
			}
		}
	}

	/**
	 * Draw Table Header
	 * @param {*} headerData 
	 * @param {*} table 
	 */
	function drawHeader(headerData, table) {
		var header = "<thead class=\"thead-dark table-primary text-center\"><tr>";
		for (var i = 0; i < headerData.length; i++) {
			header = header + "<th>" + headerData[i] + "</th>";
		}
		header = header + "</tr></thead>";
		$(table).append(header);
	}

	/**
	 * Draw Table Row
	 * @param {*} rowData 
	 * @param {*} table 
	 */
	function drawRow(rowData, table) {
		var row = $("<tr />");
		$(table).append(row);

		row.append($("<td>" + rowData.summary + "</td>"));
		row.append($("<td>" + rowData.precipIntensity + "</td>"));
		row.append($("<td>" + rowData.precipProbability + "</td>"));
		row.append($("<td>" + rowData.temperature + "</td>"));
		row.append($("<td>" + rowData.dewPoint + "</td>"));
		row.append($("<td>" + rowData.humidity + "</td>"));
		row.append($("<td>" + rowData.pressure + "</td>"));
		row.append($("<td>" + rowData.windSpeed + "</td>"));
		row.append($("<td>" + rowData.windBearing + "</td>"));
	}

})(jQuery);

