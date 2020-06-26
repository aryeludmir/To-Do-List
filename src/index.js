import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import './App.css';
import 'rc-checkbox/assets/index.css';
import Checkbox from 'rc-checkbox';


class AppMain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todoList:[]
    };

    this.handleTodoListChange = this.handleTodoListChange.bind(this);
  }

  handleTodoListChange(todoList) {
    this.setState({
      todoList: todoList
    });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h1>To Do List</h1>
        <AddTaskForm
          todoList={this.state.todoList}
          changeTodoListState={this.handleTodoListChange}
        />
        <ToDoList
          todoList={this.state.todoList}
          changeTodoListState={this.handleTodoListChange}
        />
      </div>
    </div>
    );
  }
}


class AddTaskForm extends React.Component {
  constructor(props) {
    super(props);
    this.addTask = this.addTask.bind(this);
    this.input = React.createRef();
  }

  addTask(e) {
    e.preventDefault();
    if(this.input.current.value !== "") {
      const newTask = {todo: this.input.current.value, completed: false};
      this.props.todoList.push(newTask);
      this.props.changeTodoListState(this.props.todoList);
      this.input.current.value = "";
    } else {
      alert('Please enter a task and then press Add.');
    }
  }

  render() {
    return (
      <form onSubmit={this.addTask}>
        <input 
          type="text" 
          placeholder="Enter task here..."
          ref={this.input} />
        {' '}
        <button type="submit">
          Add
        </button>
      </form>
    );
  }
}

class ToDoList extends React.Component {
constructor(props) {
  super(props);
  this.completeTask.bind(this);
  this.removeTask.bind(this);
}

completeTask(e, task) {
  e.preventDefault();
  task.completed ? task.completed  = false : task.completed = true;
  this.props.changeTodoListState(this.props.todoList);
}

removeTask(e, todo, todoListArr) {
  e.preventDefault();
  const updatedList = todoListArr.filter((task) => {
    if(task.todo !== todo) {
      return task.todo;
    } else {
      return null;
    }
  });
  this.props.changeTodoListState(updatedList);
}

  render() {
    const todoListArr = this.props.todoList;
    const list = todoListArr.map((task) => 
        <li key={task.todo}>
          <Checkbox 
            checked={task.completed}
            onChange={(e) => this.completeTask(e, task)}
          />
          {' '}
          {task.todo}
          {' '}
          <button 
          type="submit"
          onClick={(e) => this.removeTask(e, task.todo, todoListArr)}
          >
            x
          </button>
        </li>
    
   );
    return (
      <ul className="Todo-list">
        {list}
      </ul>
    );
  }
}




//=====================================================
ReactDOM.render(
  <React.StrictMode>
    <AppMain />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()

