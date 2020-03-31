import React from 'react';
import './tasks-display.styles.css';


class TasksDisp extends React.Component {
  handleDelete = e => {
    e.preventDefault();
    this.props.deleteTaskFunc(this.props.id);
  }

  handleCheck = e => {
    e.preventDefault();
    this.props.checkTaskFunc(this.props.id);
  }

  handleUndo = e => {
    e.preventDefault();
    this.props.undoTaskFunc(this.props.id);
  }

  startTimer = e => {
    e.preventDefault();
    this.props.startTimerFunc(this.props.id);
  }

  pauseTimer = e => {
    e.preventDefault();
    this.props.pauseTimerFunc(this.props.id);
  }

  editTask = e => {
    e.preventDefault();
    let taskText = prompt("Edit Task");
    if(taskText !== null && taskText.length > 0) {
      this.props.editTaskFunc(this.props.id, taskText);
    } else {
      taskText = prompt("Cannot be blank!");
      this.props.editTaskFunc(this.props.id, taskText);
    }
  }

  render() {
    let time = this.props.msToTimeFunc(this.props.totalTime),
        iconsStartPause = '',
        iconEdit = '';
    if(!this.props.completed && !this.props.isOn) {
      iconsStartPause = <i className='fas fa-play play-icon' onClick={this.startTimer} />;
      iconEdit =  <i className='fas fa-edit edit-icon' onClick={this.editTask} />;
    } else if(!this.props.completed && this.props.isOn) {
      iconsStartPause = <i className='fas fa-pause pause-icon' onClick={this.pauseTimer} />;
      iconEdit =  <i className='fas fa-edit edit-icon' onClick={this.editTask} />;
    }
    return (
      <div className={`col-md-3 card box ${this.props.completed ? "completed-box" : "incompleted-box"}`}>
        <div className="card-text">
          <p>{this.props.text}</p>
          <p>Tempo: {time}</p>
          {
            this.props.completed ? 
            <i className="fas fa-undo undo-icon" onClick={this.handleUndo} /> : 
            <i className="check-icon fas fa-check" onClick={this.handleCheck} />
          }
          {iconsStartPause}{iconEdit}
          <i className="fas fa-trash-alt trash-icon" onClick={this.handleDelete} />
        </div>
      </div>
    );
  }
} 

export default TasksDisp;