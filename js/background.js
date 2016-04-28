//send message to content script when url hast changed
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {   
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { data: changeInfo.url, action: 'searchComplete' }, function(response) {});
    });
});
//receive message from content script for switching back to previous crumb (url)
chrome.extension.onRequest.addListener(function(url) {
    chrome.tabs.query({ currentWindow: true, active: true }, function(tab) {
        chrome.tabs.update(tab.id, { url: url });
    });
})
