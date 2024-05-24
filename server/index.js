const express = require('express');
const app = express();
const PORT = 4000;
const http = require('http').Server(app);
const cors = require('cors');
const socketIO = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:3000"
    }
});

app.use(cors());

let users = [];

socketIO.on('connection', (socket) => {
    console.log(`⚡: ${socket.id} user just connected!`);

    //Señales de los mensajes//
    socket.on('message', (data) => {
        console.log(data);
    });
    socket.on('message', (data) => {
        socketIO.emit('messageResponse', data);
    });
    socket.on('messageUser', ({ userId, message }) => {
        // Emitir el mensaje solo a la sala del usuario especificado
        socket.to(userId).emit('message', message);
    });
    //Fin señales de los mensajes//

    /*********************************************** */

    //Señales de los Usuarios//
    socket.on('newUser', (data) => {
        users.push(data);
        socketIO.emit('newUserResponse', users);
    });
    socket.on('joinRoom', (userId) => {
        // Unir al usuario a una sala específica basada en su ID
        socket.join(userId);

    });
    socket.on('message', ({ userId, message }) => {
        // Emitir el mensaje solo a la sala del usuario especificado
        socket.to(userId).emit('message', message);
    });
    //Fin señales de los Usuarios//
    /*********************************************** */


    socket.on('typing', (data) => socket.broadcast.emit('typingResponse', data));


    socket.on('disconnect', () => {
        console.log('🔥: A user disconnected');
        users = users.filter((user) => user.socketID !== socket.id);

        socketIO.emit('newUserResponse', users);
        socket.disconnect();
    });
});

app.get('/api', (req, res) => {
    res.json({
        message: 'Hello world',
    });
});

http.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});