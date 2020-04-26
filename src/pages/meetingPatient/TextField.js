import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { TextField, InputAdornment } from '@material-ui/core';
import { IoIosSend } from 'react-icons/all';
import { IconContext } from 'react-icons';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

const styles = () => ({
    root: {
        '& label.Mui-focused': {
            color: '#3b6978',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: '#3b6978',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderWidth: '0px',
            },
            '&.Mui-focused fieldset': {
                borderWidth: '0px',
            },
        },
    },
    input: {
        color: '#204051',
    },
});

const MessageTextField = props => {
    const { value, onChange, classes, onSend } = props;

    return (
        <TextField
            className={`${classes.root} text-field`}
            autoFocus
            placeholder="Type a message"
            fullWidth
            variant="outlined"
            multiline
            rowsMax={4}
            value={value}
            onChange={onChange}
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <OverlayTrigger
                            placement="top"
                            delay={{ show: 250, hide: 10 }}
                            overlay={<Tooltip id={'tooltip'}>Gönder</Tooltip>}
                        >
                            <button className="btn send-btn" onClick={onSend}>
                                <IconContext.Provider
                                    value={{
                                        className: 'send-icon',
                                        size: '30',
                                    }}
                                >
                                    <IoIosSend />
                                </IconContext.Provider>
                            </button>
                        </OverlayTrigger>
                    </InputAdornment>
                ),
                className: classes.input,
            }}
        />
    );
};

export default withStyles(styles)(MessageTextField);
