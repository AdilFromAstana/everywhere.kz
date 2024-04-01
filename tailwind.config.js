/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",

        // Or if using `src` directory:
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            screens: {
                '3xl': '1600px',
            },
            height: {
                '128': '32rem',
            },
            boxShadow: {
                'header': '0px 0px 25px 0px #8E8E8E40',
                'header-mobile': '0px 8px 32px 0px #00000014, 0px 2px 20px 0px #0000000A',
                'footer': '0px 0px 25px 0px #8E8E8E40',
            }
        },
    },
    darkMode: 'class',
    plugins: [
        function ({ addComponents }) {
            addComponents({
                '.container': {
                    maxWidth: '100%',
                    '@screen sm': {
                        maxWidth: '620px',
                    },
                    '@screen md': {
                        maxWidth: '748px',
                    },
                    '@screen lg': {
                        maxWidth: '1004px',
                    },
                    '@screen xl': {
                        maxWidth: '1260px',
                    },
                    '@screen 2xl': {
                        maxWidth: '1260px',
                    },
                }
            })
        }

    ],
}
