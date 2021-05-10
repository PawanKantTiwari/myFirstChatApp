let onlineList = document.querySelector('.online-list');

//telling to the server that New User is connected
socket.emit("newUserConnected",userName);


//appneding a new user into chat window
socket.on("joinedUser",function(dataObj){
let joinedDiv = document.createElement("div");
joinedDiv.classList.add("joined");
joinedDiv.textContent = `${dataObj.username} joined this chat`;
chatWindow.append(joinedDiv);
addInOnlineList(dataObj);
})


socket.on("userDisconnected", function(dataObj){
let leaveDiv = document.createElement("div");
leaveDiv.classList.add("leave");
leaveDiv.textContent = `${dataObj.username} left this chat`;
chatWindow.append(leaveDiv);
deleteFromOnlineList(dataObj.id);
})


//this chat on left side
socket.on("leftchat", function(chatObj){
let leftChat = document.createElement("div");
leftChat.classList.add("left-chat");
leftChat.textContent = chatObj.userName + " : " + chatObj.chat;
chatWindow.append(leftChat);
})

socket.on("online-List",function(userList){
    for(let i = 0; i < userList.length; i++){
        if(userList[i].id != socket.id){
            let userDiv = document.createElement('div');
            userDiv.classList.add('user');
            userDiv.setAttribute('id' , userList[i].id);

            userDiv.innerHTML =`<div class="user">
                                <div class="user-image">
                                    <img src="./user.jpg" alt="">
                                    </div>
                                    <div class="user-name">${userList[i].username}</div>
                                </div>`
            onlineList.append(userDiv);
        }
    }
})

function addInOnlineList(userObj){
    let userDiv = document.createElement('div');
    userDiv.classList.add('user');
    userDiv.setAttribute('id' , userObj.id);

    userDiv.innerHTML =`<div class="user">
                        <div class="user-image">
                            <img src="./user.jpg" alt="">
                            </div>
                            <div class="user-name">${userObj.username}</div>
                        </div>`
    onlineList.append(userDiv);
}


function deleteFromOnlineList(id){
    document.querySelector(`#${id}`).remove();
}