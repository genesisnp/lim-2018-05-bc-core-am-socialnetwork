//LOG IN
var config = {
    apiKey: "AIzaSyCogi6h8Zzei84YxO-G5vDVncNAtC5JQR8",
    authDomain: "salutem-2a3f8.firebaseapp.com",
    databaseURL: "https://salutem-2a3f8.firebaseio.com",
    projectId: "salutem-2a3f8",
    storageBucket: "salutem-2a3f8.appspot.com",
    messagingSenderId: "806151192945"
};
firebase.initializeApp(config);

//SIGN UP
let signupBtn = document.getElementById("sign_up");
signupBtn.addEventListener("click", e => {
    let emailValue = email.value,
        passValue = password.value;
    const auth = firebase.auth();
    const promise = auth.createUserWithEmailAndPassword(emailValue, passValue);
    promise.catch(e => console.log(e.message));
})
