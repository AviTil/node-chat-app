const path = require('path')
var express = require('express')

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;


var app = express()

app.get('/', function(req, res){
    res.sendFile(publicPath+'/index.html')
})


app.listen(port, function(){
    console.log("App running on: "+port)
})