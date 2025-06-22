import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { RootState } from '../redux/store';
import { signOutUser, clearProfile } from '../features/auth/authSlice';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { supabase } from '../supabase/client';
import { useLocation } from 'react-router-dom';

const Navbar = () => {
  const user = useAppSelector((state: RootState) => state.auth.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const location = useLocation();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    dispatch(signOutUser());
    dispatch(clearProfile());
    navigate('/login');
  };

  const profile = useAppSelector((state: RootState) => state.auth.profile);

  return (
    <AppBar position="static" sx={{ backgroundColor: '#1A1A1A' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography
          variant="h6"
          component={RouterLink}
          to="/"
          sx={{ flexGrow: 1, color: 'inherit', textDecoration: 'none' }}
        >
          {profile?.full_name ? `Hi, ${profile.full_name.split(' ')[0]}` : 'My Blog App'}
        </Typography>

        <Box sx={{ flex: 1, textAlign: 'right' }}>
          {user ? (
            <>
              <Button color="inherit" component={RouterLink} to="/home" sx={(theme) =>({
          borderBottom: location.pathname === '/home' ? `2px solid ${theme.palette.primary.main}` : 'none',
          borderRadius: 0, mr: 2
        })}>
                Home
              </Button>
              <Button color="inherit" component={RouterLink} to="/trash" sx={(theme) =>({
          borderBottom: location.pathname === '/trash' ? `2px solid ${theme.palette.primary.main}` : 'none',
          borderRadius: 0, mr: 2
        })}>
                Trash
              </Button>
              <Button color="inherit" onClick={handleLogout} sx={{mr: 2}}>
                Logout
              </Button>
            </>
          ) : (
            <>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
