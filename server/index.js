const express = require('express');

let app = express();

// logging & parsing
const morgan = require('morgan');
app.use(morgan('dev'));
app.use(express.urlencoded());

// define path for static files
app.use(express.static(__dirname + '/../client/dist'));

// Handle HTTP requests
app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  res.sendStatus(200);
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

