import { db } from '@/lib/firebase'
import { collection, getDocs, orderBy, query } from 'firebase/firestore'

export const turnRef = collection(db, 'turn')
export const gameRef = collection(db, 'game')
export const missionRef = collection(db, 'completed_mission')

export async function getTurns() {
  const turns = []
  const querySnapshot = await getDocs(turnRef)

  querySnapshot.forEach((doc) => {
    turns.push({
      id: doc.id,
      ...doc.data(),
    })
  })

  return turns
}

export async function getTurns2() {
  const turns = []

  const q = query(turnRef, orderBy('field'))
  const querySnapshot = await getDocs(q)

  querySnapshot.forEach((doc) => {
    turns.push({
      id: doc.id,
      ...doc.data(),
    })
  })

  return turns
}
