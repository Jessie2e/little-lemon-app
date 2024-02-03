// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './App.css';
import Nav from './Nav';
import Homepage from './Homepage';
import Footer from './Footer';
import Menu from './Menu';
import Order from './Order';
import Login from './Login';
import Reservation from './Reservation';
import About from './About';
import Availability from './Availability';
import Checkout from './Checkout';

function App() {
  return (
    <Router>
      <Nav />
      <Switch>
        <Route path="/" exact component={Homepage} />
        <Route path="/about" component={About} />
        <Route path="/menu" component={Menu} />
        <Route path="/reservation" component={Reservation} />
        <Route path="/order" component={Order} />
        <Route path="/login" component={Login} />
        <Route path="/availability" component={Availability} />
        <Route path="/checkout" component={Checkout} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
