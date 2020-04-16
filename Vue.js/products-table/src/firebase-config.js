import firebase from 'firebase';
require('firebase/firestore');

var firebaseConfig = {
    apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
    authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL:process.env.VUE_APP_FIREBASE_DATASE_URL,
    projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGE_SENDER_ID,
    appId: process.env.VUE_APP_FIREBASE_APP_ID
  };
  console.log('firebaseConfig');
  console.log(process.env);
  
  console.log(firebaseConfig);
  
  // Initialize Firebase
firebase.initializeApp(firebaseConfig)