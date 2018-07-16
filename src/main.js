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
const sectionLogIn = document.getElementById("main-log-in");
const sectionSelectionUsers = document.getElementById("select-user");
const sectionSignUp = document.getElementById("main-sign-up");
const sectionResponseLogIn = document.getElementById("response-log-in");
const sectionResponseSignUp = document.getElementById("response-sign-up");
const sectionLogOut = document.getElementById("log-out");
const modal = document.getElementById('myModal');
const closeModal = document.getElementsByClassName("close")[0];

// botones
const btnLogIn = document.getElementById("btn-log-in");
const btnSignUp = document.getElementById("btn-sign-up");
const btnLogOut = document.getElementById("btn-log-out");
const btnGoogleLogIn = document.getElementById("btn-google-log-in");
const btnFacebookLogIn = document.getElementById("btn-fb-log-in");
const btnEmailUserResgister = document.getElementById("userRegister");
const btnFacebookSignUp = document.getElementById("btn-fb-sign-up");
const btnGoogleSignUp = document.getElementById("btn-google-sign-up");

const sectionPostUser = document.getElementById('post-user');
const btnPublic = document.getElementById('btnPublic');
const post = document.getElementById('post');

// inputs
const txtEmailLogIn = document.getElementById("txt-user-mail-login");
const txtPasswordLogIn = document.getElementById("txt-user-password-login");
const txtNameSignUp = document.getElementById("txt-user-name-signup");
const txtDateOfBirthSignUp = document.getElementById("txt-date-of-birth-signup");
const txtSexoSignUp = document.getElementById("txt-sexo-signup");
const txtEmailSignUp = document.getElementById("txt-user-mail-signup");
const txtPasswordSignUp = document.getElementById("txt-user-password-signup");
const txtConfirmPasswordSignUp = document.getElementById("txt-user-confirm-password-signup");

let database = firebase.database();

// enlaces
const goToSignUp = document.getElementById("go-to-sign-up");
const goToLogIn = document.getElementById("go-to-log-in");
const goToSignUpUsers = document.getElementById("sign-up-users");
const goToSignUpDoctors = document.getElementById("sign-up-doctors");

function guardarUsuarios(user){
  let uid = user.uid;
  delete user.uid;
  firebase.database().ref('user/' + uid).set(user);
  console.log(user);
}

const patronEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;

window.onload = () => {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      sectionLogIn.hidden = true;
      sectionResponseLogIn.hidden = false;
      sectionLogOut.hidden = false;
      console.log("usuario logueado")
      // User is signed in.
      // const displayName = user.displayName;
      // const email = user.email;
      // const emailVerified = user.emailVerified;
      // const photoURL = user.photoURL;
      // const isAnonymous = user.isAnonymous;
      // const uid = user.uid;
      // const providerData = user.providerData;
    } else console.log("no estas logueado");
  });
  firebase.database().ref('/user').once('value').then(function(snapshot) {
    console.log(snapshot.val());
  });
}

const logOut = () => {
  firebase.auth().signOut().then(() => {
    txtEmailLogIn.value = "";
    txtPasswordLogIn.value = "";
    txtNameSignUp.value = "";
    txtEmailSignUp.value = "";
    txtPasswordSignUp.value = "";
    txtConfirmPasswordSignUp.value = "";
    sectionLogOut.hidden = true;
    sectionResponseLogIn.hidden = true;
    sectionSelectionUsers.hidden = true;
    sectionResponseSignUp.hidden = true;
    sectionSignUp.hidden = true;
    sectionLogIn.hidden = false;
    sectionPostUser.hidden = true;
    console.log("saliste");
  });
}

const ableBtnLogIn = () => {
  
  if (txtEmailLogIn.value.length > 0 && patronEmail.test(txtEmailLogIn.value)) {
    document.getElementById("incorrect-email").hidden = true;
    if (txtPasswordLogIn.value !== "" && txtPasswordLogIn.value !== null) {
      document.getElementById("incorrect-password").hidden = true;
      if (txtEmailLogIn.value !== "" && txtPasswordLogIn.value !== "") {
        logIn();
      }
    } else {
      document.getElementById("incorrect-password").hidden = false;
    }
  } else {
    document.getElementById("incorrect-email").hidden = false;
  }
}

const validateLogIn = () => {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      document.getElementById("user-name-log-in").innerHTML = user.displayName;
      sectionLogIn.hidden = true;
      sectionResponseLogIn.hidden = false;
      sectionLogOut.hidden = false;
    }
  });
}

const logIn = () => {
  const auth = firebase.auth();
  const promise = auth.signInWithEmailAndPassword(txtEmailLogIn.value, txtPasswordLogIn.value).then(() => validateLogIn());
  promise.catch(e => {
    document.getElementById("incorrect-password").hidden = false;
  });
}

const signUpUsers = () => {
  sectionSignUp.hidden = false;
  sectionSelectionUsers.hidden = true;
  closeModel();
}

