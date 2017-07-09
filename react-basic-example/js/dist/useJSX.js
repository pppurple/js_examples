var MyComponent = React.createClass({
  getInitialState: function () {
    return { count: 0 };
  },
  render: function () {
    return React.createElement(
      'div',
      null,
      React.createElement('input', { type: 'text', onChange: this.doChange }),
      React.createElement(
        'span',
        null,
        this.state.count
      )
    );
  },
  doChange: function (e) {
    this.setState({ count: e.target.value.length });
  }
});
ReactDOM.render(React.createElement(MyComponent), document.getElementById('main'));
