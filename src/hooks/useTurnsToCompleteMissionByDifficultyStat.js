//Número de turnos que se tardan en completar misiones según la dificultad de dichas misiones

import { useState, useCallback, useEffect } from 'react'
import { getMissionsCompleted } from '../services/data'
export const useTurnsToCompleteMissionByDifficultyStat = () => {
  const [data, setData] = useState([])

  const calculateTurnsToCompleteMissionByDifficultyStat = useCallback((missions) => {
    const difficulties = {}

    missions.forEach((mission) => {
      const difficulty = mission.difficulty
      const turns = mission.turns

      if (difficulties[difficulty]) {
        difficulties[difficulty].totalTurns += turns
        difficulties[difficulty].totalMissions++
        return
      } else {
        difficulties[difficulty] = {
          totalTurns: turns,
          totalMissions: 1,
        }
      }
    })

    const turnsToCompleteMissionByDifficulty = Object.keys(difficulties).map((difficultyKey) => {
      const difficulty = difficulties[difficultyKey]
      const averageTurns = difficulty.totalTurns / difficulty.totalMissions

      return {
        difficulty: difficultyKey,
        averageTurns,
      }
    })

    setData(turnsToCompleteMissionByDifficulty)
  }, [])

  useEffect(() => {
    async function fetchData() {
      const missions = await getMissionsCompleted()
      calculateTurnsToCompleteMissionByDifficultyStat(missions)
    }

    fetchData()
  }, [calculateTurnsToCompleteMissionByDifficultyStat])

  return data
}
