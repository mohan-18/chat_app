const socket = io();
const submit=document.getElementById('submit');
const input=document.getElementById('input');
const msg_div=document.getElementById('msg_div')

socket.on('message',function(message){
    insert_msg(message);
})

submit.addEventListener("click",(e)=>{
    e.preventDefault()
    
    if(input.value){
        console.log(input.value);
        socket.emit('chat_msg',input.value);
    }
})

function insert_msg(msg){
    div_m = document.createElement('div')
    div_m.classList.add('msg');
    div_m.innerHTML=msg;
    msg_div.appendChild(div_m);
}