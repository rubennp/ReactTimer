var React = require('react');
var Clock = require('Clock');
var CountdownForm = require('CountdownForm');
var Controls = require('Controls');

var Countdown = React.createClass({
  getInitialState: function () {
    return {
      count: 0,
      controlsStatus: 'stopped'
    };
  },
  //* componentDidUpdate:
  // Invoked immediately after the component's updates are flushed to the DOM. This method is not called for the initial render.
  // Use this as an opportunity to operate on the DOM when the component has been updated.
  componentDidUpdate: function (prevProps, prevState) {
    if (this.state.controlsStatus !== prevState.controlsStatus) {
      switch (this.state.controlsStatus) {
        case 'started':
          this.startTimer();
          break;
        case 'stopped':
          this.setState({count: 0});
        case 'paused':
          clearInterval(this.timer);
          this.timer = undefined;
          break;
      }
    }
  },
  componentWillUnmount: function() {
    clearInterval(this.timer);
    this.timer = undefined;
  },
  startTimer: function () {
    this.timer = setInterval (() => {
      var newCount = this.state.count -1;
      this.setState({
        count: newCount >= 0 ? newCount : 0
      });

      if (newCount === 0) {
        this.setState({controlsStatus: 'stopped'});
      }
    }, 1000);
  },
  handleSetCountdown: function (seconds) {
    this.setState({
      count: seconds,
      controlsStatus: 'started'
    });
  },
  handleStatusChange: function (newStatus) {
    this.setState({controlsStatus: newStatus});
  },
  render: function () {
    var {count, controlsStatus} = this.state;
    var renderControlArea = () => {
      if (controlsStatus !== 'stopped') {
        return <Controls controlsStatus={controlsStatus} onStatusChange={this.handleStatusChange} />
      } else {
        return <CountdownForm onSetCountdown={this.handleSetCountdown} />
      }
    }
    return (
      <div>
        <h1 className="page-title">Countdown App</h1>
        <Clock totalSeconds={count} />
        {renderControlArea()}
      </div>
    );
  }
});

module.exports = Countdown;
