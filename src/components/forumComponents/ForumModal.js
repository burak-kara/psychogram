import React from 'react';

const ForumModal = ({ handleClose, show, children }) => {
    const showHideClassName = show ? 'modal d-block' : 'modal d-none';

    return (
        <div className={showHideClassName}>
            <div className="modal-container">
                {children}
                <button className="modal-btn" onClick={handleClose}>
                    Ok
                </button>
            </div>
        </div>
    );
};

export default ForumModal;
