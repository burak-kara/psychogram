import React, { useEffect, useState } from 'react';
import Star from '../../assets/starLogo/star';
import { Checkbox, Form } from 'semantic-ui-react';
import * as ROUTES from '../../_constants/routeConstants';
import { getStar } from '../../_utility/functions';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import { compose } from 'recompose';
import { withAuthorization, withEmailVerification } from '../../_session';
import * as ROLES from '../../_constants/roles';

const RatingPage = props => {
    const { history, firebase } = props;
    const [doctor, setDoctor] = useState(null);
    const [id, setId] = useState('');
    const [value, setValue] = useState(0);

    const useStyles = makeStyles(theme => ({
        large: {
            width: theme.spacing(14),
            height: theme.spacing(14),
        },
    }));

    const classes = useStyles();

    useEffect(() => {
        isDoctorExist()
            ? firebase
                  .user(history.location.state.doctorId)
                  .on('value', snapshot => {
                      setDoctor(snapshot.val());
                      setId(snapshot.key);
                  })
            : history.push(ROUTES.LANDING);
    }, [firebase]);

    const isDoctorExist = () =>
        history &&
        history.location &&
        history.location.state &&
        history.location.state.doctorId;

    const handleChange = (e, { value }) => setValue(value);

    const Rating = () => {
        const star = getStar(Math.round(doctor.rating));
        return <img src={star} className="rounded star-dr" alt="stars" />;
    };

    const DoctorFrame = () => (
        <div className="jumbotron jumbo-dr-rate">
            <div className="row">
                <div className="col-sm-3">
                    <div className="picture-container">
                        <Avatar
                            src={doctor.profilePictureSource}
                            className={classes.large}
                        >
                            {`${doctor.name[0]}${doctor.surname[0]}`}
                        </Avatar>
                    </div>
                </div>
                <div className="col-sm-3" style={{ paddingTop: 'auto' }}>
                    <h5>{doctor.name + ' ' + doctor.surname}</h5>
                </div>
                <div className="col-sm-6">
                    <Rating />
                </div>
            </div>
        </div>
    );

    const StarRate = props => (
        <div className="row">
            <div className="col-sm-3">
                <img src={props.srcAddr} className="rounded star" alt="star" />
            </div>
            <div className="col-sm-3">
                <Form.Field>
                    <Checkbox
                        className="check-box"
                        radio
                        label={props.star}
                        name="checkboxRadioGroup"
                        value={props.number}
                        checked={value === props.number}
                        onChange={handleChange}
                    />
                </Form.Field>
            </div>
        </div>
    );

    const handlingRating = () => {
        const totalRate = doctor.totalRate + value;
        const rateCount = doctor.rateCount + 1;

        const rating = doctor.totalRate === 0 ? value : totalRate / rateCount;

        firebase.user(id).set({
            ...doctor,
            rating,
            totalRate,
            rateCount,
        });
        // TODO implement success message
        history.push(ROUTES.LANDING);
    };

    const RateButton = () => (
        <div className="jumbotron jumbo-dr-rate">
            <div className="row">
                <div className="col-sm-3">
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => history.push(ROUTES.LANDING)}
                    >
                        IGNORE
                    </button>
                </div>
                <div className="col-sm-5" />
                <div className="col-sm-3">
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={handlingRating}
                    >
                        SUBMIT
                    </button>
                </div>
            </div>
        </div>
    );

    return doctor ? (
        <div>
            <h3 className="doctor-found">RATING</h3>
            <div className="container float container-rate">
                <DoctorFrame user={doctor} />
                <div className="jumbotron jumbo-rate">
                    <StarRate
                        srcAddr={Star.five_star}
                        star="Five star"
                        number={5}
                    />
                    <StarRate
                        srcAddr={Star.four_star}
                        star="Four star"
                        number={4}
                    />
                    <StarRate
                        srcAddr={Star.three_star}
                        star="Three star"
                        number={3}
                    />
                    <StarRate
                        srcAddr={Star.two_star}
                        star="Two star"
                        number={2}
                    />
                    <StarRate
                        srcAddr={Star.one_star}
                        star="One star"
                        number={1}
                    />
                </div>
                <RateButton />
            </div>
        </div>
    ) : null;
};

const condition = authUser =>
    authUser &&
    (authUser.role === ROLES.PATIENT || authUser.role === ROLES.ADMIN);

export default compose(
    withEmailVerification,
    withAuthorization(condition)
)(RatingPage);
