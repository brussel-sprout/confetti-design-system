import { resolve } from 'path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			'@': resolve(__dirname, './src'),
		},
	},
	build: {
		lib: {
			entry: resolve(__dirname, 'src/index.ts'),
			name: 'ConfettiDesignSystem',
			fileName: 'index',
			formats: ['es', 'cjs'],
		},
		rollupOptions: {
			external: ['react', 'react-dom'],
			output: {
				globals: {
					react: 'React',
					'react-dom': 'ReactDOM',
				},
			},
		},
	},
	server: {
		port: 3000,
		open: true,
        // host: '0.0.0.0',
    // port: 5009,
    // open: false,
    // strictPort: false,
    // allowedHosts: ['localhost', '.replit.dev', '.replit.app', '.replit.co', 'all']
	},
  
})
