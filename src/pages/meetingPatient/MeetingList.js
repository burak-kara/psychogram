import React from 'react';
import ChatCard from './ChatCard';

const MeetingList = props => {
    const { chatPairs, meetings } = props;

    const listMeetings = () => {
        if (chatPairs && meetings) {
            return chatPairs.map(value => {
                let meeting = meetings.find(
                    item => item.doctorId === value.uid
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
