const socket=io();

userName="";

document.getElementById("join-btn").addEventListener('click',(event)=>{
    event.preventDefault();
    userName=document.getElementById("user-name").value.trim();
    console.log(userName);
    if(userName!==''){
        document.querySelector(".form-userName").style.display="none";
        document.querySelector(".chatroom-container").style.display="block";

    }
});
document.getElementById("send-btn").addEventListener('click',(event)=>{
    event.preventDefault();
    const data={
        userName:userName,
        message:document.getElementById('send-message').value,
    }
    //sending msg to io
    socket.emit('message',data);

    addMessageFn(data);
});

//reseving message
socket.on('message',(data)=>{
    if(data.userName!==userName){
        addMessageReciveFn(data);
    }
});

function addMessageFn(data){
    var msgDiv=document.createElement('div');
    msgDiv.innerText=`${data.userName}: ${data.message}`;
    msgDiv.setAttribute('class','message sent');
    document.getElementById('message-container').appendChild(msgDiv);
    document.getElementById('send-message').value='';
}

function addMessageReciveFn(data){
    var msgDiv=document.createElement('div');
    msgDiv.innerText=`${data.userName}: ${data.message}`;
    msgDiv.setAttribute('class','message');
    document.getElementById('message-container').appendChild(msgDiv);
    document.getElementById('send-message').value='';
}