import React, { useEffect, useState } from 'react';
import { withAuthorization } from '../../_session';
import { compose } from 'recompose';

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
        </div>
    );
};
const condition = authUser => authUser;

export default compose(withAuthorization(condition))(AboutUs);
