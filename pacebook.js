chrome.storage.sync.get(["startDate", "visitCount"], function(response) {
    console.log("response", response);
    var visitCount = response["visitCount"];
    if (visitCount !== undefined) {
        visitCount = JSON.parse(visitCount);
    } else {
        visitCount = 0;
    }
    console.log("visit count: ", visitCount);
    visitCount++;

    var startDate = response["startDate"];
    if (startDate && !$.isEmptyObject(startDate)) {
        console.log(startDate);
        startDate = JSON.parse(startDate);
    }
    console.log("startDate:", startDate);
    var now = moment();

    var data = {};
    data["visitCount"] = visitCount;
    // save the date if it's been more than a day
    if (!startDate || !now.isSame(startDate, 'day')) {
        data["startDate"] = JSON.stringify(now);
    }
    chrome.storage.sync.set(data, function() {
        console.log("saved", data);
    }); // asynchronously save

    var pacebookId = "pacebook";
    if ($("#" + pacebookId).length == 0) {
        $("<li><span id='" + pacebookId + "'></span></li>")
            .addClass("navItem")
            .addClass("navLink")
            .prependTo("#pageNav");
    }
    $("#" + pacebookId)
        .text(visitCount)
        .css("background-color", "#3b5998")
        .css("font-size", (10 + visitCount) + "px");
    

});




//var id = "pacebook";
//$("<div></div>").attr("id", id)
