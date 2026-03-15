/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                background: '#F8FAFC',
                'background-dark': '#E2E8F0',
                card: 'rgba(255, 255, 255, 0.7)',
                'card-solid': '#FFFFFF',
                bordercolor: 'rgba(148, 163, 184, 0.2)',
                primary: {
                    DEFAULT: '#0066FF',
                    light: '#3385FF',
                    dark: '#0052CC',
                    glow: 'rgba(0, 102, 255, 0.4)'
                },
                secondary: {
                    DEFAULT: '#00C9A7',
                    light: '#33D4B8',
                    dark: '#00A085',
                    glow: 'rgba(0, 201, 167, 0.4)'
                },
                accent: {
                    DEFAULT: '#7C3AED',
                    light: '#9F67F0',
                    dark: '#6025C9',
                    glow: 'rgba(124, 58, 237, 0.4)'
                },
                slate: {
                    50: '#F8FAFC',
                    100: '#F1F5F9',
                    200: '#E2E8F0',
                    300: '#CBD5E1',
                    400: '#94A3B8',
                    500: '#64748B',
                    600: '#475569',
                    700: '#334155',
                    800: '#1E293B',
                    900: '#0F172A',
                }
            },
            fontFamily: {
                sans: ['Inter', 'Space Grotesk', 'sans-serif'],
            },
            animation: {
                'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
                'scan-line': 'scan-line 3s linear infinite',
                'data-stream': 'data-stream 1.5s linear infinite',
                'float': 'float 6s ease-in-out infinite',
                'shimmer': 'shimmer 2s linear infinite',
            },
            keyframes: {
                'pulse-glow': {
                    '0%, 100%': { boxShadow: '0 0 5px rgba(0, 102, 255, 0.4)' },
                    '50%': { boxShadow: '0 0 20px rgba(0, 102, 255, 0.8)' },
                },
                'scan-line': {
                    '0%': { transform: 'translateY(-100%)' },
                    '100%': { transform: 'translateY(100vh)' },
                },
                'data-stream': {
                    '0%': { backgroundPosition: '0% 0%' },
                    '100%': { backgroundPosition: '0% 100%' },
                },
                'float': {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                'shimmer': {
                    '0%': { backgroundPosition: '-200% 0' },
                    '100%': { backgroundPosition: '200% 0' },
                },
            },
            backdropBlur: {
                xs: '2px',
            }
        },
    },
    plugins: [],
}
