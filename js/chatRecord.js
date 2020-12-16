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
const user_profile_page = document.getElementById("profile");
const sign_out = document.getElementById("btn-sign-out");

sign_in.style.display = "none";
sign_up.style.display = "none";
porfile.style.display = "none";

firebase.auth().onAuthStateChanged(function(user){

  if(user){
    porfile.style.display = "block";

    //get message record data
    MessageRecord(user)

    //check new message
    CheckNewMessage(user)

  }else{
    
    window.location.assign("../Login.html")

    sign_in.style.display = "block";
    sign_up.style.display = "block";
  }

})

function MessageRecord(user){

  firebase.database().ref("latest_chat/" + user.uid).once("value").then( function(snapshopt){

    snapshopt.forEach(function(child_snapshot){

      var key = child_snapshot.key;
      var data = child_snapshot.val();
    

      //get User Info
      var ref = firebase.database().ref("users/" + key).once("value").then(function(user_snapshot){
        
        var user_data = user_snapshot.val();

        if(user_data !=null){
          var user_name = user_data["user_name"];
          var user_gender = user_data["gender"];
          var message = data["latest_message"];
          var date_and_time = data["date_and_time"];
  
          AddChatRecordItemToList(key, message, date_and_time, user_name, user_gender);
        }else{

          window.alert("No Chat Record");

        }

      })

    })

});


}

function AddChatRecordItemToList(user_key, message, date_and_time, user_name, user_gender){

  var user_id = user_key;
  var get_message = message;
  var get_date_and_time = date_and_time;
  var get_user_name = user_name;
  var get_user_gender = user_gender;

  var container = document.getElementById("chat-record-item-cotainer");

  var chat_record_item_container = document.getElementById("chat-record-item-cotainer");

  //a link
  var link = document.createElement("a");
  chat_record_item_container.appendChild(link);
  link.setAttribute("href", "chatroom.html")

  //div 1
  var chat_record_item = document.createElement("div");
  link.appendChild(chat_record_item);
  chat_record_item.classList.add("col-12", "chat-record-item");
  
  passValue(user_id, get_user_gender, get_user_name)

  //diiv 1.1
  var row = document.createElement("div");
  chat_record_item.appendChild(row);
  row.classList.add("row");

  //div 1.1.1
  var chat_record_item_user_icon = document.createElement("div");
  row.appendChild(chat_record_item_user_icon);
  chat_record_item_user_icon.classList.add("col-1", "chat-record-item-user-icon");

  //img icon
  var icon = document.createElement("img");
  chat_record_item_user_icon.appendChild(icon);

  if(get_user_gender == "Male"){
    icon.src = "../tutor_web/img/img_tutor_icon_1.svg";
  }else{
    icon.src = "../tutor_web/img/img_tutor_icon_2.svg.svg";
  }

  //div 1.1.2
  var chat_record_item_user_name_and_message = document.createElement("div");
  row.appendChild(chat_record_item_user_name_and_message);
  chat_record_item_user_name_and_message.classList.add("col-8", "chat-record-item-user-name-and-message");

  //user name
  var username = document.createElement("p");
  chat_record_item_user_name_and_message.appendChild(username);
  username.setAttribute("id", "chat-record-item-user-name");
  username.innerHTML = get_user_name;

  //message
  var message = document.createElement("p");
  chat_record_item_user_name_and_message.appendChild(message);
  message.setAttribute("id", "chat-record-item-message");
  message.innerHTML = get_message;

  //div 1.1.3
  var chat_record_item_date_and_time = document.createElement("div");
  row.appendChild(chat_record_item_date_and_time);
  chat_record_item_date_and_time.classList.add("chat-record-item-date-and-time");

  //date and time
  var date_and_time = document.createElement("p");
  chat_record_item_date_and_time.appendChild(date_and_time);
  date_and_time.setAttribute("id", "chat-record-item-date-and-time");
  date_and_time.innerHTML = get_date_and_time;

}

function passValue(key, get_gender, get_tutor_name){

  localStorage.setItem("key", key);
  localStorage.setItem("chat_user_gender", get_gender);
  localStorage.setItem("chat_user_name", get_tutor_name);
  return false;

}


  //sign out
  sign_out.addEventListener("click", e => {

    firebase.auth().signOut().then(function() {
        // Sign-out successful.
        location.reload();
      }).catch(function(error) {
        // An error happened.
        
      });
  });

  //user profile
  user_profile_page.addEventListener("click", function(){

    window.location.assign("../tutor_web/Profile.html");

  })

  //check new message=
  function CheckNewMessage(user){

    var user_id = user.uid;

    firebase.database().ref("latest_chat/" + user_id).on("child_changed", function(snapshot){

      window.location.assign("../tutor_web/ChatRecord.html");


    })

  }