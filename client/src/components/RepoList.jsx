import React from 'react';
import Search from './Search.jsx';

const RepoList = (props) => {
  // var list = props.repos.map((repo) => (<div className="repo">Forks:{repo.forks}, Username:{repo.username}, Reponame:{repo.reponame}</div>));
  return(
  <div>
    <h4> Repo List Component </h4>
    There are {props.repos.length} repos.
    {props.repos.map((repo, index) => (<div className="repo" key={index.toString()}>Created Date: {repo.created_at.toString().substring(4,15)}, Username: {repo.username}, Reponame: {repo.reponame}, Forks: {repo.forks}</div>))}
  </div>
  );
}

export default RepoList;