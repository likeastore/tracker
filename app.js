var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var morgan = require('morgan');

var config = require('./config');
var logger = require('./source/utils/logger');

var app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(methodOverride());

var env = process.env.NODE_ENV || 'development';
var port = process.env.PORT || 3006;

app.listen(port, function () {
	logger.info('Likeastore tracker listening on port ' + port + ' ' + env + ' mongo: ' + config.connection);
});
