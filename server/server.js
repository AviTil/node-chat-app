const path = require('path')
const http = require('http')

const express = require('express')
const socketIO = require('socket.io')

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;


var app = express()
var server = http.createServer(app)
var io = socketIO(server)

app.use(express.static(publicPath))


io.on('connection', function(socket){
    console.log("New user connected")
    
    // socket.emit to respond to an event to a single client
    
    socket.emit('newMessage', {
        from: 'Admin',
        text: 'Welcome to the chat app'
    })
    
    // socket.broadcast.emit to broadcast event from a single client to all OTHER clients
    
    socket.broadcast.emit('newMessage', {
        from: 'Admin',
        text: 'New User joined chat app',
        createdAt: new Date().getTime()
    })
    
    // io.emit to send event to ALL clients
    
    socket.on('createMessage', function(message){
        console.log(message)
        io.emit('newMessage', {
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        })
        
        /*socket.broadcast.emit('newMessage', {
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        })*/
        
    })
    
    socket.on('disconnect', function(){
        console.log("User disconnected")
    })
    
})


server.listen(port, function(){
    console.log("App running on: "+port)
})