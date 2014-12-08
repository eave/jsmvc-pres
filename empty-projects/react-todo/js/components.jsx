/** @jsx React.DOM */

var app = app || {};
app.components = app.components || {};

(function() {
  'use strict';

  var TodoApp = app.components.TodoApp = React.createClass({
    // there are several functions that are run throughout the lifecycle of a React component—one of them is getInitialState
    // a state is only available to the current component, so we can create it when we create the component
    // in most cases you want to make an ajax request, bring the data back, and set it as the state
    getInitialState: function() {
      return {
        todos: []
      };
    },

    // this is a native react function that is called and executes before the component mounts and goes out onto the page
    componentWillMount: function() {

    },

    // this is a native react function that basically says, "I'm already on the page——now what do you want me to do?"
    // to put it explicity, componentDidMount is where you want to call the function that goes out and makes the ajax request for the data you need in your state
    componentDidMount: function() {
      var data = app.retrieveData();
      this.setState({todos: data});
      console.log(this.state);
    },

    // react works by listening for events in the app, and then rerendering everything
    // if the underlying data from the parent doesn't change though, it just rerenders with the same data, and you don't see updates
    // this function addresses that
    updateVal: function(val, index) {
      var state = this.state;
      state.todos[index].val = val;
      this.setState(state);
    },

    toggleCompleted: function(index) {
      var state = this.state;
      state.todos[index].completed = !state.todos[index].completed;
      this.setState(state);
    },

    deleteTodo: function(index) {
      var state = this.state;
      state.todos.splice(index, 1);
      this.setState(state);
    },

    render: function() {
      // jsx can only have one root element
      // in the todos = {this.state.todos} line below, we are passing the todos 'state' down from the parent component 'TodoApp', which we're inside of, down to the child component 'TodoList' in the form of props
      // this.state.todos refers to the todos array specified on line fifteen
      return (
        <div className="outer-container">
          <NewTodo />
          <TodoList
            todos = {this.state.todos}
            updateVal = {this.updateVal}
            toggleCompleted = {this.toggleCompleted}
            deleteTodo = {this.deleteTodo}
          />
          <ClearCompleted />
        </div>
      );
    }
  });

  var NewTodo = app.components.NewTodo = React.createClass({
    render: function() {
      return (
        <h1>New Todo</h1>
      );
    }
  });

  var TodoList = app.components.TodoList = React.createClass({
    render: function() {
      // the code with .map below is the equivalent of ng-repeat for react
      // in react, it's actually just vanilla javascript
      // here is where we're receiving the todo props that we passed down to 'TodoList' from 'TodoApp'
      var context = this;
      return (
        <div className="todos">
          {this.props.todos.map(function(el, index) {
            // here, we're passing each todo down from 'TodoList' to a new component, 'TodoItem'
            return (
              <TodoItem
                todo={el}
                index={index}
                updateVal={context.props.updateVal}
                toggleCompleted = {context.props.toggleCompleted}
                deleteTodo = {context.props.deleteTodo}
              />
            )
          })}
        </div>
      );
    }
  });

  var TodoItem = app.components.TodoItem = React.createClass({
    handleVal: function(event) {
      // when we call updateVal, we're calling the same function defined on line 22, and passed down through TodoList and TodoItem
      this.props.updateVal(event.target.value, this.props.index);
    },

    handleToggle: function(event) {
      this.props.toggleCompleted(this.props.index);
    },

    handleDelete: function(event) {
      this.props.deleteTodo(this.props.index);
    },

    render: function() {
      var inputClassName = "form-control";
      if (this.props.todo.completed) {
        inputClassName += " finished";
      }

      return (
        <div className="input-group input-group-lg">
          <span className="input-group-addon">
            <input onChange={this.handleToggle} checked={this.props.todo.completed} type="checkbox" />
          </span>
          <input onChange={this.handleVal} type="text" value={this.props.todo.val} className={inputClassName} />
          <span className="input-group-btn">
            <button onClick={this.handleDelete} className="btn btn-danger" type="button">
              <i className="glyphicon glyphicon-remove"></i>
            </button>
          </span>
        </div>
      );
    }
  });

  var ClearCompleted = app.components.ClearCompleted = React.createClass({
    render: function() {
      return (
        <h1>Clear Completed</h1>
      );
    }
  });

})();