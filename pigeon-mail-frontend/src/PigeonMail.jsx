import { useState } from 'react';
import './PigeonMail.css';
import Inbox from './inbox/Inbox';
import Compose from './compose/Compose';
import Folders from './folders/Folders';
import FolderOptions from './folders/FolderOptions';
import FilterMenu from './filter-menu/FilterMenue';
import Contacts from './contacts/Contacts';
import { TextField } from '@mui/material';

//////////ICONS///////////
import { FaFolderPlus } from "react-icons/fa";
//////////////////////////


function PigeonMail() {
  const [openInbox, setOpenInbox] = useState(false);
  const [openFolders, setOpenFolders] = useState(false);
  const [openCompose, setOpenCompose] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [views, setViews] = useState({
    inbox: false,
    folders: false,
    compose: false,
    folderoptions: false,
    contacts: false,
  });
  
  function handleViewSwitch(view) {
    setViews({
      inbox: false,
      folders: false,
      compose: false,
      folderoptions: false,
      contacts: false,
      [view]: true,
    });
  }
  


  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <div className='base'>
        <div className='sidebar'>
          <div className='logo'>Pigeon Mail</div>
          <button className='compose-btn' onClick={() => handleViewSwitch('compose')}>
            <img src='src/assets/icons/note.png' alt='compose' />
            <h2>Compose</h2>
          </button>
          <button onClick={() => handleViewSwitch('inbox')}>Inbox</button>
          <button>Starred</button>
          <button>Sent</button>
          <button>Draft</button>
          <button className='folders-btn' onClick={() => handleViewSwitch('folders')}>Folders</button>
          <button onClick={() => handleViewSwitch('contacts')}>Contacts</button>
          <div className='create-folder'>
            Create folder
            <button onClick={() => handleViewSwitch('folderoptions')}><FaFolderPlus /></button>
          </div>
        </div>

        <div className='main'>
          <div className='toolbar'>
            <div className='search-bar'>
              <TextField
                label="Search mail"
                variant="outlined"
                size="small"
                fullWidth
                sx={{
                  '& .MuiInputBase-root': {
                    marginTop: '1px',
                    border: 'none',
                    borderRadius: '20px'
                  },
                  '& .MuiOutlinedInput-notchedOutline': {
                    marginTop: '1px',
                    border: 'none',
                    borderRadius: '20px'
                  }
                }}
              />
              <FilterMenu anchorEl={anchorEl} handleClose={handleClose} />
            </div>
          </div>

          <div className='main-body'>
            {views.inbox && <Inbox onClose={() => handleViewSwitch('')} />}
            {views.compose && <Compose onClose={() => handleViewSwitch('')} />}
            {views.folders && <Folders onClose={() => handleViewSwitch('')} />}
            {views.folderoptions && <FolderOptions add={true} onClose={() => handleViewSwitch('')} />}
            {views.contacts && <Contacts add={true} onClose={() => handleViewSwitch('')} />}
            
          </div>
        </div>
      </div>
    </>
  );
}

export default PigeonMail;