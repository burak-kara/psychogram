import React, { useEffect, useState } from 'react';
import { ChatFeed, Message } from 'react-chat-ui';
import MessageTextField from './TextField';
import Avatar from '@material-ui/core/Avatar';
import { IconContext } from 'react-icons';
import { IoMdArrowRoundBack } from 'react-icons/all';
import { snapshotToArray } from '../../_utility/functions';
import * as ROLES from '../../_constants/roles';
import moment from 'moment';

const ChatSection = props => {
    const { authUser, firebase, currentMeetingKey, user } = props;
    const [newMessage, setNewMessage] = useState('');
    const [messages, setMessages] = useState(new Map());
    const [reservations, setReservations] = useState(null);
    const [isDisabled, setDisabled] = useState(true);

    useEffect(() => {
        setNewMessage('');
        if (currentMeetingKey && props.reservations) {
            getMessages();
            filterReservations();
            checkDisabled();
        } else {
            //    TODO loading indicator
        }
    }, [firebase, currentMeetingKey]);

    const getMessages = () => {
        firebase.messages(currentMeetingKey).on('value', snapshot => {
            let map = new Map();
            snapshot.forEach(snap => {
                const message = snap.val();
                map.set(
                    snap.key,
                    new Message({
                        id: message.senderId === authUser.uid ? 0 : 1,
                        message: message.message,
                    })
                );
            });
            setMessages(map);
        });
    };

    const filterReservations = () => {
        firebase.reservations().on('value', snapshot => {
            const tempReservs = snapshotToArray(snapshot);
            tempReservs.filter(value => props.reservations.includes(value.key));
            checkDisabled(tempReservs);
            setReservations(tempReservs);
        });
    };

    const sendMessage = message => {
        firebase
            .messages(currentMeetingKey)
            .child(moment().valueOf().toString())
            .set(message);
    };

    const setLastMessage = message => {
        firebase.meeting(currentMeetingKey).child('lastMessage').set(message);
    };

    const handleMessageType = e => {
        setNewMessage(e.target.value);
    };

    const handleEnter = e => {
        if (e.key === 'Enter') {
            handleMessageSend();
            e.preventDefault();
        }
    };

    const handleMessageSend = () => {
        if (newMessage !== '') {
            const message = {
                message: newMessage,
                senderId: authUser.uid,
                date: moment().format(),
            };

            sendMessage(message);
            setLastMessage(message);
            setNewMessage('');
        }
    };

    const checkDisabled = temps => {
        const currentTime = moment().format();
        if (temps) {
            temps.map(item => {
                if (
                    moment(item.startDate).isBefore(currentTime) &&
                    moment(item.endDate).isAfter(currentTime)
                ) {
                    setDisabled(false);
                }
            });
        }
    };

    return (
        <>
            <div className="row">
                <div className="col chat-feed-container">
                    <div className="chat-header">
                        <div className="back-container" onClick={props.onClick}>
                            <IconContext.Provider value={{ size: '30' }}>
                                <IoMdArrowRoundBack />
                            </IconContext.Provider>
                        </div>
                        <div className="info-container">
                            {user ? (
                                <>
                                    <Avatar src={user.profilePictureSource}>
                                        {`${user.name[0]}${user.surname[0]}`}
                                    </Avatar>
                                    <div className="col name">
                                        <span>{`${user.name} ${user.surname}`}</span>
                                    </div>
                                </>
                            ) : null}
                        </div>
                        <div className="btn-container">
                            {authUser.role === ROLES.PATIENT ? (
                                <button
                                    className="btn btn-danger"
                                    onClick={props.handleEnd}
                                >
                                    End Meeting
                                </button>
                            ) : null}
                        </div>
                    </div>
                    <ChatFeed
                        messages={[...messages.values()]}
                        bubblesCentered={false}
                        bubbleStyles={{
                            text: {
                                fontSize: 16,
                                color: '#f8fcf9',
                            },
                            userBubble: {
                                borderRadius: 20,
                                padding: 5,
                                marginTop: 5,
                                backgroundColor: '#3b6978',
                            },
                        }}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col text-field-container border-top align-self-end">
                    <MessageTextField
                        value={newMessage}
                        onChange={handleMessageType}
                        onEnter={handleEnter}
                        onSend={handleMessageSend}
                        disabled={isDisabled}
                    />
                </div>
            </div>
        </>
    );
};

export default ChatSection;
