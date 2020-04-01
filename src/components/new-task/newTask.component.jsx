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
    this.props.addTaskFunc(this.state.newTaskText);
  }

  render() {
    return(
      <section className="container">
        <form className="form-inline justify-content-center" onSubmit={this.handleClick}>
          <input 
            type="text" 
            className="col-6 form-control mr-2" 
            placeholder="new task"
            value={this.state.newTaskText}
            onChange={this.updateTaskText}
            maxLength="70"
            required
          />
          <button className="btn btn-sm button-custom" type="submit">
            ADD
          </button>
        </form>
      </section>
    );
  }
}

export default NewItem;