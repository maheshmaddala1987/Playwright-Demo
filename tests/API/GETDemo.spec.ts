import { test, expect } from '@playwright/test';

const API_URL = 'https://api.openweathermap.org/data/2.5/weather';
const CITY = 'London';
const API_KEY = '4bad53e332b38fd1f6f4c9e3afd54419';  // Replace with your actual API key

test('Weather API should return the correct data for a city', async ({ request }) => {
  // Send a GET request to the weather API
  const response = await request.get(`${API_URL}?q=${CITY}&appid=${API_KEY}&units=metric`);

  // Check if the API request was successful
  //expect(response.status()).toBe(200);

  // Parse the JSON response
  const weatherData = await response.json();

  // Validate that the response contains expected city name and main temperature data
  expect(weatherData.name).toBe(CITY);
  expect(weatherData.main).toHaveProperty('temp');
  expect(weatherData.main).toHaveProperty('humidity');
  expect(weatherData.weather.length).toBeGreaterThan(0);
});