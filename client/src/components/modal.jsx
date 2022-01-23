import React from 'react';
import "./modal.css";

const Modal = ({ open, children, onClose }) => {
    if(!open) return null;

    return ( 
        <div className='modal-style'>
            <button className='modal-button' onClick={onClose}>&#9587;</button>
            <p className='label'>Input:</p>
            <p className='content'>
                {children}
            </p>
        </div>
     );
}
 
export default Modal;