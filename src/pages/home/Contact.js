import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { withFirebase } from '../../_firebase';

const Contact = () => {
    return (
        <div>
            <h2>GOT QUESTIONS?</h2>
            <p>
                Ask your question to us via e-mail.
                <a href="mailto:info@psychogram.com">Email Me</a>
                <p>
                    <h>Useful Links</h>
                </p>
                <p>
                    <Link
                        id="about-us"
                        className="common-link"
                        to={'/about-us'}
                    >
                        About Us
                    </Link>
                </p>
                <p>
                    <Link id="contact" className="common-link" to={'/contact'}>
                        Contact
                    </Link>
                </p>
                <p>
                    <Link id="faq" className="common-link" to={'/faq'}>
                        FAQ
                    </Link>
                </p>
                <p>
                    <Link id="home" className="common-link" to={''}>
                        Home
                    </Link>
                </p>
                <p>
                    <Link id="home" className="common-link" to={'/sign-in'}>
                        Sign in
                    </Link>
                </p>
            </p>
        </div>
    );
};

export default withFirebase(Contact);
