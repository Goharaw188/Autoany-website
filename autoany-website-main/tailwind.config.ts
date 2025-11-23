import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				heading: ['"Sora"', 'Inter', 'system-ui', '"Segoe UI"', 'Roboto', 'Ubuntu', 'Cantarell', 'sans-serif'],
				sans: ['Inter', 'system-ui', '"Segoe UI"', 'Roboto', 'Ubuntu', 'Cantarell', 'sans-serif'],
				mono: ['"IBM Plex Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
				brand: ['"Glacial Indifference"', 'Inter', 'sans-serif']
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				'hero-text': 'hsl(var(--hero-text))',
				'hero-text-muted': 'hsl(var(--hero-text-muted) / 0.8)',
				'hero-primary': 'hsl(var(--hero-primary))',
				'hero-glass': 'hsl(var(--hero-glass) / 0.3)',
				'services-bg': 'hsl(var(--services-bg))',
				'services-title': 'hsl(var(--services-title))',
				'services-subtitle': 'hsl(var(--services-subtitle))',
				'services-card-bg': 'hsl(var(--services-card-bg))',
				'services-card-border': 'hsl(var(--services-card-border))',
				'services-icon-bg': 'hsl(var(--services-icon-bg))',
				'services-link': 'hsl(var(--services-link))',
				'stats-gradient-start': 'hsl(var(--stats-gradient-start))',
				'stats-gradient-end': 'hsl(var(--stats-gradient-end))',
				'stats-text': 'hsl(var(--stats-text))',
				'stats-card-bg': 'hsl(var(--stats-card-bg) / 0.1)',
				'stats-card-border': 'hsl(var(--stats-card-border) / 0.2)',
				'stats-number': 'hsl(var(--stats-number))',
				'stats-label': 'hsl(var(--stats-label) / 0.9)',
				'process-bg': 'hsl(var(--process-bg))',
				'process-title': 'hsl(var(--process-title))',
				'process-card-bg': 'hsl(var(--process-card-bg))',
				'process-step-bg': 'hsl(var(--process-step-bg))',
				'process-step-text': 'hsl(var(--process-step-text))',
				'process-card-title': 'hsl(var(--process-card-title))',
				'process-card-desc': 'hsl(var(--process-card-desc))',
				'process-arrow': 'hsl(var(--process-arrow))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'float': {
					'0%, 100%': { transform: 'translateY(-20px)' },
					'50%': { transform: 'translateY(-30px)' }
				},
				'gradient-shift': {
					'0%, 100%': { backgroundPosition: '0% 50%' },
					'50%': { backgroundPosition: '100% 50%' }
				},
				'count-up': {
					'0%': { transform: 'scale(0.95)', opacity: '0' },
					'100%': { transform: 'scale(1)', opacity: '1' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'float': 'float 6s ease-in-out infinite',
				'gradient-shift': 'gradient-shift 8s ease-in-out infinite',
				'count-up': 'count-up 0.8s ease-out forwards'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
