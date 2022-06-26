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
const input_password_confirm = document.getElementById("form-group-input-password-confirm");
const input_gender = document.getElementById("form-group-input-gender");
const input_name =document.getElementById("form-group-input-name");
const btn_submit_register = document.getElementById("btn-register");
const btn_have_account = document.getElementById("btn-have-account");

//button register
btn_submit_register.addEventListener('click', e =>{

    const txtEmail = input_email.value;
    const txtPassword = input_password.value;
    const txtPasswordConfirm = input_password_confirm.value;
    const inputGender = input_gender.value;
    const inputName = input_name.value;
    const auth = firebase.auth();
    if(txtEmail != "" && txtPassword != ""){
        if(txtPassword === txtPasswordConfirm){
            auth.createUserWithEmailAndPassword(txtEmail, txtPassword).then(function(){
    
                //create account successfuly

                //check user login status
                firebase.auth().onAuthStateChanged(function(user){
            
                    if(user){

                        //send emial verification
                        user.sendEmailVerification().then(function(){
                            
                        
                        }).catch(function(error){
                            console.log(error.message)
                            console.log(error.code)
                        })

                        updateFirebase(user, inputGender, inputName);
                
                    }else{
                    }

})
        
            }).catch(function(error){
                console.log(error.message);
                console.log(error.code);
                
                if(error.code == "auth/invalid-email"){
                    alert("The email address is not valid.");
                }
        
                if(error.code == "auth/email-already-in-use"){
                    alert("Email already exists");
                }
        
                if(error.code == "auth/weak-password"){
                    alert("password should at least 6 characters");
                }
            });
        }else{
            alert("Password does not match")
        }
    }else{
        
    }
    
    
});

function updateFirebase(user, inputGender, inputName){
    var database = firebase.database();
    //insert user data to realtime database
    var postData  = { 
        id: user.uid,
        email: user.email,
        gender: inputGender,
        user_name: inputName
    }

    var updates = {};

    updates["users/" + user.uid] = postData;
           
    database.ref().update(updates).then(user =>{
        window.location.assign("EmailVerification.html")
    });

}

//already have account
btn_have_account.addEventListener('click', e=>{

    window.location.assign("Login.html");

});