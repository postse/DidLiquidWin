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
      this.setState(res.data.result[0])
    })
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
            {this.state.opponent2}
          </a>
        </header>
      </div>
    );
  }
}

export default App;
