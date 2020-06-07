import React from 'react';
import { render } from 'react-dom';

class App extends React.Component {
  state = {
    status: 'off',
    time: 60*1*1000,
    timer: null,
  };

  formatTime = () => {
    const {time} = this.state;
    if(!time || isNaN(time) || time < 0)
      return null;
    const minutes = Math.floor(time / 1000 / 60 % 60)+ '';
    const seconds =  Math.floor(time / 1000 % 60) + '';
  
    return minutes.padStart(2,'0') + ':' + seconds.padStart(2,'0');
  }

  startTimer = () => {
    this.setState({
      status: 'work',
      time: 10*1000,
      timer: setInterval(this.step, 1000),
    })
  }

  step = () => {
    console.log('step');
    const {time, status} = this.state;
    let newTime = time - 1000;
    
    if(newTime <= 0) {
      this.playBell();
      if(status === 'work') {
        this.setState({
          status: 'rest',
          time: 20*1000,
        })
      } else if(status === 'rest'){
        this.setState({
          status: 'work',
          time: 1200*1000,
        })
      }
    } else {
      this.setState({
        time: newTime,
      })
    }
  }

  stopTimer = () => {
    const {timer} = this.state;
    clearInterval(timer);
    this.setState({
      status: 'off',
      time: 0,
    })
  }

  playBell = () => {
    const audio = new Audio('sounds/bell.wav');
    audio.play();
  }

  closeApp = () => {
    window.close();
  }

  render() {
    const {status, time, timer} = this.state;
    return (
      <div>
        <h1>Protect your eyes</h1>
        {status === 'off' ? <div>
        <p>According to optometrists in order to save your eyes, you should follow the 20/20/20. It means you should to rest your eyes every 20 minutes for 20 seconds by looking more than 20 feet away.</p>
        <p>This app will help you track your time and inform you when it's time to rest.</p></div> :''}
        {status === 'work' ? <img src="./images/work.png" /> : ''}
        {status === 'rest' ? <img src="./images/rest.png" /> : ''}
        {status === 'off'
        ? <button className="btn" onClick={()=>this.startTimer()}>Start</button> 
        : <div><div className="timer">{this.formatTime()}</div><button className="btn" onClick={()=>this.stopTimer()}>Stop</button></div>}
        <button className="btn btn-close" onClick={()=>this.closeApp()}>X</button>
      </div>
    )
  }
};

render(<App />, document.querySelector('#app'));
