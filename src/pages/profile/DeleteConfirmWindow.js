import React from 'react';
import DialogWindow from '../../components/DialogWindow';

const DeleteConfirmWindow = props => {
    const { open, handleClose, handleSave } = props;

    // TODO modify
    const renderContent = () => (
        <div>Hesabınızı silmek istediğinizden emin misiniz? </div>
    );

    const renderActions = () => (
        <>
            <button className="btn btn-secondary" onClick={handleClose}>
                Close
            </button>
            <button className="btn btn-danger" onClick={handleSave}>
                Delete
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

export default DeleteConfirmWindow;
