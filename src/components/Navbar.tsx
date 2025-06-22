import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { RootState } from '../redux/store';
import { signOutUser, clearProfile } from '../features/auth/authSlice';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { supabase } from '../supabase/client';

const Navbar = () => {
  const user = useAppSelector((state: RootState) => state.auth.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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
              <Button color="inherit" component={RouterLink} to="/home">
                Home
              </Button>
              <Button color="inherit" component={RouterLink} to="/trash">
                Trash
              </Button>
              <Button color="inherit" onClick={handleLogout}>
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
