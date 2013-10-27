module.exports.json = function() {
	return function(req, res, next){
	   var data = "";
	   req.on('data', function(chunk){ data += chunk});
	   req.on('end', function(){
	      try {
	      	req.body = JSON.parse(data);
	      } catch (e) {
	      	req.body = {};
	      }
	      next();
	   });
	};
}