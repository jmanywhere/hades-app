import type { Config } from 'tailwindcss'

const config: Config = {
  daisyui:{
    base: false,
    themes:[{
      'hadesTheme':{
        primary: "#F68A1D",
        'secondary' : "#33C5E2",
        'base-100' : "#160A1A"
      }
    }]
  },
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily:{
        inter: ["var(--font-inter)"],
        greek: ["var(--font-greek)"],
        dalek: ["var(--font-dalek)"],
        gideon_roman: ["var(--font-gideon-roman)"],
      }
    },
  },
  plugins: [require("daisyui")],
}
export default config
