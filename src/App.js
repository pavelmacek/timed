import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './App.css';

console.log(localStorage);

// Cointainer component
class App extends Component {
  constructor (props) {
    super(props);
    this.state = { time: {hours: '00', minutes: '00', seconds: '00'}, running: false, seconds: 0, t: {} };

    this.add = this.add.bind(this);
    this.timer = this.timer.bind(this);
    this.secondsToTime = this.secondsToTime.bind(this);
    this.controlTimer = this.controlTimer.bind(this);
    this.newTimer = this.newTimer.bind(this);
  }
  componentDidMount() {
    if (localStorage.getItem('time')) {
      console.log('after mounted', localStorage.getItem('time'));
      let time = JSON.parse(localStorage.getItem('time'));
      this.setState({time: time});
    }
    if (localStorage.getItem('seconds')) {
      console.log('after mounted', localStorage.getItem('seconds'));
      let seconds = localStorage.getItem('seconds');
      this.setState({seconds: seconds});
    }
  }
  add() {
      let seconds = this.state.seconds;
      seconds++;
      this.setState({seconds: seconds});
      console.log(seconds);

      this.setState({time: this.secondsToTime(seconds)});
      console.log(this.state.time);

      localStorage.setItem('time', JSON.stringify(this.state.time));
      localStorage.setItem('seconds', this.state.seconds);

      this.timer();
  }
  secondsToTime(secs){
    let hours = Math.floor(secs / (60 * 60));

    let divisor_for_minutes = secs % (60 * 60);
    let minutes = Math.floor(divisor_for_minutes / 60);

    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);

    let timeObj = {
        "hours": (hours ? (hours > 9 ? hours : "0" + hours + ":") : "00"),
        "minutes": (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00"),
        "seconds": (seconds > 9 ? seconds : "0" + seconds)
    };
    return timeObj;
  };
  timer() {
      this.setState({ t: setTimeout(this.add, 1000) });
      this.setState({ running: true })

  }
  controlTimer() {
    if (this.state.running) {
      clearTimeout(this.state.t);
      this.setState({ running: false })
    } else {
    this.timer();
    }
  }
  newTimer() {
    this.setState({ seconds: 0 });
    this.setState({ time: { hours: '00', minutes: '00', seconds: '00'} });
    localStorage.setItem('seconds', '0');
    localStorage.setItem('time', JSON.stringify({ hours: '00', minutes: '00', seconds: '00'} ));
  }''
  render() {
    return (
      <div className="app">
        <div className="content">
          <h1>{this.state.time.hours == '00' ? '' : this.state.time.hours+':'}{this.state.time.minutes}:{this.state.time.seconds}</h1>
          <button onClick={this.controlTimer} type="button" className="btn">{this.state.running ? 'Pause' : 'Start'}</button>
          <button onClick={this.newTimer} type="button" className="btn btnSmall">New</button>
        </div>
      </div>
    );
  }
}

export default App;
