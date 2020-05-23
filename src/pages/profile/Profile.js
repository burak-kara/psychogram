import React, { useEffect, useState } from 'react';
import PersonalInfo from './PersonalInfo';
import ProfileDetails from './ProfileDetails';
import Settings from './Settings';
import Alert from '../../components/Alert';
import { compose } from 'recompose';
import { withAuthorization } from '../../_session';
import { useHistory } from 'react-router-dom';
import DeleteConfirmWindow from './DeleteConfirmWindow';
import * as ROUTES from '../../_constants/routeConstants';

const Profile = props => {
    const { authUser, firebase } = props;
    const history = useHistory();
    const [settingsOpen, setSettingsOpen] = useState(false);
    const [alertOpen, setAlertsOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState('');
    const [user, setUser] = useState(null);
    const [settings, setSettings] = useState(null);
    const [isDelConfOpen, setIsDelConfOpen] = useState(false);

    const handleSettingShow = () => {
        setSettingsOpen(!settingsOpen);
    };

    const handleSettingsChange = event => {
        const name = event.target.name;
        const value =
            name === 'private' ? event.target.checked : event.target.value;
        setSettings({ ...settings, [name]: value });
    };

    const deleteAccount = () => {
        firebase.user(authUser.uid).set({});
        firebase
            .doDelete(authUser.id)
            .then(r => {
                setMessage('Hesap başarıyla silindi kaydedildi.');
                setSeverity('success');
                setAlertsOpen(true);
                history.push({
                    pathname: ROUTES.SIGN_UP,
                });
            })
            .catch(error => {
                setMessage('Hesap silinirken bir hata oluştu!');
                setSeverity('error');
                setAlertsOpen(true);
            });
    };

    const handleProfileDelete = () => {
        setIsDelConfOpen(true);
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

    const handleDelConfOpen = () => {
        setIsDelConfOpen(!isDelConfOpen);
    };

    const handleStatusChange = status => {
        firebase.user(`${authUser.uid}/status`).set(status);
    };

    useEffect(() => {
        // TODO  implement user not found etc
        isAnotherView() ? getAnotherView() : getUser();
    }, [authUser, firebase]);

    const isAnotherView = () =>
        history &&
        history.location &&
        history.location.state &&
        history.location.state.doctorId;

    const getAnotherView = () =>
        firebase.user(history.location.state.id).on('value', snapshot => {
            setUser(snapshot.val());
            setSettings(snapshot.val());
        });

    const getUser = () => {
        if (authUser && authUser.uid !== '') {
            firebase.user(authUser.uid).on('value', snapshot => {
                setUser(snapshot.val());
                setSettings(snapshot.val());
            });
        }
    };

    return user ? (
        <div>
            <div className="container-fluid h-auto patient-profile">
                <div className="row h-auto">
                    {history.location.state ? (
                        <PersonalInfo
                            patient={history.location.state}
                            user={user}
                            openSettings={handleSettingShow}
                            handleStatus={handleStatusChange}
                        />
                    ) : (
                        <PersonalInfo
                            user={user}
                            openSettings={handleSettingShow}
                            handleStatus={handleStatusChange}
                        />
                    )}
                    <ProfileDetails user={user} history={history} />
                </div>
            </div>
            <Settings
                open={settingsOpen}
                settings={settings}
                handleClose={handleSettingShow}
                handleSave={handleSettingsSave}
                handleDelete={handleProfileDelete}
                onChange={handleSettingsChange}
            />
            <DeleteConfirmWindow
                open={isDelConfOpen}
                handleClose={handleDelConfOpen}
                handleSave={deleteAccount}
            />
            <Alert
                open={alertOpen}
                handleClose={handleAlertClose}
                message={message}
                severity={severity}
            />
        </div>
    ) : null;
};

const condition = authUser => authUser;

export default compose(withAuthorization(condition))(Profile);
