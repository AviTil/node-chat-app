   var socket = io()
    
        socket.on('connect', function(){
            console.log('Connected to server')
        
        })


        socket.on('disconnect', function(){
            console.log('Disconnected from server')
        })

        // code to display new messages on client side

        socket.on('newMessage', function(message){
            
            var formattedTime = moment(message.createdAt).format('h:mm a')
            var template = $("#message-template").html()
            var html = Mustache.render(template, {
                text: message.text,
                from: message.from,
                createdAt: formattedTime
            });
            
            $("#messages").append(html)
            
        })


        socket.on('newLocationMessage', function(message){
            
           var formattedTime = moment(message.createdAt).format('h: mm a')
           var template = $("#location-message-template").html() 
            var html = Mustache.render(template, {
                from: message.from,
                url: message.url,
                createdAt: formattedTime
            });
            
            $("#messages").append(html)
            
        })


        // code to send messages from client side to server
        
        var messageTextbox = $("[name=message]")


        $("#message-form").on('submit', function(e){
            e.preventDefault()
            
            socket.emit('createMessage', {
                from: 'User',
                text: messageTextbox.val()
            }, function(){
               messageTextbox.val("") 
            })
        })


        var locationButton = $("#send-location")
        
        locationButton.on('click', function(){
            if (!navigator.geolocation) {
                return alert('Unsupported in browser')
            }
            
           
            locationButton.attr('disabled', 'disabled').text('Sending Location..')
            navigator.geolocation.getCurrentPosition(function(position){
                socket.emit('createLocationMessage', {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                })
                
                locationButton.removeAttr('disabled').text('Send Location')
                
            }, function(){
                alert('Unable to fetch location')
                locationButton.removeAttr('disabled').text('Send Location')
            })
            
        })