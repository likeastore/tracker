var config = {
	logentries: {
		token: process.env.LOGENTRIES_TOKEN
	},

	seismo: {
		app: 'likeastore-production',
		options: {
			server: 'https://analytics.likeastore.com',
			credentials: {
				username: process.env.SEISMO_USERNAME,
				password: process.env.SEISMO_PASSWORD
			}
		}
	}
};

module.exports = config;
