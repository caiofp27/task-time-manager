import React from 'react';
import NewTask from './components/new-task/newTask.component';
import TasksDisp from './components/tasks/tasks-display.component';
import './App.css';
import { v4 as uuidv4 } from 'uuid';

class App extends React.Component {
  state = {
    tasks: [
      {
        id: uuidv4(),
        taskText: "make dinner", 
        completed: true,
        isOn: false,
        stop: true, 
        startedDate: "2020-03-27T16:13:31.682Z",
        startedDateMs: 1585325700968,
        timeTotal: 100000,
      },
      {
        id: uuidv4(),
        taskText: "walk the dog", 
        completed: true,
        isOn: false,
        stop: true, 
        startedDate: "2020-01-27T16:13:31.682Z",
        startedDateMs: 1585325700910,
        timeTotal: 3112000
      },
      {
        id: uuidv4(),
        taskText: "do the dishes", 
        completed: false,
        isOn: false,
        stop: false,  
        startedDate: "2020-03-27T16:13:31.682Z",
        startedDateMs: 1585325700968,
        timeTotal: 1215412
      }
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
      stop: false,  
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
    const checkTask = this.state.tasks.map(task => {
      if(task.id === id){
        clearInterval(this.incrementer);
        task.completed = true;
        task.stop = true;
        task.isOn = false;
      }
      return task;
    });
    this.setState({
      tasks: checkTask
    });
  }
  undoTask = id => {
    const undoTask = this.state.tasks.map(task => {
      if(task.id === id){
        clearInterval(this.incrementer);
        task.completed = false;
        task.stop = false;
        task.isOn = false;
      }
      return task;
    });
    this.setState({
      tasks: undoTask
    });
  }

  handleStartTimer = id => {
    this.incrementer = setInterval(() => {
      let running = this.state.tasks.map(task => {
        if(task.id === id) {
          task.isOn = true;
          task.timeTotal += 1000;
        } 
          return task;
        });
        this.setState({
          tasks: running
        });  
    },1000);
  }

  handlePauseTimer = id => {
    clearInterval(this.incrementer);
    let pause = this.state.tasks.map(task => {
      if(task.id === id) {
        task.isOn = false;
      }
      return task;
    });
    this.setState({
      tasks: pause
    });
  }

  render() {
    const completedTasks = this.state.tasks.filter(t => t.completed === true);
    const incompleteTasks = this.state.tasks.filter(t => t.completed === false);
    return (
      <section>
        <h3 className="title">My ToDo List</h3>
        <NewTask addTaskFunc={this.addTask} />
        <section className="container">
          <div className="row">
            {incompleteTasks.map(item => {
            return <TasksDisp key={item.id} text={item.taskText} stop={item.stop} isOn={item.isOn} totalTime={item.timeTotal} date={item.startedDate} completed={item.completed} deleteTaskFunc={this.deleteTask} checkTaskFunc={this.checkTask} undoTaskFunc={this.undoTask} startTimerFunc={this.handleStartTimer} pauseTimerFunc={this.handlePauseTimer} id={item.id} />})}
          </div>
        </section>
        <section className="container">
          <div className="row">
            {completedTasks.map(item => {
            return <TasksDisp key={item.id} text={item.taskText} stop={item.stop} isOn={item.isOn} totalTime={item.timeTotal} date={item.startedDate} completed={item.completed} deleteTaskFunc={this.deleteTask} checkTaskFunc={this.checkTask} undoTaskFunc={this.undoTask} startTimerFunc={this.handleStartTimer} pauseTimerFunc={this.handlePauseTimer} id={item.id} />})}
          </div>
        </section>
      </section>
    );
  }
}

export default App;
