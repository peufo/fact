const daisyui = require('daisyui')

/** @type {import('tailwindcss').Config}*/
const config = {
	content: ['./src/**/*.{html,js,svelte,ts}', './node_modules/**/fuma/dist/**/*.svelte'],

	theme: {
		extend: {}
	},

	plugins: [daisyui],
	daisyui: {
		logs: false
	}
}

module.exports = config
