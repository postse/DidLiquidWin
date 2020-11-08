import React, { Component } from 'react'
import './App.css';
import axios from 'axios'
import { styled } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { text } from 'body-parser';

const MyButton = styled(Button)({
  background: '#153A6B',
  border: 0,
  borderRadius: 3,
  color: 'white',
  height: 48,
  padding: '0 30px',
  marginLeft: '5px',
  marginRight: '5px',
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

let game, newstate, dash;

class App extends Component {
  state = {
    response: {}

  };

  async componentDidMount(game) {
    if (game != null) {
      let textToTransition = document.getElementsByClassName("transition");
      for (let i = 0; i < textToTransition.length; i++) {
        console.log(textToTransition[i]);
        textToTransition[i].classList.remove("on");
        textToTransition[i].classList.add("off");
      }
      
      axios.get('/data/' + game).then((res) => {
        newstate = res.data.result[0]
        this.setState(newstate)
      }).then(() => {
        setTimeout(() => {
          for (let i = 0; i < textToTransition.length; i++) {
            console.log(textToTransition[i]);
            textToTransition[i].classList.remove("off");
            textToTransition[i].classList.add("on");
          }
        }, 100)
      })
    }
  }

  render() {
    let status;
    if (this.state.opponent1 === "Team Liquid") {
      dash = "-";
      if (this.state.opponent1score > this.state.opponent2score) {
        status = "YES";
      }
      else {
        status = "NO";
      }
    }

    else if (this.state.opponent2 === "Team Liquid") {
      dash = "-";
      if (this.state.opponent2score > this.state.opponent1score) {
        status = "YES";
      }
      else {
        status = "NO";
      }
    }

    else {
      status = "PLACEHOLDER";
      dash = "PLACEHOLDER";
    }

    return (
      <div className="App">
        <header className="App-header">
          <Toolbar>
            <MyButton variant="contained" onClick={() => { this.componentDidMount("dota2"); game = "Dota 2"; }}>Dota 2</MyButton>
            <MyButton variant="contained" onClick={() => { this.componentDidMount("counterstrike"); game = "CS:GO"; }}>CS:GO</MyButton>
            {/* <MyButton variant="contained" onClick={() => { this.componentDidMount("pubg"); }}>PUBG</MyButton> */}
            {/* <MyButton variant="contained" onClick={() => { this.componentDidMount("starcraft2"); }}>SC2</MyButton> */}
            <MyButton variant="contained" onClick={() => { this.componentDidMount("rocketleague"); game = "Rocket League"; }}>Rocket League</MyButton>
            <MyButton variant="contained" onClick={() => { this.componentDidMount("valorant"); game = "Valorant"; }}>Valorant</MyButton>
            <MyButton variant="contained" onClick={() => { this.componentDidMount("rainbowsix"); game = "R6S"; }}>R6S</MyButton>
            {/* <MyButton variant="contained" onClick={() => { this.componentDidMount("apexlegends"); }}>Apex Legends</MyButton> */}
            <MyButton variant="contained" onClick={() => { this.componentDidMount("leagueoflegends"); game = "LoL"; }}>LoL</MyButton>
          </Toolbar>
          <p className='transition'>
            Did Team Liquid {game} Win?
          </p>
          <p className="won transition off">
            {status}
          </p>
          <a
            className="App-link transition off"
            href={this.state.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            {this.state.opponent1} {this.state.opponent1score}{dash}{this.state.opponent2score} {this.state.opponent2}
          </a>
        </header>
      </div>
    );
  }
}

export default App;
