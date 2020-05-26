import React, { useEffect, useState, useCallback, useRef } from 'react';
import { withAuthorization, withEmailVerification } from '../../_session';
import '../../assets/styles/pages/doctor.scss';
import { compose } from 'recompose';
import { getStar, snapshotToArray } from '../../_utility/functions';
import * as ROLES from '../../_constants/roles';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';

const AllDoctors = props => {
    const { firebase } = props;
    const [loading, setLoading] = useState(false);
    const [doctors, setDoctors] = useState([]);
    const [value] = useState('Descending');
    const useStyles = makeStyles(theme => ({
        large: {
            width: theme.spacing(14),
            height: theme.spacing(14),
        },
    }));

    const classes = useStyles();

    const handleRole = doctorId => {
        firebase.user(`${doctorId}/role`).set('ADMIN');
    };

    const deleteAccount = doctorId => {
        firebase.user(doctorId).set({});
    };

    useEffect(() => {
        // TODO implement loading indicator here
        setLoading(true);
        firebase
            .users()
            .orderByChild('role')
            .equalTo(ROLES.DOCTOR)
            .on('value', snapshot => {
                setDoctors(snapshotToArray(snapshot));
                setLoading(false);
            });
    }, [value, firebase]);

    const RatingPic = ({ doctor }) => {
        const star = getStar(Math.round(doctor.rating));
        return <img src={star} className="rounded star" alt="stars" />;
    };

    const DoctorFrame = ({ doctor }) => (
        <div className="container frame-container">
            <div className="jumbotron jumbo">
                <div className="row">
                    <div className="col-sm-2">
                        <div className="picture-container">
                            <Avatar
                                src={doctor.profilePictureSource}
                                className={classes.large}
                            ></Avatar>
                        </div>
                        <RatingPic doctor={doctor} />
                    </div>
                    <div className="col-sm-2" style={{ paddingTop: 'auto' }}>
                        <h5>{doctor.name + ' ' + doctor.surname}</h5>
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={() => deleteAccount(doctor.key)}
                        >
                            Ban User
                        </button>
                    </div>
                    <div className="col-sm-6">
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={() => handleRole(doctor.key)}
                        >
                            Assign As Admin
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    const ListDoctors = () => {
        return doctors.map(doctor => <DoctorFrame doctor={doctor} />);
    };

    return (
        <div className="doctor-list">
            {!loading && (
                <h3 className="doctor-found">{`${doctors.length} Doctors found`}</h3>
            )}
            <ListDoctors />
        </div>
    );
};

const condition = authUser => authUser && authUser.role === ROLES.ADMIN;

export default compose(
    withEmailVerification,
    withAuthorization(condition)
)(AllDoctors);
