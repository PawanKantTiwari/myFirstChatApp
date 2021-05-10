const express = require("express");
const { Server } = require("socket.io");
// server is created !!!
const app = express();
const http = require('http');
const server = http.createServer(app);

const io = new Server(server);

let userList = [];
//app.use(express.json());
app.use(express.static("public"));


// connection event is attached on io
io.on("connection" , function(socket){
    // console.log(socket.id + " joined!");

    socket.on("newUserConnected", function(userName){
        let userObject = {
            id : socket.id,
            username : userName
        }
        
        userList.push(userObject);
        // console.log(userList);

        //send to all clients except sender
        socket.broadcast.emit("joinedUser", userObject);

        //for self
        socket.emit("online-List", userList);
    })

    socket.on("disconnect", function(){
        let leftUserObject;
        let remaingUsers = userList.filter(function(userobj){
            if(userobj.id == socket.id)
            {
                leftUserObject = userobj;
                return false;
            }
            return true;
        })
        userList = remaingUsers;
        socket.broadcast.emit("userDisconnected", leftUserObject);
        
    })

    socket.on("chat",function(chatObj){
        socket.broadcast.emit("leftchat",chatObj);
    })
})


let port = process.env.PORT || 3000

// tcp port 5500
server.listen(port , function(){
    // console.log("Server started at port 5500");
})