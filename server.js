const express = require("express");
const path = require("path");

const app = express();

const port = 3001;

app.use(express.static(path.join(__dirname, "./public")));

app.get("/", (request, response) => {
  response.sendFile(path.join(__dirname, "./public/prettyparse.html"));
});

app.get("/speakers", (request, response) => {
  response.sendFile(path.join(__dirname, "./public/speakers.html"));
});

app.listen(port, () => {
  console.log(
    `...\nExpress server listening on port ${port}! \n\nCtrl+C to exit`
  );
});
