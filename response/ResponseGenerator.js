
function ResponseGenerator() {
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

	var processor = function(response, repeat) {
		if (repeat > 1) {
			var resp = new Array();
			for (var i = 0; i < repeat; ++i) {
				tempResponse = JSON.parse(JSON.stringify(response));
				processedResponse = recursiveValueReplace(tempResponse);
				resp.push(processedResponse);
			}
			return resp;
		} else {
			return recursiveValueReplace(response);
		}
	}

	var paramsMatch = function(params1, params2) {
		for (var param in params1) {
			if (params1[param] != params2[param]) return false;
		} 
		return true;
	}

	this.genGet = function(endpoint) {
		return function(req, res) {
			if (paramsMatch(endpoint.params, req.query)) {
				response = processor(endpoint.response, endpoint.responseRepeat);
				res.send(JSON.stringify(response));
			}
		}
	}

	this.genPost = function(endpoint) {
		return function(req, res) {
			
		}
	}
}

module.exports = ResponseGenerator;