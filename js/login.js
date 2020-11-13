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
  const input_password = document.getElementById("form-group-input-password");
  const btn_login = document.getElementById("btn-login");
  const btn_google = document.getElementById("btn-google");
  const btn_fackbook = document.getElementById("btn-facebook");
  const btn_forget_password = document.getElementById("btn-forget-password");
  const btn_create_account = document.getElementById("btn-create-account");

  firebase.auth().onAuthStateChanged(function(user){
    if(user){
        window.location.assign("index.html");
    }else{
      
    }

  });

  btn_login.addEventListener("click", e =>{

    const txtEmail = input_email.value;
    const txtPassword = input_password.value;
    
    if(txtEmail != "" && txtPassword != ""){

        firebase.auth().signInWithEmailAndPassword(txtEmail, txtPassword).then(function(){

            //successful
            window.location.assign("index.html");

        }).catch(function(error){

            console.log(error.message);
            console.log(error.code);
            if(error.code == "auth/user-not-found"){
                alert("There is no such email registered");
            }
            if(error.code == 'auth/wrong-password'){
                alert("The password is invalid");
            }

        })
    }else{
            
    }
  });

  //google login
  btn_google.addEventListener("click", e =>{

    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        // ...
        //add to real time database
        var postData = {
            id: user.uid,
            email: user.email,
            verifyState: "Yes"
        }

        var updates = {}

        updates["users/" + user.uid] = postData
        window.location.assign("index.html");
        return firebase.database().ref().update(updates);

    }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
  
        console.log(error.message);
        console.log(error.code);
    });
})

btn_fackbook.addEventListener("click", e=>{

    alert("Not support facebook login yet, but soon!")

});