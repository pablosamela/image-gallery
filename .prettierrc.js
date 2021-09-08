// All options can be seen here https://prettier.io/docs/en/options.html
module.exports = {
	// How long should lines be?
	printWidth: 120,
	// How should we display a tab character?
	tabWidth: 2,
	// Tabs v Spaces https://www.youtube.com/watch?v=SsoOG6ZeyUI
	useTabs: true,
	// single quote is convention in Angular
	singleQuote: true,
	// setting this to 'es5' rather than 'none'
	// will produce the smallest possible diffs
	trailingComma: 'es5',
	// Avoid parens in an arrow function, unless it's typed
	// thing.map(x => console.log(x)); vs
	// thing.map((x) => console.log(x));
	arrowParens: 'avoid',
	quoteProps: 'consistent',
	endOfLine: 'auto',
	overrides: [
		{
			files: 'src/**/*.scss',
			options: {
				trailingComma: 'none',
			},
		},
	],
};
