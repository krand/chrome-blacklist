var site = getSite(window.document.URL);

chrome.storage.local.get('chromeblacklist', function(result) {
  var unlistedTime = result.chromeblacklist && result.chromeblacklist[site];
  if (unlistedTime) {
    var time = 15 * 60 * 1000 + unlistedTime - new Date().getTime();
    if(unlistedTime===true || time>0){
      chrome.runtime.sendMessage({
        "command": "showBlacklistedPage",
        "site": site,
        "type": "isBlacklisted"
      });
    }else{
      var chromeblacklist = result.chromeblacklist;
      delete chromeblacklist[request.site];
      chrome.storage.local.set({
        "chromeblacklist": chromeblacklist
      });
    }
  }
});
