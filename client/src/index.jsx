import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      repos: []
    }

  }

  componentDidMount() {
    $.ajax("http://localhost:1128/repos", {
      method: "GET",
      success: (data) => {
        console.log('Welcome');
        this.setState({repos: data});
      },
      error: (data) => {
        console.log('Something went Wrong In Loading');
        console.log(data);
      }
    });
  }

  search (term) {
    console.log(`${term} was searched`);
    // TODO
    $.ajax("http://localhost:1128/repos", {
      method: "POST",
      data: {username: term},
      success: (data) => {
        this.setState({repos: data});
      },
      error: (data) => {
        console.log(data);
      }
    });
  }
  
  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));