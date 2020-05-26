import React, { useEffect, useState, useCallback, useRef } from 'react';
import { withAuthorization, withEmailVerification } from '../../_session';
import '../../assets/styles/pages/doctor.scss';
import { compose } from 'recompose';
import { snapshotToArray } from '../../_utility/functions';
import * as ROUTES from '../../_constants/routeConstants';
import * as ROLES from '../../_constants/roles';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '../../components/Alert';
import { useHistory } from 'react-router-dom';

const AllPatients = props => {
    const { firebase } = props;
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [patients, setPatients] = useState([]);
    const [value, setValue] = useState('Descending');

    const useStyles = makeStyles(theme => ({
        large: {
            width: theme.spacing(14),
            height: theme.spacing(14),
        },
    }));

    const classes = useStyles();

    const handleChange = (e, { value }) => setValue(value);

    const handleBookClick = doctorId => {
        history.push({
            pathname: ROUTES.RESERVATIONS,
            search: '?doctor-calendar',
            state: { doctorId },
        });
    };

    const handleRole = patientId => {
        firebase.user(`${patientId}/role`).set('ADMIN');
    };

    const deleteAccount = patientId => {
        firebase.user(patientId).set({});
    };

    useEffect(() => {
        // TODO implement loading indicator here
        setLoading(true);
        firebase
            .users()
            .orderByChild('role')
            .equalTo(ROLES.PATIENT)
            .on('value', snapshot => {
                setPatients(snapshotToArray(snapshot));
                setLoading(false);
            });
    }, [value, firebase]);

    const PatientFrame = ({ patient }) => (
        <div className="container frame-container">
            <div className="jumbotron jumbo">
                <div className="row">
                    <div className="col-sm-2">
                        <div className="picture-container">
                            <Avatar
                                src={patient.profilePictureSource}
                                className={classes.large}
                            ></Avatar>
                        </div>
                    </div>
                    <div className="col-sm-2" style={{ paddingTop: 'auto' }}>
                        <h5>{patient.name + ' ' + patient.surname}</h5>
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={() => deleteAccount(patient.key)}
                        >
                            Delete
                        </button>
                    </div>
                    <div className="col-sm-6">
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={() => handleRole(patient.key)}
                        >
                            Assign As Admin
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    const ListPatients = () => {
        return patients.map(patient => <PatientFrame patient={patient} />);
    };

    return (
        <div className="doctor-list">
            {!loading && (
                <h3 className="doctor-found">{`${patients.length} Patients found`}</h3>
            )}
            <ListPatients />
        </div>
    );
};

const condition = authUser => authUser && authUser.role === ROLES.ADMIN;

export default compose(
    withEmailVerification,
    withAuthorization(condition)
)(AllPatients);
