
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
			if (typeof(params1[param]) == 'object' && typeof(params2[param]) == 'object') {
				console.log('recurse');
				if (!paramsMatch(params1[param], params2[param])) return false;
			} else {
				console.log('p1:' + params1[param]);
				console.log('p2:' + params2[param]);
				if (params1[param] != params2[param]) return false;
			}
		} 
		return true;
	}

	this.genGet = function(endpoint) {
		return function(req, res) {
			if (paramsMatch(endpoint.request.headers, req.headers)) { 
				if (paramsMatch(endpoint.request.params, req.query)) {
					res.status(endpoint.response.statusCode);
					res.set(endpoint.response.headers);
					response = processor(endpoint.response.body, endpoint.response.bodyRepeat);
					res.send(JSON.stringify(response));
				} else {
					res.send('request parameters did not match expected input parameters');
				}
			} else {
				res.send('headers did not match expected input headers');
			}
		}
	}

	this.genPost = function(endpoint) {
		return function(req, res) {
			if (paramsMatch(endpoint.request.headers, req.headers)) { 
				if (paramsMatch(endpoint.request.body, req.body)) {
					res.status(endpoint.response.statusCode);
					res.set(endpoint.response.headers);
					response = processor(endpoint.response.body, endpoint.response.bodyRepeat);
					res.send(JSON.stringify(response));
				} else {
					res.send('request body did not match expected input body');
				}
			} else {
				res.send('headers did not match expected input headers');
			}
		}
	}
}

module.exports = ResponseGenerator;