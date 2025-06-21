import React, { useState } from "react";
import {supabase} from "../supabase/client";
import { Container, Paper, Box, Typography, Divider, Link, Avatar } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import TextField from "../components/TextField";
import Button from "../components/Button";

const Register: React.FC = () => {
  const [email, setEmail] = useState("");
  const [Fname, setFname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword){
      alert("Password do not match")
    }

    const { error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    alert("Registration failed: " + error.message);
  } else {
    alert("Registration successful!");
    navigate("/login");
  }
  }

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={6} sx={{ mt: 8, p: 4, borderRadius: 2 }}>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            <PersonAddIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" onSubmit={handleRegister} sx={{ mt: 1 }}>
            <TextField
              margin="dense"
              label="Full Name"
              name="fullName"
              required
              value={Fname}
              onChange={(e) => setFname(e.target.value)}
            />
            <TextField
              margin="dense"
              label="Email"
              name="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="dense"
              label="Password"
              name="password"
              type="password"  
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              margin="dense"
              label="Confirm Password"
              name="confirmPassword"
              type="password" 
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)} 
            />
            <Button type="submit" fullWidth sx={{ mt: 3, mb: 2 }}>
              Register Account
            </Button>
          </Box>
          <Box sx={{ width: '100%', mb: 2 }}>
            <Divider>
              <Typography variant="body2" color="textSecondary">
                or
              </Typography>
            </Divider>
          </Box>
          <Box textAlign="center" mt={2}>
            <Typography variant="body2">
              Already have an account?{" "}
              <Link component={RouterLink} to="/login">
                Login
              </Link>
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default Register;
