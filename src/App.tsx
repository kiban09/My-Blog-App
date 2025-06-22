import React, { useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import AppRoutes from './routes/AppRoutes';
import { useDispatch } from 'react-redux';
import { setUser } from './features/auth/authSlice';
import { supabase } from './supabase/client';

function App() {
  const dispatch = useDispatch();

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      background: {
        default: '#121212',
        paper: '#1E1E1E',
      },
      text: {
        primary: '#FFFFFF',
        secondary: '#B0B0B0',
      },
      primary: {
        main: '#21E6C1',
      },
    },
  });

  useEffect(() => {
    const restoreSession = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (user) {
        dispatch(setUser(user));
      }

      if (error) {
        console.error('Session restore error:', error.message);
      }
    };

    restoreSession();
  }, [dispatch]);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Navbar />
      <AppRoutes />
    </ThemeProvider>
  );
}

export default App;
