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

  const input_teaching_experience = document.getElementById("form-group-input-experience");
  const input_teaching_level = document.getElementById("form-group-input-teaching-level");
  const input_teaching_subject = document.getElementById("form-group-input-teaching-subject");
  const input_salary = document.getElementById("form-group-input-salary");
  const btn_next = document.getElementById("btn-next");

  btn_next.addEventListener("click", e=>{

    firebase.auth().onAuthStateChanged(function(user){
        var experience = input_teaching_experience.value;
        var teach_level = input_teaching_level.value;
        var teach_subject = input_teaching_subject.value;
        var salary = input_salary.value;

        if(user){
            if(experience!="" && teach_level.value!="" && teach_subject!="" && salary!=""){
                passValue();
                window.location.assign("TutorRegister_Location.html");

            }
        }else{

        }

    })

  });

  function passValue(){
    var experience = input_teaching_experience.value;
    var teach_level = input_teaching_level.value;
    var teach_subject = input_teaching_subject.value;
    var salary = input_salary.value;

    localStorage.setItem("experience", experience);
    localStorage.setItem("teach_level", teach_level);
    localStorage.setItem("teach_subject", teach_subject);
    localStorage.setItem("salary", salary);
    return false;

    }

