import React from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../_constants/routeConstants';

const Footer = () => {
    return (
        <div>
            <footer class="fixed-footer">
                <p>
                    <h>Useful Links</h>
                </p>
                <p>
                    <Link
                        id="about-us"
                        className="common-link"
                        to={ROUTES.ABOUT_US}
                    >
                        About us
                    </Link>
                </p>
                <p>
                    <Link
                        id="contact"
                        className="common-link"
                        to={ROUTES.CONTACT}
                    >
                        Contact
                    </Link>
                </p>
                <p>
                    <Link id="faq" className="common-link" to={ROUTES.FAQ}>
                        FAQ
                    </Link>
                </p>
                <p>
                    <Link
                        id="sing-in"
                        className="common-link"
                        to={ROUTES.SIGN_IN}
                    >
                        Sign In
                    </Link>
                </p>
                <p>©Copyright 2020 by CS476. All rights reversed.</p>
            </footer>
        </div>
    );
};
export default Footer;
