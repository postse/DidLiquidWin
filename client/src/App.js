import React, { Component } from 'react'
import './App.css';
import axios from 'axios'
import { styled } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

const MyButton = styled(Button)({
  background: '#0C223F',
  border: 0,
  borderRadius: 3,
  color: 'white',
  height: 48,
  padding: '0 30px',
  borderColor: '#ffffff',
  fontFamily: [
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(','),
});

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

    let status;
    if (this.state.opponent1 === "Team Liquid") {
      if (this.state.opponent1score > this.state.opponent2score) {
        status = "YES";
      }
      else {
        status = "NO";
      }
    }

    else {
      if (this.state.opponent2score > this.state.opponent1score) {
        status = "YES";
      }
      else {
        status = "NO";
      }
    }

    return (
      <div className="App">
        <header className="App-header">
          <Toolbar>
            <MyButton variant="contained" onClick={() => { alert('Dota 2 clicked') }}>Dota 2</MyButton>
            <MyButton variant="contained" onClick={() => { alert('CS:GO clicked') }}>CS:GO</MyButton>
            <MyButton variant="contained" onClick={() => { alert('PUBG clicked') }}>PUBG</MyButton>
            <MyButton variant="contained" onClick={() => { alert('SC2 clicked') }}>SC2</MyButton>
            <MyButton variant="contained" onClick={() => { alert('Rocket League clicked') }}>Rocket League</MyButton>
            <MyButton variant="contained" onClick={() => { alert('Valorant clicked') }}>Valorant</MyButton>
            <MyButton variant="contained" onClick={() => { alert('R6S clicked') }}>R6S</MyButton>
            <MyButton variant="contained" onClick={() => { alert('Apex Legends clicked') }}>Apex Legends</MyButton>
            <MyButton variant="contained" onClick={() => { alert('LoL clicked') }}>LoL</MyButton>
          </Toolbar>
          <p>
            Did Team Liquid Win?
          </p>
          <p className = "won">
            {status}
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            {this.state.opponent1} {this.state.opponent1score}-{this.state.opponent2score} {this.state.opponent2}
          </a>
        </header>
      </div>
    );
  }
}

export default App;
