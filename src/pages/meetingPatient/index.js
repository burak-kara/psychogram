import React, { useEffect, useState } from 'react';
import { compose } from 'recompose';
import { withAuthorization, withEmailVerification } from '../../_session';
import { snapshotToArray } from '../../_utility/functions';
import Search from './Search';
import MeetingList from './MeetingList';
import * as ROLES from '../../_constants/roles';
import ChatSection from './ChatSection';

const PatientMeetingPage = props => {
    const { authUser, firebase } = props;
    const [meetings, setMeetings] = useState([]);
    const [chatPairs, setChatPairs] = useState(new Map());
    const [currentMeeting, setCurrentMeeting] = useState(null);

    useEffect(() => {
        // TODO loading indicator
        const sort = authUser.role === ROLES.PATIENT ? 'userId' : 'doctorId';
        firebase
            .meetings()
            .orderByChild(sort)
            .equalTo(authUser.uid)
            .on('value', snapshot => {
                setMeetings([...snapshotToArray(snapshot)]);
                meetings.map(meeting => {
                    const uid =
                        authUser.role === ROLES.PATIENT
                            ? meeting.doctorId
                            : meeting.userId;
                    firebase
                        .user(uid)
                        .once('value')
                        .then(snapshot => snapshot.val())
                        .then(data => {
                            setChatPairs(new Map(chatPairs.set(uid, data)));
                        });
                });
            });
    }, [authUser, firebase]);

    const handleMeetingClick = meeting => {
        setCurrentMeeting(meeting);
    };

    // TODO implement ui for meeting not chosen case
    return (
        <div className="patient-meeting-container">
            <div className="container-fluid main-container">
                <div className="row h-100">
                    <div className="col border-right meetings-list-container">
                        <Search />
                        <MeetingList
                            onClick={handleMeetingClick}
                            chatPairs={chatPairs}
                            meetings={meetings}
                            authUser={authUser}
                        />
                    </div>
                    <div className="col chat-section-container">
                        {currentMeeting ? (
                            <ChatSection {...props} meeting={currentMeeting} />
                        ) : null}
                    </div>
                </div>
            </div>
        </div>
    );
};

const condition = authUser => authUser;

export default compose(
    withEmailVerification,
    withAuthorization(condition)
)(PatientMeetingPage);
