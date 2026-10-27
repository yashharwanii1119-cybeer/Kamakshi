/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          // Approved Original Maroon & Deep Burgundy Core Identity
          maroon: '#70152D',
          burgundy: '#360B19',
          crimson: '#C62845',
          solar: '#E44743',
          offwhite: '#FAF8F5',
          blush: '#F5E9EC',
          charcoal: '#191719',
          muted: '#71686B',
          gold: '#E9B85B',

          // Official Kamakshi Traders Secondary Logo Accents
          'logo-gold': '#D4A64A',
          'gold-light': '#F5D985',
          'gold-deep': '#9B6A23',
          'gold-surface': '#F5E9EC',
          'solar-blue': '#263D67',
          'steel-blue': '#7E91B1',
          cyan: '#65E8F4',
          border: '#E8DCE0',
          body: '#423D3F',
          white: '#FFFFFF',
          'deep-charcoal': '#191719',
          slate: '#360B19',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'Plus Jakarta Sans', 'sans-serif'],
        editorial: ['Cabinet Grotesk', 'Playfair Display', 'serif'],
      },
      boxShadow: {
        'glow-crimson': '0 0 35px -5px rgba(198, 40, 69, 0.45)',
        'glow-maroon': '0 0 45px -10px rgba(112, 21, 45, 0.6)',
        'glow-solar': '0 0 25px -3px rgba(228, 71, 67, 0.45)',
        'glow-gold': '0 0 35px -5px rgba(233, 184, 91, 0.45)',
        'glow-cyan': '0 0 25px -3px rgba(101, 232, 244, 0.45)',
        'luxury': '0 20px 40px -15px rgba(54, 11, 25, 0.08), 0 0 1px 1px rgba(112, 21, 45, 0.05)',
        'luxury-dark': '0 25px 50px -12px rgba(54, 11, 25, 0.65), 0 0 1px 1px rgba(198, 40, 69, 0.25)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'solar-radial': 'radial-gradient(circle at 50% 0%, rgba(198, 40, 69, 0.25) 0%, rgba(54, 11, 25, 0.8) 50%, rgba(25, 23, 25, 1) 100%)',
        'burgundy-shimmer': 'linear-gradient(135deg, #70152D 0%, #360B19 60%, #191719 100%)',
        'crimson-flare': 'linear-gradient(90deg, #C62845 0%, #E44743 50%, #E9B85B 100%)',
        'gold-shimmer': 'linear-gradient(135deg, #E9B85B 0%, #F5D985 50%, #9B6A23 100%)',
        'charcoal-gradient': 'linear-gradient(180deg, #191719 0%, #360B19 100%)',
        'solar-blue-gradient': 'linear-gradient(135deg, #263D67 0%, #360B19 100%)',
        'cyan-pulse': 'linear-gradient(90deg, #C62845 0%, #E44743 50%, #65E8F4 100%)',
      },
      animation: {
        'pulse-subtle': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-slow': 'floatSlow 7s ease-in-out infinite',
        'shimmer-beam': 'shimmerBeam 3s ease-in-out infinite',
      },
      keyframes: {
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        shimmerBeam: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(200%)' },
        }
      }
    },
  },
  plugins: [],
}
