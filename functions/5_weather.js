require("dotenv").config();
const axios = require("axios");
const url = `http://api.openweathermap.org/data/2.5/weather?lang=pl&appid=${process.env.OPEN_WEATHER_API_KEY}&units=metric&q=`;

exports.handler = async (event, context) => {
  const method = event.httpMethod;
  if (method !== "POST") {
    return {
      statusCode: 405,
      body: "Only POST Request Allowed",
    };
  }

  const { city } = JSON.parse(event.body);

  try {
    const response = await axios.post(`${url}${city}`);
    const { data } = response;
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 404,
      body: JSON.stringify(error),
    };
  }
};

async function getWeatherData(city) {}
