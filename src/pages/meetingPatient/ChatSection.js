import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { ChatFeed, Message } from 'react-chat-ui';
import MessageTextField from './TextField';

const ChatSection = props => {
    const { authUser, firebase, meeting } = props;
    const [newMessage, setNewMessage] = useState('');
    const [messages, setMessages] = useState([
        new Message({
            id: 1,
            message: "I'm the recipient! (The person you're talking to)",
            senderName: 'gray',
        }),
        new Message({
            id: 0,
            message: "I'm yo/ Boolean: list of message objects",
        }), // Blue bubble
    ]);
    const [test, setTest] = useState('test');

    useEffect(() => {
        if (meeting) {
            if (meeting.messages) {
                console.log(meeting.messages);
            } else {
                // TODO start new meeting
            }
        } else {
            //    TODO loading indicator
        }
    }, [meeting]);

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
        <div className="row h-100 bg-success">
            <div className="col-12 bg-danger align-self-end">
                <ChatFeed
                    messages={messages} // Boolean: list of message objects
                    // isTyping={this.state.is_typing} // Boolean: is the recipient typing
                    showSenderName={true} // show the name of the user who sent the message
                    bubblesCentered={false} //Boolean should the bubbles be centered in the feed?
                    // JSON: Custom bubble styles
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
            <div className="col-12 text-field-container border-top pb-1 align-self-end">
                <MessageTextField
                    value={newMessage}
                    onChange={handleMessageType}
                    onEnter={handleEnter}
                    onSend={handleMessageSend}
                />
            </div>
        </div>
    );
};

export default ChatSection;
