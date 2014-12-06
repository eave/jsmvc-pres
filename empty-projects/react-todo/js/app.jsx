/** @jsx React.DOM */

var app = app || {};

(function() {
  'use strict';

  app.init = function() {
    // first, we're using the line below to take the TodoApp function from components and bring it into this scope so that it can be available for renderComponent
    var TodoApp = app.components.TodoApp;
    // Next, we're rendering that component in the dom
    // First, we're calling React.renderComponent, which takes two arguments: the thing you want rendered, and where in index.html it should be rendered
    // We're using jsx syntax to insert the TodoApp function in a dom-element-like wrapper,
    // and then we're using getElementById to identify and append it to the section with id 'app' in index.html
    React.renderComponent (
      <TodoApp />,
      document.getElementById('app')
    );
  };

  app.init();
})();