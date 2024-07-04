// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'


// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBik9ns5y_mA64Y36Ub0fUUj32xKjTYrWs',
  authDomain: 'tfm-ct-dashboard.firebaseapp.com',
  projectId: 'tfm-ct-dashboard',
  storageBucket: 'tfm-ct-dashboard.appspot.com',
  messagingSenderId: '1049506149922',
  appId: '1:1049506149922:web:9a2db83ae91e656d557c7b',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app)
export const db = getFirestore(app)
export default app
