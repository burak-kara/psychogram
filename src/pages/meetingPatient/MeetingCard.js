import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import { dateAsString, formatDateAsHours } from '../../_utility/functions';

const MeetingCard = props => {
    const { user, message } = props;

    const renderDateCol = () => {
        const formatted = message ? dateAsString(message.date) : ' ';
        return (
            <div className="col date-info">
                {formatted.includes('ago') ? (
                    <div className="row">
                        <div className="col font-14 font-weight-light text-right pt-1 pr-2">
                            <span>{formatDateAsHours(message.date)}</span>
                        </div>
                    </div>
                ) : (
                    ''
                )}
                <div className="row">
                    <div className="col font-14 font-weight-lighter text-right pt-1 pr-2">
                        <span>{formatted}</span>
                    </div>
                </div>
            </div>
        );
    };

    return user ? (
        <div className="container-fluid card">
            <div className="row h-100">
                <div className="col picture-container">
                    <Avatar src={user.profilePictureSource}>
                        {`${user.name[0]}${user.surname[0]}`}
                    </Avatar>
                </div>
                <div className="col message-info">
                    <div className="row">
                        <div className="col name">
                            <span>{`${user.name} ${user.surname}`}</span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col message">
                            <span>{message ? message.message : ' '}</span>
                        </div>
                    </div>
                </div>
                {renderDateCol()}
            </div>
        </div>
    ) : null;
};

export default MeetingCard;
