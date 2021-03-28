/*global chrome*/
import ItemBox from './Components/ItemBox'
import TrackerButton from './Components/TrackerButton'
import React, { useState } from 'react'

export default function MainPage () {
    const [currentURL, setCurrentURL] = useState('')
    const [currentSRC, setCurrentSRC] = useState('')
    const [isChangingProject, setIsChangingProject] = useState(false)
    const [currentTrack, setCurrentTrack] = useState(undefined)
    const [isTracking, setTrackingState] = useState(undefined)
    const [projects, setProjects] = useState(undefined)
    const [searches, setSearches] = useState(undefined)
    const [newProjectName, setNewProjectName] = useState('')
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
    var bottomBottomContent

    if(isChangingProject) {
        title = "Projects"
        divider1 = "Current Project"
        divider2 = "Other Projects"

        if(currentTrack) {
            currentElement = <ItemBox title={currentTrack} isCurrent/>
        } else {
            currentElement = <div style={{width: '352px'}}>Select a current project</div>
        }

        if(projects) {
            console.log(projects)
            bottomContent = projects.map(project => <div id={project.name} onClick={() => projectClicked(project.name)}><ItemBox title={project.name}/></div>)
        } else {
            bottomContent = <div style={{width: '352px'}} >No projects yet...</div>
        }

        bottomBottomContent = 
        <div>
            <p className="overline">Create New Project</p>
            <div style={{display: 'flex', flexDirection: 'row', width: '352px', alignItems: 'center', justifyContent: 'center'}}>
                <form>
                    <label>
                        <input type='text' value={newProjectName} onChange={ (e) => setNewProjectName(e.target.value)} placeholder="placeholder"/>
                    </label>
                </form>
                <button onClick={() => createProject() }>Create Project</button>
            </div>
        </div>

    } else {
        title = "Code Crumbs"
        divider1 = "Current Search"
        divider2 = "Latest Searches"

        if(isTracking) {
            if (currentURL.includes("http")) {
                currentElement = <ItemBox title={currentURL} onCommentSubmit={isChangingProject ? undefined : handleChange} imageUrl={currentSRC} isCurrent/>                
            } else {
                currentElement = <div style={{width: '352px'}}>Untrackable page. Visit a valid site to track!</div>
            }
        } else {
            currentElement = <div style={{width: '352px'}}>Not tracking current site</div>
        }

        console.log(searches)
        if(searches) {
            bottomContent = searches.map(search => <div id={search.websiteUrl}><ItemBox fullUrl={search.websiteUrl} title={search.websiteUrl ? search.websiteUrl.substring(0, 45).concat('...') : ''} imageUrl={search.imageUrl}/></div>)
        } else {
            bottomContent = <div style={{width: '352px'}}>No content yet...</div>
            bottomContent = <div style={{width: '352px'}}>{currentTrack ? "Fetching recent tracks" : "Select project to see tracking history"}</div>
        }
    }

    // Getting the current tab for display
    chrome.tabs.getSelected(null, (tab) => {
        setCurrentURL(tab.url)
        setCurrentSRC(tab.favIconUrl)
    })

    // Clicked Functions
    function changeProjectClicked() {
        fetchProjects()
        setIsChangingProject(isChangingProject ? false : true)
    }

    function fetchProjects() {
        fetch("https://codecrumbs.uc.r.appspot.com/all-projects/"+userId)
        .then( res => res.json())
        .then( data => {
            setProjects(data) 
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation...', error)
        })
    }

    function projectClicked(name) {
        console.log("project clicked: " + name)
        setChromeCurrentTrack(name)
        setCurrentTrack(name)
        setSearches(undefined)
        chrome.runtime.sendMessage({name: "currentProject", project: name}, (response) => {
            console.log(response.message)
        })
    }

    function trackingButtonClicked() {
        console.log(`Tracking state ${isTracking} -> ${!isTracking}`)
        setChromeTrackingState(!isTracking)
        setTrackingState(!isTracking)
    }

    // Fetching the searches from API
    function fetchSearches() {
        const body = {
            limit: 4,
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
        .catch(error => {
            console.error('There has been a problem with your fetch operation...', error)
        })
    }

    function createProject() {
        const body = {
            associatedUserId: userId,
            name: newProjectName
          }
          
        fetch("https://codecrumbs.uc.r.appspot.com/new-project", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        .then( res => res.json())
        .then( data => fetchProjects())
        .catch(error => {
            console.error('There has been a problem with your fetch operation...', error)
        })
    }

    return (
        <div>
            <h1>{title}</h1>
            <div>
                <p className="overline">{divider1}</p>
                {currentElement}
            </div>
            <div>
                <p className="overline">{divider2}</p>
                {bottomContent}
            </div>
            {bottomBottomContent}
            <TrackerButton isTracking={true} text={isTracking ? "STOP TRACKING" : "START TRACKING"} isUp={isChangingProject} leftClicked={() => trackingButtonClicked()} rightClicked={() => changeProjectClicked()}/>
        </div>
    )
}

function handleChange(text) {
    chrome.runtime.sendMessage({name: "commentRecorded", comment: text}, (response) => {
    })
}

function trackChange(value) {
    chrome.runtime.sendMessage({name: "trackChanged", state: value}, (response) => {
    })
}

function setChromeTrackingState(trackingState) {
    chrome.storage.local.set({'isTracking': trackingState}, function() {
    });
    trackChange(trackingState);
}

function setChromeCurrentTrack(track) {
    chrome.storage.local.set({'currentTrack': track}, function() {
    });
}