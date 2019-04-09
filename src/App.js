import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './Header.css';

function search() {
  while (resultsContainer.firstChild) {
    resultContainer.removeChild(resultsContainer.firstChild)
  }

  let address = document.getElementById('address').value;
  let url = 'http://api.virginiaelects.com/elections/candidates/address/'+address;
  let elections = fetch(url);



}

function buildCandidates(elections) {
  let cards = [];
  elections.foreach(c => {
    
  })
}

class Header extends Component {
  render() {
    return (
      <div className="app-header">
        <h2>Virginia Elections</h2>
          <a href="#">Home</a>
          <a href="#">Elections</a>
          <a href="#">Candidates</a>
      </div>
    );
  }
}

class Card extends Component {
  render() {
    return (
      <div className="card">
        <div className="candidate-info">
        Name: {this.props.firstName + ' ' + this.props.lastName}
        <br/>
        Party: {this.props.party}
        </div>
      </div>
    )
  }
}

class Search extends Component {
  render() {
    return (
      <div className="app-body">
        <div className="search-form" id="search-form">
          <form>
            <label for="address">Enter an address: </label>
            <input type="text" id="address" name="address"></input>
            <button type="submit" onclick="search()">Submit</button>
          </form>
        </div>
        <div className="resultsContainer"></div>
      </div>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div className="App"> 
        <Header />
        <Search />
      </div>
    );
  }
}

{/* <header className="App-header">
<img src={logo} className="App-logo" alt="logo" />
<p>
  Edit <code>src/App.js</code> and save to reload.
</p>
<a
  className="App-link"
  href="https://reactjs.org"
  target="_blank"
  rel="noopener noreferrer"
>
  Learn React
</a>
</header> */}

export default App;
