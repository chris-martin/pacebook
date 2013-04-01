chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.key === "getTabCount") {

        // fun with asynchronicity! shove that callback into another callback!
        chrome.tabs.query({url: "*://*.facebook.com/*"}, function(tabs) {
            sendResponse({tabCount: tabs.length});
        });
        
        // apparently we have to do this to use sendResponse 
        // after this listener returns (ie. in the callback to
        // chrome.tabs.query)
        return true; 
    }
    sendResponse({}); // why are you sending me messages i don't respond to?
});
