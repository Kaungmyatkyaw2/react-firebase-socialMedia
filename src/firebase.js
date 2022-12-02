
import {initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyDZ6MoDrpQe-Ru2JVMOkDnSL1mwqt57X6o",
    authDomain: "social-media-site-19e2a.firebaseapp.com",
    projectId: "social-media-site-19e2a",
    storageBucket: "social-media-site-19e2a.appspot.com",
    messagingSenderId: "392569135771",
    appId: "1:392569135771:web:9039a926980e9a32669c3e"
  };
  
  const app = initializeApp(firebaseConfig)
  const auth = getAuth(app)
  const db = getFirestore(app)
  const storage = getStorage(app)

  export {auth,db,storage}