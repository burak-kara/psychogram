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
import CropWindow from './CropWindow';

const Profile = props => {
    const { authUser, firebase } = props;
    const history = useHistory();

    const [settingsOpen, setSettingsOpen] = useState(false);
    const [alertOpen, setAlertsOpen] = useState(false);
    const [delConfOpen, setDelConfOpen] = useState(false);
    const [uploadOpen, setUploadOpen] = useState(false);

    const [settings, setSettings] = useState(null);
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState('');
    const [user, setUser] = useState(null);
    const [upImg, setUpImg] = useState();
    const [photoUrl, setPhotoUrl] = useState(null);
    const [file, setFile] = useState(null);

    const handleSettingShow = () => {
        setSettingsOpen(!settingsOpen);
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

    const handleSettingsChange = event => {
        const name = event.target.name;
        const value =
            name === 'private' ? event.target.checked : event.target.value;
        setSettings({ ...settings, [name]: value });
    };

    const handleAlertClose = () => {
        setAlertsOpen(false);
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

    const handleDelConfOpen = () => {
        setDelConfOpen(!delConfOpen);
    };

    const handleProfileDelete = () => {
        setDelConfOpen(true);
    };

    const handleUploadOpen = () => {
        setUploadOpen(!uploadOpen);
    };

    // TODO implement
    const handleUploadPhoto = () => {
        alert('todo upload');
    };

    const onSelectFile = e => {
        if (e.target.files && e.target.files.length > 0) {
            const reader = new FileReader();
            reader.addEventListener('load', () => setUpImg(reader.result));
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    const handleStatusChange = status => {
        firebase.user(`${authUser.uid}/status`).set(status);
    };

    const handleFile = event => {
        const file = event.target.files[0];
        setFile(file);
        const fileReader = new FileReader();
        fileReader.onloadend = () => {
            setFile(file);
            setPhotoUrl(fileReader.result);
        };
        if (file) {
            fileReader.readAsDataURL(file);
        }
    };

    const handlePhotoSubmit = event => {
        // TODO
        event.preventDefault();
        // const formData = new FormData()
        // formData.append('user[id]', this.props.currentUser.id)
        // formData.append('user[profile_pic]', this.state.photoFile)
        // addPhotoToUser(this.props.currentUser, formData)
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
                            handleUpload={handleUploadOpen}
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
                open={delConfOpen}
                handleClose={handleDelConfOpen}
                handleSave={deleteAccount}
            />
            <CropWindow
                open={uploadOpen}
                handleClose={handleUploadOpen}
                handleSave={handleUploadPhoto}
                onSelectFile={onSelectFile}
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