const verificate = () => {
  const user = firebase.auth().currentUser;
  
  if (user) {
    user.sendEmailVerification().then(() => {
      console.log(user);
      console.log("se envió correo de verificación de cuenta al correo");
      firebase.database().ref('/user/' + user.uid).once('value').then(function(snapshot) {
        console.log(snapshot.val());
        var username = (snapshot.val() && snapshot.val().name) || 'Anonymous';
        document.getElementById("user-name-sign-up").innerHTML = username;
      });
      sectionSignUp.hidden = true;
      sectionResponseSignUp.hidden = false;
      sectionLogOut.hidden = false;
      //validateLogIn ();
    }).catch(function (error) {
      console.log(error);
    });
  }
}

const signUp = () => {
  const auth = firebase.auth();
  //genesis
  name = txtNameSignUp.value;
  dateOfBirth = txtDateOfBirthSignUp.value;
  sexo = txtSexoSignUp.value;
  email = txtEmailSignUp.value;
  password = txtPasswordSignUp.value;
  //los datos 
  let dataUser = {};
    const promise = auth.createUserWithEmailAndPassword(email, password).then(function(){
      var user = firebase.auth().currentUser;
      console.log(user);
      dataUser.uid= user.uid;
      dataUser.name = name;
      dataUser.dateOfBirth = dateOfBirth;
      dataUser.sexo= sexo;
      dataUser.email= email;
      dataUser.password = password;
      guardarUsuarios(dataUser);
      verificate();  
    });
    promise.catch(e => console.log(e.message));

  }
  
      
      //anaflavia
//   user.name = txtNameSignUp.value;
//   user.email = txtEmailSignUp.value;
//   user.password = txtPasswordSignUp.value;
//   if (user.email !== "" && user.password !== "" && txtConfirmPasswordSignUp.value !== "") {
//     if (txtConfirmPasswordSignUp.value === user.password) {
//       const promise = auth.createUserWithEmailAndPassword(user.email, user.password).then(() => {
//         verificate();
//       });
//       promise.catch(e => console.log(e.message));
//     } else {
//       M.toast({
//         html: "Las contraseñas no coinciden"
//       });
//     }
//   } else {
//     M.toast({
//       html: "Correo inválido o no completaste los campos"
//     });
//   }
// }


const showSignUp = () => {
  if (txtEmailSignUp !== "" && txtPasswordSignUp !== "") {
    txtEmailLogIn.value = "";
    txtPasswordLogIn.value = "";
    txtConfirmPasswordSignUp.value = "";
  }
  sectionLogIn.hidden = true;
  sectionSelectionUsers.hidden = false;
  
}

const showLogIn = () => {
  if (txtEmailLogIn !== "" && txtPasswordLogIn !== "") {
    txtEmailLogIn.value = "";
    txtPasswordLogIn.value = "";
  }
  sectionSignUp.hidden = true;
  sectionLogIn.hidden = false;
  
}


const googleAccount = () => {
  const provider = new firebase.auth.GoogleAuthProvider();

  firebase.auth().signInWithPopup(provider).then(function (result) {
    const person = result.user;
    console.log(person.displayName);
  }).catch(function (error) {
    console.log(error.code);
    console.log(error.message);
    console.log(error.email);
    console.log(error.credential);
  });
}

const facebookAccount = () => {
  const provider = new firebase.auth.FacebookAuthProvider();

  firebase.auth().signInWithPopup(provider).then(function (result) {
    const person = result.user;
    console.log(person.displayName);
  }).catch(function (error) {
    console.log(error.code);
    console.log(error.message);
    console.log(error.email);
    console.log(error.credential);
  });
}

let openModal = () => {
  modal.style.display = "block";
};

let closeModel = () => {
  modal.style.display = "none";
};

function makePost() {
  const user = firebase.auth().currentUser;
  let datePosted = new Date();
  let posts ={
    fecha: datePosted,
    description: post.value
  }
  var key = firebase.database().ref().child('user').push().key;
  var updates = {};
  updates['/user/' + user.uid + '/posts' + '/' + key] = posts;
  firebase.database().ref().update(updates, function(error) {
    if (error) {
      console.log(error);
    } else {
      console.log("No hubo errores");
    }
  });

}


btnLogIn.addEventListener("click", () => ableBtnLogIn());
goToSignUp.addEventListener("click", () => showSignUp());
goToSignUpUsers.addEventListener("click", () => openModal());
userRegister.addEventListener("click", () => signUpUsers());
goToSignUpDoctors.addEventListener("click", () => console.log("seleccionaste doctores"));
goToLogIn.addEventListener("click", () => showLogIn());
btnSignUp.addEventListener("click", () => signUp());
btnGoogleLogIn.addEventListener("click", () => googleAccount());
btnFacebookLogIn.addEventListener("click", () => facebookAccount());
btnLogOut.addEventListener("click", () => logOut());
btnFacebookSignUp.addEventListener("click", () => facebookAccount());
btnGoogleSignUp.addEventListener("click", () => googleAccount());
closeModal.addEventListener("click", () => closeModel());
btnPublic.addEventListener("click", () => makePost());
