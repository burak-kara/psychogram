import React, { useEffect, useRef, useState } from 'react';
import moment from 'moment';
import { ChatFeed, Message } from 'react-chat-ui';
import MessageTextField from './TextField';
import { getKeys } from '../../_utility/functions';

const ChatSection = props => {
    const { authUser, firebase, meeting } = props;
    const [newMessage, setNewMessage] = useState('');
    const [messages, setMessages] = useState([]);
    // const prevMeeting = usePrevious({ meeting });

    useEffect(() => {
        setMessages([]);
        if (meeting) {
            if (meeting.messages) {
                for (let key in meeting.messages) {
                    const message = meeting.messages[key];
                    setMessages(messages => [
                        ...messages,
                        new Message({
                            id: message.senderId === authUser.uid ? 0 : 1,
                            message: message.message,
                        }),
                    ]);
                }
            } else {
                // TODO start new meeting
            }
        } else {
            //    TODO loading indicator
        }
    }, [meeting]);

    const usePrevious = value => {
        const ref = useRef();
        useEffect(() => {
            ref.current = value;
        });
        return ref.current;
    };

    const sendMessage = message => {
        firebase
            .meeting(meeting.key)
            .child('messages')
            .child(moment().valueOf().toString())
            .set(message);
    };

    const setLastMessage = message => {
        firebase.meeting(meeting.key).child('lastMessage').set(message);
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
                    <ChatFeed
                        messages={messages}
                        bubblesCentered={false}
                        bubbleStyles={{
                            text: {
                                fontSize: 16,
                            },
                            userBubble: {
                                borderRadius: 50,
                                padding: 5,
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
