var setup = {
    "loggerurl": "http://localhost:8080/relevantico/api/qc"
};

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    sendResponse({ success: "true" });
    SendRequest(message);
});

function SendRequest(data) {
    var httpRequest = new XMLHttpRequest();
    httpRequest.open("POST", setup.loggerurl, true); // async
    httpRequest.setRequestHeader("Content-Type", "application/json");
    httpRequest.onreadystatechange = function() {
        if (httpRequest.readyState == 0 || httpRequest.readyState == 4) {
            return (httpRequest.status == 0 ||
                (httpRequest.status >= 200 && httpRequest.status < 300) ||
                httpRequest.status == 304);
        }
    };
    httpRequest.send(JSON.stringify(data));

}
