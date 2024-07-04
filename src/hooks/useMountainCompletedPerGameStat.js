//Número de misiones completadas a través de losetas de montaña por partida

import { getGames, getMissionsCompleted } from '../services/data'

import { useEffect, useState, useCallback } from 'react'

import { groupGamesByNMatchOfTheUser } from '../utils/game'

export const useMountainCompletedPerGameStat = () => {
  const [data, setData] = useState([])

  const calculateMountainsCompletedPerGameStat = useCallback((games, missions) => {
    const gamesWithMountainsNumber = games.map((game) => {
      const mountains = missions.filter(
        (mission) => mission.game_id === game.id && mission.wildcard
      )

      return {
        ...game,
        mountainsNumber: mountains.length,
      }
    })

    const gamesParsed = groupGamesByNMatchOfTheUser(gamesWithMountainsNumber)

    const mountainsCompletedPerGame = gamesParsed.map((nGame, index) => {
      const totalGames = Object.keys(nGame).length
      let mountainsCompleted = 0

      Object.values(nGame).forEach((game) => {
        mountainsCompleted += game.mountainsNumber
      })

      return {
        index: index + 1,
        total: totalGames,
        mountainsCompleted,
        averageMountains: mountainsCompleted / totalGames,
      }
    })

    setData(mountainsCompletedPerGame)
  }, [])

  useEffect(() => {
    async function fetchData() {
      const [games, missionsCompleted] = await Promise.all([getGames(), getMissionsCompleted()])
      calculateMountainsCompletedPerGameStat(games, missionsCompleted)
    }

    fetchData()
  }, [calculateMountainsCompletedPerGameStat])

  return data
}
