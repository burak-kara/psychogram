import React from 'react';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from '@material-ui/core';

const DialogWindow = props => {
    return (
        <Dialog
            aria-labelledby="customized-dialog-title"
            onClose={props.handleClose}
            open={props.open}
            fullWidth
            maxWidth={props.width ? props.width : 'md'}
        >
            <DialogTitle id="customized-dialog-title">
                {props.title}
            </DialogTitle>
            <DialogContent dividers>{props.content}</DialogContent>
            <DialogActions>{props.actions}</DialogActions>
        </Dialog>
    );
};

export default DialogWindow;
