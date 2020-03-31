import React from 'react';
import NewTask from './components/new-task/newTask.component';
import TasksDisp from './components/tasks/tasks-display.component';
import './App.css';
import { v4 as uuidv4 } from 'uuid';

class App extends React.Component {
  state = {
    tasks: [
      {id: uuidv4(), taskText: "make dinner", completed: true, isOn: false, startedDate: "2020-03-27T16:13:31.682Z", startedDateMs: 1585325700968, timeTotal: 100000},
      {id: uuidv4(), taskText: "walk the dog", completed: true, isOn: false, startedDate: "2020-01-27T16:13:31.682Z", startedDateMs: 1585325700910, timeTotal: 3112000},
      {id: uuidv4(), taskText: "do the dishes", completed: false, isOn: false, startedDate: "2020-03-27T16:13:31.682Z",   startedDateMs: 1585325700968, timeTotal: 1215412}
    ],
    incrementer: [
      {id: null, func: null}
    ]
  }

  addTask = (taskText) => {
    let date = new Date();
    let timeMs = date.getTime();
    const newTask = {
      id: uuidv4(),
      taskText: taskText,
      completed: false,
      isOn: false,
      startedDate: date,
      startedDateMs: timeMs,
      timeTotal: 0
    };
    const taskCopy = this.state.tasks.slice();
    taskCopy.push(newTask);
    this.setState({
      tasks: taskCopy
    });
  }

  deleteTask = id => {
    const filterTask = this.state.tasks.filter(task => {
      return task.id !== id;
    });
    this.setState({
      tasks: filterTask
    });
  }
  checkTask = id => {
    const incrementerCopy = this.state.incrementer.filter(item => item.id !== id);
    this.state.incrementer.map(item => {
      if(item.id === id){
        clearInterval(item.func);
      }
      return item;
    })
    const checkTask = this.state.tasks.map(task => {
      if(task.id === id){
        task.completed = true;
        task.isOn = false;
      }
      return task;
    });
    this.setState({
      tasks: checkTask,
      incrementer: incrementerCopy
    });
  }
  undoTask = id => {
    const undoTask = this.state.tasks.map(task => {
      if(task.id === id){
        task.completed = false;
        task.isOn = false;
      }
      return task;
    });
    this.setState({
      tasks: undoTask
    });
  }

  handleStartTimer = id => {
    const incrementer = {
      id: id,
      func: setInterval(() => {
        const running = this.state.tasks.map(task => {
          if(task.id === id) {
            task.isOn = true;
            task.timeTotal += 1000;
          } 
            return task;
          });
          this.setState({
            tasks: running
          });  
      },1000)
    };
    const incrementerCopy = this.state.incrementer.slice();
    incrementerCopy.push(incrementer);
    this.setState({
      incrementer: incrementerCopy
    })
  }

  handlePauseTimer = id => {
    const incrementerCopy = this.state.incrementer.filter(item => item.id !== id);
    this.state.incrementer.map(item => {
      if(item.id === id){
        clearInterval(item.func);
      }
      return item;
    })
    const pause = this.state.tasks.map(task => {
      if(task.id === id) {
        task.isOn = false;
      }
      return task;
    });
    this.setState({
      tasks: pause,
      incrementer: incrementerCopy
    });
  }

  editTask = (id, taskText) => {
    const taskCopy = this.state.tasks.map(item => {
      if(item.id === id){
        item.taskText =  taskText;
      }
      return item;
    });
    this.setState({
      tasks: taskCopy
    })
  }

  msToTime = duration => {
    let seconds = Math.floor((duration / 1000) % 60),
        minutes = Math.floor((duration / (1000 * 60)) % 60),
        hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    return hours+":"+minutes+":"+seconds;
  }

  render() {
    const completedTasks = this.state.tasks.filter(t => t.completed === true),
          incompleteTasks = this.state.tasks.filter(t => t.completed === false);
    let sumHours = 0;
    completedTasks.map(item => sumHours += item.timeTotal);
    return (
      <section>
        <h1 className="title">Tasks</h1>
        <NewTask addTaskFunc={this.addTask} />
        <section className="container">
          <div className="row">
            {incompleteTasks.map(item => {
            return <TasksDisp key={item.id} text={item.taskText} isOn={item.isOn} totalTime={item.timeTotal} completed={item.completed} deleteTaskFunc={this.deleteTask} checkTaskFunc={this.checkTask} undoTaskFunc={this.undoTask} startTimerFunc={this.handleStartTimer} pauseTimerFunc={this.handlePauseTimer} editTaskFunc={this.editTask} msToTimeFunc={this.msToTime} id={item.id} />})}
          </div>
        </section>
        <section className="container">
        <h2>Tempo Trabalhado: {this.msToTime(sumHours)}</h2>
          <div className='row'>
            {completedTasks.map(item => {
            return <TasksDisp key={item.id} text={item.taskText} isOn={item.isOn} totalTime={item.timeTotal} completed={item.completed} deleteTaskFunc={this.deleteTask} checkTaskFunc={this.checkTask} undoTaskFunc={this.undoTask} startTimerFunc={this.handleStartTimer} pauseTimerFunc={this.handlePauseTimer} msToTimeFunc={this.msToTime} id={item.id} />})}
          </div>
        </section>
      </section>
    );
  }
}

export default App;
