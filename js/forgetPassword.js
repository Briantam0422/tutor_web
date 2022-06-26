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

  const input_email = document.getElementById("form-group-input-email");
  const btn_send_reset_email = document.getElementById("btn-send-reset-email");
  const btn_back = document.getElementById("btn-back");

  //send emai
  function SendResetEmail(){

    var auth = firebase.auth();
    var emailAddress = input_email.value;
    
    auth.sendPasswordResetEmail(emailAddress).then(function() {
      // Email sent.
      window.alert("Email sent, Please check your email, and reset password")
    }).catch(function(error) {
      window.alert("Email is not exist")
    });

  }

  btn_send_reset_email.addEventListener("click", function(){

    SendResetEmail();

  })

  btn_back.addEventListener("click", function(){

    window.location.assign("Login.html")

  })