const io = require('socket.io')(3000)

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


