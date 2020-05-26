import React, { useEffect, useState } from 'react';
import { withAuthorization, withEmailVerification } from '../../_session';
import { compose } from 'recompose';
import { snapshotToArray } from '../../_utility/functions';
import * as ROLES from '../../_constants/roles';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import { LoadingPage } from '../../components/Loadings';
import { useLocation } from 'react-router-dom';
import DeleteConfirmWindow from './DeleteConfirmWindow';
import Alert from '../../components/Alert';
import RoleUpdateConfWindow from './RoleUpdateConf';

const useStyles = makeStyles(theme => ({
    large: {
        width: theme.spacing(14),
        height: theme.spacing(14),
    },
}));

const Users = props => {
    const { firebase } = props;
    const location = useLocation();
    const classes = useStyles();

    const [loading, setLoading] = useState(false);
    const [patients, setPatients] = useState([]);
    const [delConfOpen, setDelConfOpen] = useState(false);
    const [updateConfOpen, setUpdateConfOpen] = useState(false);
    const [alertOpen, setAlertsOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState('');
    const [tempId, setTempId] = useState('');

    const roleUpdate = () => {
        firebase
            .user(`${tempId}/role`)
            .set('ADMIN')
            .then(() => {
                setMessage('Kullancı rolü başarıyla güncellendi.');
                setSeverity('success');
            })
            .catch(() => {
                setMessage('Kullancı rolü güncellenirken bir hata oluştu!');
                setSeverity('error');
            });
        setAlertsOpen(true);
        handleRoleConfOpen();
    };

    const handleRoleConfOpen = () => {
        setUpdateConfOpen(!updateConfOpen);
    };

    const handleRoleUpdate = id => {
        setTempId(id);
        setUpdateConfOpen(true);
    };

    const deleteAccount = () => {
        firebase
            .user(tempId)
            .set({})
            .then(() => {
                setMessage('Hesap başarıyla silindi.');
                setSeverity('success');
            })
            .catch(() => {
                setMessage('Hesap silinirken bir hata oluştu!');
                setSeverity('error');
            });
        setAlertsOpen(true);
        handleDelConfOpen();
    };

    const handleDelConfOpen = () => {
        setDelConfOpen(!delConfOpen);
    };

    const handleProfileDelete = id => {
        setTempId(id);
        setDelConfOpen(true);
    };

    const handleAlertClose = () => {
        setAlertsOpen(false);
    };

    useEffect(() => {
        const role = getLocation();
        setLoading(true);
        setPatients([]);
        setTempId('');
        firebase
            .users()
            .orderByChild('role')
            .equalTo(role)
            .on('value', snapshot => {
                setPatients(snapshotToArray(snapshot));
                setLoading(false);
            });
    }, [firebase, location]);

    const getLocation = () => {
        if (location.pathname === '/all-patients') {
            return ROLES.PATIENT;
        } else if (location.pathname === '/all-doctors') {
            return ROLES.DOCTOR;
        }
    };

    const Frame = ({ patient }) => (
        <div className="row data-row">
            <div className="col-3 picture-container">
                <Avatar
                    src={patient.profilePictureSource}
                    className={classes.large}
                >
                    {`${patient.name[0]}${patient.surname[0]}`}
                </Avatar>
            </div>
            <div className="col-3 name">
                <div>{patient.name + ' ' + patient.surname}</div>
            </div>
            <div className="col-3 ban">
                <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => handleProfileDelete(patient.key)}
                >
                    Delete User
                </button>
            </div>
            <div className="col-3 admin">
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => handleRoleUpdate(patient.key)}
                >
                    Assign As Admin
                </button>
            </div>
        </div>
    );

    return loading ? (
        <LoadingPage />
    ) : (
        <div className="list-users-page">
            <h3 className="header mb-4">{`${patients.length} Patients found`}</h3>
            <div className="container-fluid">
                {patients.map(patient => (
                    <Frame patient={patient} />
                ))}
            </div>
            <DeleteConfirmWindow
                open={delConfOpen}
                handleClose={handleDelConfOpen}
                handleSave={deleteAccount}
            />
            <RoleUpdateConfWindow
                open={updateConfOpen}
                handleClose={handleRoleConfOpen}
                handleSave={roleUpdate}
            />
            <Alert
                open={alertOpen}
                handleClose={handleAlertClose}
                message={message}
                severity={severity}
            />
        </div>
    );
};

const condition = authUser => authUser && authUser.role === ROLES.ADMIN;

export default compose(
    withEmailVerification,
    withAuthorization(condition)
)(Users);
