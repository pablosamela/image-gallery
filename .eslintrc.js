module.exports = {
	plugins: ['import', 'prettier', 'unused-imports'],
	extends: ['prettier', 'plugin:prettier/recommended'],
	ignorePatterns: ['src/index.html'],
	rules: {
		'prettier/prettier': 'warn',
		'no-debugger': ['error'],
		'no-console': ['error', { allow: ['warn', 'error'] }],
		// No Bad imports
		// Importing incorrectly can cause build optimization issues
		'no-restricted-imports': ['error', { patterns: ['rxjs/internal/*'] }],
		// Order imports
		'import/order': [
			'error',
			{
				'pathGroups': [
					{
						pattern: 'src/**',
						group: 'internal',
					},
				],
				'pathGroupsExcludedImportTypes': ['builtin'],
				'groups': ['external', 'internal', 'parent', 'sibling'],
				'newlines-between': 'always',
				'alphabetize': { order: 'asc', caseInsensitive: true },
			},
		],
		// Prefer const vs let.
		'prefer-const': ['warn'],
		// Require === or !== instead of == or != equality checks.
		// Smart allows you to == against typeof and null.
		'eqeqeq': ['error', 'smart'],
		'unused-imports/no-unused-imports-ts': 'error',
		'unused-imports/no-unused-vars-ts': [
			'warn',
			{
				vars: 'all',
				varsIgnorePattern: '^_',
				args: 'after-used',
				argsIgnorePattern: '^_',
			},
		],
	},
	overrides: [
		{
			files: ['*.js'],
			rules: {
				// JS files don't have types...
				'@typescript-eslint/explicit-function-return-type': ['off'],
				'@typescript-eslint/no-var-requires': ['off'],
			},
		},
		{
			files: ['cypress/**/*.{js,ts}'],
			rules: {
				// Interfaces in cypress are different than the rest of the app.
				'@typescript-eslint/naming-convention': 'off',
				'@typescript-eslint/no-namespace': 'off',
			},
		},
		{
			files: ['*.component.html'],
			parser: '@angular-eslint/template-parser',
			plugins: ['@angular-eslint/template'],
			extends: ['plugin:@angular-eslint/template/recommended'],
			rules: {
				'@angular-eslint/template/banana-in-box': 'error',
				'@angular-eslint/template/no-negated-async': 'error',
			},
		},
		{
			files: ['*.ts'],
			parser: '@typescript-eslint/parser',
			parserOptions: {
				ecmaVersion: 2020,
				sourceType: 'module',
			},
			plugins: ['@typescript-eslint'],
			rules: {
				'@typescript-eslint/no-empty-function': ['error', { allow: ['arrowFunctions'] }],
				// We do this all over the place, to keep components
				// neat and tidy.
				'@typescript-eslint/no-use-before-define': ['warn', { functions: false }],
				// Interfaces in our app are prefixed with I
				'@typescript-eslint/naming-convention': [
					'error',
					{
						selector: 'interface',
						format: ['PascalCase'],
						prefix: ['I'],
					},
				],
				// Deprecated rule, fixed with the above rule
				'@typescript-eslint/interface-name-prefix': ['off'],
				// Disabled because of Cactus Table names.
				'@typescript-eslint/camelcase': ['off'],
				// Set as a warning, because you really shouldn't have <any> types,
				// but we don't want to eternally nag you for not knowing the type.
				'@typescript-eslint/no-explicit-any': ['warn', { fixToUnknown: false }],
				// 3 rules below make it so that we can auto-remove unused imports.
				'@typescript-eslint/no-unused-vars': 'off',
			},
		},
	],
};
