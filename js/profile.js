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

  const icon = document.getElementById("user-icon");
  const tutor_name = document.getElementById("user-name");
  const gender = document.getElementById("user-gender");
  const age = document.getElementById("user-age");
  const level = document.getElementById("level");
  const major = document.getElementById("major");
  const subject = document.getElementById("subject");
  const university = document.getElementById("university");
  const tutor_location = document.getElementById("location");
  const experience = document.getElementById("experience");


  const sign_in = document.getElementById("sign-in");
  const sign_up = document.getElementById("sign-up");
  const porfile = document.getElementById("nav-profile");
  const sign_out = document.getElementById("btn-sign-out");
  sign_in.style.display = "none";
  sign_up.style.display = "none";
  porfile.style.display = "none";

  //check login status
  firebase.auth().onAuthStateChanged(function(user){


    if(user){
        UserInfo(user);
        TutorInfo(user);

        porfile.style.display = "block";
    }else{
        window.location.assign("../tutor_web/Login.html");
        sign_in.style.display = "block";
        sign_up.style.display = "block";
    }

  })

  //get info
  function UserInfo(user){

    var user_id = user.uid;

    firebase.database().ref("users/" + user_id).once("value").then(function(snapshot){

        var data = snapshot.val();

        var get_gender = data["gender"];
        var user_name = data["user_name"];

        console.log(data)

        if(get_gender == "Male"){
            icon.src = "../tutor_web/img/img_tutor_icon_1.svg";
            gender.src = "../tutor_web/img/ic_man.svg";
        }else{
            icon.src = "../tutor_web/img/img_tutor_icon_2.svg.svg";
            gender.src = "../tutor_web/img/ic_woman.svg";
        }

        tutor_name.innerHTML = user_name;

    })

  }

  //get info
  function TutorInfo(user){

    var user_id = user.uid;

    firebase.database().ref("tutors/" + user_id).once("value").then(function(snapshot){

        var data = snapshot.val();
        
        if(data !=null){
          var tutor_level = data["tutor_level"];
          var tutor_major = data["tutor_major"];
          var tutor_subject = data["tutor_teach_subject"];
          var tutor_university = data["tutor_university"];
          var tutor_location_get = data["tutor_teach_location"];
          var tutor_experience = data["tutor_experience"];
  
          level.textContent = "Level: " + tutor_level;
          major.textContent = "Major: " + tutor_major;
          subject.textContent = "Subject: " + tutor_subject;
          university.textContent = "University: " + tutor_university;
          tutor_location.textContent = "Location: " + tutor_location_get;
          experience.textContent = "Experience: " + tutor_experience;
        }
    
    })

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
