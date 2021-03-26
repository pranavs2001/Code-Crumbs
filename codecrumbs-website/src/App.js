import React, { useState } from "react";

import './App.css';

import Header from './components/Header.js'
import logo from './assets/logo.jpg'
import Timeline from './components/Timeline.js'

function App() {
  const [firstActive, setFirstActive] = useState("true");

    const handleSelected = () => {
        setFirstActive(!firstActive);
    }

  return (
    <div className="AbsPos TopLeft FullWidthHeight App">
      <Header imagePath={logo} onClick={handleSelected} activeButton={firstActive} />
      <Timeline activeButton={firstActive} style={{left: '15%'}} />
      <Timeline activeButton={firstActive} style={{left: '50%'}} />
    </div>
  );
}

export default App;
