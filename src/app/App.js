import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, NavLink, Route } from 'react-router-dom';
import Profile from '../pages/profile/Profile';
import Home from '../pages/home/Home';
import Login from '../pages/login/Login';
import SignUp from '../pages/signup/SignUp';
import Contact from '../pages/home/Contact';
import Forum from '../pages/forum/Forum';
import AboutUs from '../pages/aboutus/AboutUs';
import Faq from '../pages/faq/Faq';
import * as ROUTES from '../constants/routes';
import Button from '@material-ui/core/Button';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ForumIcon from '@material-ui/icons/Forum';
import DraftsIcon from '@material-ui/icons/Drafts';
import CardMembershipIcon from '@material-ui/icons/CardMembership';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';
import HomeIcon from '@material-ui/icons/Home';
import logo from '../assets/logo/logo.jpg';
import AppsRoundedIcon from '@material-ui/icons/AppsRounded';
import FormatShapesRoundedIcon from '@material-ui/icons/FormatShapesRounded';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

export default function CustomizedMenus() {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Router>
            <div className="navigator">
                <ul className="header">
                    <li>
                        <img src={logo} alt="Logo" width={35} height={35} />
                    </li>
                    <li>
                        <Button
                            aria-controls="customized-menu"
                            aria-haspopup="true"
                            variant="contained"
                            color="primary"
                            onClick={handleClick}
                        >
                            ...
                        </Button>
                        <Menu
                            id="customized-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem>
                                <ListItemIcon>
                                    <HomeIcon fontSize="small" />
                                </ListItemIcon>
                                <NavLink exact to={ROUTES.LANDING}>
                                    <ListItemText primary="Home" />
                                </NavLink>
                            </MenuItem>
                            <MenuItem>
                                <ListItemIcon>
                                    <DraftsIcon fontSize="small" />
                                </ListItemIcon>
                                <NavLink to={ROUTES.SIGN_IN}>
                                    <ListItemText primary="Sign In" />
                                </NavLink>
                            </MenuItem>
                            <MenuItem>
                                <ListItemIcon>
                                    <ForumIcon fontSize="small" />
                                </ListItemIcon>
                                <NavLink to={ROUTES.FORUM}>
                                    <ListItemText primary="Forum" />
                                </NavLink>
                            </MenuItem>
                            <MenuItem>
                                <ListItemIcon>
                                    <CardMembershipIcon fontSize="small" />
                                </ListItemIcon>
                                <NavLink to={ROUTES.SIGN_UP}>
                                    <ListItemText primary="SignUp" />
                                </NavLink>
                            </MenuItem>
                            <MenuItem>
                                <ListItemIcon>
                                    <ContactSupportIcon fontSize="small" />
                                </ListItemIcon>
                                <NavLink to={ROUTES.CONTACT}>
                                    <ListItemText primary="Contact" />
                                </NavLink>
                            </MenuItem>
                            <MenuItem>
                                <ListItemIcon>
                                    <AccountCircleIcon fontSize="small" />
                                </ListItemIcon>
                                <NavLink to={ROUTES.PROFILE}>
                                    <ListItemText primary="Profile" />
                                </NavLink>
                            </MenuItem>
                            <MenuItem>
                                <ListItemIcon>
                                    <FormatShapesRoundedIcon fontSize="small" />
                                </ListItemIcon>
                                <NavLink to={ROUTES.ABOUT_US}>
                                    <ListItemText primary="About Us" />
                                </NavLink>
                            </MenuItem>
                            <MenuItem>
                                <ListItemIcon>
                                    <AppsRoundedIcon fontSize="small" />
                                </ListItemIcon>
                                <NavLink to={ROUTES.FAQ}>
                                    <ListItemText primary=" Frequently Asked Questions" />
                                </NavLink>
                            </MenuItem>
                        </Menu>
                    </li>
                </ul>
                <div className="content">
                    <Route exact path={ROUTES.LANDING} component={Home} />
                    <Route path={ROUTES.SIGN_IN} component={Login} />
                    <Route path={ROUTES.SIGN_UP} component={SignUp} />
                    <Route path={ROUTES.PROFILE} component={Profile} />
                    <Route path={ROUTES.CONTACT} component={Contact} />
                    <Route path={ROUTES.FORUM} component={Forum} />
                    <Route path={ROUTES.ABOUT_US} component={AboutUs} />
                    <Route path={ROUTES.FAQ} component={Faq} />
                </div>
            </div>
        </Router>
    );
}