import React from 'react';
import DialogWindow from '../../components/DialogWindow';
import { Typography } from '@material-ui/core';

const Settings = props => {
    const renderContent = () => {
        return (
            <>
                <Typography gutterBottom>
                    Cras mattis consectetur purus sit amet fermentum. Cras justo
                    odio, dapibus ac facilisis in, egestas eget quam. Morbi leo
                    risus, porta ac consectetur ac, vestibulum at eros.
                </Typography>
                <Typography gutterBottom>
                    Praesent commodo cursus magna, vel scelerisque nisl
                    consectetur et. Vivamus sagittis lacus vel augue laoreet
                    rutrum faucibus dolor auctor.
                </Typography>
                <Typography gutterBottom>
                    Aenean lacinia bibendum nulla sed consectetur. Praesent
                    commodo cursus magna, vel scelerisque nisl consectetur et.
                    Donec sed odio dui. Donec ullamcorper nulla non metus auctor
                    fringilla.
                </Typography>
            </>
        );
    };

    const renderActions = () => {
        return (
            <>
                <button
                    className="btn btn-secondary"
                    onClick={props.handleClose}
                >
                    Vazgeç
                </button>
                <button className="btn btn-primary" onClick={props.handleSave}>
                    Kaydet
                </button>
            </>
        );
    };
    return (
        <DialogWindow
            title="Profili Düzenle"
            content={renderContent()}
            actions={renderActions()}
            open={props.open}
            handleClose={props.handleClose}
        />
    );
};

export default Settings;
