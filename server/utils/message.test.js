var expect = require('expect')
var generateMessage = require('./message.js').generateMessage
var generateLocationMessage = require('./message.js').generateLocationMessage


describe('generateMessage', function(){
    
    it('should generate correct message object', function(){
        
        var message = generateMessage('Avi', 'Hey there')
        
        expect(message.from).toBe('Avi')
        expect(message.text).toBe('Hey there')
        expect(message.createdAt).toBeA('number')
        
        
    })
    
    
    
})

describe('generateLocationMessage', function(){
    
    it('should generate correct location object', function(){
        
        var from = 'Avi'
        var latitude = 51
        var longitude = 0
        
        var url = 'https://www.google.com/maps?q=51,0'
        
        var locationMessage = generateLocationMessage(from, latitude, longitude)
        
        expect(locationMessage.from).toBe('Avi')
        expect(locationMessage.url).toBe(url)
        expect(locationMessage.createdAt).toBeA('number')
        
    })
    
    
})