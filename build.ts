import BunPluginTailwind from 'bun-plugin-tailwind'

const isDev = process.env.NODE_ENV !== 'production'

const commonOptions = {
	minify: !isDev,
	sourcemap: isDev ? ('linked' as const) : ('none' as const),
	splitting: true,
	plugins: [BunPluginTailwind],
	env: 'PUBLIC_*' as const,
}

// Vanilla JS版
const vanillaResult = await Bun.build({
	entrypoints: ['src/index.html'],
	outdir: 'dist',
	...commonOptions,
})

// React版
const reactResult = await Bun.build({
	entrypoints: ['src/react/index.html'],
	outdir: 'dist/react',
	...commonOptions,
})

if (!vanillaResult.success || !reactResult.success) {
	console.error('Build failed:')
	vanillaResult.logs.forEach((log) => {
		console.error(log)
	})
	reactResult.logs.forEach((log) => {
		console.error(log)
	})
	process.exit(1)
}

console.log('Build completed successfully')
console.log(`  - Vanilla: dist/ (${vanillaResult.outputs.length} files)`)
console.log(`  - React:   dist/react/ (${reactResult.outputs.length} files)`)
