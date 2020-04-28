import React, { useEffect, useState } from 'react';
import PersonalInfo from './PersonalInfo';
import ProfileDetails from './ProfileDetails';
import Settings from './Settings';
import Alert from '../../components/Alert';
import { compose } from 'recompose';
import { withAuthorization, withEmailVerification } from '../../_session';
import * as ROLES from '../../_constants/roles';
import { Link, withRouter } from 'react-router-dom';

const Profile = props => {
    const [settingsOpen, setSettingsOpen] = useState(false);
    const [alertOpen, setAlertsOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState('');
    const [user, setUser] = useState(null);
    const [profilePic, setProfilePic] = useState('');

    const handleSettingsOpen = () => {
        setSettingsOpen(true);
    };

    const handleSettingsClose = () => {
        setSettingsOpen(false);
    };

    const handleSettingsSave = () => {
        setSettingsOpen(false);
        // TODO implement when backend is ready
        if (true) {
            setMessage('Yeni ayarlar kaydedildi.');
            setSeverity('success');
        } else {
            setMessage('Yeni ayarlar kaydedilirken hata oluştu!');
            setSeverity('error');
        }
        setAlertsOpen(true);
    };

    const handleAlertClose = () => {
        setAlertsOpen(false);
    };

    useEffect(() => {
        const uid = JSON.parse(localStorage.getItem('authUser')).uid;
        if (uid !== '') {
            props.firebase.user(uid).on('value', snapshot => {
                setUser(snapshot.val());
            });

            props.firebase
                .getUserProfilePic()
                .getDownloadURL()
                .then(url => {
                    setProfilePic(url);
                });
        }
    }, []);

    return user ? (
        <div>
            <div className="container-fluid h-auto patient-profile">
                <div className="row h-auto">
                    <PersonalInfo
                        user={user}
                        profilePic={profilePic}
                        openSettings={handleSettingsOpen}
                    />
                    <ProfileDetails user={user} />
                </div>
            </div>
            <Settings
                open={settingsOpen}
                handleClose={handleSettingsClose}
                handleSave={handleSettingsSave}
            />
            <Alert
                open={alertOpen}
                handleClose={handleAlertClose}
                message={message}
                severity={severity}
            />
            <div
                className="bg-secondary text-center font-weight-bolder"
                style={{ height: '64px' }}
            >
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
                        <Link
                            id="contact"
                            className="common-link"
                            to={'/contact'}
                        >
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
        </div>
    ) : null;
};

const condition = authUser => authUser && authUser.roles[ROLES.ADMIN];

export default compose(
    withEmailVerification,
    withAuthorization(condition)
)(Profile);
