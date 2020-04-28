import React, { useEffect, useState } from 'react';
import { withFirebase } from '../../_firebase';
import { Link, withRouter } from 'react-router-dom';

const AboutUs = props => {
    const [aboutUs, setAboutUs] = useState('');
    const [psycho, setPsycho] = useState('');

    useEffect(() => {
        props.firebase.getAboutUsInfo().on('value', snapshot => {
            setAboutUs(snapshot.val());
        });

        props.firebase
            .getPsychoPic()
            .getDownloadURL()
            .then(url => {
                setPsycho(url);
            });
    }, []);

    return (
        <div className="about-us-page">
            <h2 className="about-us mb-4">ABOUT US</h2>
            <img className="pic mb-4" src={psycho} alt="main picture" />
            <p className="about-us pb-5">{aboutUs}</p>
            <footer>
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
            </footer>
        </div>
    );
};

export default withFirebase(AboutUs);
