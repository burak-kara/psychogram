import React, { useState } from 'react';
import moment from 'moment';
import { ChatFeed, Message } from 'react-chat-ui';
import MessageTextField from './TextField';
import { TextField } from '@material-ui/core';

const ChatSection = props => {
    const { authUser, firebase } = props;
    const [newMessage, setNewMessage] = useState('');
    const [messages, setMessages] = useState([
        new Message({
            id: 1,
            message: "I'm the recipient! (The person you're talking to)",
            senderName: 'gray',
        }), // Gray bubble
        new Message({ id: 0, message: "I'm you -- the blue bubble!" }), // Blue bubble
    ]);

    const sendMessage = message => {
        firebase
            .meeting(
                'p5p8ilVyjhNPkJF5zRLP6UUFoWh1_dC2wgD4HhbZnWAz4nKwAJlLA8JJ2'
            )
            .child('messages')
            .push(message);
    };

    const setLastMessage = message => {
        firebase
            .meeting(
                'p5p8ilVyjhNPkJF5zRLP6UUFoWh1_dC2wgD4HhbZnWAz4nKwAJlLA8JJ2'
            )
            .child('lastMessage')
            .set(message);
    };

    const onClick = () => {
        const message = {
            message: `${authUser.role} send message at ${moment().format(
                'HH:mm:s'
            )}`,
            senderId: authUser.uid,
            date: moment().format(),
        };

        sendMessage(message);
        setLastMessage(message);
    };

    const handleMessageType = e => {
        console.log(e.target.value);
        setNewMessage(e.target.value);
    };

    const handleMessageSend = () => {
        alert('clicked');
    };

    return (
        <div className="row d-flex align-items-end h-100">
            <div className="col-12">
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
            <div className="col-12 padding-0 border-top pb-1">
                <MessageTextField
                    value={newMessage}
                    onChange={handleMessageType}
                    onSend={handleMessageSend}
                />
            </div>
        </div>
    );
};

export default ChatSection;
