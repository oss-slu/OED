const cron = require('node-cron');
const fs = require('fs');
const path = require('path');
const fetchWeatherData = require('../services/weather/fetchTemperature.js');

async function fetchAndStoreWeatherData(startDate, endDate) {
  const weatherData = await fetchWeatherData(startDate, endDate);
  const fileName = `weatherData_${startDate}_to_${endDate}.json`;
  const filePath = path.join(process.cwd(), fileName);

  // Replace writing to local file with database structure from Sagar
  fs.writeFile(filePath, JSON.stringify(weatherData, null, 2), (err) => {
    if (err) {
      console.error("Error writing weather data to file:", err);
    } else {
      console.log(`Weather data saved successfully to ${fileName}`);
    }
  });
}

// Schedule the task to run every day at midnight
cron.schedule('0 0 * * *', async () => {
  console.log("Scheduled task: Fetching weather data at midnight...");
  const today = new Date();
  const endDate = today.toISOString().split("T")[0];
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);
  const startDate = yesterday.toISOString().split("T")[0];

  await fetchAndStoreWeatherData(startDate, endDate);
});
