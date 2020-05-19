import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { ChatFeed, Message } from 'react-chat-ui';
import MessageTextField from './TextField';
import Avatar from '@material-ui/core/Avatar';
import { IconContext } from 'react-icons';
import { IoMdArrowRoundBack } from 'react-icons/all';

const ChatSection = props => {
    const { authUser, firebase, currentMeetingKey, doctorId } = props;
    const [newMessage, setNewMessage] = useState('');
    const [messages, setMessages] = useState(new Map());
    const [doctor, setDoctor] = useState(null);

    useEffect(() => {
        setNewMessage('');
        if (currentMeetingKey) {
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
            firebase.user(doctorId).on('value', snapshot => {
                setDoctor(snapshot.val());
            });
        } else {
            //    TODO loading indicator
        }
    }, [firebase, currentMeetingKey]);

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
                            {doctor ? (
                                <>
                                    <Avatar src={doctor.profilePictureSource}>
                                        {`${doctor.name[0]}${doctor.surname[0]}`}
                                    </Avatar>
                                    <div className="col name">
                                        <span>{`${doctor.name} ${doctor.surname}`}</span>
                                    </div>
                                </>
                            ) : null}
                        </div>
                        <div className="btn-container">
                            {currentMeetingKey ? (
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
                    />
                </div>
            </div>
        </>
    );
};

export default ChatSection;
