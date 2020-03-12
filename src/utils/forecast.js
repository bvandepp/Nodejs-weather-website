const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "https://api.darksky.net/forecast/f8a442faa397a44dd3ffdb400cd1c007/" +
    latitude +
    "," +
    longitude;

  request({ url, json: true }, (error, {body}) => {
    // console.log(res.body.currently);
    if (error) {
      callback("Unable to connect to weather service.", undefined);
    } else if (body.error) {
      callback("Unable to find location.");
    } else {
      const temp = body.currently.temperature;
      const pre = body.currently.precipProbability;

      callback(
        undefined,
        `It is currently ${temp} degrees, and there is ${pre} % chance of rain.`
      );
    }
  });
};

module.exports = forecast;
