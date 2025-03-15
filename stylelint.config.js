/** @type {import('stylelint').Config} */
export default {
	extends: ['stylelint-config-standard'],
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
				],
			},
		],
		'unit-allowed-list': ['%', 'deg', 'px', 'rem', 'ms'],
		'at-rule-no-deprecated': null,
	},
}
