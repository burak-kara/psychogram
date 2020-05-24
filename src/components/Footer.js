import React from 'react';
import * as ROUTES from '../_constants/routeConstants';

const Footer = () => {
    return (
        <div className="footer-container">
            <footer className="fixed-footer">
                <div className="container-fluid h-100">
                    <div className="row h-100">
                        <div className="col link-col">
                            <li className="nav-item">
                                <a href={ROUTES.ABOUT_US}>About Us</a>
                            </li>
                        </div>
                        <div className="col link-col">
                            <li className="nav-item">
                                <a href={ROUTES.CONTACT}>Contact</a>
                            </li>
                        </div>
                        <div className="col link-col ">
                            <li className="nav-item">
                                <a href={ROUTES.FAQ}>FAQ</a>
                            </li>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Footer;
