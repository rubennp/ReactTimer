var React = require('react');
var ReactDOM = require('react-dom');
var expect = require('expect');
var $ = require('jQuery');
var TestUtils = require('react-addons-test-utils');

const SECOND = 1000;

var Timer = require('Timer');

describe('Timer', () => {
  it('should exist', () => {
    expect(Timer).toExist();
  });

  it('should start timer on started status', () => {
    var timer = TestUtils.renderIntoDocument(<Timer />);
    timer.handleStatusChange('started');

    setTimeout(() => {
      expect(timer.state.count).toBe(1);
      done();
    }, SECOND);
  });

  it('should pause timer on paused status', () => {
    var timer = TestUtils.renderIntoDocument(<Timer />);
    timer.handleStatusChange('started');

    setTimeout(() => {
      expect(timer.state.count).toBe(1);
      timer.handleStatusChange('paused');
    }, SECOND);

    setTimeout(() => {
      expect(timer.state.count).toBe(1);
    }, 3*SECOND);
  });

  it('should clear on stopped status', () => {
    var timer = TestUtils.renderIntoDocument(<Timer />);
    timer.handleStatusChange('started');

    setTimeout(() => {
      expect(timer.state.count).toBe(1);
      timer.handleStatusChange('stopped');
    }, SECOND);

    setTimeout(() => {
      expect(timer.state.count).toBe(0);
    }, 3*SECOND);
  });
});
