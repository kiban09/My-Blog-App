import React, { useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import AppRoutes from './routes/AppRoutes';
import { useDispatch } from 'react-redux';
import { setUser } from './features/auth/authSlice';
import { supabase } from './supabase/client';

function App() {
  const dispatch = useDispatch();

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
    <>
      <Navbar />
      <AppRoutes />
    </>
  );
}

export default App;
