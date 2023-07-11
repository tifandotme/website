const config = {
  "src/**/*.{js,jsx,ts,tsx}": ["eslint --max-warnings=0 --fix"],
  "*.{js,jsx,ts,tsx,json,yaml,mdx,css}": ["prettier --write"],
}

export default config
