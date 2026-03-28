import { serve } from 'bun';

// HTMLファイルをimportしてルートに使用
import homepage from './src/index.html';
import reactPage from './src/react/index.html';

serve({
	port: 3000,
	development: {
		hmr: true,
		console: true,
	},
	routes: {
		'/': homepage,
		'/react': reactPage,
	},
});

console.log('Dev server running at http://localhost:3000');
console.log('  - Vanilla: http://localhost:3000/');
console.log('  - React:   http://localhost:3000/react');
