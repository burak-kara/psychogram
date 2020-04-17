import React, { useState } from 'react';
import DialogWindow from './DialogWindow';

const EmailVerification = props => {
    const [isOpen, setOpen] = useState(true);

    const handleClose = () => {
        setOpen(false);
    };

    const renderContent = () => {
        return (
            <>
                {props.isSent ? (
                    <p>
                        Mail gönderildi. Lütfen mailini spam klasörü dahil
                        kontrol et
                    </p>
                ) : (
                    <p>Bu sayfaya ulaşmak için önce mailini onaylamalısın</p>
                )}
            </>
        );
    };

    const renderActions = () => (
        <>
            {props.isSent ? (
                <button
                    className="btn btn-secondary"
                    onClick={() => window.location.reload(true)}
                >
                    Kapat
                </button>
            ) : (
                <button
                    className="btn btn-primary"
                    onClick={props.onClick}
                    disabled={props.isSent}
                >
                    Onay Maili Gönder
                </button>
            )}
        </>
    );

    return (
        <DialogWindow
            title="Mail Onayı"
            content={renderContent()}
            actions={renderActions()}
            open={isOpen}
            handleClose={handleClose}
        />
    );
};

export default EmailVerification;
