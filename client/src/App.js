import React, { Component } from 'react'
import './App.css';
import HomepageImage from './components/HomepageImage';
import axios from 'axios'

class App extends Component {
  state = {
    response: {}

  };

  async componentDidMount() {
    axios.get('/data').then((res) => {
      const response = res.data;
      this.setState({response});
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <HomepageImage />
          <p>
            Did Team Liquid Win?
            <br/>
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            YES
            
          </a>
        </header>
      </div>
    );
  }
}

export default App;
