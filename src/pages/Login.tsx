import React, { useState } from "react";
import {
  Box,
  Typography,
  Container,
  Avatar,
  Paper,
  Link,
} from "@mui/material";
import { Link as RouterLink, useNavigate, Navigate } from "react-router-dom";
import { supabase } from "../supabase/client";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import TextField from "../components/TextField";
import Button from "../components/Button";
import { setUser, setUserProfile } from "../features/auth/authSlice";
import { useAppDispatch } from "../redux/hooks";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const user = useSelector((state: RootState) => state.auth.user);

  if (user) {
    return <Navigate to="/home" replace />;
  }

  const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();

    if (!email || !password) {
      alert("Please enter email or password.");
      return;
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("Login error:", error.message);
      alert("Login failed: " + error.message);
      return;
    }

    if (data.user) {
      dispatch(setUser(data.user));

      const { data: profile } = await supabase
        .from("profiles")
        .select("full_name")
        .eq("id", data.user.id)
        .single();

      if (profile) {
        dispatch(setUserProfile(profile));
      }

      navigate("/");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={6} sx={{ mt: 8, p: 4, borderRadius: 2, backgroundColor: '#1E1E1E'}}>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleLogin} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              label="Email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              label="Password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" fullWidth sx={{ mt: 3, mb: 2 }}>
              Log in
            </Button>
            <Box textAlign="center">
              <Typography variant="body2">
                Don’t have an account?{" "}
                <Link component={RouterLink} to="/Register">
                  Register here
                </Link>
              </Typography>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default LoginPage;
