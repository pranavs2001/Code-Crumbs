var lastURL = "";
var currentComment
var isTracking = false
var currentTrack = undefined
var selectedTabUrl
var userId;

chrome.storage.local.get(['userId'], function (result) {
    userId = result.userId;
    // alert(`Background UserID set to ${userId}`)
});

chrome.storage.local.get(['isTracking'], function (result) {
    isTracking = result.isTracking;
    // alert(`Background UserID set to ${userId}`)
});

var baseURL = "https://codecrumbs.uc.r.appspot.com"

var latestLinks = ["", "", "", "", ""];

chrome.tabs.onActivated.addListener((previousTabId, tabId, windowId) => {
    chrome.tabs.getSelected(null, (tab) => {
        if (tab.url) {
            selectedTabUrl = tab.url
        }
        // alert(`selected ${selectedTabUrl}`)
    })
})

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {

    if (!currentTrack) {
        chrome.storage.local.get(['currentTrack'], function (result) {
            currentTrack = result.currentTrack;
        });
    }

    // isTracking && currentURL !== undefined && currentURL.includes("http") && lastURL != currentURL && changeInfo.status === 'complete'
    var currentURL = tab.url
    // if (changeInfo.status === 'complete' && lastURL != currentURL && currentURL.includes("http") && currentURL !== undefined && isTracking) {
    //     alert(`TRACKING: ${isTracking}, CURURL: ${currentURL}, lastURL: ${lastURL}, STATUS: ${changeInfo.status}`)
    // }
    if (isTracking && currentURL !== undefined && currentURL.includes("http") && lastURL != currentURL && changeInfo.status === 'complete') {
        selectedTabUrl = tab.url

        //add it to the database
        //only make API call if there is an associated Project
        //ADD IF STATEMENT CHECK WITH CURRENTTRACK
        // alert(tab.favIconUrl)
        setTimeout(logSearch(currentTrack, userId, "Website Filler value", currentURL, tab.favIconUrl), 100)

        //alert(newSearchReturn);
        //store it in locally for easy access and to keep track of currently opened tabs
        //alert("haha yes");
        lastURL = currentURL;
    }
    //alert("1) Latest links are ", latestLinks);
})

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if(request.name == "trackChanged") {
        isTracking = request.state;
    }
})

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.name == "commentRecorded") {
        // We save the comment to be sent off when the url is changed
        // alert(`Comment recorded: ${request.comment}`)
        // currentComment = request.comment

        let currentTabId
        for (let index = 0; index < latestLinks.length; index++) {
            const dict = latestLinks[index];

            // alert(`Selected URL: ${selectedTabUrl}`)
            // alert(`DICT select ${dict[selectedTabUrl]}`)
            // alert(`DICT curr ${dict[currentURL]}`)

            if(dict[selectedTabUrl]) {
                currentTabId = dict[selectedTabUrl]
                // alert('found the tabId')
            }
        }

        logComment(request.comment, currentTabId)

    } else if (request.name == "currentProject") {
        currentTrack = request.project
        sendResponse({message: `Recieved ${currentTrack}`, otherData: latestLinks})

    } else if (request.name == "userIdSet") {
        userId = request.userId
        sendResponse({message: `Recieved ${request.userId}`})
    }
})


// -------------------------------- TESTING -------------------------------------
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.name == "createProject") {
        isTracking = request.status
        // alert(`Tracking status changed ${request.status}`)
    }
})

// API CALLS - going to seperate in due time

function logSearch(projectName, userId, websiteName, websiteUrl, faviconUrl) {
    // alert(`Logging: ${projectName}, ${userId}, ${websiteName}, ${websiteUrl}`)

    let body = {
        associatedProjectName: projectName,
        associatedUserId: userId,
        websiteName: websiteName,
        websiteUrl: websiteUrl,
        imageUrl: faviconUrl
    }

    fetch(baseURL + "/new-search", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    })
        .then(response => {
            //alert("We here: " + response + ".")
            return response.json()
        })
        .then(data => {
            for (i = 4; i > 0; i--) {
                latestLinks[i] = latestLinks[i - 1];
            }
            var currentLink = {};
            currentLink[websiteUrl] = data.searchId;
            // alert(currentLink[websiteUrl])
            latestLinks[0] = currentLink;
            // alert(`haha yes ${currentLink}`);
        })
        .catch(function (err) {
            // alert(`Fetch Error: ${err}`);
        });
}

function logComment(comment, latestSearchId) {
    // alert(`Logging Comment: ${comment} for ${latestSearchId}`)
    let body = {
        "associatedSearchId": latestSearchId,
        "content": comment,
        "projectUser": {
          "projectName": currentTrack,
          "userId": userId
        }
    }

    fetch(baseURL + "/new-comment", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    })
    .then(response => response.json)
    .then(data => {
        // alert(data.commentId)
    })
    .catch( err => alert("error with comment call"))
}