var numberOfOpenTabs = 0;

chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.key === "incrementTabCount") {
        numberOfOpenTabs++;
        // let's clean up our mess once we're done
        chrome.tabs.onRemoved.addListener(function(tabId, removeInfo) {
            if (tabId === sender.tab.id) {
                numberOfOpenTabs--;
            }
        });

        sendResponse({tabCount: numberOfOpenTabs});
    }
    sendResponse({});
});
