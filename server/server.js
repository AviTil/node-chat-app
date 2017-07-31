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
    
    socket.emit('newMessage', {
        from: "Tony",
        text: "Hey there",
        createdAt: 123
    })
    
    socket.on('createMessage', function(message){
        console.log(message)
    })
    
    socket.on('disconnect', function(){
        console.log("User disconnected")
    })
    
})


server.listen(port, function(){
    console.log("App running on: "+port)
})