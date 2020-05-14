import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthUserContext } from '../_session';
import * as ROUTES from '../_constants/routeConstants';
import * as ROLES from '../_constants/roles';
import SignOut from './signPages/sign-out/SignOut';
import { MenuItem, ListItemIcon, Menu } from '@material-ui/core';
import { FaUserAlt, FaSignOutAlt } from 'react-icons/fa';
import { IoIosMore } from 'react-icons/io';
import { IconContext } from 'react-icons';
import { withFirebase } from '../_firebase';

const Navigation = props => (
    <AuthUserContext.Consumer>
        {authUser =>
            authUser ? (
                <>
                    <NavigationAuth
                        authUser={authUser}
                        firebase={props.firebase}
                    />
                </>
            ) : (
                <NavigationNoAuth firebase={props.firebase} />
            )
        }
    </AuthUserContext.Consumer>
);

const NavigationAuth = ({ authUser, firebase }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [logo, setLogo] = useState('');

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        firebase
            .getLogo()
            .getDownloadURL()
            .then(url => {
                setLogo(url);
            });
    }, [firebase]);

    return (
        <nav className="navbar navbar-expand-lg navigator">
            <a className="navbar-brand" href="/">
                <img src={logo} width="50" height="50" alt="" />
            </a>
            {/* TODO  button doesnt work import bootstrap js also add redux as dependency*/}
            <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <a className="nav-link " href={ROUTES.LANDING}>
                            Home
                        </a>
                    </li>

                    {authUser.role === ROLES.PATIENT ||
                    authUser.role === ROLES.DOCTOR ? (
                        <li className="nav-item">
                            <a className="nav-link" href={ROUTES.FORUM}>
                                Forum
                            </a>
                        </li>
                    ) : null}
                    {authUser.role === ROLES.PATIENT ||
                    authUser.role === ROLES.DOCTOR ? (
                        <li className="nav-item">
                            <a className="nav-link" href={ROUTES.MEETINGS}>
                                Meetings
                            </a>
                        </li>
                    ) : null}
                    {authUser.role === ROLES.PATIENT ? (
                        <li className="nav-item">
                            <a className="nav-link" href={ROUTES.DOCTOR_LIST}>
                                Doctors
                            </a>
                        </li>
                    ) : null}
                    {authUser.role === ROLES.DOCTOR ||
                    authUser.role === ROLES.PATIENT ? (
                        <li className="nav-item">
                            <a className="nav-link" href={ROUTES.RESERVATIONS}>
                                Reservations
                            </a>
                        </li>
                    ) : null}
                </ul>
                <ul className="navbar-nav dots">
                    <IconContext.Provider
                        value={{ color: 'white', size: '2em' }}
                    >
                        <div>
                            <IoIosMore onClick={handleClick} />
                        </div>
                    </IconContext.Provider>
                    <Menu
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}
                    >
                        <MenuItem>
                            <ListItemIcon>
                                <FaUserAlt fontSize="small" />
                            </ListItemIcon>
                            <li>
                                <Link
                                    to={
                                        authUser.role === ROLES.DOCTOR ||
                                        authUser.role === ROLES.PATIENT
                                            ? ROUTES.PROFILE
                                            : null
                                    }
                                >
                                    Profile
                                </Link>
                            </li>
                        </MenuItem>

                        {authUser &&
                        authUser.role &&
                        authUser.role === ROLES.ADMIN ? (
                            <MenuItem>
                                <ListItemIcon>
                                    <FaUserAlt fontSize="small" />
                                </ListItemIcon>
                                <li>
                                    <Link to={ROUTES.ADMIN}>Admin</Link>
                                </li>
                            </MenuItem>
                        ) : null}
                        <MenuItem>
                            <ListItemIcon>
                                <FaSignOutAlt fontSize="small" />
                            </ListItemIcon>
                            <li>
                                <SignOut />
                            </li>
                        </MenuItem>
                    </Menu>
                </ul>
            </div>
        </nav>
    );
};
const NavigationNoAuth = ({ firebase }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [logo, setLogo] = useState('');

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        firebase
            .getLogo()
            .getDownloadURL()
            .then(url => {
                setLogo(url);
            });
    }, [firebase]);

    return (
        <nav className="navbar navbar-expand-lg navigator">
            <a className="navbar-brand" href="/">
                <img src={logo} width="50" height="50" alt="" />
            </a>
            {/* TODO  button doesnt work import bootstrap js also add redux as dependency*/}
            <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <a className="nav-link " href={ROUTES.LANDING}>
                            Home
                        </a>
                    </li>
                </ul>
                <ul className="navbar-nav dots">
                    <IconContext.Provider
                        value={{ color: 'white', size: '2em' }}
                    >
                        <div>
                            <IoIosMore onClick={handleClick} />
                        </div>
                    </IconContext.Provider>
                    <Menu
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}
                    >
                        <MenuItem>
                            <ListItemIcon>
                                <FaUserAlt fontSize="small" />
                            </ListItemIcon>
                        </MenuItem>

                        <MenuItem>
                            <ListItemIcon>
                                <FaSignOutAlt fontSize="small" />
                            </ListItemIcon>
                            <li>
                                <Link to={ROUTES.SIGN_IN}>SignIn</Link>
                            </li>
                        </MenuItem>
                    </Menu>
                </ul>
            </div>
        </nav>
    );
};

export default withFirebase(Navigation);
