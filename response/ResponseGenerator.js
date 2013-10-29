var mockResponse = require('./Response.js');

function ResponseGenerator() {

	var paramsMatch = function(params1, params2, wildCard) {
		wildCard = wildCard || '*';
		for (var param in params1) {
			if (typeof(params1[param]) == 'object' && typeof(params2[param]) == 'object') {
				if (!paramsMatch(params1[param], params2[param])) return false;
			} else if (params1[param] == wildCard) {
				if (!params2[param]) return false; 
			} else {
				if (params1[param] != params2[param]) return false;
			}
		} 
		return true;
	}

	this.genGet = function(endpoint) {
		return function(req, res) {
			if (paramsMatch(endpoint.request.headers, req.headers)) { 
				if (paramsMatch(endpoint.request.params, req.query)) {
					var mockResp = new mockResponse(endpoint);
					res.send(mockResp.outputResponse(res));
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
					var mockResp = new mockResponse(endpoint);
					res.send(mockResp.outputResponse(res));
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