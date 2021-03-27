import React, { useState } from "react";

import './App.css';

import Header from './components/Header.js'
import logo from './assets/logo.jpg'
import TimelineElement from './components/TimelineElement.js'
import Timeline from './components/Timeline.js'

function App() {
  const [firstActive, setFirstActive] = useState("true");

  const handleSelected = () => {
      setFirstActive(!firstActive);
  }

  const handleScroll = (e) => {
      const changedTimeline = e.target.id;
      document.getElementById((changedTimeline == "searchTimeline") ? "commitTimeline" : "searchTimeline").scrollTop = 
        document.getElementById(changedTimeline).scrollTop;
  }

  const handleOpenComments = (e) => {
      var searchTimeline = document.getElementById("searchTimeline");
      
      
      for(var i = parseInt(e.id.substring(e.id.length - 1)) + 1; i < searchTimeline.childNodes.length; i++) {
        searchTimeline.childNodes[i].style.top = 
          String(parseInt(searchTimeline.childNodes[i].style.top.substring(0, searchTimeline.childNodes[i].style.top.length - 1)) + 40) + "%";
      }
      
  }

  const handleCloseComments = (e) => {
    var searchTimeline = document.getElementById("searchTimeline");
    for(var i = parseInt(e.id.substring(e.id.length - 1)) + 1; i < searchTimeline.childNodes.length; i++) {
      searchTimeline.childNodes[i].style.top = 
        String(parseInt(searchTimeline.childNodes[i].style.top.substring(0, searchTimeline.childNodes[i].style.top.length - 1)) - 40) + "%";
    }
  }

  const searches = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  
  const renderElements1 = [];
  const renderElements2 = [];

  const data = {
    
  };
  
  fetch("http://codecrumbs.uc.r.appspot.com/most-recent-limited-searches", {
    method: 'POST',
    body: JSON.stringify(data),
  })
  .then(response => response.json())
  .then(dataVal => {

  });

  fetch()
  .then(response => response.json())
  .then(data => {
    
  });


  //temp for generating random names
  function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }

  var initTop = 3;
  for(const [index, value] of searches.entries()) {
      renderElements1.push(<TimelineElement key={index} 
          uuid={index}
          style={{top: String(initTop) + "%", 
                  left: "5%",
                  width: "95%"}}
          name={makeid(10)}
          url={makeid(20)}
          time="2021-03-26T23:33:05Z"
          starred={false}
          handleOpenComments={handleOpenComments}
          handleCloseComments={handleCloseComments}></TimelineElement>);
      initTop += 20;
  }

  return (
    <div className="AbsPos TopLeft FullWidthHeight App">
      <Header imagePath={logo} onClick={handleSelected} activeButton={firstActive} />
      <Timeline iden="searchTimeline" activeButton={firstActive} style={{left: '15%'}} renderElements={renderElements1} 
          handleScroll={handleScroll} />
      <Timeline iden="commitTimeline" activeButton={firstActive} style={{left: '50%'}} 
          handleScroll={handleScroll} />
    </div>
  );
}

export default App;
