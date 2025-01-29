import {  useState } from 'react';
import Folder from './Folder';
import FolderOptions from './FolderOptions';
import './Folders.css';


function Folders() {

    const [selectedFolder, setSelectedFolder] = useState(null);

    const [edit , setEdit] = useState(false);

    
    const ToggleEdit = () => {
        setEdit((prevState) => !prevState);
    }


    return (
        <>
        <div className='folders-header'>
            <div className='selection'>
                <button  className='frst-btn'><img src='src/assets/icons/stop.png'/></button>
                <button  className='scnd-btn'><img src='src/assets/icons/down-arrow.png'/></button>
            </div>
            <button><img src='src/assets/icons/reload.png'/></button>
            <button><img src='src/assets/icons/vertical-dots.png'/></button>
        </div>
        
        <div className='folders-list'>
            <Folder /><Folder /><Folder /><Folder /><Folder />
        </div>
        
        <div className='pagination'>
            <button><img src='src/assets/icons/left.png'/></button>
            <button><img src='src/assets/icons/right.png'/></button>
        </div>

        {edit && <FolderOptions add={false} onClose={ToggleEdit}/>}
        </>
    );
}

export default Folders;