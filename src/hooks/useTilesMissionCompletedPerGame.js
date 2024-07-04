//Número de misiones completadas a través de losetas por partida

import { getGames, getMissionsCompleted } from '../services/data'

import { useEffect, useState, useCallback } from 'react'

import { groupGamesByNMatchOfTheUser } from '../utils/game'

export const useTilesMissionCompletedPerGame = () => {
  const [data, setData] = useState([])

  const calculateMissionsCompletedPerGameStat = useCallback((games, missions) => {
    const gamesWithMissionsNumber = games.map((game) => {
      const missionsOfGame = missions.filter((mission) => mission.game_id === game.id)

      return {
        ...game,
        missionsNumber: missionsOfGame.length,
      }
    })

    const gamesParsed = groupGamesByNMatchOfTheUser(gamesWithMissionsNumber)

    const missionsCompletedPerGame = gamesParsed.map((nGame, index) => {
      const totalGames = Object.keys(nGame).length
      let missionsCompleted = 0

      Object.values(nGame).forEach((game) => {
        missionsCompleted += game.missionsNumber
      })

      return {
        index: index + 1,
        total: totalGames,
        missionsCompleted,
        averageMissions: missionsCompleted / totalGames,
      }
    })

    setData(missionsCompletedPerGame)
  }, [])

  useEffect(() => {
    async function fetchData() {
      const [games, missionsCompleted] = await Promise.all([getGames(), getMissionsCompleted()])
      calculateMissionsCompletedPerGameStat(games, missionsCompleted)
    }

    fetchData()
  }, [calculateMissionsCompletedPerGameStat])

  return data
}
