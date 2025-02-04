import { useState } from 'react';
import { Box, TextField, Button, Typography, Link, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

function SignUp() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    
    const navigate = useNavigate();
    const { signup } = useAuth();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            setError('');
            setLoading(true);
            console.log('Attempting signup with:', formData);
            
            const response = await signup(formData.name, formData.email, formData.password);
            console.log('Signup successful:', response);
            
            navigate('/');
        } catch (err) {
            console.error('Signup error full details:', err);
            setError(
                err.response?.data?.message ||
                'Failed to create an account. Please check your connection and try again.'
            );
        } finally {
            setLoading(false);
        }
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

            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            )}

            <form onSubmit={handleSignUp}>
                <TextField
                    fullWidth
                    label="Name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    margin="normal"
                    required
                    autoComplete="name"
                />
                <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    margin="normal"
                    required
                    autoComplete="email"
                />
                <TextField
                    fullWidth
                    label="Password"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    margin="normal"
                    required
                    autoComplete="new-password"
                />
                <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    disabled={loading}
                    sx={{ mt: 2 }}
                >
                    {loading ? 'Signing Up...' : 'Sign Up'}
                </Button>
            </form>
            <Typography variant="body2" sx={{ mt: 2 }}>
                Already have an account?{' '}
                <Link
                    component="button"
                    onClick={() => navigate('/')}
                    underline="hover"
                >
                    Sign In
                </Link>
            </Typography>
        </Box>
    );
}

export default SignUp;