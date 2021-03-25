    /*global chrome*/
import ItemBox from './Components/ItemBox'
import React, { useState, useContext } from 'react'

export default function MainPage () {
    const [currentURL, setCurrentURL] = useState('')
    const [isChangingProject, setIsChangingProject] = useState(false)
    const [currentTrack, setCurrentTrack] = useState(undefined)
    const [isTracking, setTrackingState] = useState(undefined)
    const [projects, setProjects] = useState(undefined)

    console.log("REFRESHED")

    chrome.storage.local.get(['isTracking'], function(result) {
        // console.log(`IS TRACKING: ${result.isTracking}`)
        if(isTracking === undefined && result && result.isTracking !== undefined) {
            console.log("setting tracking to ", result.isTracking)
            setTrackingState(result.isTracking)
        }
    })

    chrome.storage.local.get(['currentTrack'], function(result) {
        // console.log(`TRACKING STATE: ${result.currentTrack}`)
        if(currentTrack === undefined && result.currentTrack) {
            setCurrentTrack(result.currentTrack)
        }
    })

    var title
    var divider1
    var divider2
    var currentElement
    var bottomContent

    if(isChangingProject) {
        title = "Projects"
        divider1 = "Current Project"
        divider2 = "Other Projects"

        if(projects) {
            bottomContent = projects.map(project => <div id={project.name} onClick={() => projectClicked(project.name)}><ItemBox title={project.name}/></div>)
        }

        if(currentTrack) {
            currentElement = <ItemBox title={currentTrack} onCommentSubmit={isChangingProject ? undefined : handleChange} isCurrent/>
        } else {
            currentElement = <div>Select a current project</div>
        }

    } else {
        title = "Code Crumbs"
        divider1 = "Current Search"
        divider2 = "Latest Searches"

        currentElement = <ItemBox title={currentURL} onCommentSubmit={isChangingProject ? undefined : handleChange} isCurrent/>

    }

    chrome.tabs.getSelected(null, (tab) => {
      setCurrentURL(tab.url)
    })

    function changeProjectClicked() {
        fetch("https://codecrumbs.uc.r.appspot.com/all-projects/"+"tmFhMEwwCIf6E9lcwqnghBUN79g1")
        .then( res => res.json())
        .then( data => {
            setProjects(data) 
        })
        setIsChangingProject(isChangingProject ? false : true)
    }

    function projectClicked(name) {
        console.log("project clicked: " + name)
        setChromeCurrentTrack(name)
        setCurrentTrack(name)
    }

    function trackingButtonClicked() {
        console.log(`Tracking state ${isTracking} -> ${!isTracking}`)
        setChromeTrackingState(!isTracking)
        setTrackingState(!isTracking)
    }

    return (
        <div>
            <h1>{title}</h1>
            <div>
                <p>{divider1}</p>
                {currentElement}
            </div>
            <div>
                <p>{divider2}</p>
                {/* <ItemBox title="Stack Overflowwww ddsfsdfdsfsd" comment="https://stackoverflow.com.questions..." onButton1Press={alert} onButton2Press={alert}/>
                <ItemBox title="Stack Overflowwww" /> */}
                {bottomContent}
            </div>
            <button onClick={() => trackingButtonClicked()}>{isTracking ? "STOP TRACKING" : "START TRACKING"}</button>
            <button onClick={() => changeProjectClicked()}>click here</button>
        </div>
    )
}

function handleChange(text) {
    chrome.runtime.sendMessage({name: "commentRecorded", comment: text}, (response) => {
    })
}

function setChromeTrackingState(trackingState) {
    chrome.storage.local.set({'isTracking': trackingState}, function() {
        // console.log('Tracking State is set to ' + trackingState);
    });
}

function setChromeCurrentTrack(track) {
    chrome.storage.local.set({'currentTrack': track}, function() {
        // console.log('Current track set to: ' + track);
    });
}