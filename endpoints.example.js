var endpoints = {
	GET: [
		{
			path: "/cat/123",
			params: {
				name: "Tupac",
				hairColor: "blue"
			},
			response: {
				name: "Tupac",
				age: 13,
				numLegs: 3
			}
		},
		{
			path: "/cats",
			responseRepeat: 4,
			response: {
				name: "James",
				age: 14,
				numLegs: 25
			}
		},
		{
			path: "/dogs/2",
			responseRepeat: 9,
			response: {
				name: "James",
				age: "randInt",
				mom: {
					age: "randInt",
					daughtet: {
						age: "randInt"
					},
					dad:{
						age: "randInt",
						numWives: "randInt"
					}
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