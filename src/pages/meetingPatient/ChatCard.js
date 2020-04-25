import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import { dateAsString, formatDateAsHours } from '../../_utility/functions';

const ChatCard = props => {
    const { user, message } = props;

    const renderDateCol = () => {
        const formatted = message ? dateAsString(message.date) : ' ';
        return (
            <div className="col-4 col-md-3">
                {formatted.includes('ago') ? (
                    <div className="row">
                        <div className="col-12 font-14 font-weight-light text-right pt-1 pr-2">
                            <span>
                                {message
                                    ? formatDateAsHours(message.date)
                                    : ' '}
                            </span>
                        </div>
                    </div>
                ) : (
                    ''
                )}
                <div className="row">
                    <div className="col-12 font-14 font-weight-lighter font-italic text-right pr-2">
                        <span>{formatted}</span>
                    </div>
                </div>
            </div>
        );
    };

    return user ? (
        <div className="container-fluid card">
            <div className="row h-100">
                <div className="col-2 d-flex align-items-center justify-content-center">
                    <Avatar src={user.profilePictureSource}>
                        {`${user.name[0]}${user.surname[0]}`}
                    </Avatar>
                </div>
                <div className="col-6 col-md-7">
                    <div className="row">
                        <div className="col-12 font-16 font-weight-normal padding-0">
                            <span>{`${user.name} ${user.surname}`}</span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 font-14 font-weight-lighter message padding-0">
                            <span>{message ? message.message : ' '}</span>
                        </div>
                    </div>
                </div>
                {renderDateCol()}
            </div>
        </div>
    ) : null;
};

export default ChatCard;
