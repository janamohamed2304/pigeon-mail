import { Box, TextField, Button, Typography, Link } from '@mui/material';


function SignIn(){

    const handleSignIn = (e) => {
        e.preventDefault();
        alert('Sign-In Successful!');
        // Add your sign-in logic here
    };

    return (
    <Box
    sx={{
        width: 400,
        margin: '50px auto',
        padding: 3,
        boxShadow: 3,
        borderRadius: 2,
        textAlign: 'center',
    }}
    >
    <Typography variant="h4" gutterBottom>
        Sign In
    </Typography>
    <form onSubmit={handleSignIn}>
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
        Sign In
        </Button>
    </form>
    <Typography variant="body2" sx={{ mt: 2 }}>
        Don't have an account?{' '}
        <Link
            component="button"
            // onClick={() => navigate('/signup')}
            underline="hover"
        >
        Sign Up
        </Link>
    </Typography>
    </Box>
    );
};

export default SignIn;
