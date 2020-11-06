import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyACFNwmSdECZ_d2cEyasPOEXXAZTm6s4as",
    authDomain: "imessage-clone-86cbb.firebaseapp.com",
    databaseURL: "https://imessage-clone-86cbb.firebaseio.com",
    projectId: "imessage-clone-86cbb",
    storageBucket: "imessage-clone-86cbb.appspot.com",
    messagingSenderId: "194688857592",
    appId: "1:194688857592:web:ab57aa8398792545b1d20d"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export {auth, provider};
export default db;