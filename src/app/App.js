import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, NavLink, Route } from 'react-router-dom';
import Profile from '../pages/profile/Profile';
import Home from '../pages/home/Home';
import Login from '../pages/login/Login';
import SignUp from '../pages/signup/SignUp';
import Contact from '../pages/home/Contact';
import Forum from '../pages/forum/Forum';
import AboutUs from '../pages/aboutus/AboutUs';
import Faq from '../pages/faq/Faq';
import * as ROUTES from '../constants/routes';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
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

const StyledMenu = withStyles({
    paper: {
        border: '1px solid #d3d4d5',
    },
})(props => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        {...props}
    />
));

const StyledMenuItem = withStyles(theme => ({
    root: {
        '&:focus': {
            backgroundColor: theme.palette.primary.main,
            '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                color: theme.palette.common.white,
            },
        },
    },
}))(MenuItem);

export default function CustomizedMenus() {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <BrowserRouter>
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
                        <StyledMenu
                            id="customized-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <StyledMenuItem>
                                <ListItemIcon>
                                    <HomeIcon fontSize="small" />
                                </ListItemIcon>
                                <NavLink exact to={ROUTES.LANDING}>
                                    <ListItemText primary="Home" />
                                </NavLink>
                            </StyledMenuItem>
                            <StyledMenuItem>
                                <ListItemIcon>
                                    <DraftsIcon fontSize="small" />
                                </ListItemIcon>
                                <NavLink to={ROUTES.SIGN_IN}>
                                    <ListItemText primary="Sign In" />
                                </NavLink>
                            </StyledMenuItem>
                            <StyledMenuItem>
                                <ListItemIcon>
                                    <ForumIcon fontSize="small" />
                                </ListItemIcon>
                                <NavLink to={ROUTES.FORUM}>
                                    <ListItemText primary="Forum" />
                                </NavLink>
                            </StyledMenuItem>
                            <StyledMenuItem>
                                <ListItemIcon>
                                    <CardMembershipIcon fontSize="small" />
                                </ListItemIcon>
                                <NavLink to={ROUTES.SIGN_UP}>
                                    <ListItemText primary="SignUp" />
                                </NavLink>
                            </StyledMenuItem>
                            <StyledMenuItem>
                                <ListItemIcon>
                                    <ContactSupportIcon fontSize="small" />
                                </ListItemIcon>
                                <NavLink to={ROUTES.CONTACT}>
                                    <ListItemText primary="Contact" />
                                </NavLink>
                            </StyledMenuItem>
                            <StyledMenuItem>
                                <ListItemIcon>
                                    <AccountCircleIcon fontSize="small" />
                                </ListItemIcon>
                                <NavLink to={ROUTES.PROFILE}>
                                    <ListItemText primary="Profile" />
                                </NavLink>
                            </StyledMenuItem>
                            <StyledMenuItem>
                                <ListItemIcon>
                                    <FormatShapesRoundedIcon fontSize="small" />
                                </ListItemIcon>
                                <NavLink to={ROUTES.ABOUT_US}>
                                    <ListItemText primary="About Us" />
                                </NavLink>
                            </StyledMenuItem>
                            <StyledMenuItem>
                                <ListItemIcon>
                                    <AppsRoundedIcon fontSize="small" />
                                </ListItemIcon>
                                <NavLink to={ROUTES.FAQ}>
                                    <ListItemText primary=" Frequently Asked Questions" />
                                </NavLink>
                            </StyledMenuItem>
                        </StyledMenu>
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
        </BrowserRouter>
    );
}