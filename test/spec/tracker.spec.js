var request = require('request');

describe('tracker.js', function () {
	var url, response, results;

	beforeEach(function () {
		url = 'http://localhost:3006/api';
	});

	describe('submitting links', function () {
		var data, payload;

		beforeEach(function () {
			data = {
				user: 'a@a.com',
				url: 'http://example.com',
				query: 'my simple query'
			};

			payload = new Buffer(JSON.stringify(data)).toString('base64');
		});

		beforeEach(function () {
			url += '/track?d=' + payload;
		});

		beforeEach(function (done) {
			request({url: url, json: true, followRedirect: false}, function (err, resp, body) {
				response = resp;
				results = body;
				done(err);
			});
		});

		it('should respond 302 (found)', function () {
			expect(response.statusCode).to.equal(302);
		});
	});

	describe('reports', function () {
		// TODO:
	});
});
