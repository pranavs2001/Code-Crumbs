/* global chrome */
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
  
  var renderElements1 = [];
  var renderElements2 = [];

  const userIdValue = "";
  // chrome.storage.local.get(['userId'], function(result) {
  //   userIdValue = result.userId;
  // });
  const userProjectValue = "";
  // chrome.storage.local.get(['currentTrack'], function(result) {
  //   userProjectValue = result.currentTrack;
  // });

  const dataForSearches = {
    "associatedSearchId":"",
    "limit":"10",
    "projectUser": {
      "projectName":String(userProjectValue),
      "userId":String(userIdValue),
    }
  };
  
  // fetch("http://codecrumbs.uc.r.appspot.com/most-recent-limited-searches", {
  //   method: 'POST',
  //   body: JSON.stringify(dataForSearches),
  // })
  // .then(response => response.json())
  // .then(dataVal => {
  //   renderElements1 = [];
  //   renderElements2 = [];
  //   if(dataVal.length == 0) {
  //     renderElements1.push(<TimelineElement key={0} 
  //       uuid={0}
  //       style={{top: "3%", 
  //               left: "5%",
  //               width: "95%"}}
  //       name={"There are no searches for " + String(userProjectValue)}
  //       url=""
  //       time=""
  //       starred={false}></TimelineElement>);
  //   } else {
  //     var initTop = 3;
  //     for(const [index, value] of dataVal.entries()) {
  //       renderElements1.push(
  //         <TimelineElement key={index} 
  //           uuid={String(value.searchId)}
  //           style={{top: String(initTop) + "%", 
  //                   left: "5%",
  //                   width: "95%"}}
  //           name={String(value.websiteName)}
  //           url={String(value.websiteUrl)}
  //           time={String(value.timeAccessed)}
  //           starred={Boolean(value.starred)}
  //           imageUrl={value.imageUrl}
  //           handleOpenComments={handleOpenComments}
  //           handleCloseComments={handleCloseComments}></TimelineElement>
  //       );
  //       initTop += 20;
  //     }
  //   }
  // });

  const dataVal = [
    {
      "associatedProjectName": "Project-4",
      "associatedUserId": "weoufbjwbefkjlb",
      "imageUrl": "",
      "searchId": "efjnwejfbkjwebf",
      "starred": false,
      "timeAccessed": "1:00",
      "timeAccessedFormat": "ISO-8601",
      "websiteName": "Hello There",
      "websiteUrl": "hello.com"
    },
    {
      "associatedProjectName": "Project-5",
      "associatedUserId": "weoufbjwbefkjlb",
      "imageUrl": "",
      "searchId": "efjnwejfbkjwebf",
      "starred": false,
      "timeAccessed": "1:00",
      "timeAccessedFormat": "ISO-8601",
      "websiteName": "Hello",
      "websiteUrl": "hello.com"
    }
  ];

  var initTop = 3;
  for(const [index, value] of dataVal.entries()) {
    renderElements1.push(
      <TimelineElement key={index} 
        uuid={String(value.searchId)}
        style={{top: String(initTop) + "%", 
                left: "5%",
                width: "95%"}}
        name={String(value.websiteName)}
        url={String(value.websiteUrl)}
        time={String(value.timeAccessed)}
        starred={Boolean(value.starred)}
        imageUrl={value.imageUrl}
        handleOpenComments={handleOpenComments}
        handleCloseComments={handleCloseComments}></TimelineElement>
    );
    initTop += 20;
  }
  
  fetch("http://codecrumbs.uc.r.appspot.com/Github-get-commits")
  .then(response => response.json())
  .then(dataVal => {
    if(dataVal.Status == "Success") {
      const numElements = parseInt(dataVal.NumCommits);
      if(numElements == 0) {
        
      } else {

      }
    }
  });


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
