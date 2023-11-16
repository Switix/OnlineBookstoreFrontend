/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./public/**/*.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundColor: {
        'bg':{
          DEFAULT:'#181C24',
          200:'#272b33',
          300:"#3f434c"
        } ,
        'primary':{
          DEFAULT:"#3A7BD5",
          200:"#75aaff",
          300:"#e2ffff"
        },
        'accent':{
          DEFAULT:"#FF6B6B",
          200:"#8f001a"
        }
      },
      textColor:{
        "text":{
          DEFAULT:"#ffffff",
          200:"#e0e0e0"
        },
        'primary':{
          DEFAULT:"#3A7BD5",
          200:"#75aaff",
          300:"#e2ffff"
        },
      }
    },
    animation: {
      dropdownOpen: 'dropdownOpenAnimation 0.5s linear forwards',
      dropdownClose: 'dropdownCloseAnimation 0.5s linear forwards',
    },
    keyframes: {
      dropdownOpenAnimation: {
        '0%': { maxHeight: 0 },
        '100%': { maxHeight: 200, visibility:'visible' },
      },
      dropdownCloseAnimation: {
        '0%': { maxHeight: 200 },
        '100%': { maxHeight: 0, visibility:'invisible' },
      },
    },
  },
  plugins: [],
}

