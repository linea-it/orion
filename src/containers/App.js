import React, { Component } from 'react';

import Header from '../components/Header';
import Footer from '../components/Footer';
import Dashboard from '../views/Dashboard';

export default class App extends Component {
  render() {
    return (
      <div className="app">
        <Header />
        <main role="main" className="container-fluid">
          <Dashboard />
        </main>
        <Footer />
      </div>
    );
  }
}
