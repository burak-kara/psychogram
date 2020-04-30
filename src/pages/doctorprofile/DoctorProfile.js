import React, { useEffect, useState } from 'react';
import DoctorInfo from './DoctorInfo';
import DoctorDetails from './DoctorDetails';
import DoctorSettings from './DoctorSettings';
import Alert from '../../components/Alert';
import { compose } from 'recompose';
import { withAuthorization, withEmailVerification } from '../../_session';
import * as ROLES from '../../_constants/roles';

const DoctorProfile = props => {
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
        }
    }, []);

    return (user = 'DOCTOR' ? (
        <div>
            <div className="container-fluid h-auto patient-profile">
                <div className="row h-auto">
                    <DoctorInfo user={user} openSettings={handleSettingsOpen} />
                    <DoctorDetails user={user} />
                </div>
            </div>
            <DoctorSettings
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
        </div>
    ) : null);
};

const condition = authUser => authUser && authUser.role === ROLES.DOCTOR;

export default compose(
    withEmailVerification,
    withAuthorization(condition)
)(DoctorProfile);
