/** @jsx React.DOM */

var app = app || {};
app.components = app.components || {};

(function() {
  'use strict';

  var TodoApp = app.components.TodoApp = React.createClass({
    render: function() {
      // jsx can only have one root element
      return (
        <div className="outer-container">
          <p>interesting text goes here</p>
        </div>
      );
    }
  });
})();