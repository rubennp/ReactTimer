var React = require('react');
var ReactDOM = require('react-dom');
var {Route, Router, IndexRoute, hashHistory} = require('react-router');  // ES6 sintax equal to var Route = require('react-router').Route; etc...

var Main = require('Main');
var Timer = require('Timer');
var Countdown = require('Countdown');

// Load foundation
require('style!css!foundation-sites/dist/foundation.min.css')
jQuery(document).ready(function($) {
$(document).foundation();
}); // $(document).foundation();

// App css
require('style!css!sass!applicationStyles');

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={Main}>
      <Route path="countdown" component={Countdown} />
      <IndexRoute component={Timer} />
    </Route>
  </Router>,
  document.getElementById('app')
);
