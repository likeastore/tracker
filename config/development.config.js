var config = {
	logentries: {
		token: null
	},

	seismo: {
		app: 'likeastore-production',
		options: {
			server: 'https://localhost:3005',
			credentials: {
				username: 'likeastore',
				password: 'mypass'
			}
		}
	}
};

module.exports = config;
