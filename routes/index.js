
var endpoints = require('../endpoints.js');

exports.index = function(req, res){
  res.send(JSON.stringify(endpoints));
};