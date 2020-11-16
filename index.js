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
  const btn_beacome_teacher = document.getElementById("btn-become-a-teacher");
  const sign_out = document.getElementById("btn-sign-out");
  sign_in.style.display = "none";
  sign_up.style.display = "none";
  porfile.style.display = "none";
  //check login status
  firebase.auth().onAuthStateChanged(function(user){
    if(user){
     
      porfile.style.display = "block";

    }else{

      sign_in.style.display = "block";
      sign_up.style.display = "block";
    }

  });

  //btn-become-a-teacher
  btn_beacome_teacher.addEventListener("click", e=>{

    console.log("a")

    firebase.auth().onAuthStateChanged(function(user){
      if(user){
          window.location.assign("TutorRegister_information.html");
      }else{
          window.location.assign("Login.html");
      }
  
    });

  })


  //sign out
  sign_out.addEventListener("click", e => {

    firebase.auth().signOut().then(function() {
        // Sign-out successful.
        console.log("logout");
      }).catch(function(error) {
        // An error happened.
        
      });
  });