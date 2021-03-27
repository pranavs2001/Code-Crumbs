var lastURL = "";
var currentComment
var isTracking = true
var currentTrack = undefined
var userId;

chrome.storage.local.get(['userId'], function (result) {
    userId = result.userId;
    // alert(`Background UserID set to ${userId}`)
});

var baseURL = "https://codecrumbs.uc.r.appspot.com"

latestLinks = ["", "", "", "", ""];

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {

    if (!currentTrack) {
        chrome.storage.local.get(['currentTrack'], function (result) {
            currentTrack = result.currentTrack;
        });
    }

    let currentURL = tab.url
    if (isTracking && currentURL !== undefined && currentURL.includes("http") && lastURL != currentURL && changeInfo.status === 'complete') {

        alert(`STATUS: ${tab.status} URL: ${tab.favIconUrl}`)

        //add it to the database
        //only make API call if there is an associated Project
        //ADD IF STATEMENT CHECK WITH CURRENTTRACK
        logSearch(currentTrack, userId, "Website Filler value", currentURL, tab.favIconUrl);

        //alert(newSearchReturn);
        //store it in locally for easy access and to keep track of currently opened tabs
        //alert("haha yes");
        lastURL = currentURL;
    }
    //alert("1) Latest links are ", latestLinks);
})

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.name == "commentRecorded") {
        // We save the comment to be sent off when the url is changed
        currentComment = request.comment

    } else if (request.name == "currentProject") {
        currentTrack = request.project
        sendResponse({message: `Recieved ${currentTrack}`})

    } else if (request.name == "userIdSet") {
        userId = request.userId
        sendResponse({message: `Recieved ${request.userId}`})

    }
})


// -------------------------------- TESTING -------------------------------------
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.name == "createProject") {
        isTracking = request.status
        alert(`Tracking status changed ${request.status}`)
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
            // alert("Final portion")
            latestLinks[0] = currentLink;
            // alert(`haha yes ${currentLink}`);
        })
        .catch(function (err) {
            // alert(`Fetch Error: ${err}`);
        });
}