import { useState } from 'react';
import './Contact.css';

//////////ICONS///////////
import { SlOptionsVertical } from "react-icons/sl";
import { IoTrashBinOutline } from "react-icons/io5";
import { MdOutlineCheckBoxOutlineBlank, MdOutlineCheckBox } from "react-icons/md";
//////////////////////////


function Contact() {

    const [contactName, setContactName] = useState("IamaCONTACT!");
    const [checked, setChecked] = useState(false);
    const [edit , setEdit] = useState(false);

    const ToggleCheck = () => {
        setChecked((prevState) => !prevState);
    }
    const ToggleEdit = () => {
        setEdit((prevState) => !prevState);
    }

    return (
        <>
        
            <div className='contact-component'>

                <div className='name'>
                    <div className='check-box' onClick={ToggleCheck}>
                        {checked ?
                            (<MdOutlineCheckBox />)
                        : (<MdOutlineCheckBoxOutlineBlank />)}
                    </div>
                        {contactName}
                </div>
                <div className='icons'><SlOptionsVertical onClick={ToggleEdit}/><IoTrashBinOutline /></div>
            </div>
            <div className='line'></div>
        </>
    );
}

export default Contact;