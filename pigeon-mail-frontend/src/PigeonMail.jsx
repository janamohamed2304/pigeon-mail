import { useState } from 'react';
import './PigeonMail.css';
import Inbox from './inbox/Inbox';
import Compose from './compose/Compose';
import Folders from './folders/Folders';
import FolderOptions from './folders/FolderOptions';
import FilterMenu from './filter-menu/FilterMenue';
import Contacts from './contacts/Contacts';
import { TextField } from '@mui/material';
import { FaFolderPlus } from "react-icons/fa";

function PigeonMail() {
  const[filteredEmails,setFilteredEmails] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [views, setViews] = useState({
    inbox: true,
    folders: false,
    compose: false,
    folderoptions: false,
    contacts: false,
  });

  const [currentFolder, setCurrentFolder] = useState('inbox');
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
          <div className='logo'>
            <img src='src/assets/icons/lg.jpeg' alt="logo"/>
            <h3>Mail</h3>
          </div>
          
          <button className='compose-btn' onClick={() => handleViewSwitch('compose')}>
            <img src='src/assets/icons/note.png' alt='compose' />
            <h2>Compose</h2>
          </button>
          
          <button onClick={() => {handleViewSwitch('inbox'); setCurrentFolder('inbox')}}>Inbox</button>
          <button onClick={() => {handleViewSwitch('inbox'); setCurrentFolder('starred')}}>Starred</button>
          <button onClick={() => {handleViewSwitch('inbox'); setCurrentFolder('sent')}}>Sent</button>
          <button onClick={() => {handleViewSwitch('inbox'); setCurrentFolder('draft')}}>Draft</button>
          <button onClick={() => {handleViewSwitch('inbox'); setCurrentFolder('trash')}}>Trash</button>
          <button>Attachments</button>
          <button className='folders-btn' onClick={() => handleViewSwitch('folders')}>
            Folders
          </button>
          <button onClick={() => handleViewSwitch('contacts')}>Contacts</button>
          
          <div className='create-folder'>
            Create folder
            <button onClick={() => handleViewSwitch('folderoptions')}>
              <FaFolderPlus />
            </button>
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
              <FilterMenu  setFilteredEmails={setFilteredEmails} anchorEl={anchorEl} handleClose={handleClose} setCurrentFolder={setCurrentFolder}/>
            </div>
          </div>
          
          <div className='main-body'>
            {views.inbox && <Inbox folder = {currentFolder} filteredEmails={filteredEmails} onClose={() => handleViewSwitch('')} />}
            {views.compose && <Compose onClose={() => handleViewSwitch('')} />}
            {views.folders && <Folders onClose={() => handleViewSwitch('')} />}
            {views.folderoptions && (
              <FolderOptions add={true} onClose={() => handleViewSwitch('')} />
            )}
            {views.contacts && (
              <Contacts add={true} onClose={() => handleViewSwitch('')} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default PigeonMail;