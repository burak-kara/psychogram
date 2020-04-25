import React from 'react';
import ChatCard from './ChatCard';
import * as ROLES from '../../_constants/roles';

const MeetingList = props => {
    const { chatPairs, meetings, authUser } = props;

    const listMeetings = () => {
        if (chatPairs && meetings) {
            return chatPairs.map(value => {
                let meeting = meetings.find(item =>
                    authUser.role === ROLES.PATIENT
                        ? item.doctorId === value.uid
                        : item.userId === value.uid
                );
                return <ChatCard user={value} message={meeting.lastMessage} />;
            });
        } else {
            // TODO styling
            return <div className="text-center">Konuşma Bulunamadı</div>;
        }
    };

    return (
        <div className="row list-row">
            <div className="col-12 padding-0">{listMeetings()}</div>
        </div>
    );
};

export default MeetingList;
