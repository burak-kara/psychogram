import React from 'react';
import DialogWindow from '../../components/DialogWindow';
import { CSVLink } from 'react-csv';

const ChatExportWindow = props => {
    const { open, handleClose, getData, handleEmail } = props;

    const renderContent = () => (
        <div>Kaydetmek istediginiz secenegi seciniz...</div>
    );

    const renderActions = () => (
        <>
            <button className="btn btn-danger" onClick={handleClose}>
                Close
            </button>
            <button className="btn btn-info" onClick={handleEmail}>
                Email
            </button>
            <CSVLink
                data={getData()}
                filename="out.txt"
                className="btn btn-success"
                separator="\n"
            >
                Dosyaya Kaydet
            </CSVLink>
        </>
    );

    return (
        <DialogWindow
            title="Chat Tarihçesi"
            content={renderContent()}
            actions={renderActions()}
            open={open}
            handleClose={handleClose}
            width="sm"
        />
    );
};

export default ChatExportWindow;
