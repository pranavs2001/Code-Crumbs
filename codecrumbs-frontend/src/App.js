    /*global chrome*/
import logo from './logo.svg';
import ItemBox from './ItemBox'
import React, { useState } from 'react'
import './App.css';

function App() {
  const [currentURL, setCurrentURL] = useState(0)

  chrome.tabs.getSelected(null, (tab) => {
    setCurrentURL(tab.url)
  })

  return (
    <div className="App">
      <h1>Code Crumbs</h1>
      <div>
        <p>Current Search</p>
        <ItemBox title={currentURL} onCommentSubmit={handleChange} isCurrent/>
      </div>
      <div>
        <p>Latest Searches</p>
        <ItemBox title="Stack Overflowwww ddsfsdfdsfsd" comment="https://stackoverflow.com.questions..." onButton1Press={alert} onButton2Press={alert}/>
        <ItemBox title="Stack Overflowwww" />
      </div>
    </div>
  );
}

function handleChange(text) {
  chrome.runtime.sendMessage({name: "commentRecorded", comment: text}, (response) => {
  })
}

export default App;
