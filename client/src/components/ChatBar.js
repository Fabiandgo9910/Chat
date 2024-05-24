import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addUsers } from '../redux/usersReducer';
import { changeIsOpen } from '../redux/isOpenReducer';
import { db } from '../database';

const ChatBar = ({ socket }) => {

    const dispatch = useDispatch();
    const usersGlobal = useSelector((state) => state.users.users)

    useEffect(() => {
        socket.on('newUserResponse', (data) => {
            dispatch(addUsers(data))
        });
    }, [socket]);

    useEffect(() => {
        const fetchAndInsertUsers = async () => {
            for (const user of usersGlobal) {
                const myUser = user.userId !== localStorage.userId;
                if (myUser) {
                    const existingUser = await db.table('Users')
                        .where('userId')
                        .equals(user.userId)
                        .first();

                    if (!existingUser) {
                        try {
                            await db.table('Users').add({
                                name: user.name,
                                userId: user.userId,
                            });
                        } catch (error) {
                            console.error('Error al insertar usuario en la base de datos:', error);
                        }
                    }
                }
            }
        };

        if (usersGlobal.length > 0) {
            fetchAndInsertUsers();
        }
    }, [usersGlobal]);

    const handleInitMessage = (name, userId) => {
        const accion = {
            name,
            userId
        }
        dispatch(changeIsOpen(accion))
        socket.emit('joinRoom', userId);
    };

    return (
        <div className="chat__sidebar">
            <h2>Chat abierto</h2>
            <div>
                <h4 className="chat__header">Usuarios activos</h4>
                <div className="chat__users">
                    {usersGlobal.map((user) => {
                        const myUser = user.userId !== localStorage.userId;
                        if (myUser) {
                            return (
                                <div key={user.userId}>
                                    <button onClick={handleInitMessage.bind(null, user.name, user.userId)}>
                                        {user.name}
                                    </button>
                                </div>
                            );
                        } else {
                            return null;
                        }
                    })}
                </div>
            </div>
        </div>
    );
};

export default ChatBar;