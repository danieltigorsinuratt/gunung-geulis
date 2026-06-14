import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
                hanken: ['"Hanken Grotesk"', ...defaultTheme.fontFamily.sans],
                mono: ['"JetBrains Mono"', ...defaultTheme.fontFamily.mono],
            },
            colors: {
                primary: {
                    900: '#0F172A',
                    800: '#1E293B',
                    700: '#2563EB',
                    600: '#3B82F6',
                    500: '#60A5FA',
                },
                accent: {
                    light: '#6EE7B7',
                    DEFAULT: '#10B981',
                    dark: '#059669',
                },
                surface: {
                    DEFAULT: '#F9FAFB',
                    border: '#E2E8F0',
                    hover: 'rgba(30, 41, 59, 0.05)',
                },
                table: {
                    header: '#F1F5F9',
                },
            },
        },
    },

    plugins: [forms],
};
