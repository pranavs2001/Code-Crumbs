var lastURL
var currentComment

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    let currentURL = changeInfo.url
    if (currentURL && currentURL.includes("http") && lastURL != currentURL) {

    }
})

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if(request.name == "commentRecorded") {
        alert(request.comment)
    }
})