const socket = io();
const submit=document.getElementById('submit');
const input=document.getElementById('input');
const msg_div=document.getElementById('msg_div')

// Get username and room from Url
const{username,room}=Qs.parse(location.search,{
    ignoreQueryPrefix: true
})
console.log(username,room);

socket.emit('joinRoom',username,room);


socket.on('message',function(message,position,sender){
    insert_msg(message,position,sender);
})

submit.addEventListener("click",(e)=>{
    e.preventDefault()
    
    //div.scrollHeight - div.clientHeight;
    if(input.value){
        console.log(input.value);
        socket.emit('chat_msg_all',input.value,'left');
        socket.emit('chat_msg_himself',input.value,'right')
        input.value="";
    }
})

function insert_msg(msg,pos,sender){
    div_m = document.createElement('div')
    div_m.classList.add('msg',pos);
    if(pos=="left"){
        msg=sender+": "+msg;
    }
    div_m.innerHTML="<p>"+msg +"</p>";
    msg_div.appendChild(div_m);
    msg_div.scrollTop = msg_div.scrollHeight;

}