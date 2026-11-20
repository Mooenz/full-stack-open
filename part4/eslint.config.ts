import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import { defineConfig, globalIgnores } from 'eslint/config';
import stylistic from '@stylistic/eslint-plugin';

export default defineConfig(
	[
		{
			files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
			languageOptions: { globals: globals.node },
			plugins: { js, tseslint, stylistic },
			extends: ['js/recommended'],
		},
		tseslint.configs.recommended,
	],
	globalIgnores(['./dist/']),
);
