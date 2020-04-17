import React from 'react';
import { Link } from 'react-router-dom';
import { AuthUserContext } from '../_session';
import * as ROUTES from '../constants/routeConstants';
import * as ROLES from '../constants/roles';

const Navigation = () => (
    <AuthUserContext.Consumer>
        {authUser =>
            authUser ? (
                <div className="navigator">
                    <ul className="header">
                        <NavigationAuth authUser={authUser} />
                    </ul>
                </div>
            ) : null
        }
    </AuthUserContext.Consumer>
);

const NavigationAuth = ({ authUser }) => (
    <>
        <li>
            <Link exact to={ROUTES.LANDING}>
                Home
            </Link>
        </li>
        {authUser &&
        authUser.roles[ROLES.ADMIN] &&
        authUser.roles[ROLES.ADMIN] === ROLES.ADMIN ? (
            <li>
                <Link to={ROUTES.PROFILE}>Profile</Link>
            </li>
        ) : null}
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
    </>
);

export default Navigation;
