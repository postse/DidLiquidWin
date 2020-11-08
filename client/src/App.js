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
  position: 'relative',
  top: '-30px',
});

let game;
let newstate;

class App extends Component {
  state = {
    response: {}

  };

  async componentDidMount(game) {
    axios.get('/data/' + game ).then((res) => {
      newstate = res.data.result[0]
      this.setState(newstate)
      //this.state.link = "https://liquipedia.net/" + this.state.wiki + "/" + this.state.pagename;
      console.log(this.state)
    })
    //eventLink = "https://liquipedia.net/" + this.state.wiki + "/" + this.state.pagename;
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
            <MyButton variant="contained" onClick={() => { this.componentDidMount("dota2"); game = "Dota 2";}}>Dota 2</MyButton>
            <MyButton variant="contained" onClick={() => { this.componentDidMount("counterstrike"); game = "CS:GO"; }}>CS:GO</MyButton>
            {/* <MyButton variant="contained" onClick={() => { this.componentDidMount("pubg"); }}>PUBG</MyButton> */}
            {/* <MyButton variant="contained" onClick={() => { this.componentDidMount("starcraft2"); }}>SC2</MyButton> */}
            <MyButton variant="contained" onClick={() => { this.componentDidMount("rocketleague"); game = "Rocket League"; }}>Rocket League</MyButton>
            <MyButton variant="contained" onClick={() => { this.componentDidMount("valorant"); game = "Valorant";}}>Valorant</MyButton>
            <MyButton variant="contained" onClick={() => { this.componentDidMount("rainbowsix"); game = "R6S";}}>R6S</MyButton>
            {/* <MyButton variant="contained" onClick={() => { this.componentDidMount("apexlegends"); }}>Apex Legends</MyButton> */}
            <MyButton variant="contained" onClick={() => { this.componentDidMount("leagueoflegends"); game = "LoL"; }}>LoL</MyButton>
          </Toolbar>
          <p>
            Did Team Liquid {game} Win?
          </p>
          <p className = "won">
            {status}
          </p>
          <a
            className="App-link"
            href={this.state.link}
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
