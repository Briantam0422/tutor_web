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

  const input_district = document.getElementById("form-group-input-district");
  const input_location = document.getElementById("form-group-input-specific-location")
  const btn_next = document.getElementById("btn-next");

  btn_next.addEventListener("click", e=>{

    firebase.auth().onAuthStateChanged(function(user){

        if(user){

            var postData = {
                tutor_full_name: localStorage.getItem("name"),
                tutor_gender: localStorage.getItem("gender"),
                tutor_age: localStorage.getItem("age"),
                tutor_level: localStorage.getItem("level"),
                tutor_university: localStorage.getItem("university"),
                tutor_major: localStorage.getItem("major"),
                tutor_experience: localStorage.getItem("experience"),
                tutor_teach_level: localStorage.getItem("teach_level"),
                tutor_teach_subject: localStorage.getItem("teach_subject"),
                tutor_salary: localStorage.getItem("salary"),
                tutor_teach_district: input_district.value,
                tutor_teach_location: input_location.value
             }
   
            var updates = {};
            var tutor_id = firebase.database().ref("tutors/" + user.uid).push().getKey();
            
            if(input_district.value!="" && input_location.value!=""){
              updates["tutors/" + user.uid + "/"+ tutor_id] = postData;
              
              firebase.database().ref().update(updates).then(user=>{
                window.location.assign("index.html");
              })
            }
            
            
            
        }else{

           
        }

    })
    
  })