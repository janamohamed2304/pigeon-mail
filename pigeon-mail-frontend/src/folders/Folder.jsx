import {  useState } from 'react';
import './Folder.css';
import FolderOptions from './FolderOptions';

//////////ICONS///////////
import { SlOptionsVertical } from "react-icons/sl";
import { IoTrashBinOutline } from "react-icons/io5";
import { MdOutlineCheckBoxOutlineBlank, MdOutlineCheckBox } from "react-icons/md";
//////////////////////////



function Folder() {

    const [checked, setChecked] = useState(false);
    const [edit , setEdit] = useState(false);
    const [folderName, setFolderName] = useState("MyNameIsHere");

    const ToggleCheck = () => {
        setChecked((prevState) => !prevState);
    }
    const ToggleEdit = () => {
        setEdit((prevState) => !prevState);
    }

    return (
        <>
            <div className='folder-component'>

                <div className='name'>
                    <div className='check-box' onClick={ToggleCheck}>
                        {checked ?
                            (<MdOutlineCheckBox />)
                        : (<MdOutlineCheckBoxOutlineBlank />)}
                    </div>
                        {folderName}
                </div>
                <div className='icons'><SlOptionsVertical onClick={ToggleEdit}/><IoTrashBinOutline /></div>
            </div>
            <div className='line'></div>

            {edit && <FolderOptions add={false} onClose={ToggleEdit} folderName={folderName} setFolderName={setFolderName} />}
        </>
    );
}

export default Folder;