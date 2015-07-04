function show(site,type) {
  var msg;
  if(type==="isBlacklisted"){
    msg = "is blacklisted";
  }else if(type==="hasBeenBlacklisted"){
    msg = "has been blacklisted";
  }else if(type==="hasBeenUnlisted"){
    msg = "has been unlisted";
  }
  $("#site").html(site);
  $("#msg").html(msg);

  chrome.storage.local.get('chromeblacklist', function(result) {
    var btn = $("#unblacklisted");
    var unlistedTime =  result.chromeblacklist && result.chromeblacklist[site];
    if(unlistedTime === true){
      btn.removeAttr("disabled");
      btn.html("Unlist");
    }else if(unlistedTime){
      btn.attr("disabled", true);
      var time = 15 * 60 * 1000 + unlistedTime - new Date().getTime();
      btn.html("The site will be available in " + Math.floor(time/60000) + ":" + Math.floor(time%60000/1000) );
    }
  });

}

$("#unblacklisted").on("click", function( event ) {
  var site = $("#site").text();
  chrome.runtime.sendMessage({
    "command": "unlistPage",
    "site": site
  });
});
