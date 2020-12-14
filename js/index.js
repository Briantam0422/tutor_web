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
        location.reload();
      }).catch(function(error) {
        // An error happened.
        
      });
  });

  //get popular tutor data

  function addItemsToList(get_degree, get_exp, get_gender, get_age, get_tutor_name, get_level, get_subject, get_location, get_university, get_fee, get_tutor_key){

    var div_tutor_list = document.getElementById("popular-tutor-list");

    //create a link
    var link = document.createElement("a");
    div_tutor_list.appendChild(link);
    
    //set param
    var param = document.createElement("param");
    link.appendChild(param);
    param.setAttribute("id", get_tutor_key);
    param.setAttribute("value", get_tutor_key);

    link.addEventListener("click", e=>{

      var tutor_id = document.getElementById(get_tutor_key).value;
      
      passValue(tutor_id)
      window.location.assign("../User_Profile.html");
      
    })

    //first div 1 
    var card_view_bg_white = document.createElement("div");
    link.appendChild(card_view_bg_white);
    card_view_bg_white.classList.add("bg-white");
    card_view_bg_white.setAttribute("id", "card_view")

    //second div 1.1
    var card_view_tutor_info = document.createElement("div");
    card_view_bg_white.appendChild(card_view_tutor_info);
    card_view_tutor_info.classList.add("card-view-tutor-info", "col-12");

    //3 div 1.1.1
    var card_view_tutor_degree_exp = document.createElement("div");
    card_view_tutor_info.appendChild(card_view_tutor_degree_exp);
    card_view_tutor_degree_exp.classList.add("col-6");

    //degree + exp
    var degree = document.createElement("p");
    card_view_tutor_degree_exp.appendChild(degree);
    degree.setAttribute("id", "tutor-info-degree");
    degree.innerHTML = get_degree;

    var exp = document.createElement("p");
    card_view_tutor_degree_exp.appendChild(exp);
    exp.setAttribute("id", "tutor-info-experience");
    exp.innerHTML = get_exp + " " + "year experience";

    //4 div 1.1.2
    var card_view_tutor_gender_age = document.createElement("div");
    card_view_tutor_info.appendChild(card_view_tutor_gender_age);
    card_view_tutor_gender_age.classList.add("col-6", "tutor-gender-age");

    //gender img(should be according to user gender) + age
    var gender_img = document.createElement("img");
    card_view_tutor_gender_age.appendChild(gender_img);
    gender_img.setAttribute("id", "tutor-gender");
    if(get_gender == "Male"){
      gender_img.src = "../img/ic_man.svg";
    }else{
      gender_img.src = "../img/ic_woman.svg";
    }

    var age = document.createElement("p");
    card_view_tutor_gender_age.appendChild(age);
    age.setAttribute("id", "tutor-age");
    age.innerHTML = get_age + " " + "year old";

    //5 div 1.2
    var card_view_tutor_icon_name = document.createElement("div");
    card_view_bg_white.appendChild(card_view_tutor_icon_name);
    card_view_tutor_icon_name.classList.add("col-12", "card-view-tutor-icon-name");

    //default img(should be according to user gender) + user name
    var default_icon = document.createElement("img");
    card_view_tutor_icon_name.appendChild(default_icon);
    if(get_gender == "Male"){
      default_icon.src = "/img/img_tutor_icon_1.svg";
    }else{
      default_icon.src = "/img/img_tutor_icon_2.svg.svg";
    }
    
    var user_name = document.createElement("p");
    card_view_tutor_icon_name.appendChild(user_name);
    user_name.innerHTML = get_tutor_name;

    //6 div 1.3
    var card_view_tutor_teach_info = document.createElement("div");
    card_view_bg_white.appendChild(card_view_tutor_teach_info);
    card_view_tutor_teach_info.classList.add("col-12", "card-view-tutor-teach-info");

    //ul
    var ul = document.createElement("ul");
    card_view_tutor_teach_info.appendChild(ul);

    //li
    var map_li = new Map();
    map_li["Level"] = get_level;
    map_li["Subject"] = get_subject;
    map_li["Location"] = get_location;
    map_li["University"] = get_university;

      var li_level = document.createElement("li");
      ul.appendChild(li_level);
      li_level.innerHTML = "Level" + ": " + map_li["Level"]
    
      var li_subject = document.createElement("li");
      ul.appendChild(li_subject);
      li_subject.innerHTML = "Subject" + ": " + map_li["Subject"]

      var li_location = document.createElement("li");
      ul.appendChild(li_location);
      li_location.innerHTML = "Location" + ": " + map_li["Location"]

      var li_university = document.createElement("li");
      ul.appendChild(li_university);
      li_university.innerHTML ="University" + ": " + map_li["University"]

    //tutor fee
    var tutor_fee = document.createElement("p");
    card_view_tutor_teach_info.appendChild(tutor_fee);
    tutor_fee.innerHTML = "$" + get_fee + "/hr";
   

  }

  var ref = firebase.database().ref("tutors");
ref.once("value")
  .then(function(snapshot) {
    snapshot.forEach(function(childSnapshot){

      var key = childSnapshot.key;
      childSnapshot.forEach(function(tutorInfoSnapshot){
        var key = tutorInfoSnapshot.key;
        var data = tutorInfoSnapshot.val();
      
          var age = data["tutor_age"];
          var exp = data["tutor_experience"];
          var tutor_name = data["tutor_full_name"];
          var gender = data["tutor_gender"];
          var degree = data["tutor_level"];
          var fee = data["tutor_salary"];
          var location = data["tutor_teach_district"];
          var level = data["tutor_teach_level"];
          var subject = data["tutor_teach_subject"];
          var university = data["tutor_university"];
          
          addItemsToList(degree, exp, gender, age, tutor_name, level, subject, location, university, fee, key);
      })
    })
  });

  function passValue(key){

    localStorage.setItem("key", key);

    return false;

  }
  
  console.log(localStorage.getItem("isChatroom"))
