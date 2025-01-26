import { useState } from 'react';
import './PigeonMail.css';
import Inbox from './inbox/Inbox';
import Compose from './compose/Compose';
import FilterMenu from './filter-menu/FilterMenue';
import { TextField } from '@mui/material';

function PigeonMail() {
  const [openInbox, setOpenInbox] = useState(false);
  const [openCompose, setOpenCompose] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);


  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <div className='base'>
        <div className='sidebar'>
          <div className='logo'>Pigeon Mail</div>
          <button className='compose-btn' onClick={() => setOpenCompose(true)}>
            <img src='src/assets/icons/note.png' alt='compose' />
            <h2>Compose</h2>
          </button>
          <button onClick={() => setOpenInbox(true)}>Inbox</button>
          <button>Starred</button>
          <button>Sent</button>
          <button>Draft</button>
          <div className='create-folder'>
            Create folder
            <button><img src='src/assets/icons/plus.png' alt='create folder' /></button>
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
            {openInbox && <Inbox onClose={() => setOpenInbox(false)} />}
            {openCompose && <Compose onClose={() => setOpenCompose(false)} />}
          </div>
        </div>
      </div>
    </>
  );
}

export default PigeonMail;