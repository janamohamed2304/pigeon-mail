import './Compose.css';
import Draggable from 'react-draggable';
import { Box, TextField, Button } from '@mui/material';
import { IoMdClose, IoMdAttach } from "react-icons/io";


const Compose = ({ onClose }) => {

  return (
    <Draggable>
      <Box id='compose-box'>
        {/* Header */}
        <Box id='compose-header'>
          <span>New Message</span>
          <Box id='icon-close'><IoMdClose onClick={onClose}/></Box>
        </Box>

        {/* Input */}
        <Box id='compose-input'>
            <TextField id='input' label="To"        type="email" size="small"/>
            <TextField id='input' label="Subject"   type="text"  size="small"/>
            <TextField id='input' label="Message"   multiline rows={8} />
        </Box>
        {/* Tools */}
        <Box id='tools-box'>
          <Box id='icon-attach'><IoMdAttach /></Box>
          <Button variant="contained" onClick={() => alert('send processed')}>
            Send
          </Button>
        </Box>
      </Box>
    </Draggable>
  )
}

export default Compose;
