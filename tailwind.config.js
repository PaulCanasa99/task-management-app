const { nextui } = require("@nextui-org/react");
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    colors: {
      'white': '#ffffff',
      'bgRed': '#3e3c36',
      'textRed': '#e6b454',
      'bgGreen': '#333c36',
      'textGreen': '#6fb352',
      'bgYellow': '#3f3c36',
      'textYellow': '#e6b454'
    }
  },
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            background: "#222528",
            primary: {
              foreground: "#FFFFFF",
              DEFAULT: "#c95046"
            },
            secondary: {
              DEFAULT: "#2c2f33"
            },
            content1: '#393d41'
          }
        }
      }
    })
  ]
};

