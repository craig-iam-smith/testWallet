// Allows us to use ES6 in our migrations and tests.
require('babel-register')

module.exports = {
	build: {
		"index.html": "index.html",
		"app.js": [
			"bower_components/angular/angular.js",
			"bower_components/angular-route/angular-route.js",
			"javascripts/app.js"
			],
		"views": "views"
	},
  	networks: {
    	development: {
      	host: 'localhost',
      	port: 8545,
      	network_id: '*' // Match any network id
    	}
  	}
}
