var lastURL
var currentComment
var isTracking = false

var baseURL = "codecrumbs.uc.r.appspot.com"

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    let currentURL = changeInfo.url
    if (isTracking && currentURL && currentURL.includes("http") && lastURL != currentURL) {
        // When we move to the next URL we want to send the last URL to the API

    }
})

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if(request.name == "commentRecorded") {
        // We save the comment to be sent off when the url is changed
        currentComment = request.comment
    }
})

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if(request.name == "trackingStatusChanged") {
        isTracking = request.status
        alert(`Tracking status changed ${request.status}`)
    }
})



// TESTING
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if(request.name == "createProject") {
        isTracking = request.status
        alert(`Tracking status changed ${request.status}`)
    }
})



// API CALLS - going to seperate in due time

function logSearch(projectName, userId, websiteName, websiteUrl) {
    let body = {
        associatedProjectName: projectName,
        associatedUserId: userId,
        websiteName: websiteName,
        websiteUrl: websiteUrl
    }

    fetch(`${baseURL}/new-search`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    })
    .then(response => console.log(response))
}

function createProject(userID, name) {
    let body = {
        active: true,
        associatedUserId: userID,
        name: name,
        numberOfSearches: 0
      }

    fetch(`${baseURL}/new-search`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    })
    .then(response => console.log(response))
}

function getSearches() {
    let body = {
        active: true,
        associatedUserId: userID,
        name: name,
        numberOfSearches: 0
      }

    fetch(`${baseURL}/new-search`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    })
    .then(response => console.log(response))
}

function getProjects() {

}