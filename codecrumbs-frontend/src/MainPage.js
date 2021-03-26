/*global chrome*/
import ItemBox from './Components/ItemBox'
import React, { useState } from 'react'

export default function MainPage () {
    const [currentURL, setCurrentURL] = useState('')
    const [isChangingProject, setIsChangingProject] = useState(false)
    const [currentTrack, setCurrentTrack] = useState(undefined)
    const [isTracking, setTrackingState] = useState(undefined)
    const [projects, setProjects] = useState(undefined)
    const [searches, setSearches] = useState(undefined)
    var userId

    // Getting information stored locally in chrome
    chrome.storage.local.get(['isTracking'], function(result) {
        if(isTracking === undefined && result && result.isTracking !== undefined) {
            setTrackingState(result.isTracking)
        }
    })

    chrome.storage.local.get(['currentTrack'], function(result) {
        if(currentTrack === undefined && result && result.currentTrack) {
            setCurrentTrack(result.currentTrack)
        }
    })

    chrome.storage.local.get(['userId'], function(result) {
        console.log(`UserID: ${result.userId}`)
        if(result && result.userId) {
            userId = result.userId
        }
    })

    // TEMP solution to weird loading times
    if (!searches) {
        setTimeout(fetchSearches, 500)
    }
    
    // POPULATING THE ELEMENTS
    var title
    var divider1
    var divider2
    var currentElement
    var bottomContent

    if(isChangingProject) {
        title = "Projects"
        divider1 = "Current Project"
        divider2 = "Other Projects"

        if(currentTrack) {
            currentElement = <ItemBox title={currentTrack} isCurrent/>
        } else {
            currentElement = <div>Select a current project</div>
        }

        if(projects) {
            bottomContent = projects.map(project => <div id={project.name} onClick={() => projectClicked(project.name)}><ItemBox title={project.name}/></div>)
        } else {
            bottomContent = <div>No projects yet...</div>
        }

    } else {
        title = "Code Crumbs"
        divider1 = "Current Search"
        divider2 = "Latest Searches"

        if(isTracking) {
            currentElement = <ItemBox title={currentURL} onCommentSubmit={isChangingProject ? undefined : handleChange} isCurrent/>
        } else {
            currentElement = <div style={{width: '352px'}}>Not tracking current site</div>
        }

        console.log(searches)
        if(searches) {
            bottomContent = searches.map(search => <div id={search.websiteUrl}><ItemBox title={search.websiteUrl}/></div>)
        } else {
            bottomContent = <div style={{width: '352px'}}>No content yet...</div>
            bottomContent = <div style={{width: '352px'}}>{currentTrack ? "Fetching recent tracks" : "Select project to see tracking history"}</div>
        }
    }

    // Getting the current tab for display
    chrome.tabs.getSelected(null, (tab) => {
        setCurrentURL(tab.url)
    })

    // Clicked Functions
    function changeProjectClicked() {
        fetch("https://codecrumbs.uc.r.appspot.com/all-projects/"+userId)
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
        setSearches(undefined)
    }

    function trackingButtonClicked() {
        console.log(`Tracking state ${isTracking} -> ${!isTracking}`)
        setChromeTrackingState(!isTracking)
        setTrackingState(!isTracking)
    }

    // Fetching the searches from API
    function fetchSearches() {
        const body = {
            limit: 10,
            projectUser: {
                projectName: currentTrack,
                userId: userId
            }
        }
        fetch("https://codecrumbs.uc.r.appspot.com/most-recent-limited-searches", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        .then( res => res.json())
        .then( data => setSearches(data))
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
                {bottomContent}
            </div>
            <button onClick={() => trackingButtonClicked()}>{isTracking ? "STOP TRACKING" : "START TRACKING"}</button>
            <button onClick={() => changeProjectClicked()}>{currentTrack ? "Switch Project" : "Select Project"}</button>
        </div>
    )
}

function handleChange(text) {
    chrome.runtime.sendMessage({name: "commentRecorded", comment: text}, (response) => {
    })
}

function setChromeTrackingState(trackingState) {
    chrome.storage.local.set({'isTracking': trackingState}, function() {
    });
}

function setChromeCurrentTrack(track) {
    chrome.storage.local.set({'currentTrack': track}, function() {
    });
}