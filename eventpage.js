chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.command === "showBlacklistedPage") {
    showBlacklistedPage(sender.tab.id, request.site, request.type);
  }else if(request.command === "unlistPage"){
    chrome.storage.local.get("chromeblacklist", function(result) {
      if (result.chromeblacklist && result.chromeblacklist[request.site]) {
        var chromeblacklist = result.chromeblacklist;
        chromeblacklist[request.site] = new Date().getTime();
        chrome.storage.local.set({
          "chromeblacklist": chromeblacklist
        }, function() {
          showBlacklistedPage(sender.tab.id,request.site,"hasBeenUnlisted");
        });
      }
    });
  }
});

function showBlacklistedPage(tabId, site, type) {
  updateTabWithUrl(tabId,chrome.runtime.getURL("blacklisted.html")+"?tabId="+tabId,function (tab) {
    var views = chrome.extension.getViews();
    for(var i=0; i<views.length; i++){
      if(views[i].location.href == tab.url){
        views[i].show(site, type);
        break;
      }
    }
  });
}

function updateTabWithUrl(tabId, url, callback){
  var onLoadingListener = function onLoadingListener(updatedTabId,changeInfo,tab) {
    console.log(JSON.stringify(changeInfo));
    if(updatedTabId==tabId && tab.url==url && changeInfo.status == "loading"){
      chrome.tabs.onUpdated.addListener(onCompletedListener);
      chrome.tabs.onUpdated.removeListener(onLoadingListener);
    }
  };
  var onCompletedListener = function onCompletedListener(updatedTabId,changeInfo,tab) {
    console.log(JSON.stringify(changeInfo));
    if(updatedTabId==tabId && tab.url==url && changeInfo.status == "complete"){
      callback(tab);
      chrome.tabs.onUpdated.removeListener(onCompletedListener);
    }
  };
  chrome.tabs.onUpdated.addListener(onLoadingListener);
  chrome.tabs.update(tabId,{"url":url});
}

chrome.browserAction.onClicked.addListener(function(tab) {
  var site = getSite(tab.url);
  chrome.storage.local.get("chromeblacklist", function(result) {
    if (result.chromeblacklist && result.chromeblacklist[site]) {
      showBlacklistedPage(tab.id, site, "isBlacklisted");
    } else {
      var chromeblacklist = result.chromeblacklist || {};
      chromeblacklist[site] = true;
      chrome.storage.local.set({
        "chromeblacklist": chromeblacklist
      }, function() {
        showBlacklistedPage(tab.id, site, "hasBeenBlacklisted");
      });
    }
  });
});
