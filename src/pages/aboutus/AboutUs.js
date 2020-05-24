import React, { useEffect, useState } from 'react';
import { withFirebase } from '../../_firebase';
import { LoadingPage } from '../../components/Loadings';

const AboutUs = props => {
    const [aboutUs, setAboutUs] = useState('');
    const [psycho, setPsycho] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        props.firebase.getAboutUsInfo().on('value', snapshot => {
            setAboutUs(snapshot.val());
            setLoading(false);
        });
        props.firebase
            .getPsychoPic()
            .getDownloadURL()
            .then(url => {
                setPsycho(url);
                setLoading(false);
            });
    }, [props.firebase]);

    return loading ? (
        <LoadingPage />
    ) : (
        <div className="about-us-page">
            <h2 className="about-us mb-4">ABOUT US</h2>
            <img className="pic mb-4" src={psycho} alt="main" />
            <p className="about-us pb-5">{aboutUs}</p>
        </div>
    );
};

export default withFirebase(AboutUs);
