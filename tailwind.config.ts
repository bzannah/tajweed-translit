import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: 'var(--color-bg)',
        surface: {
          DEFAULT: 'var(--color-surface)',
          hover: 'var(--color-surface-hover)',
          active: 'var(--color-surface-active)',
        },
        sidebar: 'var(--color-sidebar)',
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        muted: 'var(--color-muted)',
        accent: {
          DEFAULT: 'var(--color-accent)',
          green: 'var(--color-accent-green)',
          amber: 'var(--color-accent-amber)',
        },
        border: 'var(--color-border)',
        danger: 'var(--color-danger)',
      },
      width: {
        sidebar: '280px',
      },
      height: {
        topbar: '54px',
        bottombar: '64px',
      },
      spacing: {
        topbar: '54px',
        bottombar: '64px',
        sidebar: '280px',
      },
      zIndex: {
        sidebar: '40',
        overlay: '30',
        panel: '50',
        modal: '60',
      },
    },
  },
  plugins: [],
};

export default config;
