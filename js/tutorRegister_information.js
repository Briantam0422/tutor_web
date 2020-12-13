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

  const input_name = document.getElementById("form-group-input-name");
  const input_gender = document.getElementById("form-group-input-gender");
  const input_age = document.getElementById("form-group-input-age");
  const btn_next = document.getElementById("btn-next");


  firebase.auth().onAuthStateChanged(function(user){
    if(user){

        btn_next.addEventListener("click", e=>{

            passValue();
            if(input_age.value!="" && input_name!="" && input_gender!=""){
              window.location.assign("TutorRegister_Background.html")
            }
            
        });
    }else{
      
    }

  });


  
function passValue(){

    var name = input_name.value;
    var gender =input_gender.value;
    var age = input_age.value;

    localStorage.setItem("name", name);
    localStorage.setItem("gender", gender)
    localStorage.setItem("age", age);
    return false;

  }

  
