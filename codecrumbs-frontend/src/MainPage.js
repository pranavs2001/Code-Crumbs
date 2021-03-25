    /*global chrome*/
import ItemBox from './Components/ItemBox'
import React, { useState, useContext } from 'react'

export default function MainPage () {
    const [currentURL, setCurrentURL] = useState('')
    const [isChangingProject, setIsChangingProject] = useState(false)

    var title
    var divider1
    var divider2

    if(isChangingProject) {
        title = "Projects"
        divider1 = "Current Project"
        divider2 = "Current Project"

    } else {
        title = "Code Crumbs"
        divider1 = "Current Search"
        divider2 = "Current Search"

    }

    chrome.tabs.getSelected(null, (tab) => {
      setCurrentURL(tab.url)
    })

    return (
        <div>
            <h1>{title}</h1>
            <div>
                <p>{divider1}</p>
                <ItemBox title={currentURL} onCommentSubmit={isChangingProject ? undefined : handleChange} isCurrent/>
            </div>
            <div>
                <p>{divider2}</p>
                <ItemBox title="Stack Overflowwww ddsfsdfdsfsd" comment="https://stackoverflow.com.questions..." onButton1Press={alert} onButton2Press={alert}/>
                <ItemBox title="Stack Overflowwww" />
            </div>
            <button onClick={() => setIsChangingProject(isChangingProject ? false : true)}>click here</button>
            <button onClick={() => handleTrackingChange(true)}>click here!!!</button>
        </div>
    )
}

function handleChange(text) {
    chrome.runtime.sendMessage({name: "commentRecorded", comment: text}, (response) => {
    })
}

function handleTrackingChange(trackingState) {
    chrome.runtime.sendMessage({name: "trackingStatusChanged", status: trackingState}, (response) => {

    })
}