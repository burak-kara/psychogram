import React, { useEffect, useState } from 'react';
import { withFirebase } from '../../_firebase';

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

export default withFirebase(AboutUs);
