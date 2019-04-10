import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './Header.css';
import './Search.css';



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

  constructor(props) {
    super(props);
    this.state = {
      address: '',
      candidates: []
    }
  }

  search() {
    let rc = document.getElementById('resultsContainer');
    while (rc.firstChild) {
      rc.removeChild(rc.firstChild)
    }
  
    let address = document.getElementById('address').value;
    let google_url = 'https://www.googleapis.com/civicinfo/v2/representatives?key=AIzaSyAv6P3nMatlEBeUlWVLeZ9thHg3WZoGHtc&address='+address;
    let vaelects_url = 'http://api.virginiaelects.com/candidates/address/'+address;
    let candidateResults;
    fetch(vaelects_url).then(results => {console.log(results); candidateResults = results});

    // candidates.foreach(c => {
    //   let card = document.createElement('div');
    //   card.innerHTML = c.first;
    //   rc.appendChild(card);
    // })
    this.setState({candidates: candidateResults})
  }

  handleChange(event) {
    this.setState({
      address: event.target.value
    });
  }

  render() {
    return (
      <div className="app-body">
        <div className="search-form" id="search-form">
          <form >
            <label htmlFor="address">Enter an address: </label>
            <input type="text" id="address" name="address" value={this.state.address} onChange={this.handleChange.bind(this)}></input>
            <button type="submit" onClick={this.search.bind(this)}>Submit</button>
          </form>
        </div>
        <div id="resultsContainer">
        {this.state.candidates.map(c => {
          return <Card firstName={c.firstName} lastName={c.lastName} party={c.party}/>
        })}
        </div>
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
