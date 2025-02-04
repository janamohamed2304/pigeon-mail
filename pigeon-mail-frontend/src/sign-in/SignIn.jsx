import { useState } from 'react';
import { Box, TextField, Button, Typography, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

function SignIn() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSignIn = async (e) => {
        e.preventDefault();
        try {
            setError('');
            setLoading(true);
            console.log('Attempting login with:', formData.email);
            
            const response = await login(formData.email, formData.password);
            console.log('Login successful:', response);
            
            navigate('/dashboard');
        } catch (err) {
            console.error('Login error:', err);
            setError(
                err.response?.data?.message ||
                'Failed to sign in. Please check your credentials and try again.'
            );
        } finally {
            setLoading(false);
        }
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
                    margin="normal"
                    label="Email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label="Password"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                {error && (
                    <Typography color="error" variant="body2" sx={{ mt: 2 }}>
                        {error}
                    </Typography>
                )}
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    disabled={loading}
                >
                    {loading ? 'Signing In...' : 'Sign In'}
                </Button>
                <Typography variant="body2">
                    Don't have an account?{' '}
                    <Link href="/signup" underline="hover">
                        Sign Up
                    </Link>
                </Typography>
            </form>
        </Box>
    );
}

export default SignIn;