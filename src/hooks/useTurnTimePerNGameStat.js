//Proporción de partidas no terminadas/ganadas/perdidas respecto al total

import { useState, useCallback, useEffect } from 'react'
import { getTurns } from '../services/data'
import { groupTurnsByNTurnOfGame } from '../utils/turns'

export const useTurnTimePerNGameStat = () => {
  const [data, setData] = useState([])

  const calculateTurnTimePerNGameStat = useCallback((turns) => {
    turns.sort((a, b) => new Date(a.date) - new Date(b.date))
    const turnsGroupedByOrdinalNumber = groupTurnsByNTurnOfGame(turns)

    const averageTimePerNTurn = turnsGroupedByOrdinalNumber.map((turnsByOrdinalNumber, index) => {
      const totalTurnTime = Object.values(turnsByOrdinalNumber).reduce((acc, turn) => {
        return acc + turn.turn_duration
      }, 0)

      return {
        turn: index + 1,
        n_turns: Object.keys(turnsByOrdinalNumber).length,
        average_time: totalTurnTime / Object.keys(turnsByOrdinalNumber).length,
      }
    })

    console.log(averageTimePerNTurn)

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
