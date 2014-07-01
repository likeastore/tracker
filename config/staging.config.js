var config = {
	logentries: {
		token: null
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
