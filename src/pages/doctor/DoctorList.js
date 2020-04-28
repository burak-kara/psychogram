import React, { useEffect, useState } from 'react';
import { withAuthorization, withEmailVerification } from '../../_session';
import Star, { Rate } from '../../assets/starLogo/star';
import '../../assets/styles/pages/doctor.scss';
import { compose } from 'recompose';

const DoctorList = props => {
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);

    // for componentDidMount
    useEffect(() => {
        setLoading(true);
        props.firebase
            .users()
            .orderByChild('role')
            .equalTo('DOCTOR')
            .on('value', snapshot => {
                const usersObject = snapshot.val();
                const usersList = Object.keys(usersObject).map(key => ({
                    ...usersObject[key],
                    uid: key,
                }));
                setUsers(usersList);
                setLoading(false);
            });
        return () => {
            props.firebase.users().off();
        };
    }, []);

    const UserList = () => {
        return users.map(user => {
            return <DoctorFrame user={user} />;
        });
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
        return <img id="star" src={star} className="rounded" alt="four_star" />;
    };

    const DoctorFrame = ({ user }) => (
        <div id="containerCSS" className="container">
            <div id="jumboCSS" className="jumbotron">
                <div className="row">
                    <div className="col-sm-2">
                        {/* TODO: link to doctor profile with related userId */}
                        <img
                            id="profpic"
                            src={user.profilePictureSource}
                            className="rounded-circle"
                            alt={user.name + ' ' + user.surname}
                        />
                        <Rating user={user} />
                    </div>
                    <div className="col-sm-2" style={{ paddingTop: 'auto' }}>
                        <h5>{user.name + ' ' + user.surname}</h5>
                        <button type="button" className="btn btn-primary">
                            BOOK
                        </button>
                        {/* TODO: link to patient reservation page with related userId */}
                    </div>
                    <div className="col-sm-6">
                        <h5>About me</h5>
                        <p style={{ paddingRight: '1px' }}>
                            {user.description}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div>
            {!loading && <h3 id="doctorfound">{users.length} Doctors found</h3>}
            <UserList />
        </div>
    );
};

const condition = authUser => authUser;

export default compose(
    withEmailVerification,
    withAuthorization(condition)
)(DoctorList);
