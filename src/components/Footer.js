import React from 'react';
import * as ROUTES from '../_constants/routeConstants';
import { useHistory } from 'react-router-dom';

const Footer = () => {
    const history = useHistory();

    const push = pathname => history.push({ pathname });

    return (
        <div className="footer-container">
            <footer className="fixed-footer">
                <div className="container-fluid h-100">
                    <div className="row h-100">
                        <div className="col link-col">
                            <li
                                className="nav-item"
                                onClick={() => push(ROUTES.ABOUT_US)}
                            >
                                <a>About Us</a>
                            </li>
                        </div>
                        <div className="col link-col">
                            <li
                                className="nav-item"
                                onClick={() => push(ROUTES.CONTACT)}
                            >
                                <a>Contact</a>
                            </li>
                        </div>
                        <div className="col link-col">
                            <li
                                className="nav-item"
                                onClick={() => push(ROUTES.FAQ)}
                            >
                                <a>FAQ</a>
                            </li>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Footer;
