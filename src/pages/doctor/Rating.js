import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../../assets/styles/pages/doctor.scss';
import Star, { Rate } from '../../assets/starLogo/star';
import { Checkbox, Form } from 'semantic-ui-react';
import * as ROUTES from '../../_constants/routeConstants';
import Firebase from '../../_firebase';

const RatingPage = props => {
    const location = useLocation();
    const { history, firebase } = props;
    const [settingsOpen, setSettingsOpen] = useState(false);
    const [user, setUser] = useState('');
    const [doctorId, setDoctorId] = useState([]);
    const [doctor, setDoctor] = useState([]);
    const [value, setValue] = useState('');

    const handleChange = (e, { value }) => setValue(value);

    useEffect(() => {
        setDoctor(location.state.detail.doctor);
        setUser(location.state.detail.doctor);
        setDoctorId(location.state.detail.doctorId);
    }, [user]);

    const handleSettingShow = () => {
        setSettingsOpen(!settingsOpen);
    };

    const Rating = ({ user }) => {
        let rating = user.rating;
        let star = Star.five_star;
        if (rating === Rate.FIVE) {
            star = Star.five_star;
        } else if (rating === Rate.FOUR) {
            star = Star.four_star;
        } else if (rating === Rate.THREE) {
            star = Star.three_star;
        } else if (rating === Rate.TWO) {
            star = Star.two_star;
        } else if (rating === Rate.ONE) {
            star = Star.one_star;
        } else if (rating === Rate.ZERO) {
            star = Star.zero_star;
        }
        return (
            <img id="starDr" src={star} className="rounded" alt="four_star" />
        );
    };

    const DoctorFrame = ({ user }) => (
        <div id="jumboDrRate" className="jumbotron">
            <div className="row">
                <div className="col-sm-3">
                    <img
                        id="profpic_rate"
                        src={user.profilePictureSource}
                        className="rounded-circle"
                        alt={user.name + ' ' + user.surname}
                    />
                </div>
                <div className="col-sm-3" style={{ paddingTop: 'auto' }}>
                    <h5>{user.name + ' ' + user.surname}</h5>
                </div>
                <div className="col-sm-6">
                    <Rating user={user} />
                </div>
            </div>
        </div>
    );

    const handlingRating = () => {
        let selected_rate = 0;
        if (value === 'five') selected_rate = 5;
        else if (value === 'four') selected_rate = 4;
        else if (value === 'three') selected_rate = 3;
        else if (value === 'two') selected_rate = 2;
        else if (value === 'one') selected_rate = 1;

        let rating = user.rating;

        let totalRate = user.totalRate + selected_rate;
        let rateCount = user.rateCount + 1;

        if (user.totalRate == 0) rating = selected_rate;
        else rating = totalRate / rateCount;

        user.rating = rating;
        user.totalRate = totalRate;
        user.rateCount = rateCount;

        Firebase.dowriteRatingData(doctorId, rating, totalRate, rateCount);
        history.push(ROUTES.LANDING);
    };

    const RateButton = ({ user }) => (
        <div id="jumboDrRate" className="jumbotron">
            <div className="row">
                <div className="col-sm-3">
                    <button
                        type="button"
                        className="btn btn-secondary"
                        data={user}
                        onClick={() => history.push(ROUTES.LANDING)}
                    >
                        IGNORE
                    </button>
                </div>

                <div className="col-sm-5"></div>

                <div className="col-sm-3">
                    <button
                        type="button"
                        className="btn btn-primary"
                        data={user}
                        onClick={handlingRating}
                    >
                        SUBMIT
                    </button>
                </div>
            </div>
        </div>
    );

    const StarRate = props => (
        <div className="row">
            <div className="col-sm-3">
                <img
                    id="star"
                    src={props.srcAddr}
                    className="rounded"
                    alt={props.star}
                />
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

    return user ? (
        <div>
            <h3 id="doctorfound">RATING</h3>
            <div id="containerRate" className="container float">
                <DoctorFrame user={user} />

                <div id="jumboRate" className="jumbotron">
                    <StarRate
                        srcAddr={Star.five_star}
                        star="Five star"
                        number="five"
                    />
                    <StarRate
                        srcAddr={Star.four_star}
                        star="Four star"
                        number="four"
                    />
                    <StarRate
                        srcAddr={Star.three_star}
                        star="Three star"
                        number="three"
                    />
                    <StarRate
                        srcAddr={Star.two_star}
                        star="Two star"
                        number="two"
                    />
                    <StarRate
                        srcAddr={Star.one_star}
                        star="One star"
                        number="one"
                    />
                </div>
                <RateButton user={user} />
            </div>
        </div>
    ) : null;
};

export default RatingPage;
