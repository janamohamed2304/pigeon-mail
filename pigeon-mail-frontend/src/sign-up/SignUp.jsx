import React from 'react';
import { Box, TextField, Button, Typography, Link } from '@mui/material';


function SignUp(){
    const handleSignUp = (e) => {
        e.preventDefault();
        alert('Sign-Up Successful!');
        // Add your sign-up logic here
    };

    return (
        <Box
        sx={{
            width: 400,
            margin: '20px auto',
            padding: 3,
            boxShadow: 3,
            borderRadius: 2,
            textAlign: 'center',
        }}
        >
        <Typography variant="h4" gutterBottom>
            Sign Up
        </Typography>
        <form onSubmit={handleSignUp}>
            <TextField
            fullWidth
            label="Name"
            type="text"
            margin="normal"
            required
            />
            <TextField
            fullWidth
            label="Email"
            type="email"
            margin="normal"
            required
            />
            <TextField
            fullWidth
            label="Password"
            type="password"
            margin="normal"
            required
            />
            <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 2 }}
            >
            Sign Up
            </Button>
        </form>
        <Typography variant="body2" sx={{ mt: 2 }}>
            Already have an account?{' '}
            <Link
            component="button"
            // onClick={() => navigate('/')}
            underline="hover"
            >
            Sign In
            </Link>
        </Typography>
        </Box>
    );
};

export default SignUp;
