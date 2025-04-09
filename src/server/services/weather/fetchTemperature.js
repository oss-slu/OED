/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

const { fetchWeatherApi } = require('openmeteo');

// Helper function to form time ranges
const range = (start, stop, step) =>
	Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

async function fetchWeatherData(startDate, endDate) {
	const params = {
		"latitude": 33.01,
		"longitude": -96.70,
		"hourly": "temperature_2m",
		"start_date": startDate,
		"end_date": endDate
	};
	const url = "https://api.open-meteo.com/v1/forecast";
	const responses = await fetchWeatherApi(url, params);

	// Process first location. Add a for-loop for multiple locations or weather models
	const response = responses[0];

	// Attributes for timezone and location
	const utcOffsetSeconds = response.utcOffsetSeconds();
	const timezone = response.timezone();
	const timezoneAbbreviation = response.timezoneAbbreviation();
	const latitude = response.latitude();
	const longitude = response.longitude();

	const hourly = response.hourly();

	// Note: The order of weather variables in the URL query and the indices below need to match!
	const weatherData = {
		hourly: {
		time: range(
			Number(hourly.time()),
			Number(hourly.timeEnd()),
			hourly.interval()
		).map(t => new Date((t + utcOffsetSeconds) * 1000)),
		temperature2m: hourly.variables(0).valuesArray(),
		},
		timezone: timezone,
		timezoneAbbreviation: timezoneAbbreviation,
		latitude: latitude,
		longitude: longitude,
	};

	return weatherData;
}

module.exports = fetchWeatherData;
