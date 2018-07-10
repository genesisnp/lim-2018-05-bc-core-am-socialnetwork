var config = {
    apiKey: "AIzaSyCogi6h8Zzei84YxO-G5vDVncNAtC5JQR8",
    authDomain: "salutem-2a3f8.firebaseapp.com",
    databaseURL: "https://salutem-2a3f8.firebaseio.com",
    projectId: "salutem-2a3f8",
    storageBucket: "salutem-2a3f8.appspot.com",
    messagingSenderId: "806151192945"
};
firebase.initializeApp(config);

let email = document.getElementById('email'),
    password = document.getElementById('password'),
    iniciarBtn = document.getElementById('iniciar');
    
iniciarBtn.addEventListener('click', e => {
    let email_Value = email.value,
        pass_Value = password.value;
    const auth = firebase.auth();
    const promise = auth.signInWithEmailAndPassword(email_Value, pass_Value);
    promise.catch(e => console.log(e.message));
})
let salir = document.getElementById('salir');
salir.addEventListener('click', e => {
    firebase.auth().signOut();
})
// observer - verifica si el usuario esta logueado
firebase.auth().onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
        console.log(firebaseUser);
        salir.hidden = false;
    } else {
        console.log('no logueado');
        salir.hidden = true;
    }
})