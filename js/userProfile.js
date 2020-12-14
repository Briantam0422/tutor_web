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

sign_in.style.display = "none";
sign_up.style.display = "none";
porfile.style.display = "none";

//check Login status
firebase.auth().onAuthStateChanged(function(user){

    if(user){
        console.log(user.uid)
        porfile.style.display = "block";

        //click send message
        btn_send_message.addEventListener("click", e=>{
            SendMessages()
            uploadToFirebase()
        })
        

    }else{
        sign_in.style.display = "block";
        sign_up.style.display = "block";
        passValue()
        window.location.assign("Login.html");
    }

})

console.log(localStorage.getItem("key"));

//Send Message
function SendMessages(){

    var message = input_message_text.value;
    var dateAndTime = new Date();
    var year = dateAndTime.getFullYear();
    var mouth = dateAndTime.getMonth();
    var date = dateAndTime.getDate();
    var hour = dateAndTime.getHours();
    var minutes = dateAndTime.getMinutes();
    var seconds = dateAndTime.getSeconds();

    var display_time = hour + ":" + minutes + " " + date + "/" + mouth + "/" + year;

    if(message !=""){      
        addSendedMessageToList(message, display_time)
    }
}

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

    var icon = document.createElement("img");
    chat_message_send_container.appendChild(icon);
    icon.src = "../img/img_tutor_icon_1.svg"
}

//sended message upload to firebase
function uploadToFirebase(){

    

}

//receive messages
function receiveMessage(){

    

}




//chat room auto scroll down
function bottom() {
document.getElementById( 'chat-container' ).scrollBy(0, 100000000)
}
bottom();

function passValue(){
    localStorage.setItem("isChatroom", true);
    return false;
}