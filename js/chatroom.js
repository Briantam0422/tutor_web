var firebaseConfig = {
    apiKey: "AIzaSyCxA5D__097eX4c4_316ASCxcDMQC-igyM",
    authDomain: "tutor-web-1fa0d.firebaseapp.com",
    databaseURL: "https://tutor-web-1fa0d.firebaseio.com",
    projectId: "tutor-web-1fa0d",
    storageBucket: "tutor-web-1fa0d.appspot.com",
    messagingSenderId: "802954872293",
    appId: "1:802954872293:web:a0cbc301d5b2309af55b0c",
    measurementId: "G-GWX590PR4M"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


const sign_in = document.getElementById("sign-in");
const sign_up = document.getElementById("sign-up");
const porfile = document.getElementById("nav-profile");
const input_message_text = document.getElementById("input-message-text");
const btn_send_message = document.getElementById("btn-send-message");

var current_user_gender, chat_user_gender;
current_user_gender = null;
chat_user_gender = localStorage.getItem("chat_user_gender");



sign_in.style.display = "none";
sign_up.style.display = "none";
porfile.style.display = "none";

//check Login status
firebase.auth().onAuthStateChanged(function(user){

    if(user){
        console.log(user.uid)

        //get user info
        UserInfo(user.uid)

        porfile.style.display = "block";
        var current_user_id = user.uid;
        var chat_user_id = localStorage.getItem("key");
        var message = input_message_text.value;
        var dateAndTime = new Date();
        var year = dateAndTime.getFullYear();
        var mouth = dateAndTime.getMonth();
        var date = dateAndTime.getDate();
        var hour = dateAndTime.getHours();
        var minutes = dateAndTime.getMinutes();

        var display_time = hour + ":" + minutes + " " + date + "/" + mouth + "/" + year;


        receiveMessage(current_user_id, chat_user_id)

        //click send message
        btn_send_message.addEventListener("click", e=>{
            uploadToFirebase(current_user_id, chat_user_id, message, display_time)
            input_message_text.value = "";
        })

        //keyboard "enter"
        input_message_text.addEventListener("keyup", function(event){
            if (event.keyCode === 13) {
                event.preventDefault();
                uploadToFirebase(current_user_id, chat_user_id, message, display_time)
                input_message_text.value = "";
            }
        })
        

    }else{
        sign_in.style.display = "block";
        sign_up.style.display = "block";
        passValue()
        window.location.assign("../tutor_web/Login.html");
    }

})

//get Current User info
function UserInfo(user_id){
    var ref = firebase.database().ref("users/" + user_id);
    ref.once("value")
    .then(function(snapshopt){
      
            var data = snapshopt.val();
            current_user_gender = data["gender"];

    })

}
console.log(localStorage.getItem("key"));
console.log(localStorage.getItem("chat_user_gender"));


//create html elements
function addSendedMessageToList(message, display_time){

    //div 1
    var chat_container = document.getElementById("chat-container");

    //div 1.1
    var chat_message_send_container = document.createElement("div");
    chat_message_send_container.classList.add("col-12", "chat-messages-send-container");
    chat_container.appendChild(chat_message_send_container);

    //div 1.1.1
    var chat_messages_send = document.createElement("div");
    chat_message_send_container.appendChild(chat_messages_send);
    chat_messages_send.classList.add("chat-messages-send");

    //div 1.1.1.1
    var message_text_and_date = document.createElement("div");
    chat_messages_send.appendChild(message_text_and_date);
    message_text_and_date.classList.add("message-text-and-date");

    //message and dateTime
    var message_text = document.createElement("p");
    message_text_and_date.appendChild(message_text);
    message_text.setAttribute("id", "message-text");
    message_text.innerHTML = message;

    var message_date = document.createElement("p");
    message_text_and_date.appendChild(message_date);
    message_date.setAttribute("id", "message-date");
    message_date.innerHTML = display_time

    //div img + name
    var card_img_name = document.createElement("div");
    chat_message_send_container.appendChild(card_img_name);
    card_img_name.classList.add("card_img_name");

    //img
    var icon = document.createElement("img");
    card_img_name.appendChild(icon);
    if(current_user_gender == "Male"){
        icon.src = "../tutor_web/img/img_tutor_icon_1.svg"
    }else{
        icon.src = "../tutor_web/img/img_tutor_icon_2.svg.svg"
    }

    //name
    var name = document.createElement("p");
    card_img_name.appendChild(name);
    name.innerHTML = "you"

    document.getElementById( 'chat-container' ).scrollBy(0, 10000000000000)
}

function addReceiverMessageToList(message, display_time){

     //div 1
     var chat_container = document.getElementById("chat-container");

     //div 1.1
     var chat_message_receive_container = document.createElement("div");
     chat_message_receive_container.classList.add("col-12", "chat-messages-receive-container");
     chat_container.appendChild(chat_message_receive_container);
 
     //div 1.1.1
     var chat_messages_receive = document.createElement("div");
     chat_message_receive_container.appendChild(chat_messages_receive);
     chat_messages_receive.classList.add("chat-messages-receive");
 
     //div img + name
    var card_img_name = document.createElement("div");
    chat_messages_receive.appendChild(card_img_name);
    card_img_name.classList.add("card_img_name");

    //img
    var icon = document.createElement("img");
    card_img_name.appendChild(icon);
    if(localStorage.getItem("chat_user_gender") == "Male"){
        icon.src = "../tutor_web/img/img_tutor_icon_1.svg"
    }else{
        icon.src = "../tutor_web/img/img_tutor_icon_2.svg.svg"
    }

    //name
    var name = document.createElement("p");
    card_img_name.appendChild(name);
    name.innerHTML = localStorage.getItem("chat_user_name");

     //div 1.1.1.1
     var message_text_and_date = document.createElement("div");
     chat_messages_receive.appendChild(message_text_and_date);
     message_text_and_date.classList.add("message-text-and-date");
 
     //message and dateTime
     var message_text = document.createElement("p");
     message_text_and_date.appendChild(message_text);
     message_text.setAttribute("id", "message-text");
     message_text.innerHTML = message;
 
     var message_date = document.createElement("p");
     message_text_and_date.appendChild(message_date);
     message_date.setAttribute("id", "message-date");
     message_date.innerHTML = display_time
 
     document.getElementById( 'chat-container' ).scrollBy(0, 10000000000000)
}

//sended message upload to firebase
function uploadToFirebase(current_user_id, chat_user_id, message, display_time){

    var message = input_message_text.value;

    //sender firebase
    var postData = {
        sender_id: current_user_id,
        receiver_id: chat_user_id,
        message: message,
        date_and_time: display_time
    }

    var updates = {};
    var message_id = firebase.database().ref("chat/" + current_user_id + "/" +chat_user_id).push().getKey();
    updates["chat/" + current_user_id + "/" +chat_user_id + "/" + message_id] = postData;

    firebase.database().ref().update(updates);

    //receiver firebase
    var postData_receiver = {
        sender_id: current_user_id,
        receiver_id: chat_user_id,
        message: message,
        date_and_time: display_time
    }

    var updates = {};
    var message_id = firebase.database().ref("chat/" + chat_user_id + "/" + current_user_id).push().getKey();
    updates["chat/" + chat_user_id + "/" + current_user_id + "/" + message_id] = postData_receiver;

    firebase.database().ref().update(updates);

    //update the latest message current user
    var postData_latest_message_current_user = {
        latest_message: message,
        date_and_time: display_time
    }

    var updates = {};
    updates["latest_chat/" + current_user_id + "/" + chat_user_id] = postData_latest_message_current_user;

    firebase.database().ref().update(updates);

    //update the latest message chat user
    var postData_latest_message_chat_user = {
        latest_message: message,
        date_and_time: display_time
    }

    var updates = {};
    updates["latest_chat/" + chat_user_id + "/" + current_user_id] = postData_latest_message_chat_user;

    firebase.database().ref().update(updates);
}

//receive messages
function receiveMessage(current_user_id, chat_user_id){

    firebase.database().ref("chat/" + current_user_id + "/" + chat_user_id).on("child_added", function(snapshot){

        var data = snapshot.val()
        var sender_id = data.sender_id;
        var receiver_id = data.receiver_id;
        var message = data.message;
        var date_and_time = data.date_and_time;


        if(sender_id == current_user_id){
            addSendedMessageToList(message, date_and_time);
        }else{
            addReceiverMessageToList(message, date_and_time);
        }
    })


}

function passValue(){
    localStorage.setItem("isChatroom", true);
    return false;
}