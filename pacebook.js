// warn if multiple facebook tabs open
chrome.extension.sendMessage({key: "getTabCount"}, function(response) {
    if (response.tabCount > 1) {
        window.alert("CLOSE YOUR OTHER " 
            + (response.tabCount > 2 ? (response.tabCount - 1) + " " : "")
            + "TAB"
            + (response.tabCount > 2 ? "S" : "") 
            + " YOU PRICK");
    }
});

// display annoying visit counter
chrome.storage.sync.get(["startDate", "visitCount"], function(response) {
    var visitCount = response.visitCount;
    if (visitCount !== undefined) {
        visitCount = JSON.parse(visitCount);
    } else {
        visitCount = 0;
    }

    var startDate = response.startDate;
    if (startDate && !$.isEmptyObject(startDate)) {
        console.log(startDate);
        startDate = JSON.parse(startDate);
    }

    var data = {}; // stuff to save

    var now = moment();
    // save the date if it's been more than a day
    if (!startDate || !now.isSame(startDate, 'day')) {
        data.startDate = JSON.stringify(now);
        visitCount = 0; // and reset the counter
    }
    
    visitCount++;
    // save the visit count even if it hasn't been reset
    data.visitCount = visitCount;

    chrome.storage.sync.set(data); // asynchronously save

    var pacebookId = "pacebook";
    if ($("#" + pacebookId).length === 0) {
        // don't create the element if it already exists
        var li = $("<li></li>")
            .addClass("navItem");
        $("<span></span>")
            .attr("id", pacebookId)
            .addClass("pacebook")
            .addClass("navLink")
            .appendTo(li);
        $("#pageNav").prepend(li);
    }

    $("#" + pacebookId)
        .text(visitCount)
        .css("font-size", (10 + visitCount) + "px");
    if (visitCount > 15) {
        $("#" + pacebookId)
            .addClass("blink");
    }
});

// initiate operation iron lady
$("body").prepend(
    $("<img></img>")
        .attr("id", "thatcher")
        .attr("src", chrome.extension.getURL("thatcher_icon.jpg"))
        .addClass("thatcher")
        .attr("title", "...")
);
// ...but not for half an hour.
setTimeout(function() { $("#thatcher").addClass("scale"); }, 1000 * 60 * 30);
