/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

const express = require('express');
const fetchWeatherData =  require('../services/weather/fetchTemperature.js');

const router = express.Router();

// Endpoint to fetch weather data for a given date range
router.get('/', async (req, res) => {
  const { start_date, end_date } = req.query;
  if (!start_date || !end_date) {
    return res.status(400).json({ error: "Please provide both start_date and end_date" });
  }
  try {
    const weatherData = await fetchWeatherData(start_date, end_date);
    res.json(weatherData);
  } catch (error) {
    console.error("Error fetching weather data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
