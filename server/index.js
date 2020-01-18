const express = require('express');
var getReposByUsername = require('../helpers/github.js').getReposByUsername;
var save = require('../database/index.js').save;

let app = express();

// logging & parsing
const morgan = require('morgan');
app.use(morgan('dev'));
app.use(express.urlencoded({extended: true}));

// define path for static files
app.use(express.static(__dirname + '/../client/dist'));

// Handle HTTP requests
app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  
  getReposByUsername(req.body.username, (err, resFromGitHub, repos) => {
    if (err) {
      console.log(err);
      res.sendStatus(404);
      // .send('Error in Communication with GitHub Api');
    } else {
      console.log('Reponse from GitHub: ', resFromGitHub.headers.status);

      repos = JSON.parse(repos);
      save(repos, (err, success) => {
        if(err) {
          res.sendStatus(500);
        } else {
          if(success) {
            res.sendStatus(200);
          }
        }
      });    
    }
  });

});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

