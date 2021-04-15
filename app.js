const { Socket } = require('dgram');
var express=require('express');
var http = require('http');
var socketio=require('socket.io')


var app=express(); 
app.use(express.static('public'));
var server=http.createServer(app);
var io= socketio(server);


app.get('/',(req,res)=> {
    res.render("home.ejs")
})

io.on('connection',(socket)=>{
    console.log('a user connected');
    socket.broadcast.emit('message','A user has joined','center');
    socket.emit('message','Welcome','center');
    socket.on('disconnect',()=>console.log('User Disconnected'))
    socket.on('chat_msg_all',(msg,pos)=>{
        socket.broadcast.emit('message',msg,pos);
    })
    socket.on('chat_msg_himself',(msg,pos)=>{
        socket.emit('message',msg,pos);
    })
})



server.listen(3000,()=> console.log("Server Running at 3000"));