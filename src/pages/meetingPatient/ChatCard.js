import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import { dateAsString, formatDate } from '../../_utility/functions';

const ChatCard = props => {
    const { user, message } = props;
    return user ? (
        <div className="card container-fluid">
            <div className="row h-100">
                <div className="col-2 d-flex align-items-center justify-content-center">
                    <Avatar
                        alt={`${user.name} ${user.surname}`}
                        src={user.profilePictureSource}
                    />
                </div>
                <div className="col-6">
                    <div className="row font-16 font-weight-normal">
                        <span>{`${user.name} ${user.surname}`}</span>
                    </div>
                    <div className="row font-14 font-weight-lighter font-italic">
                        <span>{message ? message.message : ' '}</span>
                    </div>
                </div>
                <div className="col-4">
                    <div className="row">
                        <div className="col-12 font-16 font-weight-light text-right pr-1">
                            <span>
                                {message ? formatDate(message.date) : ' '}
                            </span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 font-14 font-weight-lighter font-italic text-right pr-1">
                            <span>
                                {message ? dateAsString(message.date) : ' '}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ) : null;
};

export default ChatCard;
