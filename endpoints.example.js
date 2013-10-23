var endpoints = {
	GET: [
		{
			request: {
				path: "/cats",
				headers: {},
				params: {
					name: "Tupac",
					hairColor: "blue"
				}
			},
			response: {
				headers: {},
				bodyRepeat: 9,
				body: {
					name: "Tupac",
					age: "randInt",
					numLegs: 4
				}
			}
		}
	],
	POST: [
	],
	PUT: [
	],
	DELETE: [
	]
}

module.exports = endpoints;