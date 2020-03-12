const path = require("path");
const express = require("express");
const hbs = require("hbs");
const request = require('request')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express();
const port = process.env.PORT || 3000

//Define paths for express config
const publicDirectory = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");
hbs.registerPartials(partialsPath);

//Set up handlebars and view location
app.set("view engine", "hbs");
app.set("views", viewPath);

//Setup static directory to serve
app.use(express.static(publicDirectory));

app.get("/", (req, res) => {
  res.render("index.hbs", {
    home: "The Weather Station",
    name: "Benjamin Vanderpuije"
  });
});

app.get("/about", (req, res) => {
  res.render("about.hbs", {
    about: "My Bio",
    name: "Benjamin Vanderpuije"
  });
});

app.get("/help", (req, res) => {
  res.render("help.hbs", {
    help: "My Help Page",
    name: "Benjamin Vanderpuije"
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Please enter an address"
    });
  }
  geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
      if(error){
          return res.send({error})
      }
      forecast(latitude, longitude, (error, forecastData) => {
          if(error){
            return res.send({error})
          }
          res.send({
            forecast: forecastData,
            location,
            address: req.query.address
        })
      })
      
  })

});

app.get("/help/*", (req, res) => {
  res.render("oops.hbs", {
    title: "404",
    name: "Benjamin Vanderpuije",
    error: "Help article not found"
  });
});

app.get("/*", (req, res) => {
  res.render("oops.hbs", {
    title: "404",
    name: "Benjamin Vanderpuije",
    error: "Page not found"
  });
});

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
