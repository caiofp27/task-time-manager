import React from 'react';
import './tasks-display.styles.css';


class TasksDisp extends React.Component {
  handleDelete = e => {
    this.props.deleteTaskFunc(this.props.id);
  }

  handleCheck = e => {
    this.props.checkTaskFunc(this.props.id);
  }

  handleUndo = e => {
    this.props.undoTaskFunc(this.props.id);
  }

  startTimer = e => {
    this.props.startTimerFunc(this.props.id);
  }

  pauseTimer = e => {
    this.props.pauseTimerFunc(this.props.id);
  }
  
  msToTime(duration) {
    let seconds = Math.floor((duration / 1000) % 60),
        minutes = Math.floor((duration / (1000 * 60)) % 60),
        hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    return "Tempo gasto: "+hours+":"+minutes+":"+seconds;
  }

  render() {
    let time = this.msToTime(this.props.totalTime),
        button = '';
    if(!this.props.stop && !this.props.isOn) {
     button = <i className='fas fa-play play-icon' onClick={this.startTimer} />
    } else if(!this.props.stop && this.props.isOn) {
      button = <i className='fas fa-pause pause-icon' onClick={this.pauseTimer} />
    }
    return (
      <div className={`col-md-3 card box ${this.props.completed ? "completed-box" : "incompleted-box"}`}>
        <div className="card-text">
          <p>{this.props.text}</p>
          <p>{time}</p>
          {
            this.props.completed ? 
            <i className="fas fa-undo undo-icon" onClick={this.handleUndo} /> : 
            <i className='check-icon fas fa-check' onClick={this.handleCheck} /> 
          }
          {button}
          <i className="fas fa-trash-alt trash-icon" onClick={this.handleDelete} />
        </div>
      </div>
    );
  }
} 

export default TasksDisp;