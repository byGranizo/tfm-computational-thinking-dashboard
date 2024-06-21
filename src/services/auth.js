import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/lib/firebase'

export async function firebaseLogin(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    console.log(userCredential)
    const user = userCredential.user

    return user
  } catch (error) {
    throw new Error(error.message)
  }
}
