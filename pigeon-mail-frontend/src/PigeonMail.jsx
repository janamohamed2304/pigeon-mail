import React, { useState } from 'react';
import './PigeonMail.css'
import Inbox from './inbox/Inbox'
import Compose from './inbox/Compose'
import {Drawer} from '@mui/material';

function PigeonMail() {

const [openInbox, setOpenInbox] = useState(false);
const [openCompose, setOpenCompose] = useState(false);

  return (
    <>
    <div className='base'>

      <div className='sidebar'>
              <button onClick={() => setOpenInbox(true)}>Inbox</button>
              <button onClick={() => setOpenCompose(true)}>Compose</button>

      </div>

      <div className='main'>

            <div className='toolbar'>

            </div>

            <div className='main-body'>
              <Inbox />
              {openCompose && <Compose onClose={() => setOpenCompose(false)}/>}

            </div>

      </div>


    </div>



    </>
  )
}

export default PigeonMail
