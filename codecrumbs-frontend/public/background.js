var lastURL = "";
var currentComment
var isTracking = true
var currentTrack = undefined
var userId;

chrome.storage.local.get(['userId'], function (result) {
    userId = result.userId;
    console.log('Value currently is ' + result.userId);
});

var baseURL = "https://codecrumbs.uc.r.appspot.com"

latestLinks = ["", "", "", "", ""];

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    let currentURL = changeInfo.url;

    if (!currentTrack) {
        chrome.storage.local.get(['currentTrack'], function (result) {
            currentTrack = result.currentTrack;
        });
    }

    if (isTracking && currentURL !== undefined && currentURL.includes("http") && lastURL != currentURL) {

        //add it to the database
        //only make API call if there is an associated Project
        //ADD IF STATEMENT CHECK WITH CURRENTTRACK
        logSearch(currentTrack, userId, "Website Filler value", currentURL);

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
        currentProject = request.project
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

function logSearch(projectName, userId, websiteName, websiteUrl) {
    let body = {
        associatedProjectName: projectName,
        associatedUserId: userId,
        websiteName: websiteName,
        websiteUrl: websiteUrl
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
            // alert("haha yes: ", currentLink);
        })
        .catch(function (err) {
            // alert('Fetch Error :-S', err);
        });
}