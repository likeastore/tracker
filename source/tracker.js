var _ = require('underscore');
var moment = require('moment');

var config = require('../config');
var db = require('./db')(config);
var logger = require('./utils/logger');

function tracker(app) {

	var track = app.route('/api/track');

	var validate = function (req, res, next) {
		if (!req.query.d) {
			return res.send(200);
		}

		next();
	};

	track.get(validate, function (req, res, next) {
		var json = new Buffer(req.query.d, 'base64').toString();
		var link = JSON.parse(json);

		link = _.extend(link, {date: moment()});

		db.links.save(link, function (err) {
			if (err) {
				logger.error({message: 'link save operation failed', err: err});
			}

			res.redirect(link.url);
		});
	});
}

module.exports = tracker;
