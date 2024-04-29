/** @type {import('tailwindcss').Config}*/
const config = {
	content: ['./src/**/*.{html,js,svelte,ts}', './node_modules/**/fuma/dist/**/*.svelte'],

	darkMode: 'class',
	theme: {
		extend: {}
	},

	plugins: [require('daisyui'), require('@tailwindcss/typography')],
	daisyui: {
		logs: false
	}
}

module.exports = config
