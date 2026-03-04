import defaultTheme from 'tailwindcss/defaultTheme'
import tailwindConfig from '@hempworks/pilgrim/tailwind.config'

const primary = {
    500: '#001D3D',
}

/** @type {import('tailwindcss').Config} */
module.exports = {
    presets: [
        tailwindConfig,
    ],

    content: [
        ...tailwindConfig.content,
        './.vitepress/theme/**/*.{vue,js,ts,jsx,tsx}',
        './src/**/*.{md,svg}',
    ],

    theme: {
        extend: {
            colors: { primary },
            fontFamily: {
                sans: ['Nunito Sans', ...defaultTheme.fontFamily.sans],
            },
        },
    },
}
