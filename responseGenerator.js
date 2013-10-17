var RP = require('./responseProcessor.js');

var responseGenerator = function(endpoint) {
	return function(req, res) {
		var valid = true;
		for (var param in endpoint.params) {
			if (endpoint.params[param] != req.query[param]) {
				valid = false;
				break;
			}
		} 
		if (valid) {
			response = RP(endpoint.response, endpoint.responseRepeat);
			res.send(JSON.stringify(response));
		}
	};
};

module.exports = responseGenerator;