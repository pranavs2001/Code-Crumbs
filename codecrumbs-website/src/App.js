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
    document.getElementById((changedTimeline == "searchTimeline") ? "commitTimeline" : "searchTimeline").scrollTop = document.getElementById(changedTimeline).scrollTop;
  }

  const searches = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  
  const renderElements1 = [];
  const renderElements2 = [];

  // fetch("http://codecrumbs.uc.r.appspot.com/most-recent-limited-searches", {
  //   method: 'POST',
  //   body: JSON.stringify(data),
  // })
  // .then(response => response.json())
  // .then(dataVal => {

  // });

  // fetch()
  // .then(response => response.json())
  // .then(data => {
    
  // });

  var initTop = 3;
  for(const [index, value] of searches.entries()) {
      renderElements1.push(<TimelineElement key={index} 
          uuid={index}
          style={{top: String(initTop) + "%", 
                  left: "5%",
                  width: "95%"}}
          name="helloqweqd wefbkj wehfbjhbwej fjhwbef"
          url="www.gerjg.com/wefjbw efhbwjhe fjhbwejhf jhwefjhwekjfnk wekjf "
          time="2021-03-26T23:33:05Z"
          starred={false}></TimelineElement>);
      initTop += 20;
  }

  return (
    <div className="AbsPos TopLeft FullWidthHeight App">
      <Header imagePath={logo} onClick={handleSelected} activeButton={firstActive} />
      <Timeline iden="searchTimeline" activeButton={firstActive} style={{left: '15%'}} renderElements={renderElements1} handleScroll={handleScroll} />
      <Timeline iden="commitTimeline" activeButton={firstActive} style={{left: '50%'}} handleScroll={handleScroll} />
    </div>
  );
}

export default App;
