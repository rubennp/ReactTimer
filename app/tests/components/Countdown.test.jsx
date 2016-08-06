var React = require('react');
var ReactDOM = require('react-dom');
var expect = require('expect');
var $ = require('jQuery');
var TestUtils = require('react-addons-test-utils');

var Countdown = require('Countdown');


const SECOND = 1000;      // 1 ms

describe('Countdown', () => {
  it('should exist', () => {
    expect(Countdown).toExist();
  });

  describe('handleSetCountdown', () => {
    it('should set state to started and countdown', (done) => {
      var countdown = TestUtils.renderIntoDocument(<Countdown />);
      countdown.handleSetCountdown(10);

      expect(countdown.state.count).toBe(10);
      expect(countdown.state.controlsStatus).toBe('started');

      setTimeout(() => { // passat un segon ha contat enrere ...
        expect(countdown.state.count).toBe(9);
        done();
      }, SECOND+1);
    });

    it('should never set count less than zero', (done) => {
      var countdown = TestUtils.renderIntoDocument(<Countdown />);
      countdown.handleSetCountdown(1);

      setTimeout(() => { // passats 3 segons ha de continuar a 0
        expect(countdown.state.count).toBe(0);
        done();
      }, (3*SECOND)+1);
    });

    it('should pause countdown on paused status', (done) => {
      var countdown = TestUtils.renderIntoDocument(<Countdown />);
      countdown.handleSetCountdown(3);
      countdown.handleStatusChange('paused');

      setTimeout(() => {
        expect(countdown.state.count).toBe(3);
        expect(countdown.state.controlsStatus).toBe('paused');
        done();
      }, SECOND+1);
    });

    it('should reset count on stopped', (done) => {
      var countdown = TestUtils.renderIntoDocument(<Countdown />);
      countdown.handleSetCountdown(3);
      countdown.handleStatusChange('stopped');

      setTimeout(() => {
        expect(countdown.state.count).toBe(0);
        expect(countdown.state.controlsStatus).toBe('stopped');
        done();
      }, SECOND+1);
    });
  });
});
