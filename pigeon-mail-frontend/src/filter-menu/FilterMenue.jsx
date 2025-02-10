import { useState } from 'react';
import {
Box,
IconButton,
Button,
Menu,
MenuItem,
InputLabel,
Select,
FormControl,
TextField,
Chip,
} from '@mui/material';
import axios from 'axios';
import PropTypes from 'prop-types';

function FilterMenu({setFilteredEmails, setCurrentFolder}) {
const [anchorEl, setAnchorEl] = useState(null);
const [filterOptions, setFilterOptions] = useState({
subject: '',
includeWords: '',
date: '',
priority: '',
senders: [],
receivers: [],
});

const handleClick = (event) => {
setAnchorEl(event.currentTarget);
};

const handleClose = () => {
setAnchorEl(null);
};

const handleFilterChange = (field, value) => {
setFilterOptions((prevOptions) => ({
    ...prevOptions,
    [field]: value,
}));
};

const handleAddSender = (event) => {
if (event.key === 'Enter' || event.type === 'click') {
    setFilterOptions((prevOptions) => ({
    ...prevOptions,
    senders: [...prevOptions.senders, event.target.value],
    }));
    event.target.value = '';
}
};

const handleAddReceiver = (event) => {
if (event.key === 'Enter' || event.type === 'click') {
    setFilterOptions((prevOptions) => ({
    ...prevOptions,
    receivers: [...prevOptions.receivers, event.target.value],
    }));
    event.target.value = '';
}
};

const handleRemoveSender = (index) => {
setFilterOptions((prevOptions) => ({
    ...prevOptions,
    senders: prevOptions.senders.filter((_, i) => i !== index),
}));
};

const handleRemoveReceiver = (index) => {
setFilterOptions((prevOptions) => ({
    ...prevOptions,
    receivers: prevOptions.receivers.filter((_, i) => i !== index),
}));
};

const handleSubmit = async () => {
console.log('Applying filter:', filterOptions);
try {
    const token = localStorage.getItem('token');
    const params = new URLSearchParams();
    
    if (filterOptions.subject) params.append('subject', filterOptions.subject);
    if (filterOptions.includeWords) params.append('includeWords', filterOptions.includeWords);
    if (filterOptions.date) params.append('date', filterOptions.date);
    if (filterOptions.priority) params.append('priority', filterOptions.priority);
    filterOptions.senders.forEach(sender => {
    params.append('senders', sender);
    });
    filterOptions.receivers.forEach(receiver => {
    params.append('receivers', receiver);
    });

    const response = await axios.get(
    `/api/emails/filter?${params.toString()}`,
    {
        headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
        },
        withCredentials: true
    }
    );
    console.log('Filter response:', response.data);
    setFilteredEmails(response.data);
    setCurrentFolder('filtered')
    handleClose();
} catch (error) {
    console.error('Error applying filters:', error);
}
};

return (
<>
    <IconButton onClick={handleClick}>
    <img src="src/assets/icons/filter.png" alt="filter" />
    </IconButton>
    <Menu
    anchorEl={anchorEl}
    open={Boolean(anchorEl)}
    onClose={handleClose}
    anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
    }}
    transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
    }}
    sx={{
        '& .MuiPaper-root': {
        width: '450px',
        marginTop: '40px',
        borderRadius: '8px',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
        maxHeight: '80vh',
        overflow: 'auto',
        },
        '& .MuiMenuItem-root': {
        fontSize: '14px',
        },
        '& .MuiFormControl-root': {
        marginBottom: '5px',
        },
        '& .MuiInputLabel-root': {
        fontSize: '12px',
        top: '-7px',
        '&.MuiInputLabel-shrink': {
            transform: 'translate(14px, -4px) scale(0.75)',
        },
        },
        '& .MuiOutlinedInput-root': {
        fontSize: '12px',
        height: '32px',
        marginTop: '2px',
        },
        '& .MuiChip-root': {
        fontSize: '12px',
        height: '24px',
        marginTop: '0px',
        },
        '& .MuiButton-root': {
        fontSize: '12px',
        height: '32px',
        },
    }}
    >
    <Box p={1}>
        <Box display="flex" gap={0.7}>
        <FormControl sx={{ width: '206px' }}>
            <TextField
            label='subject'
            value={filterOptions.subject}
            onChange={(e) => handleFilterChange('subject', e.target.value)}
            size="small"
            />
        </FormControl>
        <FormControl sx={{ width: '206px' }}>
            <TextField
            label='include the words'
            value={filterOptions.includeWords}
            onChange={(e) => handleFilterChange('includeWords', e.target.value)}
            size="small"
            />
        </FormControl>
        </Box>
        <FormControl fullWidth>
        <Box display="flex" alignItems="center">
            <TextField
            label="add sender"
            size="small"
            onKeyPress={handleAddSender}
            sx={{ flexGrow: 1 }}
            />
            <IconButton onClick={handleAddSender}>
            </IconButton>
        </Box>
        <Box display="flex" flexWrap="wrap" gap={1} maxHeight="30px" overflow="auto">
            {filterOptions.senders.map((sender, index) => (
            <Chip
                key={index}
                label={sender}
                onDelete={() => handleRemoveSender(index)}
                size="small"
            />
            ))}
        </Box>
        </FormControl>
        <FormControl fullWidth>
        <Box display="flex" alignItems="center">
            <TextField
            label="add receiver"
            size="small"
            onKeyPress={handleAddReceiver}
            sx={{ flexGrow: 1 }}
            />
            <IconButton onClick={handleAddReceiver}>
            </IconButton>
        </Box>
        <Box display="flex" flexWrap="wrap" gap={1} maxHeight="30px" overflow="auto">
            {filterOptions.receivers.map((receiver, index) => (
            <Chip
                key={index}
                label={receiver}
                onDelete={() => handleRemoveReceiver(index)}
                size="small"
            />
            ))}
        </Box>
        </FormControl>
        <Box display="flex" justifyContent="space-between" alignItems="center">
        <FormControl sx={{ width: '150px' }}>
            <InputLabel>date within</InputLabel>
            <Select
            value={filterOptions.date}
            onChange={(e) => handleFilterChange('date', e.target.value)}
            size="small"
            >
            <MenuItem value="1 day">1 day</MenuItem>
            <MenuItem value="1 week">1 week</MenuItem>
            <MenuItem value="1 month">1 month</MenuItem>
            </Select>
        </FormControl>
        <FormControl sx={{ width: '150px' }}>
            <InputLabel>priority</InputLabel>
            <Select
            value={filterOptions.priority}
            onChange={(e) => handleFilterChange('priority', e.target.value)}
            size="small"
            >
            <MenuItem value="urgent">urgent</MenuItem>
            <MenuItem value="average">average</MenuItem>
            <MenuItem value="low">low</MenuItem>
            </Select>
        </FormControl>
        <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ height: '32px' }}>
            Search
        </Button>
        </Box>
    </Box>
    </Menu>
</>
);
}

FilterMenu.propTypes = {
setFilteredEmails: PropTypes.func.isRequired,
setCurrentFolder: PropTypes.func.isRequired
};

export default FilterMenu;