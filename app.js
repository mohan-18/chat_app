var express=require('express');
var http = require('http');
var socketio=require('socket.io')
const {userJoin,getCurrentUser}=require('./utils/users')


var app=express(); 
app.use(express.static('public'));
var server=http.createServer(app);
var io= socketio(server);


app.get('/chat',(req,res)=> {
    res.render("home.ejs")
})
app.get('/',(req,res)=> {
    res.render("index.ejs")
})

io.on('connection',(socket)=>{
    socket.on('joinRoom',(username,room)=>{
        const user=userJoin(socket.id,username,room);
         socket.join(user.room)
        socket.broadcast.to(user.room).emit('message',`${user.username} has joined`,'center',user.username);
        socket.emit('message',`Welcome ${user.username}`,'center',user.username);
    })
    
    
    socket.on('chat_msg_all',(msg,pos)=>{
        const user=getCurrentUser(socket.id);
        socket.broadcast.to(user.room).emit('message',msg,pos,user.username);
    })
    socket.on('chat_msg_himself',(msg,pos)=>{
        socket.emit('message',msg,pos,"");
    })
    socket.on('disconnect',()=>console.log('User Disconnected'))
})



server.listen(3000,()=> console.log("Server Running at 3000"));