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


function FilterMenu() {
const [anchorEl, setAnchorEl] = useState(null);
const [filterOptions, setFilterOptions] = useState({
    from: '',
    to: '',
    subject: '',
    includeWords: '',
    date: '',
    senders: [],
    receivers: [],
    priority: '',
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

const handleSubmit = () => {
    // Perform search with the selected filter options
    console.log('Applying filter:', filterOptions);
    handleClose();
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
            marginBottom: '5px', // Reduced from 16px
        },
        '& .MuiInputLabel-root': {
            fontSize: '12px',
            top: '-7px', // Added to move label closer to input
            '&.MuiInputLabel-shrink': {
            transform: 'translate(14px, -4px) scale(0.75)', // Adjusted label position when shrunk
            },
        },
        '& .MuiOutlinedInput-root': {
            fontSize: '12px',
            height: '32px',
            marginTop: '2px', // Added to remove top margin
        },
        '& .MuiChip-root': {
            fontSize: '12px',
            height: '24px',
            marginTop: '0px', // Added specific margin for button
        },
        '& .MuiButton-root': {
            fontSize: '12px',
            height: '32px',

        },
        }}
    >
        <Box p={1} >
        <Box display="flex" gap={0.7} >
            <FormControl sx={{  width: '206px' }}>
            <InputLabel>From</InputLabel>
            <TextField
                value={filterOptions.from}
                onChange={(e) => handleFilterChange('from', e.target.value)}
                size="small"
            />
            </FormControl>
            <FormControl sx={{  width: '206px' }}>
            <InputLabel>To</InputLabel>
            <TextField
                value={filterOptions.to}
                onChange={(e) => handleFilterChange('to', e.target.value)}
                size="small"
            />
            </FormControl>
        </Box>
        <Box display="flex" gap={0.7} >
            <FormControl sx={{ width: '206px' }}>
            <InputLabel>Subject</InputLabel>
            <TextField
                value={filterOptions.subject}
                onChange={(e) => handleFilterChange('subject', e.target.value)}
                size="small"
            />
            </FormControl>
            <FormControl sx={{ width: '206px' }}>
            <InputLabel>Includes the words</InputLabel>
            <TextField
                value={filterOptions.includeWords}
                onChange={(e) => handleFilterChange('includeWords', e.target.value)}
                size="small"
            />
            </FormControl>
        </Box>

        <FormControl fullWidth>
            <Box display="flex" alignItems="center" >
            <TextField
                placeholder="Add sender"
                size="small"
                onKeyPress={handleAddSender}
                sx={{ flexGrow: 1 }}
            />
            <IconButton onClick={handleAddSender}>
                {/* <AddIcon fontSize="small" /> */}
            </IconButton>
            </Box>
            <Box
            display="flex"
            flexWrap="wrap"
            gap={1}
            maxHeight="30px"
            overflow="auto"
            >
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
            <Box display="flex" alignItems="center" >
            <TextField
                placeholder="Add receiver"
                size="small"
                onKeyPress={handleAddReceiver}
                sx={{ flexGrow: 1 }}
            />
            <IconButton onClick={handleAddReceiver}>
                {/* <AddIcon fontSize="small" /> */}
            </IconButton>
            </Box>
            <Box
            display="flex"
            flexWrap="wrap"
            gap={1}
            maxHeight="30px"
            overflow="auto"
            >
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
        <Box display="flex" justifyContent="space-between" alignItems="center" >
            <FormControl sx={{ width: '150px' }}>
                <InputLabel>Date within</InputLabel>
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
                <InputLabel>Priority</InputLabel>
                <Select
                value={filterOptions.priority}
                onChange={(e) => handleFilterChange('', e.target.value)}
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

export default FilterMenu;