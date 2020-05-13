import React from 'react';
import { compose } from 'recompose';
import { withAuthorization, withEmailVerification } from '../../_session';
import { useHistory } from 'react-router-dom';

const TestMeetingCreate = props => {
    const { firebase } = props;
    const history = useHistory();

    // TODO delete. these value are served from props
    const userId = props.authUser.uid;
    const doctorId = 'oZk79vdoCANyvFh0IY9yDc0827S2';

    const onClick = () => {
        const meetingId = `${userId}_${doctorId}`;
        firebase
            .meeting(meetingId)
            .once('value')
            .then(snapshot => {
                if (snapshot.val()) {
                    // TODO implement meeting exist between users
                    // Redirect to meeting
                    alert('meeting exist');
                } else {
                    // TODO add success, error handling for promise
                    props.firebase.meetings().child(meetingId).set({
                        userId,
                        doctorId,
                    });
                }
            });
    };

    const goDoctorCalender = () => {
        history.push({
            pathname: '/reservations',
            search: '?doctor-calendar',
            state: { doctorId },
        });
    };

    return (
        <div>
            <button onClick={onClick}>Create Meeting</button>
            <button onClick={goDoctorCalender}>Go Doctor Calender</button>
        </div>
    );
};

const condition = authUser => authUser;

export default compose(
    withEmailVerification,
    withAuthorization(condition)
)(TestMeetingCreate);
