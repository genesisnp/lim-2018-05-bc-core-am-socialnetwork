let config = {
  apiKey: "AIzaSyADhe8BrL2a1vVRQnECNe4np96pxkwgoSw",
    authDomain: "salutem-a2461.firebaseapp.com",
    databaseURL: "https://salutem-a2461.firebaseio.com",
    projectId: "salutem-a2461",
    storageBucket: "salutem-a2461.appspot.com",
    messagingSenderId: "953244358481"
};

firebase.initializeApp(config);
// sections
let sectionLogIn = document.getElementById("main-log-in");
let sectionSignUp = document.getElementById("main-sign-up");
let sectionResponseLogIn = document.getElementById("response-log-in");
let sectionResponseSignUp = document.getElementById("response-sign-up");
let sectionLogOut = document.getElementById("log-out");

// botones
let btnLogIn = document.getElementById("btn-log-in");
let btnSignUp = document.getElementById("btn-sign-up");
let btnLogOut = document.getElementById("btn-log-out");
let btnFacebook = document.getElementById('btn-facebook');

// inputs
let txtEmailLogIn = document.getElementById("txt-user-mail-login");
let txtPasswordLogIn = document.getElementById("txt-user-password-login");
let txtNameSignUp = document.getElementById("txt-user-name-signup");
let txtEmailSignUp = document.getElementById("txt-user-mail-signup");
let txtPasswordSignUp = document.getElementById("txt-user-password-signup");

let database = firebase.database();

// enlaces
let goToSignUp = document.getElementById("go-to-sign-up");
let goToLogIn = document.getElementById("go-to-log-in");

function guardarUsuarios(user){
  let usuarios = {
    uid: user.uid,
    name: user.displayName,
    //dateOfBirth: user.dateOfBirth,
    // sexo: user.sexo,
    // city:user.city,
    // district:user.district,
    // profilePicture: user.profilePicture,
    email: user.email,
    password: user.password,
  }
  firebase.database().ref('users/' + usuarios.ui).set(usuarios);
  console.log(user);
}



const logOut = () => {
  firebase.auth().signOut().then(() => {
    txtEmailLogIn.value = "";
    txtPasswordLogIn.value = "";
    txtNameSignUp.value = "";
    txtEmailSignUp.value = "";
    txtPasswordSignUp.value = "";
    sectionLogOut.hidden = true;
    sectionResponseLogIn.hidden = true;
    sectionResponseSignUp.hidden = true;
    sectionSignUp.hidden = true;
    sectionLogIn.hidden = false;
    console.log("saliste");
  });
}

const validateLogIn = () => {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      sectionLogIn.hidden = true;
      sectionResponseLogIn.hidden = false;
      sectionLogOut.hidden = false;
    }
  });
}

const logIn = () => {
  const auth = firebase.auth();
  user.email = txtEmailLogIn.value;
  user.password = txtPasswordLogIn.value;
  if (user.email !== "" && user.password !== "") {
    const promise = auth.signInWithEmailAndPassword(user.email, user.password).then(() => validateLogIn());
    promise.catch(e => console.log(e.message));
  }
}

const verificate = () => {
  let user = firebase.auth().currentUser;
  if (user) {
    user.sendEmailVerification().then(() => {
      console.log("enviando");
      document.getElementById("user-name-sign-up").innerHTML = user.displayName;
      sectionSignUp.hidden = true;
      sectionResponseSignUp.hidden = false;
      sectionLogOut.hidden = false;
      guardarUsuarios(user);
    }).catch(function (error) {
      console.log(error);
    });
  }
}

const signUp = () => {
  const auth = firebase.auth();
  name = txtNameSignUp.value;
  email = txtEmailSignUp.value;
  password = txtPasswordSignUp.value;
    const promise = auth.createUserWithEmailAndPassword(email, password).then(function(){
      var user = firebase.auth().currentUser;
      verificate();
      
    });
    promise.catch(e => console.log(e.message));
  }


const showSignUp = () => {
  sectionLogIn.hidden = true;
  sectionSignUp.hidden = false;
}

const showLogIn = () => {
  sectionSignUp.hidden = true;
  sectionLogIn.hidden = false;
}
// function agregarUserBd (uid,name){
//   const conectados = userConect.push({
//     uid: uid,
//     name: name,
//     email:email,
//     password: password
//   });
// }
const facebook =() => {
  const providerFacebook = new firebase.auth.FacebookAuthProvider();
  providerFacebook.addScope('Default fields');
  firebase.auth().signInWithPopup(providerFacebook).then(function(result){
    let token = result.credential.accesToken;
    let user = result.user;
    console.log('user');
    
  }).catch(function(error) {
     
      console.log (error);  
  })
}

btnLogIn.addEventListener("click", () => logIn());
goToSignUp.addEventListener("click", () => showSignUp());
goToLogIn.addEventListener("click", () => showLogIn());
btnSignUp.addEventListener("click", () => signUp());
btnLogOut.addEventListener("click", () => logOut());
btnFacebook.addEventListener('click',() => facebook());