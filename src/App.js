import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './App.css';

var seconds = 0, minutes = 0, hours = 0,t, time = "00:00";

// Cointainer component
class App extends Component {
  constructor (props) {
    super(props);
    this.state = { time: '00:00', running: false };
    this.add = this.add.bind(this);
    this.timer = this.timer.bind(this);
    this.onButtonClick = this.onButtonClick.bind(this);
  }
  add() { // Instead of using this method and keep time in h m s, I should keep time in seconds and ++ after 1s, and always just calculate time to display with a separate secondsToTime function https://stackoverflow.com/questions/40885923/countdown-timer-in-react
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

      this.timer();
  }
  timer() {
      t = setTimeout(this.add, 1000);
      this.setState({ time: time, running: true})
      console.log(time);
  }
  onButtonClick() {
    if (this.state.running) {
      clearTimeout(t);
      this.setState({ running: false})
    } else {
    this.timer();
    }
  }
  render() {
    return (
      <div className="App">
        <div className="Content">
          <h1>{this.state.time}</h1>
          <button onClick={this.onButtonClick} type="button" className="Btn">{this.state.running ? 'Pause' : 'Start'}</button>
        </div>
      </div>
    );
  }
}

export default App;
