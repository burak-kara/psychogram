import React from "react";
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from "@material-ui/core/Snackbar";

const MuiCostumAlert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const Alert = (props) => {
    return (
        <Snackbar
            anchorOrigin={{vertical: "top", horizontal: "right"}}
            open={props.open}
            autoHideDuration={2000}
            onClose={props.handleClose}
        >
            <MuiCostumAlert onClose={props.handleClose} severity={props.severity}>
                {props.message}
            </MuiCostumAlert>
        </Snackbar>
    );
};

export default Alert;