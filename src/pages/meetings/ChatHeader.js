import React from 'react';
import { Menu, MenuItem, Avatar } from '@material-ui/core';
import * as ROLES from '../../_constants/roles';
import { IconContext } from 'react-icons';
import {
    FaFileExport,
    MdCallEnd,
    IoMdArrowRoundBack,
    IoIosMore,
} from 'react-icons/all';

const ChatHeader = props => {
    const {
        authUser,
        user,
        anchorEl,
        handleClick,
        handleClose,
        setAnchorEl,
    } = props;

    return (
        <div className="chat-header">
            <div className="back-container" onClick={props.onClick}>
                <IconContext.Provider value={{ size: '24' }}>
                    <IoMdArrowRoundBack />
                </IconContext.Provider>
            </div>
            <div className="info-container">
                {user ? (
                    <>
                        <Avatar src={user.profilePictureSource}>
                            {`${user.name[0]}${user.surname[0]}`}
                        </Avatar>
                        <div className="col name">
                            <span>{`${user.name} ${user.surname}`}</span>
                        </div>
                    </>
                ) : null}
            </div>
            <div className="dots-container">
                <IconContext.Provider value={{ color: 'white', size: '2em' }}>
                    <div>
                        <IoIosMore onClick={handleClick} />
                    </div>
                </IconContext.Provider>
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    getContentAnchorEl={null}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                >
                    <MenuItem onClick={() => setAnchorEl(null)}>
                        <button
                            className="btn btn-secondary btn-block d-flex justify-content-around"
                            onClick={() => alert('use export handler instead')}
                        >
                            <IconContext.Provider
                                value={{
                                    size: '1.5em',
                                    className: 'export',
                                }}
                            >
                                <FaFileExport fontSize="small" />
                            </IconContext.Provider>
                            Export Chat
                        </button>
                    </MenuItem>
                    {authUser.role === ROLES.PATIENT ? (
                        <MenuItem onClick={() => setAnchorEl(null)}>
                            <button
                                className="btn btn-danger btn-block"
                                onClick={props.handleEnd}
                            >
                                <IconContext.Provider
                                    value={{
                                        size: '1.5em',
                                        className: 'end',
                                    }}
                                >
                                    <MdCallEnd fontSize="small" />
                                </IconContext.Provider>
                                <span>End Meeting</span>
                            </button>
                        </MenuItem>
                    ) : null}
                </Menu>
            </div>
        </div>
    );
};

export default ChatHeader;
