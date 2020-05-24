import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthUserContext } from '../_session';
import * as ROUTES from '../_constants/routeConstants';
import * as ROLES from '../_constants/roles';
import { MenuItem, ListItemIcon, Menu, ListItemText } from '@material-ui/core';
import {
    FaUserAlt,
    FiLogOut,
    IoIosMore,
    FiLogIn,
    FiUserPlus,
} from 'react-icons/all';
import { IconContext } from 'react-icons';
import { withFirebase } from '../_firebase';
import { useHistory } from 'react-router-dom';

const Navigation = props => {
    const getRoleBased = authUser => {
        if (authUser && authUser.role) {
            if (authUser.role === ROLES.PATIENT) {
                return <NavigationPatient firebase={props.firebase} />;
            } else if (authUser.role === ROLES.DOCTOR) {
                return <NavigationDoctor firebase={props.firebase} />;
            } else if (authUser.role === ROLES.ADMIN) {
                return <NavigationAdmin firebase={props.firebase} />;
            } else {
                return <NavigationNoAuth firebase={props.firebase} />;
            }
        } else {
            return <NavigationNoAuth firebase={props.firebase} />;
        }
    };

    return (
        <AuthUserContext.Consumer>
            {authUser => getRoleBased(authUser)}
        </AuthUserContext.Consumer>
    );
};

const NavigationDoctor = ({ firebase }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [logo, setLogo] = useState('');

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        getLogo(firebase).then(url => {
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
                    <li className="nav-item">
                        <a className="nav-link" href={ROUTES.FORUM}>
                            Forum
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href={ROUTES.MEETINGS}>
                            Meetings
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href={ROUTES.RESERVATIONS}>
                            Calendar
                        </a>
                    </li>
                </ul>
                <ul className="navbar-nav dots">
                    <IosMore handleClick={handleClick} />
                    <MenuContent
                        firebase={firebase}
                        anchorEl={anchorEl}
                        onClick={handleClose}
                        setAnchorEl={setAnchorEl}
                    />
                </ul>
            </div>
        </nav>
    );
};

const NavigationPatient = ({ firebase }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [logo, setLogo] = useState('');

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        getLogo(firebase).then(url => {
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
                    <li className="nav-item">
                        <a className="nav-link" href={ROUTES.FORUM}>
                            Forum
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href={ROUTES.MEETINGS}>
                            Meetings
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href={ROUTES.DOCTOR_LIST}>
                            Doctors
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href={ROUTES.RESERVATIONS}>
                            Reservations
                        </a>
                    </li>
                </ul>
                <ul className="navbar-nav dots">
                    <IosMore handleClick={handleClick} />
                    <MenuContent
                        firebase={firebase}
                        anchorEl={anchorEl}
                        onClick={handleClose}
                        setAnchorEl={setAnchorEl}
                    />
                </ul>
            </div>
        </nav>
    );
};

const NavigationAdmin = ({ firebase }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [logo, setLogo] = useState('');

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        getLogo(firebase).then(url => {
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
                        <a className="nav-link " href={ROUTES.ADMIN}>
                            Admin Panel
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href={ROUTES.ADMIN_PASSWORD}>
                            Password Policy
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href={ROUTES.ADMIN_PATIENTS}>
                            All Patients
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href={ROUTES.ADMIN_DOCTORS}>
                            All Doctors
                        </a>
                    </li>
                </ul>
                <ul className="navbar-nav dots">
                    <IosMore handleClick={handleClick} />
                    <MenuContent
                        firebase={firebase}
                        anchorEl={anchorEl}
                        onClick={handleClose}
                        setAnchorEl={setAnchorEl}
                    />
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

    const renderContent = () => (
        <>
            <SignIn onClick={handleClose} />
            <SignUp onClick={handleClose} />
        </>
    );

    useEffect(() => {
        getLogo(firebase).then(url => {
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
                    <IosMore handleClick={handleClick} />
                    <MenuContent
                        firebase={firebase}
                        anchorEl={anchorEl}
                        handleClose={handleClose}
                        setAnchorEl={setAnchorEl}
                        noAuth={true}
                        content={renderContent}
                    />
                </ul>
            </div>
        </nav>
    );
};

const getLogo = firebase => firebase.getLogo().getDownloadURL();

const IosMore = props => (
    <IconContext.Provider value={{ color: 'white', size: '2em' }}>
        <div>
            <IoIosMore onClick={props.handleClick} />
        </div>
    </IconContext.Provider>
);

const MenuContent = props => (
    <Menu
        anchorEl={props.anchorEl}
        keepMounted
        open={Boolean(props.anchorEl)}
        getContentAnchorEl={null}
        onClose={props.handleClose}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
    >
        {props.noAuth ? (
            props.content()
        ) : (
            <>
                <Profile onClick={props.onClick} />
                <SignOut firebase={props.firebase} onClick={props.onClick} />
            </>
        )}
    </Menu>
);

const Profile = props => (
    <MenuItem onClick={props.onClick}>
        <ListItemIcon>
            <FaUserAlt />
        </ListItemIcon>
        <li>
            <Link to={ROUTES.PROFILE}>Profile</Link>
        </li>
    </MenuItem>
);

const SignIn = props => (
    <MenuItem onClick={props.onClick}>
        <ListItemIcon>
            <FiLogIn />
        </ListItemIcon>
        <li>
            <Link to={ROUTES.SIGN_IN}>SignIn</Link>
        </li>
    </MenuItem>
);

const SignUp = props => (
    <MenuItem onClick={props.onClick}>
        <ListItemIcon>
            <FiUserPlus />
        </ListItemIcon>
        <li>
            <Link to={ROUTES.SIGN_UP}>SignUp</Link>
        </li>
    </MenuItem>
);

const SignOut = props => {
    const history = useHistory();

    return (
        <MenuItem onClick={props.onClick}>
            <ListItemIcon>
                <FiLogOut />
            </ListItemIcon>
            <li>
                <div
                    onClick={() => {
                        props.firebase.doSignOut().then(() => {
                            history.push({
                                pathname: ROUTES.LANDING,
                            });
                        });
                    }}
                >
                    Sign Out
                </div>
            </li>
        </MenuItem>
    );
};

export default withFirebase(Navigation);
