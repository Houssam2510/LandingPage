/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // on force <html class="dark"> dans layout.tsx
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
      screens: { '2xl': '1440px' },
    },
    extend: {
      /* Tokens HSL (utilisables via bg-background, text-foreground, etc.) */
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',

        card: 'hsl(var(--card))',
        'card-foreground': 'hsl(var(--card-foreground))',

        popover: 'hsl(var(--popover))',
        'popover-foreground': 'hsl(var(--popover-foreground))',

        primary: 'hsl(var(--primary))',
        'primary-foreground': 'hsl(var(--primary-foreground))',

        secondary: 'hsl(var(--secondary))',
        'secondary-foreground': 'hsl(var(--secondary-foreground))',

        muted: 'hsl(var(--muted))',
        'muted-foreground': 'hsl(var(--muted-foreground))',

        accent: 'hsl(var(--accent))',
        'accent-foreground': 'hsl(var(--accent-foreground))',

        destructive: 'hsl(var(--destructive))',
        'destructive-foreground': 'hsl(var(--destructive-foreground))',

        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
      },

      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
        xl: 'calc(var(--radius) + 4px)',
        '2xl': 'calc(var(--radius) + 8px)',
      },

      boxShadow: {
        'elev-1': '0 1px 2px rgba(0,0,0,.08)',
        'elev-2': '0 6px 24px rgba(0,0,0,.12)',
        neon: '0 0 24px hsl(var(--accent) / .25)',
        'neon-purple': '0 0 8px #B834F1, 0 0 16px #B834F1',
      },

      backgroundImage: {
        'futuristic-radial':
          'radial-gradient(circle at 30% 30%, #B834F1 0%, transparent 70%)',
        'futuristic-stripes':
          'repeating-linear-gradient(45deg, rgba(184,52,241,0.2) 0 10px, transparent 10px 20px)',
      },

      keyframes: {
        'bg-pan': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-2px)' },
        },
        'spin-slow': {
          to: { transform: 'rotate(360deg)' },
        },
      },

      animation: {
        'bg-pan': 'bg-pan 30s ease-in-out infinite',
        shimmer: 'shimmer 1.2s linear infinite',
        float: 'float .9s ease-in-out infinite',
        'spin-slow': 'spin-slow 6s linear infinite',
      },

      // prose (si tu utilises @tailwindcss/typography)
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.foreground'),
            a: { color: theme('colors.accent') },
            code: {
              backgroundColor: theme('colors.muted'),
              padding: '0.2rem 0.35rem',
              borderRadius: '6px',
            },
          },
        },
        invert: {
          css: {
            color: theme('colors.foreground'),
            a: { color: theme('colors.accent') },
            code: { backgroundColor: theme('colors.muted') },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('tailwindcss-animate'),
  ],
};
