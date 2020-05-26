import React from 'react';
import DialogWindow from '../../components/DialogWindow';

const PasswordChangeWindow = props => {
    const { open, handleClose, handleSave } = props;

    const renderContent = () => (
        <div>
            Şifrenizi değiştirmek istiyor musunuz? Şifreyi değiştirmek için link
            mail adresinize gönderilicek.
        </div>
    );

    const renderActions = () => (
        <>
            <button className="btn btn-secondary" onClick={handleClose}>
                Close
            </button>
            <button className="btn btn-primary" onClick={handleSave}>
                Change Password
            </button>
        </>
    );

    return (
        <DialogWindow
            title="New Password"
            content={renderContent()}
            actions={renderActions()}
            open={open}
            handleClose={handleClose}
            width="sm"
        />
    );
};

export default PasswordChangeWindow;
