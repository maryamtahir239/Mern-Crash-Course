import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { NodeGlobalsPolyfillPlugin } from "@esbuild-plugins/node-globals-polyfill";

export default defineConfig({
	plugins: [react()],
	build: {
		outDir: "dist", // Explicitly set the output directory to "dist"
	},
	resolve: {
		alias: {
			buffer: "buffer", // Alias "buffer" to ensure the polyfill is used
		},
	},
	define: {
		global: {}, // Define "global" to make it available in your app
	},
	optimizeDeps: {
		esbuildOptions: {
			plugins: [
				NodeGlobalsPolyfillPlugin({
					buffer: true, // Enable the Buffer polyfill
				}),
			],
		},
	},
	server: {
		proxy: {
			"/api": {
				target: "http://localhost:5000",
			},
		},
	},
});

