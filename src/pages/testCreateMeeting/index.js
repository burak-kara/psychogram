import React from 'react';
import { compose } from 'recompose';
import { withAuthorization, withEmailVerification } from '../../_session';

const TestMeetingCreate = props => {
    const { firebase } = props;

    // TODO delete. these value are served from props
    const userId = props.authUser.uid;
    const doctorId = 'dC2wgD4HhbZnWAz4nKwAJlLA8JJ2';

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

    return (
        <div>
            <button onClick={onClick}>Create Meeting</button>
        </div>
    );
};

const condition = authUser => authUser;

export default compose(
    withEmailVerification,
    withAuthorization(condition)
)(TestMeetingCreate);
