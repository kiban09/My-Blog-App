import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { RootState } from '../redux/store';
import { signOutUser } from '../features/auth/authSlice';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { supabase } from '../supabase/client';

const Navbar = () => {
  const user = useAppSelector((state: RootState) => state.auth.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    dispatch(signOutUser());
    navigate('/login');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          component={RouterLink}
          to="/"
          sx={{ flexGrow: 1, color: 'inherit', textDecoration: 'none' }}
        >
          My Blog App
        </Typography>

        <Box>
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
            <Button color="inherit" component={RouterLink} to="/login">
              Login
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
