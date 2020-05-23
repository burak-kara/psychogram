import React from 'react';
import DialogWindow from '../../components/DialogWindow';

const EndConfirmWindow = props => {
    const { open, handleClose, handleSave } = props;

    // TODO modify
    const renderContent = () => (
        <div>Görüşmeyi bitirmek istediğinizden emin misiniz? </div>
    );

    const renderActions = () => (
        <>
            <button className="btn btn-secondary" onClick={handleClose}>
                Close
            </button>
            <button className="btn btn-danger" onClick={handleSave}>
                End Meeting
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

export default EndConfirmWindow;
