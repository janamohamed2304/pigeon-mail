import React, { useEffect, useState } from 'react';
import Foldar from './Folder';
import FoldarOptions from './FolderOptions';
import './Folders.css';


function Foldars() {

    const [selectedFolder, setSelectedFolder] = useState(null);

    const [edit , setEdit] = useState(false);

    
    const ToggleEdit = () => {
        setEdit((prevState) => !prevState);
    }


    return (
        <>
        <div className='inbox-header'>
            <div className='selection'>
                <button  className='frst-btn'><img src='src/assets/icons/stop.png'/></button>
                <button  className='scnd-btn'><img src='src/assets/icons/down-arrow.png'/></button>
            </div>
            <button><img src='src/assets/icons/reload.png'/></button>
            <button><img src='src/assets/icons/vertical-dots.png'/></button>
        </div>
        
        <div className='folders-list'>
            <Foldar /><Foldar /><Foldar /><Foldar /><Foldar /><Foldar /><Foldar /><Foldar /><Foldar />
        
        </div>
        
        <div className='pagination'>
            <button><img src='src/assets/icons/left.png'/></button>
            <button><img src='src/assets/icons/right.png'/></button>
        </div>

        {edit && <FoldarOptions add={false} onClose={ToggleEdit}/>}
        </>
    );
}

export default Foldars;