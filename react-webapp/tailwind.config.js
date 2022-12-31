/** @type {import('tailwindcss').Config} */

const colors = require("tailwindcss/colors");
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      animation: {
        text: "text 5s ease infinite",
      },
      keyframes: {
        text: {
          "0%, 100%": {
            "background-size": "200% 200%",
            "background-position": "left center",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "right center",
          },
        },
      },
    },
    fontFamily: {
      CerealBD: ["CerealBD", ...defaultTheme.fontFamily.sans],
      CerealBK: ["CerealBK", ...defaultTheme.fontFamily.sans],
      CerealBlk: ["CerealBlk", ...defaultTheme.fontFamily.sans],
      CerealLt: ["CerealLt", ...defaultTheme.fontFamily.sans],
      CerealMd: ["CerealMd", ...defaultTheme.fontFamily.sans],
      CerealXBd: ["CerealXBd", ...defaultTheme.fontFamily.sans],
    },
    colors: {
      primary: colors.indigo,
      secondary: colors.red,
      white: colors.white,
      // defaults
      slate: colors.slate,
      gray: colors.gray,
      zinc: colors.zinc,
      neutral: colors.neutral,
      stone: colors.stone,
      red: colors.red,
      orange: colors.orange,
      amber: colors.amber,
      yellow: colors.yellow,
      lime: colors.lime,
      green: colors.green,
      emerald: colors.emerald,
      teal: colors.teal,
      cyan: colors.cyan,
      sky: colors.sky,
      blue: colors.blue,
      indigo: colors.indigo,
      violet: colors.violet,
      purple: colors.purple,
      fuchsia: colors.fuchsia,
      pink: colors.pink,
      rose: colors.rose,
    },
  },
  plugins: [],
};
