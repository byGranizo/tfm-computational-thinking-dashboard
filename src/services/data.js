import { db } from '@/lib/firebase'
import { collection, getDocs, orderBy, query } from 'firebase/firestore'

export const turnRef = collection(db, 'turn')
export const gameRef = collection(db, 'game')
export const missionRef = collection(db, 'completed_mission')

export async function getTurnsTest() {
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

export async function getTurns() {
  const turns = []

  const q = query(turnRef, orderBy('timestamp', 'acs'))
  const querySnapshot = await getDocs(q)

  querySnapshot.forEach((doc) => {
    turns.push({
      id: doc.id,
      ...doc.data(),
    })
  })

  return turns
}

export async function getGames() {
  const games = []

  const q = query(gameRef, orderBy('date_start', 'asc'))
  const querySnapshot = await getDocs(q)

  querySnapshot.forEach((doc) => {
    games.push({
      id: doc.id,
      ...doc.data(),
    })
  })

  return games
}

export async function getMissionsCompleted() {
  const missions = []

  const q = query(missionRef, orderBy('date', 'asc'))
  const querySnapshot = await getDocs(q)

  querySnapshot.forEach((doc) => {
    missions.push({
      id: doc.id,
      ...doc.data(),
    })
  })

  return missions
}
