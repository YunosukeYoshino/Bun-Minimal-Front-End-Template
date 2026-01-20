// scripts/generate-sitemap.ts
import { writeFileSync } from 'node:fs'
import fg from 'fast-glob'

async function main() {
	// ビルド出力ディレクトリを指定（create-react-app なら build/, Vite なら dist/ など）
	const outDir = 'dist'
	// 公開サイトのベース URL を指定してね
	const baseUrl: string = process.env.BASE_URL || ''

	// HTML ファイルを探す
	const files: string[] = await fg(`${outDir}/**/*.html`)

	// URL リストを生成
	const urls = files.map((file) => {
		// build/index.html → /
		// build/about/index.html → /about/
		const path = file
			.replace(new RegExp(`^${outDir}`), '')
			.replace(/index\.html$/, '')
			.replace(/\.html$/, '')
		return `<url>
  <loc>${baseUrl}${path}</loc>
  <changefreq>weekly</changefreq>
  <priority>0.8</priority>
</url>`
	})

	// sitemap.xml のテンプレート
	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`

	// ファイル書き出し
	writeFileSync(`${outDir}/sitemap.xml`, sitemap)
	writeFileSync(
		`${outDir}/robots.txt`,
		`User-agent: *
Allow: /

Sitemap: ${baseUrl}/sitemap.xml
`,
	)

	console.log('✅ sitemap.xml と robots.txt を生成したよ！')
}

main().catch((e) => {
	console.error(e)
	process.exit(1)
})
