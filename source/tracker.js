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
		var link = JSON.parse(json);

		link = _.extend(link, {date: moment().utc().toDate()});

		seismo('search results clicked', link, function (err) {
			if (err) {
				logger.error({message: 'link save operation failed', err: err});
			}

			logger.info('/track user: ' + link.user + ' url: ' + link.url);

			res.redirect(link.url);
		});
	});
}

module.exports = tracker;
