import React, { useEffect, useState } from 'react';
import { ChatFeed, Message } from 'react-chat-ui';
import MessageTextField from './TextField';
import { snapshotToArray } from '../../_utility/functions';
import moment from 'moment';
import ChatHeader from './ChatHeader';
import ChatExportWindow from './ChatExportWindow';

const ChatSection = props => {
    const {
        authUser,
        firebase,
        currentMeetingKey,
        user,
        handleEnd,
        onClick,
    } = props;
    const [newMessage, setNewMessage] = useState('');
    const [messages, setMessages] = useState(new Map());
    const [isDisabled, setDisabled] = useState(true);
    const [anchorEl, setAnchorEl] = useState(null);
    const [saveChatConfOpen, setSaveChatConfOpen] = useState(false);

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

    const getMeetingData = () => {
        let val = '';

        firebase.messages(currentMeetingKey).on('value', snapshot => {
            let map = new Map();
            snapshot.forEach(snap => {
                const message = snap.val();
                val +=
                    '[' +
                    (message.senderId === authUser.uid
                        ? authUser.name + ' ' + authUser.surname
                        : user.name + '' + user.surname) +
                    '] ' +
                    message.date +
                    ' ' +
                    message.message +
                    '\r\n';
            });
        });

        return val;
    };

    const sendChatAsEmail = () => {
        return getMeetingData();
    };

    const handleExportChat = () => {
        setSaveChatConfOpen(!saveChatConfOpen);
    };

    const filterReservations = () => {
        firebase.reservations().on('value', snapshot => {
            const tempReservs = snapshotToArray(snapshot);
            tempReservs.filter(value => props.reservations.includes(value.key));
            checkDisabled(tempReservs);
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

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <div className="row">
                <div className="col chat-feed-container">
                    <ChatHeader
                        user={user}
                        authUser={authUser}
                        anchorEl={anchorEl}
                        handleClick={handleClick}
                        handleClose={handleClose}
                        setAnchorEl={setAnchorEl}
                        handleEnd={handleEnd}
                        onClick={onClick}
                        handleExportChat={handleExportChat}
                    />
                    <ChatFeed
                        messages={[...messages.values()]}
                        bubblesCentered={false}
                        bubbleStyles={{
                            text: {
                                fontSize: 16,
                                color: '#f8fcf9',
                                float: 'right',
                            },
                            userBubble: {
                                borderRadius: 20,
                                paddingRight: 10,
                                marginTop: 5,
                                backgroundColor: '#3b6978',
                                minWidth: 50,
                                overflow: 'hidden',
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
            <ChatExportWindow
                open={saveChatConfOpen}
                handleClose={handleExportChat}
                getData={getMeetingData}
                handleEmail={sendChatAsEmail}
            />
        </>
    );
};

export default ChatSection;
