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

  const btn_resent_email = document.getElementById("btn-resent");
  const btn_confirm = document.getElementById("btn-confirm");
  
  function timedRefresh(timeoutPeriod) {
	setTimeout("location.reload(true);",timeoutPeriod);
    }

    window.onload = timedRefresh(6000);

  checkStatus();
  //check user status
  function checkStatus() {
    firebase.auth().onAuthStateChanged(function(firebaseUser){

        if(firebaseUser != null){
            
            console.log("logged in");
            console.log(firebaseUser.emailVerified);
    
            //btn confirm
            btn_confirm.addEventListener('click', function(){
                
                if(firebaseUser.emailVerified == false){
                    alert("Email is not verified")
                }else{
                    //redirect to index.html
                    //update verufystatus
                    var postData = {
                      verifyState: "Yes"
                    };
                    var updates = {};
                    updates["users/" + firebaseUser.uid] = postData;
                    window.location.assign("index.html");
                    return firebase.database().ref().update(updates);
                }
            });
        }else{
            
            console.log("not logged in")
        }
      });
  } 

  //resent email
  btn_resent_email.addEventListener("click", function(){

    var user = firebase.auth().currentUser;

    user.sendEmailVerification().then(function() {
      // Email sent.
      alert("Email has been resent");
    }).catch(function(error) {
      // An error happened.
      console.log(error.message);
      console.log(error.code);
    });

  });