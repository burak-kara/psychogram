import React from 'react';
import { compose } from 'recompose';
import { withAuthorization, withEmailVerification } from '../../_session';
import { getKeys } from '../../_utility/functions';

const TestMeetingCreate = props => {
    const userId = props.authUser.uid;
    const doctorId = 'dC2wgD4HhbZnWAz4nKwAJlLA8JJ2';

    const onClick = () => {
        if (isExistMeeting()) {
            //    TODO redirect existing meeting
            alert('meeting exist');
        } else {
            createMeeting();
        }
    };

    const isExistMeeting = () => {
        let patientMeetings = null,
            doctorMeetings = null;
        props.firebase.getUserMeetings(userId).on('value', snapshot => {
            patientMeetings = getKeys(snapshot.val());
        });
        props.firebase.getUserMeetings(doctorId).on('value', snapshot => {
            doctorMeetings = getKeys(snapshot.val());
        });

        if (!patientMeetings || !doctorMeetings) return false;

        return patientMeetings.some(item => doctorMeetings.includes(item));
    };

    const createMeeting = () => {
        const { key } = props.firebase.meetings().push({
            userId,
            doctorId,
        });

        let updates = {
            [`users/${userId}/meetings/${key}`]: true,
            [`users/${doctorId}/meetings/${key}`]: true,
            [`meetings/${key}/users/${userId}`]: true,
            [`meetings/${key}/users/${doctorId}`]: true,
        };

        props.firebase.databaseRef().update(updates);
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
