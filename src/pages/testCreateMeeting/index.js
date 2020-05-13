import React from 'react';
import { compose } from 'recompose';
import { withAuthorization, withEmailVerification } from '../../_session';
import { withRouter } from 'react-router-dom';

const TestMeetingCreate = props => {
    const { firebase } = props;
    const temp_id = {
        birthday: '1995-05-25',
        description: 'Lorem Ipsum is simply dummy text of the printin...',
        email: 'burak.kara@ozu.edu.tr',
        location: 'Istanbul, Turkey',
        name: 'Burakzxc',
        phone: '05415430982',
        private: false,
        profilePictureSource:
            'https://firebasestorage.googleapis.com/v0/b/psy...',
        rating: 0,
        role: 'PATIENT',
        status: 'Face with Tears of Joy',
        surname: 'Kara',
        username: 'kibitzer',
    };
    const patientId = 'p5p8ilVyjhNPkJF5zRLP6UUFoWh1';
    // TODO delete. these value are served from props
    const userId = props.authUser.uid;
    const doctorId = 'theolZeeaePJjCNZR5LSkz5Y3Jx2';

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
    const redirect = () => {
        props.history.push({
            pathname: '/profile',
            search: '?patient',
            state: {
                description: temp_id.description,
                location: temp_id.location,
                name: temp_id.name,
                surname: temp_id.surname,
                email: temp_id.email,
                username: temp_id.username,
            },
        });
    };
    return (
        <div>
            <button onClick={onClick}>Create Meeting</button>
            <button onClick={redirect}> Go to profile</button>
        </div>
    );
};
const condition = authUser => authUser;
export default compose(
    withEmailVerification,
    withAuthorization(condition),
    withRouter
)(TestMeetingCreate);
