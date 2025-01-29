import Contact from './Contact';
import './Contacts.css';

function Contacts() {

    console.log("Fetching Contacts.. ");

    return (
        <>
        <div className='contacts-header'>
            <div className='selection'>
                <button  className='frst-btn'><img src='src/assets/icons/stop.png'/></button>
                <button  className='scnd-btn'><img src='src/assets/icons/down-arrow.png'/></button>
            </div>
            <button><img src='src/assets/icons/reload.png'/></button>
            <button><img src='src/assets/icons/vertical-dots.png'/></button>
        </div>
        
        <div className='contacts-body'>
            <Contact/><Contact/><Contact /><Contact/><Contact/>
        </div>
        
        <div className='pagination'>
            <button><img src='src/assets/icons/left.png'/></button>
            <button><img src='src/assets/icons/right.png'/></button>
        </div>

        
        </>
    );
}

export default Contacts;