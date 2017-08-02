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
            
            var li = $("<li></li>")
            li.text(message.from+" ("+formattedTime+"): "+message.text)
            
            $("#messages").append(li)
        })


        socket.on('newLocationMessage', function(message){
            
            var li = $("<li></li>")
            
            var a = $('<a target="_blank"> My current location</a>')
            
            var formattedTime = moment(message.createdAt).format('h: mm a')
            
            
            li.text(message.from+' ('+formattedTime+'): ')
            a.attr('href', message.url)
            
            li.append(a)
            
            $("#messages").append(li)
            
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