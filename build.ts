import BunPluginTailwind from "bun-plugin-tailwind";

await Bun.build({
	entrypoints: ["src/react/index.html"],
	outdir: "dist",
	plugins: [BunPluginTailwind],
});
