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
                    900: '#173901',
                    800: '#2D5016',
                    700: '#396A10',
                    600: '#3E6F15',
                    500: '#4A8518',
                },
                accent: {
                    light: '#B9F38A',
                    DEFAULT: '#B6F087',
                    dark: '#396A10',
                },
                surface: {
                    DEFAULT: '#F8F3EB',
                    border: '#C3C9B9',
                    hover: 'rgba(200, 230, 160, 0.05)',
                },
                table: {
                    header: '#C8E6A0',
                },
            },
        },
    },

    plugins: [forms],
};
