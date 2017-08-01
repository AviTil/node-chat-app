const path = require('path')
const http = require('http')

const express = require('express')
const socketIO = require('socket.io')

const generateMessage = require('./utils/message.js').generateMessage
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;


var app = express()
var server = http.createServer(app)
var io = socketIO(server)

app.use(express.static(publicPath))


io.on('connection', function(socket){
    console.log("New user connected")
    
    // respond to an event to a single client
    
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'))
    
    // broadcast event to all OTHER clients
    
    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New User joined chat app'))
        
    
    // io.emit send event to ALL clients
    
    socket.on('createMessage', function(message){
        console.log(message)
        io.emit('newMessage', generateMessage(message.from, message.text))
        
        
    })
    
    socket.on('disconnect', function(){
        console.log("User disconnected")
    })
    
})


server.listen(port, function(){
    console.log("App running on: "+port)
})