import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './Header.css';
import './Search.css';
import './Card.css';
import './Election.css';


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

class Election extends Component {
  render() {
    return (
      <div className='election-container'>
        Date: {this.props.date}
        <br />
        Office: {this.props.office}
        <br />
        Type: {this.props.type}
        <br />
        District: {this.props.district}
        <br />
        {this.props.candidates ? 'Candidates:' : null}
        {this.props.candidates ? this.props.candidates.map(c => {
          return <Card firstName={c.firstName} lastName={c.lastName} party={c.party}/>
        }): null}

      </div>
    )
  }
}

class Card extends Component {
  render() {
    let bgColor = '';
    switch (this.props.party) {
      case 'Independent':
        bgColor = 'white';
        break;
      case 'Republican':
        bgColor = 'red';
        break;
      case 'Democratic':
        bgColor = 'blue';
        break;
      case 'Libertarian':
        bgColor = 'yellow';
        break;
      case 'Green':
        bgColor = 'lightgreen';
        break;
      default:
        break;
    }

    let textColor = 'black';
    if (this.props.party == 'Democratic') {
      textColor = 'white';
    }

    return (
      <div className="card" style={{backgroundColor: bgColor, color: textColor}}>
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
      elections: []
    }
  }

  search(e) {
  
    let address = document.getElementById('address').value;
    let vaelects_url = 'http://api.virginiaelects.com/elections/address/'+address;
    let candidateResults;
    fetch(vaelects_url)
      .then(response => response.json())
      .then(data =>  {this.setState({elections: data}); console.log(this.state.elections)});
    // console.log(candidateResults);

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
          <form id="address-search">
            <label htmlFor="address">Enter an address: </label>
            <input type="text" id="address" name="address" value={this.state.address} onChange={this.handleChange.bind(this)}></input>
            <button type="button" onClick={this.search.bind(this)}>Submit</button>
          </form>
        </div>
        <div id="resultsContainer">
        {this.state.elections.map(e => {
          return <Election date={e.date} type={e.type} office={e.office} candidates={e.candidates} district={e.district}/>
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
