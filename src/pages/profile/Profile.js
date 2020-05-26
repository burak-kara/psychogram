import React, { useEffect, useState, useCallback, useRef } from 'react';
import PersonalInfo from './PersonalInfo';
import ProfileDetails from './ProfileDetails';
import Settings from './Settings';
import Alert from '../../components/Alert';
import { compose } from 'recompose';
import { withAuthorization } from '../../_session';
import { useHistory, useLocation } from 'react-router-dom';
import DeleteConfirmWindow from './DeleteConfirmWindow';
import ChangePasswordWindow from './ChangePasswordWindow';
import * as ROUTES from '../../_constants/routeConstants';
import CropWindow from './CropWindow';
import { LoadingPage } from '../../components/Loadings';
import * as ROLES from '../../_constants/roles';
import Firebase from '../../_firebase/firebase';

const Profile = props => {
    const { authUser, firebase } = props;
    const history = useHistory();
    const location = useLocation();

    const [settingsOpen, setSettingsOpen] = useState(false);
    const [alertOpen, setAlertsOpen] = useState(false);
    const [delConfOpen, setDelConfOpen] = useState(false);
    const [ChangePassOpen, setChangePassOpen] = useState(false);
    const [uploadOpen, setUploadOpen] = useState(false);

    const [settings, setSettings] = useState(null);
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState('');
    const [user, setUser] = useState(null);
    const [upImg, setUpImg] = useState(null);
    const imgRef = useRef(null);
    const [crop, setCrop] = useState({ unit: 'px', width: 400, aspect: 1 / 1 });
    const [previewUrl, setPreviewUrl] = useState(null);
    const [isOther, setIsOther] = useState(false);

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
    const handleChangePassword = () => {
        setChangePassOpen(true);
    };

    const handlePassConfOpen = () => {
        setDelConfOpen(!ChangePassOpen);
    };
    const ChangePassword = () => {
        firebase.doPasswordReset = email =>
            this.auth.sendPasswordResetEmail(email).then(r => {
                setMessage('Hesap başarıyla silindi kaydedildi.');
                setSeverity('success');
                setAlertsOpen(true);
                history.push({
                    pathname: ROUTES.PROFILE,
                });
            });
    };

    const handleUploadOpen = () => {
        setUploadOpen(!uploadOpen);
        setUpImg(null);
    };

    const handleUploadPhoto = () => {
        firebase
            .profilePic()
            .child(authUser.uid)
            .child('/profile.jpg')
            .put(previewUrl)
            .then(snapshot => {
                snapshot.ref.getDownloadURL().then(url => {
                    firebase
                        .user(authUser.uid)
                        .set({ ...user, profilePictureSource: url });

                    setMessage('Yeni profil fotoğrafı kaydedildi.');
                    setSeverity('success');
                });
            })
            .catch(error => {
                setMessage('Profil fotoğrafı değişirken birhata oluştu!');
                setSeverity('error');
            });
        setAlertsOpen(true);
        setUploadOpen(!uploadOpen);
        setUpImg(null);
    };

    const onSelectFile = e => {
        if (e.target.files && e.target.files.length > 0) {
            const reader = new FileReader();
            reader.addEventListener('load', () => setUpImg(reader.result));
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    const onLoad = useCallback(img => {
        imgRef.current = img;
    }, []);

    const makeClientCrop = async crop => {
        if (imgRef.current && crop.width && crop.height) {
            await createCropPreview(imgRef.current, crop, 'newFile.jpeg');
        }
    };

    const createCropPreview = async (image, crop, fileName) => {
        const canvas = document.createElement('canvas');
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext('2d');

        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height
        );

        return new Promise((resolve, reject) => {
            canvas.toBlob(blob => {
                if (!blob) {
                    reject(new Error('Canvas is empty'));
                    return;
                }
                setPreviewUrl(blob);
            });
        });
    };

    const handleStatusChange = status => {
        firebase.user(`${authUser.uid}/status`).set(status);
    };

    useEffect(() => {
        if (isOtherLink()) {
            if ((isDoctorLink() || isPatientLink()) && isIdExist()) {
                setIsOther(true);
                getAnotherView();
            } else {
                history.push({
                    pathname: ROUTES.NOT_FOUND,
                    state: {
                        info: 'Böyle Bir Kullanıcı Yok',
                        returnPath:
                            authUser.role === ROLES.DOCTOR
                                ? ROUTES.MEETINGS
                                : ROUTES.DOCTOR_LIST,
                        returnText:
                            authUser.role === ROLES.DOCTOR
                                ? 'Meetings'
                                : 'Doctors',
                    },
                });
            }
        } else {
            setIsOther(false);
            getUser();
        }
    }, [authUser, firebase, location]);

    const isOtherLink = () =>
        !!history &&
        !!history.location &&
        !!history.location.search &&
        history.location.search !== '';

    const isDoctorLink = () => history.location.search === '?doctor-profile';

    const isPatientLink = () => history.location.search === '?patient-profile';

    const isIdExist = () => history.location.state && history.location.state.id;

    const getAnotherView = () =>
        firebase.user(history.location.state.id).on('value', snapshot => {
            setUser(snapshot.val());
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
                    <PersonalInfo
                        isOther={isOther}
                        user={user}
                        openSettings={handleSettingShow}
                        handleStatus={handleStatusChange}
                        handleUpload={handleUploadOpen}
                    />
                    <ProfileDetails user={user} history={history} />
                </div>
            </div>
            <Settings
                open={settingsOpen}
                settings={settings}
                handleClose={handleSettingShow}
                handleSave={handleSettingsSave}
                handlePassword={ChangePassword}
                handleDelete={handleProfileDelete}
                onChange={handleSettingsChange}
            />
            <DeleteConfirmWindow
                open={delConfOpen}
                handleClose={handleDelConfOpen}
                handleSave={deleteAccount}
            />
            <ChangePasswordWindow
                open={ChangePassOpen}
                handleClose={handlePassConfOpen}
                handleSave={ChangePassword}
            />
            <CropWindow
                open={uploadOpen}
                handleClose={handleUploadOpen}
                handleSave={handleUploadPhoto}
                onSelectFile={onSelectFile}
                upImg={upImg}
                onLoad={onLoad}
                crop={crop}
                setCrop={setCrop}
                makeClientCrop={makeClientCrop}
            />
            <Alert
                open={alertOpen}
                handleClose={handleAlertClose}
                message={message}
                severity={severity}
            />
        </div>
    ) : (
        <LoadingPage />
    );
};

const condition = authUser =>
    authUser &&
    (authUser.role === ROLES.PATIENT ||
        authUser.role === ROLES.DOCTOR ||
        authUser.role === ROLES.ADMIN);

export default compose(withAuthorization(condition))(Profile);
