import React, { Component } from 'react';

// Styles
import s from './App.module.css'

// Modules
import SubscriptionForm from './components/SubscriptionForm';

// Component
class App extends Component {
  render() {
    return (
      <div className="container">
        <header className={s.header}>
          <img src={`${process.env.PUBLIC_URL}/logo.png`} alt=""/>
        </header>
        
        <SubscriptionForm />

        <div className={s.footer}></div>
      </div>
    );
  }
}

export default App;
