const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher',{useMongoClient: true});
// ********************************************************************
// ADDuseFindAndModify option


let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  created_at: Date,
  username: String,
  reponame: String,
  forks: Number,
  url: String
});

repoSchema.index({created_at:1, username:1});


let Repo = mongoose.model('Repo', repoSchema);

let save = (repos, callback) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  
  var promiseAll = Promise.all(
    repos.map((repo, ind) => {
      var promise = Repo.findOne({created_at: repo.created_at, username: repo.owner.login, reponame: repo.name, url: repo.html_url})
                      .then((foundRepo) => {
                        if(foundRepo) {
                          return foundRepo.update({forks: repo.forks})
                        } else {
                          var repoDoc = new Repo({created_at: repo.created_at, username: repo.owner.login, reponame: repo.name, forks: repo.forks, url: repo.html_url});
                          return repoDoc.save();
                        }
                      })
                      .catch((err) => callback(err, null));
      return promise;
    })
  );

  promiseAll.then(() => {
    callback(null, true);
  });
    /* Callback Method
    Repo.findOne({created_at: repo.created_at, username: repo.owner.login, reponame: repo.name}, (err, foundRepo) => {
      if (err) {
        callback(err, null);
      } else {

        if(foundRepo) {
        // repo is found, update its forks number
          foundRepo.update({forks: repo.forks}, (err, raw) => {
            if(err) {
              callback(err, null);
            } else {
              if(ind === repos.length-1) {
                aggregate([{$sort : { created_at: 1, username: 1 } }]);
                callback(null, true);
              }
            }
          });  

        } else {
        // repo is not found, save new document
          var repoDoc = new Repo({created_at: repo.created_at, username: repo.owner.login, reponame: repo.name, forks: repo.forks});

          repoDoc.save( (err) => {
            if(err){
              callback(err, null);
            } else {
              if(ind === repos.length-1) {
                // Repo.aggregate.sort('created_at username');
                callback(null, true);
              }
            }
          });

        }

      }

    });
    */
}

let getTop25Repo = (callback) => {
  var top = [];
  Repo.find().sort({created_at:1, username:1}).limit(25).exec((err, repos) => {
    if(err){
      callback(err, null);
    } else {
      callback(null, repos)
    }
  });
}

module.exports.save = save;
module.exports.getTop25Repo = getTop25Repo;