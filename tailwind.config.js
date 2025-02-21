import { MAIN_COLOR } from './src/core/config/template';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./src/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./node_modules/flowbite/**/*.{js,ts}"
  ],
  theme: {
    extend: {
      colors: {
        white: {
          200: MAIN_COLOR.OPACITY_WHITE,
          400: MAIN_COLOR.LIGHT_WHITE,
          950: MAIN_COLOR.WHITE
        },
        pale: {
          200: MAIN_COLOR.LIGHT_PALE,
          400: MAIN_COLOR.PALE,
          500: MAIN_COLOR.DARK_PALE
        },
        blue: {
          400: MAIN_COLOR.BLUE
        },
        red: {
          200: MAIN_COLOR.LIGHT_RED,
          400: MAIN_COLOR.RED
        },
        green: {
          200: MAIN_COLOR.LIGHT_GREEN,
          400: MAIN_COLOR.GREEN
        },
        orange: {
          200: MAIN_COLOR.LIGHT_ORANGE,
          400: MAIN_COLOR.ORANGE
        },
        black: {
          200: MAIN_COLOR.LIGHTNESS_BLACK,
          400: MAIN_COLOR.LIGHT_BLACK,
          500: MAIN_COLOR.DARK_BLACK,
          950: MAIN_COLOR.BLACK
        }
      },
    },
  },
  variants: {
    display: ['responsive'],
  },
}
