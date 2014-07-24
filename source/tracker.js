var _ = require('underscore');
var moment = require('moment');

var config = require('../config');
var logger = require('./utils/logger');
var seismo = require('seismo-client')(config.seismo.app, config.seismo.options);

function tracker(app) {
	var validate = function (req, res, next) {
		if (!req.query.d) {
			return res.send(200);
		}

		next();
	};

	app.route('/api/track').get(validate, function (req, res, next) {
		var json = new Buffer(req.query.d, 'base64').toString();
		var data = JSON.parse(json);

		data = _.extend(data, {date: moment().utc().toDate()});

		seismo('content engaged', data, function (err) {
			if (err) {
				logger.error({message: 'data save operation failed', err: err});
			}

			logger.info('/track user: ' + data.user + ' url: ' + data.url);

			res.redirect(data.url);
		});
	});
}

module.exports = tracker;
