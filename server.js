const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io')
const app = express();
const INDEX = '/index.html';
const server = http.createServer(app);

const io = socketio(server);
app.use((req, res) => res.sendFile(INDEX, { root: __dirname }))



const users = {};
let message_history=[];

io.on('connection', socket =>{

    let usercount = io.engine.clientsCount;
    socket.on('user',name =>{
        users[socket.id] = name;
    
    })
   
    socket.emit('usercount',usercount);

    message_history.forEach(patate => socket.emit('chat-message',patate))
    
    socket.on('send', message => {
        const idmessage = {message:message,id:users[socket.id]}

        message_history.push(idmessage);

        socket.broadcast.emit('chat-message',idmessage)
        socket.emit('chat-message',idmessage)
    })

})
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log('listening on *:'+ PORT);
  });
