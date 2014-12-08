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
      }
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

    render: function() {
      // jsx can only have one root element
      return (
        <div className="outer-container">
          <NewTodo />
          <TodoList />
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
      return (
        <h1>Todo List</h1>
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