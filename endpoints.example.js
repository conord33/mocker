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
				statusCode: 500,
				headers: {
					'content-lengtha':5
				},
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
		{
			request: {
				path: "/cats",
				headers: {},
				body: {
					name: 'cat',
					food: {
						name: 'tasty treats',
						price: 1.95
					}
				}
			},
			response: {
				statusCode: 200,
				headers: {
					'content-lengtha':200
				},
				bodyRepeat: 9,
				body: {
					name: "Tupac",
					age: "randInt",
					numLegs: 4
				}
			}
		}
	],
	PUT: [
	],
	PATCH: [
	],
	DELETE: [
	]
}

module.exports = endpoints;