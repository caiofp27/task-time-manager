import React from 'react';
import './App.css';

class App extends React.Component {
  state = {
    timer: 69,
    running: false,
    startedDate: '',
    startedMs: ''
  };

  getSeconds = () => {
    return ('0' + this.state.timer % 60).slice(-2) 
  };

  getMinutes = () => {
    return Math.floor(this.state.timer / 60)
  };

  handleStartTimer = () => {
    this.incrementer = setInterval(() => {
      this.setState({
       timer: this.state.timer + 1,
        running: true,
      })
    },1000)
  };

  handleStopTimer = () => {
    clearInterval(this.incrementer);
    this.setState({
      running: false,
    });
  };
  
  handleAddTask = (e) => {
    e.preventDefault();
    const date = new Date();
    const ms = date.getTime();
    this.setState({
      startedDate: date,
      startedMs: ms
    });
  }

  render() {	
    return(
      <div>
        <button onClick={this.handleAddTask}>ADD TAREFA</button>
        <br />
      <h1>{this.getMinutes()}:{this.getSeconds()}</h1>
        <button onClick={this.handleStartTimer}>start</button>
        <button onClick={this.handleStopTimer}>stop</button>
        {console.log(this.state)}
      </div>
    )
  }
}
