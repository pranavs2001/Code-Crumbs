    /*global chrome*/
import logo from './logo.svg';
import MainPage from './MainPage'
import React, { useState } from 'react'
import './App.css';
import Auth from './authentication/auth';
import UserProvider from './authentication/providers/UserProvider';

var newUser = false;

function App() {
  return (
    <div className="App">
      <UserProvider>
        <Auth />
      </UserProvider>
    </div>
  );
}

export default App;
