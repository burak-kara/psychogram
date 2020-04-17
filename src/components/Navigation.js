import React from 'react';
import { Link } from 'react-router-dom';
import { AuthUserContext } from '../_session';
import * as ROUTES from '../_constants/routeConstants';
import * as ROLES from '../_constants/roles';
import SignOut from './signPages/sign-out/SignOut';
import logo from '../assets/logo/logo.jpg';
import { MenuItem, ListItemIcon, Menu } from '@material-ui/core';
import { FaUserAlt, FaSignOutAlt } from 'react-icons/fa';
import { IoIosMore } from 'react-icons/io';
import { IconContext } from 'react-icons';

const Navigation = () => (
    <AuthUserContext.Consumer>
        {authUser =>
            authUser ? (
                <div className="navigator">
                    <ul className="header pl-2 mb-0 align-top">
                        <NavigationAuth authUser={authUser} />
                    </ul>
                </div>
            ) : null
        }
    </AuthUserContext.Consumer>
);

const NavigationAuth = ({ authUser }) => {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <li>
                <img src={logo} alt="Logo" width={35} height={35} />
            </li>
            <li>
                <Link exact to={ROUTES.LANDING}>
                    Home
                </Link>
            </li>
            <li>
                <Link to={ROUTES.CONTACT}>Contact</Link>
            </li>
            <li>
                <Link to={ROUTES.FORUM}>Forum</Link>
            </li>
            <li>
                <Link to={ROUTES.ABOUT_US}>About Us</Link>
            </li>
            <li>
                <Link to={ROUTES.FAQ}>Frequently Asked Questions</Link>
            </li>
            <>
                <IconContext.Provider value={{ color: 'white' }}>
                    <div>
                        <IoIosMore onClick={handleClick} />
                    </div>
                </IconContext.Provider>
                <Menu
                    id="customized-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <MenuItem>
                        <ListItemIcon>
                            <FaUserAlt fontSize="small" />
                        </ListItemIcon>
                        {authUser &&
                        authUser.roles[ROLES.ADMIN] &&
                        authUser.roles[ROLES.ADMIN] === ROLES.ADMIN ? (
                            <li>
                                <Link to={ROUTES.PROFILE}>Profile</Link>
                            </li>
                        ) : null}
                    </MenuItem>
                    <MenuItem>
                        <ListItemIcon>
                            <FaSignOutAlt fontSize="small" />
                        </ListItemIcon>
                        <li>
                            <SignOut />
                        </li>
                    </MenuItem>
                </Menu>
            </>
        </>
    );
};

export default Navigation;
