import React from 'react';
import NewTask from './components/new-task/newTask.component';
import TasksDisp from './components/tasks/tasks-display.component';
import './App.css';
import { v4 as uuidv4 } from 'uuid';

class App extends React.Component {
  userData;
  state = {
    tasks: [],
    incrementer: []
  }

  componentDidMount() {
    const tasks = localStorage.getItem('tasks');
    const incrementer = localStorage.getItem('incrementer');
    if(tasks || incrementer) {
      this.setState({
        tasks: JSON.parse(tasks),
        incrementer: JSON.parse(incrementer)
      });
    } else {
      this.setState({
        tasks: [],
        incrementer: []
      });
    }
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
    localStorage.setItem('tasks', JSON.stringify(taskCopy));
  }

  deleteTask = id => {
    const filterTask = this.state.tasks.filter(task => {
      return task.id !== id;
    });
    const filterIncrement = this.state.incrementer.filter(task => {
      return task.id !== id;
    })
    this.setState({
      tasks: filterTask,
      incrementer: filterIncrement
    });
    localStorage.setItem('incrementer', JSON.stringify(filterIncrement));
    localStorage.setItem('tasks', JSON.stringify(filterTask));
  }

  checkTask = id => {
    const incrementerCopy = this.state.incrementer.filter(item => item.id !== id);
    this.state.incrementer.map(item => {
      if(item.id === id){
        clearInterval(item.func);
      }
      return item;
    });
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
    localStorage.setItem('incrementer', JSON.stringify(incrementerCopy))
    localStorage.setItem('tasks', JSON.stringify(checkTask));
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
    localStorage.setItem('tasks', JSON.stringify(undoTask));
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
          localStorage.setItem('tasks', JSON.stringify(running));
          this.setState({
            tasks: running
          });  
      },1000)
    }
    const incrementerCopy = this.state.incrementer.slice();
    incrementerCopy.push(incrementer);
    this.setState({
      incrementer: incrementerCopy
    });
    localStorage.setItem('incrementer', JSON.stringify(incrementerCopy));
  }

  handlePauseTimer = id => {
    const incrementerCopy = this.state.incrementer.filter(item => item.id !== id);
    this.state.incrementer.map(item => {
      if(item.id === id){
        clearInterval(item.func);
      }
      return item;
    });
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
    localStorage.setItem('tasks', JSON.stringify(pause));

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
    });
    localStorage.setItem('tasks', JSON.stringify(taskCopy));
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
    return(
      <section>
        <div className="header-background">
          <div className="title-background">
            <h1 className="title">Task & Time Manager</h1>
          </div>
        </div>
        <div className="container">
          <NewTask addTaskFunc={this.addTask} />
          <section className="row-container">
            <div className="row row-box">
              {incompleteTasks.map(item => {
              return <TasksDisp 
                key={item.id} 
                text={item.taskText} 
                isOn={item.isOn} 
                totalTime={item.timeTotal} 
                completed={item.completed} 
                deleteTaskFunc={this.deleteTask} 
                checkTaskFunc={this.checkTask} 
                undoTaskFunc={this.undoTask} 
                startTimerFunc={this.handleStartTimer} 
                pauseTimerFunc={this.handlePauseTimer} 
                editTaskFunc={this.editTask} 
                msToTimeFunc={this.msToTime} 
                id={item.id} 
              />})}
            </div>
          </section>
          <div className="divider-body" />
          <section className="row-container">
          <div className="title-container">
            <h3 className="title-completed">Done Tasks </h3>
            <div className="hours">Time Worked: {this.msToTime(sumHours)}</div>
          </div>         
            <div className='row row-box'>
              {completedTasks.map(item => {
              return <TasksDisp 
                key={item.id} 
                text={item.taskText} 
                isOn={item.isOn} 
                totalTime={item.timeTotal} 
                completed={item.completed} 
                deleteTaskFunc={this.deleteTask} 
                checkTaskFunc={this.checkTask} 
                undoTaskFunc={this.undoTask} 
                startTimerFunc={this.handleStartTimer} 
                pauseTimerFunc={this.handlePauseTimer} 
                msToTimeFunc={this.msToTime} 
                id={item.id} 
              />})}
            </div>
          </section>
        </div>
      </section>
    );
  }
}

export default App;
