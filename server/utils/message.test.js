var expect = require('expect')
var generateMessage = require('./message.js').generateMessage


describe('generateMessage', function(){
    
    it('should generate correct message object', function(){
        
        var message = generateMessage('Avi', 'Hey there')
        
        expect(message.from).toBe('Avi')
        expect(message.text).toBe('Hey there')
        expect(message.createdAt).toBeA('number')
        
        
    })
    
    
    
})