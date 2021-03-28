import React, { useState } from "react";

import './App.css';

import Header from './components/Header.js'
import logo from './assets/logo.png'
import TimelineElement from './components/TimelineElement.js'
import Timeline from './components/Timeline.js'
import TimelineCommit from './components/TimelineCommit.js'

function MainPage() {
  
  const [firstActive, setFirstActive] = useState(true);

  const handleSelected = () => {
      setFirstActive(!firstActive);
  }

  var renderElements1 = [];
  var renderElements2 = [];

  const userIdValue = sessionStorage.getItem("userId");
  // chrome.storage.local.get(['userId'], function(result) {
  //   userIdValue = result.userId;
  // });
  const userProjectValue = sessionStorage.getItem("currentTrack");
  // chrome.storage.local.get(['currentTrack'], function(result) {
  //   userProjectValue = result.currentTrack;
  // });

  const dataForSearches = {
    "associatedSearchId":"",
    "limit":String(Number.MAX_SAFE_INTEGER),
    "projectUser": {
      "projectName":String(userProjectValue),
      "userId":String(userIdValue),
    }
  };
  
  const dataForCommits = {
    "owner":"",
    "repo":String(userProjectValue),
    "since":"2001-03-28T02:43:42+0000",
    "userId":String(userIdValue),
  };

  var searchDataVal;

  const searchesFunc = () => {
    fetch("http://codecrumbs.uc.r.appspot.com/most-recent-limited-searches", {
      method: 'POST',
      body: JSON.stringify(dataForSearches),
    })
    .then(response => response.json())
    .then(dataVal => {
      searchDataVal = dataVal;
      renderElements1 = [];
      renderElements2 = [];
      if(dataVal.length == 0) {
        renderElements1.push(<TimelineElement key={0} 
          uuid={0}
          style={{top: "3%", 
                  left: "5%",
                  width: "95%"}}
          name={"There are no searches for " + String(userProjectValue)}
          url=""
          time=""
          starred={false}></TimelineElement>);
      } else {
        var initTop = 3;
        for(const [index, value] of dataVal.entries()) {
          renderElements1.push(
            <TimelineElement key={index} 
              uuid={String(value.searchId)}
              searchId={value.searchId}
              associatedUserId={value.associatedUserId}
              associatedProjectName={value.associatedProjectName}
              addComment={addComment}
              style={{top: String(initTop) + "%", 
                      left: "5%",
                      width: "95%"}}
              starClicked={starClicked}
              name={String(value.websiteName)}
              url={String(value.websiteUrl)}
              time={String(value.timeAccessed)}
              starred={Boolean(value.starred)}
              imageUrl={value.imageUrl}></TimelineElement>
          );
          initTop += 20;
        }
      }
    });
  }
  
  const commits = () => {
    fetch("http://codecrumbs.uc.r.appspot.com/Github-get-commits",  {
      method: 'POST',
      body: JSON.stringify(dataForCommits),
    })
    .then(response => response.json())
    .then(dataVal => {
      if(dataVal.Status == "Success") {
        const numElements = parseInt(dataVal.NumCommits);
        if(numElements == 0) {
          renderElements2.push(<TimelineCommit
            style={{top: "3%", 
                    left: "5%",
                    width: "95%"}}
            commitName={"There are no searches for " + String(userProjectValue)}
            date=""></TimelineCommit>);
        } else {
            var initTop = 3;
            var finalIndexChecked = 0;
            for(var i = 0; i < numElements; i++) {
              var value = dataVal[String(i)];
              for(var j = finalIndexChecked; j < searchDataVal.length; j++) {
                if(Date.parse(searchDataVal[j].timeAccessed) > Date.parse(value.date)) {
                  renderElements2.push(<div
                    style={{position: "absolute", backgroundColor:"gray", top:String(initTop) + "%", left:"5%", width:"0.5%", height:"20%"}}
                    ></div>);
                  initTop += 20;
                } else {
                  finalIndexChecked = j + 1;
                  break;
                }
              }
              renderElements2.push(<TimelineCommit
                style={{top: String(initTop) + "%", 
                        left: "15%",
                        width: "80%"}}
                top={String(initTop + 8) + "%"}
                commitName={String(value.name)}
                date={value.date}></TimelineCommit>);
              initTop += 20;
            }
        }
      }
    });
  }

  const handleScroll = (e) => {
      const changedTimeline = e.target.id;
      document.getElementById((changedTimeline == "searchTimeline") ? "commitTimeline" : "searchTimeline").scrollTop = 
        document.getElementById(changedTimeline).scrollTop;
  }

  const starClicked = (searchId, associatedProjectName, associatedUserId, starred) => {
    const dataForStar = {
      "associatedProjectName": String(associatedProjectName),
      "associatedUserId": String(associatedUserId),
      "imageUrl": "",
      "searchId": String(searchId),
      "starred": Boolean(starred),
      "timeAccessed": "",
      "timeAccessedFormat": "",
      "websiteName": "",
      "websiteUrl": ""
    }
    fetch("http://codecrumbs.uc.r.appspot.com/star-search", {
      method: 'POST',
      body: JSON.stringify(dataForStar),
    })
    .then(response => response.json())
    .then(dataVal => {
      renderElements1 = [];
      searchesFunc();
      commits();
    });
  }

  const deleteClicked = (searchId, associatedProjectName, associatedUserId) => {
    const dataForDelete = {
      "associatedProjectName": String(associatedProjectName),
      "associatedUserId": String(associatedUserId),
      "imageUrl": "",
      "searchId": String(searchId),
      "starred": "",
      "timeAccessed": "",
      "timeAccessedFormat": "",
      "websiteName": "",
      "websiteUrl": ""
    }
    fetch("http://codecrumbs.uc.r.appspot.com/delete-search", {
      method: 'DELETE',
      body: JSON.stringify(dataForDelete),
    })
    .then(response => response.json())
    .then(dataVal => {
      renderElements1 = [];  
      searchesFunc();
      commits();
    });
  }

  const addComment = (searchId, projectName, userId, commentContent) => {
    const dataForAddComment = {
      "associatedSearchId": String(searchId),
      "commentId": "",
      "content": String(commentContent),
      "projectUser": {
        "projectName": String(projectName),
        "userId": String(userId)
      },
      "timeStamp": "",
      "timeStampFormat": ""
    }
    fetch("http://codecrumbs.uc.r.appspot.com/new-comment",  {
      method: 'POST',
      body: JSON.stringify(dataForAddComment),
    })
    .then(response => response.json())
    .then(dataVal => {
      renderElements1 = [];  
      searchesFunc();
      commits();
    });
  }

  searchesFunc();
  commits();

  return (
    <div className="AbsPos1 TopLeft1 FullWidthHeight1 App1">
      <Header imagePath={logo} onClick={handleSelected} activeButton={firstActive} />
      <Timeline iden="searchTimeline" activeButton={firstActive} style={{left: '15%'}} renderElements={renderElements1} 
          handleScroll={handleScroll} />
      <Timeline iden="commitTimeline" activeButton={firstActive} style={{left: '50%'}} renderElements={renderElements2}
          handleScroll={handleScroll} />
    </div>
  );
}

export default MainPage;
