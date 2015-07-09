function getSite(url) {
  var result = /^https?:\/\/([^\/]*)/.exec(url);
  return result && result[1];
}

function toTimeString(d) {
  return Math.floor(d / 60000) + ":" + (d % 60000 < 10000 ? "0" : "") + Math.floor(d % 60000 / 1000);
}
