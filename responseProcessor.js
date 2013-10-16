var RV = require('./responseValues.js');

var recursiveValueReplace = function(response) {
	for (var key in response) {
		if (typeof(response[key]) == 'object') {
			response[key] = recursiveValueReplace(response[key]);
		} else {
			if (RV[response[key]]) response[key] = RV[response[key]]();
		}
	}
	return response;
}

var responseProcessor = function(response, repeat) {
	if (repeat > 1) {
		var resp = new Array();
		var lastResp = null;
		for (var i = 0; i < repeat; ++i) {
			response = recursiveValueReplace(response);
			resp.push(response);
		}
		return resp;
	} else {
		return recursiveValueReplace(response);
	}
}

module.exports = responseProcessor;