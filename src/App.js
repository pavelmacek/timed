import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

let seconds = 0, minutes = 0, hours = 0,t, time = "00:00";

function add() {
    seconds++;
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
        if (minutes >= 60) {
            minutes = 0;
            hours++;
        }
    }

    time = (hours ? (hours > 9 ? hours : "0" + hours + ":") : "") + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);

    timer(time);
}

function timer(time) {
    t = setTimeout(add, 1000);
    console.log(time);
    return time
}

// Timer
const clock = (
  <h1>00:00</h1>
);

// Cointainer component
class App extends Component {
  onButtonClick() {
    timer();
  }
  render() {
    return (
      <div className="App">
        <div className="Content">
          {clock}
          <button onClick={this.onButtonClick} type="button" className="Btn">Start</button>
        </div>
      </div>
    );
  }
}

export default App;
