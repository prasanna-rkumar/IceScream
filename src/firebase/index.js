import firebase from 'firebase/app'

import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FB_API_KEY,
  authDomain: process.env.REACT_APP_FB_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FB_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FB_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FB_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FB_APP_ID,
  measurementId: process.env.REACT_APP_FB_MEASUREMENT_ID
};

firebase.initializeApp(firebaseConfig);

const iceCreamFirestore = firebase.firestore();
const iceCreamStorage = firebase.storage();
const iceCreamAuth = firebase.auth();

const firebaseTimestamp = firebase.firestore.FieldValue.serverTimestamp;
const firestoreArrayUnion = firebase.firestore.FieldValue.arrayUnion;
const firestoreArrayRemove = firebase.firestore.FieldValue.arrayRemove;

const firestoreIncrement = firebase.firestore.FieldValue.increment;

const GoogleAuthProvider = firebase.auth.GoogleAuthProvider;

export { iceCreamFirestore, iceCreamStorage, iceCreamAuth, firebaseTimestamp, firestoreArrayUnion, firestoreArrayRemove, GoogleAuthProvider, firestoreIncrement };