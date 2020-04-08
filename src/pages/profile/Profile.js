import React, { useEffect, useState } from 'react';
import { withFirebase } from '../../constants/firebase';
import data from '../../assets/demo_data/profile/data';
import PersonalInfo from './PersonalInfo';
import ProfileDetails from './ProfileDetails';
import Settings from './Settings';
import Alert from '../../components/Alert';

const Profile = props => {
    const [settingsOpen, setSettingsOpen] = useState(false);
    const [alertOpen, setAlertsOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState('');
    const [user, setUser] = useState(null);

    const handleSettingsOpen = () => {
        setSettingsOpen(true);
    };

    const handleSettingsClose = () => {
        setSettingsOpen(false);
    };

    const handleSettingsSave = () => {
        setSettingsOpen(false);
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
        props.firebase.getUser().on('value', snapshot => {
            setUser(snapshot.val());
        });
    }, []);

    return user ? (
        <div>
            <div className="container-fluid h-auto patient-profile">
                <div className="row h-auto">
                    <PersonalInfo
                        user={user}
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
                FOOTER
            </div>
        </div>
    ) : null;
};

export default withFirebase(Profile);
