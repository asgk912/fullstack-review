import React from 'react';
import Search from './Search.jsx';

const RepoList = (props) => {
  var message = props.repos.length < 25 ? `There are ${props.repos.length} repos` : 'These are top 25 searched repos';
  return(
  <div>
    <h4> Repo List Component </h4>
    {message}
    {props.repos.map((repo, index) => (<div className="repo" key={index.toString()}>Created Date: {repo.created_at.toString().substring(0,10)}, Username: {repo.username}, Reponame: <a href={repo.url} onClick={() => {}}>{repo.reponame}</a>, Forks: {repo.forks}</div>))}
  </div>
  );
}

export default RepoList;