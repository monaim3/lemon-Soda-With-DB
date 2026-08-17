/**
 * Tailwind v4 runs as a PostCSS plugin. Nothing else is needed — the theme and
 * which layers are loaded are configured in src/app/globals.css.
 */
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
