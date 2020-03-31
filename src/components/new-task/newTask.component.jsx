import React from "react";
import './newTask.styles.css';

class NewItem extends React.Component {
  state = {
    newTaskText: ""
  }

  updateTaskText = event => {
    this.setState({
      newTaskText: event.target.value
    });
  }

  handleClick = e => {
    e.preventDefault();
    if(this.state.newTaskText === ""){
      alert("You need a task first!");
    }else{
      this.props.addTaskFunc(this.state.newTaskText);
      this.setState({
       newTaskText: "" 
      });
    }
  }

  render() {
    return (
      <section className="container">
        <form className="form-inline justify-content-center">
          <input 
            type="text" 
            className="col-6 form-control mr-2" 
            placeholder="NEW TASK"
            value={this.state.newTaskText}
            onChange={this.updateTaskText}
            maxLength="70"
          />
          <button className="btn btn-sm btn-primary button-custom" onClick={this.handleClick}>
            ADD
          </button>
        </form>
      </section>
    );
  }
}

export default NewItem;