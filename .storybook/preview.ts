global.IS_REACT_ACT_ENVIRONMENT = true;

import type { Preview } from '@storybook/react'

import '../src/styles/base.css'

const preview: Preview = {
	parameters: {
		actions: { argTypesRegex: '^on[A-Z].*' },
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
		backgrounds: {
			default: 'light',
			values: [
				{
					name: 'light',
					value: '#faf9f7',
				},
				{
					name: 'dark',
					value: '#1a1a1a',
				},
			],
		},
		layout: 'centered',
	},
}

export default preview
