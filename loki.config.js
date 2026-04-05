module.exports = {
	chromeSelector: '#storybook-root, #root',
	diffingEngine: 'pixelmatch',
	configurations: {
		'chrome.laptop': {
			target: 'chrome.docker',
			width: 1366,
			height: 768,
		},
		// 'chrome.iphone7': {
		// 	target: 'chrome.docker',
		// 	preset: 'iPhone 7',
		// },
	},
	fetchFailIgnore: 'localhost:1234/get',
};
