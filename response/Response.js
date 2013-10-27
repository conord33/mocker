
function Response(endpoint) {
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

	var processor = function(body, repeat) {
		if (repeat > 1) {
			var resp = new Array();
			for (var i = 0; i < repeat; ++i) {
				tempResponse = JSON.parse(JSON.stringify(body));
				processedResponse = recursiveValueReplace(tempResponse);
				resp.push(processedResponse);
			}
			return resp;
		} else {
			return recursiveValueReplace(response);
		}
	}

	this.outputResponse = function(res) {
		res.status(endpoint.response.statusCode);
		res.set(endpoint.response.headers);
		var response = processor(endpoint.response.body, endpoint.response.bodyRepeat);
		return JSON.stringify(response);
	}
}

module.exports = Response;