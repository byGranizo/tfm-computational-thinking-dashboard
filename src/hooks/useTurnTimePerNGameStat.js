//Proporción de partidas no terminadas/ganadas/perdidas respecto al total

import { useState, useCallback, useEffect } from 'react'
import { getTurns } from '../services/data'

export const useTurnTimePerNGameStat = () => {
  const [data, setData] = useState([])

  const calculateTurnTimePerNGameStat = useCallback((turns) => {
    const turnsGroupedByOrdinalNumber = turns.reduce((acc, turn) => {
      if (!acc[turn.turn_n]) {
        acc[turn.turn_n] = []
      }

      acc[turn.turn_n].push(turn)
      return acc
    }, {})

    const averageTimePerNTurn = Object.keys(turnsGroupedByOrdinalNumber).map((turnNumber) => {
      const turns = turnsGroupedByOrdinalNumber[turnNumber]
      const totalTurnTime = turns.reduce((acc, turn) => acc + turn.turn_time, 0)
      const averageTurnTime = totalTurnTime / turns.length

      return {
        turnNumber,
        averageTurnTime,
      }
    })

    setData(averageTimePerNTurn)
  }, [])

  useEffect(() => {
    async function fetchData() {
      const turns = await getTurns()
      calculateTurnTimePerNGameStat(turns)
    }

    fetchData()
  }, [calculateTurnTimePerNGameStat])

  return data
}
