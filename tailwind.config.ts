import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

const config = {
	darkMode: ['class'],
	content: ['./pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './app/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
	prefix: '',
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px',
			},
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))',
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))',
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))',
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))',
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))',
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))',
				},
				'bgr-base': {
					DEFAULT: '#222222',
				},
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' },
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' },
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
			},
			fontFamily: {
				sans: ['var(--font-inter)'], // https://nextjs.org/docs/app/building-your-application/optimizing/fonts#using-multiple-fonts
			},
			fontWeight: {
				300: '300',
				400: '400',
				500: '500',
				600: '600',
				700: '700',
			},
		},
	},
	plugins: [
		require('tailwindcss-animate'),
		require('tailwind-scrollbar'),
		plugin(function ({ addBase, theme, addComponents, addUtilities }) {
			addComponents({
				'.flex-between': {
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
				},
				'.flex-center': {
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
				},
				'.absolute-center': {
					position: 'absolute',
					top: '50%',
					left: '50%',
					transform: 'translate(-50%, -50%)',
				},
			});
			addBase({
				h1: {
					fontSize: theme('fontSize.h1'),
					lineHeight: theme('lineHeight.lh1'),
					fontStyle: theme('fontStyle.normal'),
					fontWeight: theme('fontWeight.bold'),
				},
				h2: {
					fontSize: theme('fontSize.h2'),
					lineHeight: theme('lineHeight.lh2'),
					fontStyle: theme('fontStyle.normal'),
					fontWeight: theme('fontWeight.bold'),
				},
				h3: {
					fontSize: theme('fontSize.h3'),
					lineHeight: theme('lineHeight.lh3'),
					fontStyle: theme('fontStyle.normal'),
					fontWeight: theme('fontWeight.bold'),
				},
				h4: {
					fontSize: theme('fontSize.h4'),
					lineHeight: theme('lineHeight.lh4'),
					fontStyle: theme('fontStyle.normal'),
					fontWeight: theme('fontWeight.bold'),
				},
				h5: {
					fontSize: theme('fontSize.h5'),
					lineHeight: theme('lineHeight.lh5'),
					fontStyle: theme('fontStyle.normal'),
					fontWeight: theme('fontWeight.bold'),
				},
				h6: {
					fontSize: theme('fontSize.h6'),
					lineHeight: theme('lineHeight.lh6'),
					fontStyle: theme('fontStyle.normal'),
					fontWeight: theme('fontWeight.bold'),
				},
				p: {
					fontSize: theme('fontSize.base'),
					lineHeight: theme('lineHeight.base'),
					fontStyle: theme('fontStyle.normal'),
				},
			});
			addUtilities({
				'.overflow-y-auto': {
					'scroll-behavior': 'smooth',
					'scrollbar-width': 'thin',
				},
				'.overflow-x-auto': {
					'scroll-behavior': 'smooth',
					'scrollbar-width': 'thin',
				},
				'.overflow-auto': {
					'scroll-behavior': 'smooth',
					'scrollbar-width': 'thin',
				},
			});
		}),
	],
} satisfies Config;

export default config;
