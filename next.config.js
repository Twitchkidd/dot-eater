module.exports = {
	distDir: 'out',
	env: {
		version: JSON.stringify(require('./package.json').version),
	},
};
