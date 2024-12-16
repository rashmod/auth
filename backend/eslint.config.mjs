import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import tsParser from '@typescript-eslint/parser';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
	baseDirectory: __dirname,
	recommendedConfig: js.configs.recommended,
	allConfig: js.configs.all,
});

export default [
	...compat.extends(
		'eslint:recommended',
		'airbnb-base',
		'airbnb-typescript',
		'plugin:@typescript-eslint/recommended',
		'prettier'
	),
	{
		languageOptions: {
			parser: tsParser,
			ecmaVersion: 5,
			sourceType: 'script',

			parserOptions: {
				project: './tsconfig.json',
			},
		},

		rules: {
			'linebreak-style': ['warn', 'windows'],

			'@typescript-eslint/no-unused-vars': [
				'warn',
				{
					args: 'all',
					argsIgnorePattern: '^_',
					caughtErrors: 'all',
					caughtErrorsIgnorePattern: '^_',
					destructuredArrayIgnorePattern: '^_',
					varsIgnorePattern: '^_',
					ignoreRestSiblings: true,
				},
			],

			'class-methods-use-this': 'off',

			'@typescript-eslint/lines-between-class-members': [
				'warn',
				{
					enforce: [
						{
							blankLine: 'always',
							prev: 'method',
							next: 'method',
						},
						{
							blankLine: 'always',
							prev: 'field',
							next: 'method',
						},
					],
				},
			],

			'arrow-body-style': ['warn', 'as-needed'],
			'func-style': ['warn', 'declaration'],
			'no-plusplus': 'warn',
		},

		files: ['**/*.ts'],
	},
];
