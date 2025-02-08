import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './Inbox.css';
import Email from '../inbox/Email';
import axios from 'axios';

function Inbox( {folder,filteredEmails} ) {
  const [emails, setEmails] = useState([]);


  const fetchEmails = async () => {

    try {
      console.log('Fetching emails...'+folder);
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `/api/emails/${folder}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          withCredentials: true
        }
      );
      console.log('Response:', response);
      setEmails(response.data);
    } catch (error) {
      console.error('Error fetching emails:', error);
    }
  };

  useEffect(() => {
    if (filteredEmails.length > 0 && folder === "filtered") {
      setEmails(filteredEmails);
    } else {
      fetchEmails();
    }
  }, [folder]); // Only depend on `folder` to reset when switching views

  const handleReload = () => {
    fetchEmails();
  };

  return (
    <>
      <div className='inbox-header'>
        <div className='selection'>
          <button className='frst-btn'>
            <img src='src/assets/icons/stop.png' alt="select all"/>
          </button>
          <button className='scnd-btn'>
            <img src='src/assets/icons/down-arrow.png' alt="options"/>
          </button>
        </div>
        <button onClick={handleReload}>
          <img src='src/assets/icons/reload.png' alt="reload"/>
        </button>
        <button>
          <img src='src/assets/icons/vertical-dots.png' alt="more"/>
        </button>
      </div>

      <div className='inbox-body'>
        {
          emails.map((email) => (
            <Email key={email.id} email={email} />
          ))
        }
      </div>

    </>
  );
}

Inbox.propTypes = {
  folder: PropTypes.string.isRequired,
  filteredEmails:PropTypes.array.isRequired,
};


export default Inbox;