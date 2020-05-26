import React from 'react';
import DialogWindow from '../../components/DialogWindow';

const RoleUpdateConfWindow = props => {
    const { open, handleClose, handleSave } = props;

    // TODO modify
    const renderContent = () => (
        <div>Bu kullanıcıyı Admin yapmak istediğinizden emin misiniz? </div>
    );

    const renderActions = () => (
        <>
            <button className="btn btn-danger" onClick={handleClose}>
                Close
            </button>
            <button className="btn btn-primary" onClick={handleSave}>
                Save
            </button>
        </>
    );

    return (
        <DialogWindow
            title="Confirm"
            content={renderContent()}
            actions={renderActions()}
            open={open}
            handleClose={handleClose}
            width="sm"
        />
    );
};

export default RoleUpdateConfWindow;
