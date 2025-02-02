import './Compose.css';
import { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';
import { IoMdClose, IoMdAttach } from "react-icons/io";
import axios from 'axios';

const Compose = ({ onClose }) => {
    const [emailData, setEmailData] = useState({
        to: '',
        subject: '',
        message: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setEmailData(prev => ({
            ...prev,
            [id]: value
        }));
    };

    const handleSend = async () => {
        try {
            setLoading(true);
            setError('');
            
            const token = localStorage.getItem('token');
            console.log('Token being sent:', token);
            const response = await axios.post(
                'http://localhost:8080/api/mail/send',
                emailData,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true
                }
            );
            console.log('Response:', response); // Debug log
            if (response.status === 200) {
                onClose();
            }
        } catch (err) {
            console.error('Error sending email:', err);
            setError(err.response?.data?.message || 'Failed to send email');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box id='compose-box'>
            <Box id='compose-header'>
                <span>New Message</span>
                <Box id='icon-close'><IoMdClose onClick={onClose}/></Box>
            </Box>
            
            <Box id='compose-input'>
                <TextField 
                    id='to' 
                    label="To" 
                    type="email" 
                    size="small"
                    value={emailData.to}
                    onChange={handleChange}
                    error={!!error}
                />
                <TextField 
                    id='subject' 
                    label="Subject" 
                    type="text"  
                    size="small"
                    value={emailData.subject}
                    onChange={handleChange}
                />
                <TextField 
                    id='message' 
                    label="Message" 
                    multiline 
                    rows={8}
                    value={emailData.message}
                    onChange={handleChange}
                />
            </Box>
            
            <Box id='tools-box'>
                <Box id='icon-attach'><IoMdAttach /></Box>
                <Button 
                    variant="contained" 
                    onClick={handleSend}
                    disabled={loading}
                >
                    {loading ? 'Sending...' : 'Send'}
                </Button>
            </Box>
            
            {error && (
                <Box sx={{ color: 'error.main', mt: 1, textAlign: 'center' }}>
                    {error}
                </Box>
            )}
        </Box>
    );
};

export default Compose;