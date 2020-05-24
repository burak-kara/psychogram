import React, { useEffect, useState } from 'react';
import { withAuthorization, withEmailVerification } from '../../_session';
import { compose } from 'recompose';
import { getStar, snapshotToArray } from '../../_utility/functions';
import * as ROUTES from '../../_constants/routeConstants';
import * as ROLES from '../../_constants/roles';
import { makeStyles, Avatar } from '@material-ui/core';
import { Form, Checkbox } from 'semantic-ui-react';
import { LoadingPage } from '../../components/Loadings';

const DoctorList = props => {
    const { history, firebase } = props;
    const [loading, setLoading] = useState(false);
    const [doctors, setDoctors] = useState([]);
    const [value, setValue] = useState('Descending');

    const useStyles = makeStyles(theme => ({
        large: {
            width: theme.spacing(14),
            height: theme.spacing(14),
        },
    }));

    const classes = useStyles();

    const handleChange = (e, { value }) => setValue(value);

    const handleDoctorClick = id => {
        history.push({
            pathname: ROUTES.PROFILE,
            search: '?doctor-profile',
            state: { id },
        });
    };

    const handleBookClick = doctorId => {
        history.push({
            pathname: ROUTES.RESERVATIONS,
            search: '?doctor-calendar',
            state: { doctorId },
        });
    };

    useEffect(() => {
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
                                onClick={() => handleDoctorClick(doctor.key)}
                            >
                                {`${doctor.name[0]}${doctor.surname[0]}`}
                            </Avatar>
                        </div>
                        <RatingPic doctor={doctor} />
                    </div>
                    <div className="col-sm-2" style={{ paddingTop: 'auto' }}>
                        <h5>{doctor.name + ' ' + doctor.surname}</h5>
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={() => handleBookClick(doctor.key)}
                        >
                            BOOK
                        </button>
                    </div>
                    <div className="col-sm-6">
                        <h5>About me</h5>
                        <p style={{ paddingRight: '1px' }}>
                            {doctor.description}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );

    const ListDoctors = () => {
        setDoctors(
            value === 'Ascending'
                ? doctors.sort((a, b) => a.rating - b.rating)
                : doctors.sort((a, b) => b.rating - a.rating)
        );

        return doctors.map(doctor => <DoctorFrame doctor={doctor} />);
    };

    return loading ? (
        <LoadingPage />
    ) : (
        <div className="doctor-list">
            <Form className="doctor-filter">
                <Form.Field>
                    <strong>Sort by rate</strong>
                </Form.Field>
                <Form.Field>
                    <Checkbox
                        radio
                        label=" Ascending"
                        name="checkboxRadioGroup"
                        value="Ascending"
                        checked={value === 'Ascending'}
                        onChange={handleChange}
                    />
                </Form.Field>
                <Form.Field>
                    <Checkbox
                        radio
                        label=" Descending"
                        name="checkboxRadioGroup"
                        value="Descending"
                        checked={value === 'Descending'}
                        onChange={handleChange}
                    />
                </Form.Field>
            </Form>
            {!loading && (
                <h3 className="doctor-found">{`${doctors.length} Doctors found`}</h3>
            )}
            <ListDoctors />
        </div>
    );
};

const condition = authUser => authUser && authUser.role === ROLES.PATIENT;

export default compose(
    withEmailVerification,
    withAuthorization(condition)
)(DoctorList);
