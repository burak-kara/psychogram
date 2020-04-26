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

    return (
        <div className="container-fluid patient-meeting-container">
            <div className="row h-100">
                <div className="col m-lg-4 m-md-3 m-sm-2 m-m-0 padding-0">
                    <div className="container-fluid h-100 main-container">
                        <div className="row h-100">
                            <div className="col-7 col-lg-3 border-right meetings-list-container">
                                <Search />
                                <MeetingList
                                    chatPairs={chatPairs}
                                    meetings={meetings}
                                    authUser={authUser}
                                />
                            </div>
                            <div className="col-5 col-lg-9 chat-section-container">
                                <ChatSection {...props} />
                            </div>
                        </div>
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
