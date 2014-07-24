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

		var json = new Buffer(req.query.d, 'base64').toString();
		var data = JSON.parse(json);

		var action = data.action;

		if (!action) {
			logger.error('received tracking event without action');
			return res.send(200);
		}

		req.track = data;

		next();
	};

	app.route('/api/track').get(validate, function (req, res, next) {
		var data = _.extend(req.track, {date: moment().utc().toDate()});

		seismo(req.track.action, data, function (err) {
			if (err) {
				logger.error({message: 'data save operation failed', err: err});
			} else {
				logger.info('/track user: ' + req.track.user + ' url: ' + req.track.url);
			}
		});

		res.redirect(req.track.url);
	});
}

module.exports = tracker;
