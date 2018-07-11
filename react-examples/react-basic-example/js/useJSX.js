var MyComponent = React.createClass({
  getInitialState: function () {
    return { count: 0 };
  },
  render: function () {
    return (
      <div>
        <input type='text' onChange={this.doChange}></input>
        <span>{this.state.count}</span>
      </div>
    );
  },
  doChange: function (e) {
    this.setState({ count: e.target.value.length });
  }
});
ReactDOM.render(
  React.createElement(MyComponent),
  document.getElementById('main')
);