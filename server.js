const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io')
const app = express();

const server = http.createServer(app);

const io = socketio(server);


app.use(express.static(path.join(__dirname, 'public')));

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
const PORT = 3000 || process.env.PORT;
server.listen(PORT, () => {
    console.log('listening on *:'+ PORT);
  });
