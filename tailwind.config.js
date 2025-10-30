module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      colors: {
        // --- Brand Palette ---
        brandYellow: '#FFD643',
        'brandYellow-hover': '#FFEB80', // New: For button hover
        'brandYellow-dark': '#eab308', // New: For a dark yellow link
        alertRed: '#FF4C0A',
        alertGreen: '#22C55E', // New: For success messages

        // --- Grays & Neutrals ---
        lightGray: '#EFEFEF',
        mediumGray: '#5B5B5B',
        mutedGray: '#656565',
        accentGray: '#6C6C6C',
        inputBg: '#EDEDED',
        inputBgActive: '#DDDDDD', // New: For active inputs
        darkText: '#1E1E1E',
        tagBg: '#D6D6D6',
        placeholderText: '#727272',
        lightText: '#838383',

        // --- Utility Colors ---
        borderGray: '#C9C9C9',
        lightBorder: '#BDBDBD',
        disabledBg: '#D7D7D7',
        disabledText: '#7F7F7F',
        pageBg: '#F9F9F9',
      },

      borderRadius: {
        xl2: '14px',
      },
      boxShadow: {
        card: '0 6px 12px rgba(0,0,0,0.08)',
        floating: '0 8px 20px rgba(0,0,0,0.18)',
      },
      fontSize: {
        'card-title': '1.05rem',
      },
    },
  },
  plugins: [],
};

