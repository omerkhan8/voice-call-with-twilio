require("dotenv").load();

const http = require("http");
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const methods = require("./src/server.js");
const tokenGenerator = methods.tokenGenerator;
const makeCall = methods.makeCall;
const placeCall = methods.placeCall;
const incoming = methods.incoming;
const welcome = methods.welcome;
const callLogs = methods.callLogs;
var twilio = require("twilio");

// Create Express webapp
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", function(request, response) {
  response.send(welcome());
});

app.post("/", function(request, response) {
  response.send(welcome());
});

app.get("/accessToken", function(request, response) {
  tokenGenerator(request, response);
});

app.post("/accessToken", function(request, response) {
  tokenGenerator(request, response);
});

app.get("/makeCall", function(request, response) {
  makeCall(request, response);
});

app.post("/makeCall", function(request, response) {
  makeCall(request, response);
});

app.get("/placeCall", placeCall);

app.post("/placeCall", placeCall);

app.get("/incoming", function(request, response) {
  console.log("incoming call at", request);
  response.send(incoming(request));
});

app.post("/incoming", function(request, response) {
  response.send(incoming(request));
});

app.get("/call-logs", callLogs);

// Create an http server and run it
const server = http.createServer(app);
const port = process.env.PORT || 3000;
server.listen(port, function() {
  console.log("Express server running on *:" + port);
});
