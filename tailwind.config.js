/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{js,ts,jsx,tsx}', './.storybook/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				// Primary Brand Colors
				primary: {
					DEFAULT: 'hsl(340, 35%, 68%)',
					foreground: 'hsl(30, 15%, 97%)',
					50: 'hsl(340, 35%, 95%)',
					100: 'hsl(340, 35%, 90%)',
					200: 'hsl(340, 35%, 80%)',
					300: 'hsl(340, 35%, 70%)',
					400: 'hsl(340, 35%, 60%)',
					500: 'hsl(340, 35%, 68%)',
					600: 'hsl(340, 35%, 58%)',
					700: 'hsl(340, 35%, 48%)',
					800: 'hsl(340, 35%, 38%)',
					900: 'hsl(340, 35%, 28%)',
				},
				// Secondary Colors
				secondary: {
					DEFAULT: 'hsl(30, 12%, 85%)',
					foreground: 'hsl(25, 8%, 25%)',
					50: 'hsl(30, 12%, 95%)',
					100: 'hsl(30, 12%, 90%)',
					200: 'hsl(30, 12%, 80%)',
					300: 'hsl(30, 12%, 70%)',
					400: 'hsl(30, 12%, 60%)',
					500: 'hsl(30, 12%, 85%)',
					600: 'hsl(30, 12%, 75%)',
					700: 'hsl(30, 12%, 65%)',
					800: 'hsl(30, 12%, 55%)',
					900: 'hsl(30, 12%, 45%)',
				},
				// Background Colors
				background: 'hsl(30, 15%, 97%)',
				foreground: 'hsl(25, 8%, 25%)',
				// Accent Colors
				accent: {
					DEFAULT: 'hsl(25, 45%, 58%)',
					foreground: 'hsl(30, 15%, 97%)',
					50: 'hsl(25, 45%, 95%)',
					100: 'hsl(25, 45%, 90%)',
					200: 'hsl(25, 45%, 80%)',
					300: 'hsl(25, 45%, 70%)',
					400: 'hsl(25, 45%, 60%)',
					500: 'hsl(25, 45%, 58%)',
					600: 'hsl(25, 45%, 48%)',
					700: 'hsl(25, 45%, 38%)',
					800: 'hsl(25, 45%, 28%)',
					900: 'hsl(25, 45%, 18%)',
				},
				// Neutral Colors
				muted: {
					DEFAULT: 'hsl(30, 12%, 90%)',
					foreground: 'hsl(25, 8%, 45%)',
					50: 'hsl(30, 12%, 95%)',
					100: 'hsl(30, 12%, 90%)',
					200: 'hsl(30, 12%, 80%)',
					300: 'hsl(30, 12%, 70%)',
					400: 'hsl(30, 12%, 60%)',
					500: 'hsl(30, 12%, 50%)',
					600: 'hsl(30, 12%, 40%)',
					700: 'hsl(30, 12%, 30%)',
					800: 'hsl(30, 12%, 20%)',
					900: 'hsl(30, 12%, 10%)',
				},
				border: 'hsl(30, 12%, 82%)',
				input: 'hsl(30, 12%, 82%)',
				// Extended Brand Palette
				'powder-blue': {
					500: 'hsl(200, 25%, 70%)',
					600: 'hsl(200, 28%, 60%)',
					700: 'hsl(200, 30%, 50%)',
				},
				cream: {
					200: 'hsl(35, 33%, 90%)',
					300: 'hsl(35, 30%, 80%)',
					400: 'hsl(35, 28%, 70%)',
				},
				blush: {
					500: 'hsl(340, 50%, 75%)',
					600: 'hsl(340, 50%, 65%)',
					700: 'hsl(340, 50%, 55%)',
				},
				charcoal: {
					600: 'hsl(0, 0%, 36%)',
					700: 'hsl(0, 0%, 31%)',
					800: 'hsl(0, 0%, 27%)',
				},
				// Semantic Colors
				destructive: {
					DEFAULT: 'hsl(0, 84%, 60%)',
					foreground: 'hsl(0, 0%, 98%)',
				},
				success: {
					DEFAULT: 'hsl(142, 76%, 36%)',
					foreground: 'hsl(0, 0%, 98%)',
				},
				warning: {
					DEFAULT: 'hsl(38, 92%, 50%)',
					foreground: 'hsl(0, 0%, 98%)',
				},
				info: {
					DEFAULT: 'hsl(199, 89%, 48%)',
					foreground: 'hsl(0, 0%, 98%)',
				},
			},
			borderRadius: {
				DEFAULT: '0.75rem',
				sm: '0.5rem',
				md: '0.625rem',
				lg: '0.75rem',
				xl: '1rem',
				'2xl': '1.25rem',
				'3xl': '1.5rem',
			},
			fontFamily: {
				sans: ['Inter', 'system-ui', 'sans-serif'],
				serif: ['Lora', 'Georgia', 'serif'],
				script: ['Lobster', 'cursive'],
			},
			spacing: {
				18: '4.5rem',
				88: '22rem',
				128: '32rem',
			},
			animation: {
				'fade-in': 'fadeIn 0.6s ease-out',
				float: 'float 3s ease-in-out infinite',
				'slide-up': 'slideUp 0.3s ease-out',
				'slide-down': 'slideDown 0.3s ease-out',
				'scale-in': 'scaleIn 0.2s ease-out',
			},
			keyframes: {
				fadeIn: {
					'0%': { opacity: '0', transform: 'translateY(10px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' },
				},
				float: {
					'0%, 100%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(-10px)' },
				},
				slideUp: {
					'0%': { transform: 'translateY(100%)' },
					'100%': { transform: 'translateY(0)' },
				},
				slideDown: {
					'0%': { transform: 'translateY(-100%)' },
					'100%': { transform: 'translateY(0)' },
				},
				scaleIn: {
					'0%': { opacity: '0', transform: 'scale(0.95)' },
					'100%': { opacity: '1', transform: 'scale(1)' },
				},
			},
			backdropBlur: {
				xs: '2px',
			},
		},
	},
	plugins: [],
}
