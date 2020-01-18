const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher',{useMongoClient: true});
// ********************************************************************
// ADDuseFindAndModify option


let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  created_at: Date,
  username: String,
  reponame: String,
  forks: Number
});

repoSchema.index({created_at:1, username:1});


let Repo = mongoose.model('Repo', repoSchema);

let save = (repos) => {
  /************************************************
      CONSIDER callback function as 2nd argument of save
              and invoke callback on error/success 
  ************************************************/

  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB

  repos.map((repo) => {
    Repo.findOne({created_at: repo.created_at, username: repo.owner.login, reponame: repo.name}, (err, foundRepo) => {
      if (err) {
        console.log(err);
      } else {
        if(foundRepo) {
        // repo is found, update its forks number
          foundRepo.update({forks: repo.forks}, (err, raw) => {
            if(err) {
              console.log(err);
            } else {
              console.log(raw);
            }
          });  
        } else {
          var repoDoc = new Repo({created_at: repo.created_at, username: repo.owner.login, reponame: repo.name, forks: repo.forks});
          repoDoc.save( (err) => {
            if(err){
              console.log(err);
            } else {
              console.log('new repo saved successfully');
            }
          });
        }
      }
    });
  });
}

module.exports.save = save;