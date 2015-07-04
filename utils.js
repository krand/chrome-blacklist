function getSite(url) {
  var result =  /^https?:\/\/(.*)\//.exec(url);
  return result&&result[1];
}
