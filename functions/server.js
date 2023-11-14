//import express
const express=require('express');

//creating express app
const app=express();
const router=express.router();
const serverless=require('serverless-http');

//makkig server using http and express
const server =require('http').Server(app);
 
app.use(express.static('public'));

//integrating server with socket io
const io=require('socket.io')(server);



io.on('connection',(socket)=>{
    console.log('connection established',socket.id);
    //socket A-> io ->socket B
    socket.on('message',(data)=>{       //user is sending msg.
        io.emit('message',data);        //emiting this msg to all other socket
    });

    socket.on('disconnect',(data)=>{       
        io.emit(socket.id,'->left the chat');        
    });
});
// const PORT = 7000;

// server.listen(PORT,()=>{
//     console.log(`Server is running on PORT ${PORT}`);
// });


app.use('/.netlify/functions/server',router);

module.exports.handler=serverless(app);