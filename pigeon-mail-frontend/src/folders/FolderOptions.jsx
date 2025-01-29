import  {  useState } from 'react';
import './FolderOptions.css';


////////////////*ICONS*///////////
import { MdOutlineDone } from "react-icons/md";
import { FaXmark} from "react-icons/fa6";
//////////////////////////////////


function FolderOptions({ add, onClose }) {
    
    const [newFolderName, setNewFolderName] = useState("");

    const addFolder = async () => {
        if (newFolderName.trim() === "") {
            alert("Folder name cannot be empty.");
            return;
        }
        console.log("Adding.. ", newFolderName);
    };


    return (
        <>
        { add ? 
            (<>
                {/* ADD */}
                <div className="add-folder">
                        <input id='add-input' type="text" value={newFolderName} onChange={(e) => setNewFolderName(e.target.value)} placeholder="New Folder Name" maxLength={10} autoFocus />
                        <div className="icons">
                            <div onClick={addFolder} title="Save"> <MdOutlineDone /> </div>
                            <div onClick={onClose} title="Cancel"> <FaXmark /> </div>
                        </div>
                    </div>
            </>)
            : (<>
                {/* EDIT */}
                edit
                {console.log("Editing.. ")}
            </>)
        }
        </>
    );
}

export default FolderOptions;