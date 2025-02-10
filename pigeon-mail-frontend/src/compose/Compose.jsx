import './Compose.css';
import { useState, useEffect, useRef } from 'react';
import { Box, TextField, Button, Chip, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { IoMdClose, IoMdAttach } from "react-icons/io";
import axios from 'axios';

const Compose = ({ onClose }) => {
    const composeRef = useRef(null);
    const generateEmailId = () => `email-${Date.now()}`;

    const [emailData, setEmailData] = useState({
        id: generateEmailId(),
        to: [],
        subject: '',
        message: '',
        priority: 'average',
    });
    const [inputValue, setInputValue] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (composeRef.current && !composeRef.current.contains(event.target)) {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClose]);

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && inputValue.trim()) {
            e.preventDefault();
            const email = inputValue.trim();
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                setError('Invalid email format');
                return;
            }
            if (!emailData.to.includes(email)) {
                setEmailData((prev) => ({
                    ...prev,
                    to: [...prev.to, email]
                }));
                setInputValue('');
                setError('');
            } else {
                setError('Email already added');
            }
        }
    };

    const handleRemoveEmail = (email) => {
        setEmailData((prev) => ({
            ...prev,
            to: prev.to.filter((e) => e !== email)
        }));
    };

    const handleSend = async () => {
        try {
            setLoading(true);
            setError('');
            
            const token = localStorage.getItem('token');
            console.log('Token being sent:', token);
            console.log('Sending email to:', emailData.to);
            console.log('Sending email to:', emailData.priority);
            
            const response = await axios.post(
                'http://localhost:8080/api/email/send',
                emailData,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true
                }
            );
            console.log('Response:', response);

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
        <Box id='compose-box' ref={composeRef}>
            <Box id='compose-header'>
                <span>New Message</span>
                <Box id='icon-close'><IoMdClose onClick={onClose}/></Box>
            </Box>
            
            <Box id='compose-input'>
                <TextField
                    label="To (press Enter to add)"
                    type="text"
                    size="small"
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    error={!!error}
                    helperText={error}
                />
                
                {emailData.to.length > 0 && (
                    <Box
                        sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            maxHeight: '90px',
                            overflowY: 'auto',
                            borderRadius: '5px',
                        }}
                    >
                        {emailData.to.map((email, index) => (
                            <Chip
                                key={index}
                                label={email}
                                onDelete={() => handleRemoveEmail(email)}
                                color="primary"
                            />
                        ))}
                    </Box>
                )}

                <TextField
                    id='subject'
                    label="Subject"
                    type="text"
                    size="small"
                    value={emailData.subject}
                    onChange={(e) => setEmailData({ ...emailData, subject: e.target.value })}
                />
                <TextField
                    id='message'
                    label="Message"
                    multiline
                    rows={8}
                    value={emailData.message}
                    onChange={(e) => setEmailData({ ...emailData, message: e.target.value })}
                />
            </Box>
            
            <Box id='tools-box'>
                <FormControl sx={{ width: '150px', marginRight: 'auto' }}>
                    <InputLabel>Priority</InputLabel>
                    <Select
                        value={emailData.priority}
                        onChange={(e) => setEmailData({ ...emailData, priority: e.target.value })}
                    >
                        <MenuItem value="urgent">urgent</MenuItem>
                        <MenuItem value="average">average</MenuItem>
                        <MenuItem value="low">low</MenuItem>
                    </Select>
                </FormControl>
                <Button id='icon-attach' sx={{alignContent:'center', width:'100px', height:'40px'}}><IoMdAttach /></Button>
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