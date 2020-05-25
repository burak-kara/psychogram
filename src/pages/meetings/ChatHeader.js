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
        handleEnd,
        setAnchorEl,
        onClick,
        currentReservation,
        handleExportChat,
    } = props;

    return (
        <div className="chat-header">
            <div className="back-container" onClick={onClick}>
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
                            className="btn btn-secondary btn-block d-flex justify-content-around align-items-center"
                            onClick={handleExportChat}
                        >
                            <IconContext.Provider
                                value={{
                                    size: '1.5em',
                                }}
                            >
                                <FaFileExport fontSize="small" />
                            </IconContext.Provider>
                            <div>Export Chat</div>
                        </button>
                    </MenuItem>
                    {authUser.role === ROLES.PATIENT &&
                    currentReservation &&
                    !currentReservation.isEnded ? (
                        <MenuItem onClick={() => setAnchorEl(null)}>
                            <button
                                className="btn btn-danger btn-block d-flex justify-content-around align-items-center"
                                onClick={handleEnd}
                            >
                                <IconContext.Provider
                                    value={{
                                        size: '1.5em',
                                    }}
                                >
                                    <MdCallEnd fontSize="small" />
                                </IconContext.Provider>
                                <div>End Meeting</div>
                            </button>
                        </MenuItem>
                    ) : null}
                </Menu>
            </div>
        </div>
    );
};

export default ChatHeader;
