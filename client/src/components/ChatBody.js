import React from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../database';

const ChatBody = ({ messages, lastMessageRef, typingStatus }) => {
    const navigate = useNavigate();

    const handleLeaveChat = () => {
        db.Users.clear();
        db.close();
        localStorage.clear()
        navigate('/login');
        window.location.reload();
    };


    return (
        <>
            <header className="chat__mainHeader">
                <p>Chatea con amigos</p>
                <button className="leaveChat__btn" onClick={handleLeaveChat}>
                    Salir del chat
                </button>
            </header>

            <div className="message__container">
                {messages.map((message) =>
                    message.name === localStorage.getItem('name') ? (
                        <div className="message__chats" key={message.id}>
                            <p className="sender__name">Tu</p>
                            <div className="message__sender">
                                <p>{message.text}</p>
                            </div>
                        </div>
                    ) : (
                        <div className="message__chats" key={message.id}>
                            <p>{message.name}</p>
                            <div className="message__recipient">
                                <p>{message.text}</p>
                            </div>
                        </div>
                    )
                )}

                <div className="message__status">
                    <p>{typingStatus}</p>
                </div>
            <div ref={lastMessageRef} />
            </div>
        </>
    );
};

export default ChatBody;