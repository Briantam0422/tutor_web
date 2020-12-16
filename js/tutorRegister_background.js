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

  const input_level = document.getElementById("form-group-input-level");
  const input_university = document.getElementById("form-group-input-university");
  const input_major = document.getElementById("form-group-input-major");
  const btn_next = document.getElementById("btn-next");


  firebase.auth().onAuthStateChanged(function(user){

    if(user){

        btn_next.addEventListener("click", e=>{

            passValue();
            if(input_level.value!="" && input_university.value!="" && input_major.value!=""){
                window.location.assign("../tutor_web/TutorRegister_Experience.html")
            }
        })
      
    }else{
        
        alert("Your account has logged out")
        window.location.assign("../tutor_web/Login.html")
    }

  })

  function passValue(){

    localStorage.setItem("level", input_level.value);
    localStorage.setItem("university", input_university.value);
    localStorage.setItem("major", input_major.value);
    return false;

  }

