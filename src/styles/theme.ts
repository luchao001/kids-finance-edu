import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#4CAF50', // 活力绿色
      light: '#81C784',
      dark: '#388E3C',
    },
    secondary: {
      main: '#FFC107', // 温暖黄色
      light: '#FFD54F',
      dark: '#FFA000',
    },
    background: {
      default: '#F5F5F5',
      paper: '#FFFFFF',
    },
  },
  typography: {
    fontFamily: '"Comic Sans MS", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      color: '#2E7D32',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      color: '#1B5E20',
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
      color: '#2E7D32',
    },
    body1: {
      fontSize: '1rem',
      color: '#424242',
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          padding: '8px 24px',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        },
      },
    },
  },
}); 