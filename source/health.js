var pack = require('../package');

function health(app) {

	var root = app.route('/');

	root.get(function (req, res) {
		res.json({app: 'tracker.likeastore.com', env: process.env.NODE_ENV, version: pack.version});
	});
}

module.exports = health;
