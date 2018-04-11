const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const xhr = new XMLHttpRequest();
exports.testMsg = function() {
  console.log("yep the test works :D");
}
exports.listNodes = function() {
  xhr.open( "GET", "http://verify.mcdiamondfire.com:5000/api/nodes/list", false ); // false for synchronous request
  xhr.send( null );
  return xhr.responseText;
}
exports.getPlotName = function(param) {
  xhr.open( "GET", param, false ); // false for synchronous request
  xhr.send( null );
  return xhr.responseText;
}
exports.serverStats = function() {
  xhr.open( "GET", "http://verify.mcdiamondfire.com:5000/api/stats/server", false ); // false for synchronous request
  xhr.send( null );
  return xhr.responseText;
}
exports.discordServerStats = function() {
  xhr.open( "GET", "http://verify.mcdiamondfire.com:5000/api/stats/discord", false ); // false for synchronous request
  xhr.send( null );
  return xhr.responseText;
}