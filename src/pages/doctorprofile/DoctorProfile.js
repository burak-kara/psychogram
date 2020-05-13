import React, { useEffect, useState } from 'react';
import DoctorInfo from './DoctorInfo';
import DoctorDetails from './DoctorDetails';
import DoctorSettings from './DoctorSettings';
import Alert from '../../components/Alert';
import { compose } from 'recompose';
import { withAuthorization, withEmailVerification } from '../../_session';

const DoctorProfile = props => {
    const { authUser, firebase } = props;
    const [settingsOpen, setSettingsOpen] = useState(false);
    const [alertOpen, setAlertsOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState('');
    const [user, setUser] = useState(null);
    const [settings, setSettings] = useState(null);

    const handleSettingShow = () => {
        setSettingsOpen(!settingsOpen);
    };

    const handleSettingsChange = event => {
        const name = event.target.name;
        const value =
            name === 'private' ? event.target.checked : event.target.value;
        setSettings({ ...settings, [name]: value });
    };

    const handleSettingsSave = () => {
        setSettingsOpen(false);
        firebase.user(authUser.uid).set(settings, error => {
            if (error) {
                setMessage('Yeni ayarlar kaydedilirken hata oluştu!');
                setSeverity('error');
            } else {
                setMessage('Yeni ayarlar kaydedildi.');
                setSeverity('success');
            }
        });
        setAlertsOpen(true);
    };

    const handleAlertClose = () => {
        setAlertsOpen(false);
    };

    const handleStatusChange = status => {
        firebase.user(`${authUser.uid}/status`).set(status);
    };

    useEffect(() => {
        if (authUser && authUser.uid !== '') {
            firebase.user(authUser.uid).on('value', snapshot => {
                setUser(snapshot.val());
                setSettings(snapshot.val());
            });
        }
    }, [authUser, firebase]);

    return user ? (
        <div>
            <div className="container-fluid h-auto patient-profile">
                <div className="row h-auto">
                    <DoctorInfo
                        user={user}
                        openSettings={handleSettingShow}
                        handleStatus={handleStatusChange}
                    />
                    <DoctorDetails user={user} />
                </div>
            </div>
            <DoctorSettings
                open={settingsOpen}
                settings={settings}
                handleClose={handleSettingShow}
                handleSave={handleSettingsSave}
                onChange={handleSettingsChange}
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

const condition = authUser => authUser;

export default compose(
    withEmailVerification,
    withAuthorization(condition)
)(DoctorProfile);
