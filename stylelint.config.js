/** @type {import('stylelint').Config} */
export default {
	extends: ['stylelint-config-standard'],
	ignoreFiles: ['dist/**/*', 'node_modules/**/*'],
	rules: {
		'declaration-property-unit-allowed-list': {
			'/^border/': ['px'],
			'/^padding|^gap/': ['rem'],
		},
		'at-rule-no-unknown': [
			true,
			{
				ignoreAtRules: [
					'tailwind',
					'apply',
					'variants',
					'responsive',
					'screen',
					'layer',
					'theme',
				],
			},
		],
		'unit-allowed-list': ['%', 'deg', 'px', 'rem', 'ms', 's'],
		'at-rule-no-deprecated': null,
		'keyframes-name-pattern': null,
		'custom-property-pattern': null,
		'selector-class-pattern': null,
		'no-duplicate-selectors': null,
	},
}
