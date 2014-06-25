function tracker(app) {

	var track = app.route('/api/track');

	track.get(function (req, res, next) {
		var d = req.query.d;

		if (!d) {
			return res.send(200);
		}

		var json = new Buffer(d, 'base64').toString();
		var payload = JSON.parse(json);

		res.redirect(payload.url);
	});
}

module.exports = tracker;
