import React from 'react';
import * as ROUTES from '../_constants/routeConstants';

const Footer = () => {
    return (
        <div className="footer-container">
            <footer className="fixed-footer">
                <p>
                    <h>Useful Links</h>
                </p>
                <ul className="footer-links align-left">
                    <li className="nav-item">
                        <a href={ROUTES.ABOUT_US}>About Us</a>
                    </li>
                    <li className="nav-item">
                        <a href={ROUTES.CONTACT}>Contact</a>
                    </li>
                    <li className="nav-item">
                        <a href={ROUTES.FAQ}>FAQ</a>
                    </li>
                </ul>
                <p>©Copyright 2020 by CS476. All rights reversed.</p>
            </footer>
        </div>
    );
};
export default Footer;
