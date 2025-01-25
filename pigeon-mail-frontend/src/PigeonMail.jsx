import { useState } from 'react';
import './PigeonMail.css'
import Inbox from './inbox/Inbox'
import Compose from './compose/Compose'
import {Drawer} from '@mui/material';

function PigeonMail() {

const [openInbox, setOpenInbox] = useState(false);
const [openCompose, setOpenCompose] = useState(false);

  return (
    <>
    <div className='base'>
      <div className='sidebar'>

              <div className='logo'>Pigeon Mail</div>
              <button className='compose-btn' onClick={() => setOpenCompose(true)}>
                <img src='src/assets/icons/note.png'/>
                <h2>Compose</h2>
              </button>
              <button onClick={() => setOpenInbox(true)}>Inbox</button>
              <button>Starred</button>
              <button>Sent</button>
              <button>Draft</button>
              <div className='create-folder'>Create folder
                <button><img src='src/assets/icons/plus.png'/></button>
              </div>


      </div>

      <div className='main'>

            <div className='toolbar'>
              <div className='search-bar'>
                <input type='text' placeholder='Search mail' />
                <button><img src='src/assets/icons/filter.png'/></button>
              </div>
            </div>

            <div className='main-body'>
              {openInbox && <Inbox onClose={() => setOpenInbox(false)}/>}
              {openCompose && <Compose onClose={() => setOpenCompose(false)}/>}

            </div>

      </div>
    </div>

    </>
  )
}

export default PigeonMail
