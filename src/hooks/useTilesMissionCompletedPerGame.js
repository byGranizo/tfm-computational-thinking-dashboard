//Número de misiones completadas a través de losetas por partida

import { getGames, getMissionsCompleted } from '../services/data'

import { useEffect, useState, useCallback } from 'react'

import { groupGamesByNMatchOfTheUser } from '../utils/game'

export const useTilesMissionCompletedPerGame = () => {
  const [data, setData] = useState([])

  const calculateMissionsCompletedPerGameStat = useCallback((games, missions) => {
    const gamesWithMountainsNumber = games.map((game) => {
      const mountains = missions.filter((mission) => mission.gameId === game.id)

      return {
        ...game,
        mountainsNumber: mountains.length,
      }
    })

    const gamesParsed = groupGamesByNMatchOfTheUser(gamesWithMountainsNumber)

    const mountainsCompletedPerGame = gamesParsed.map((nGame) => {
      const totalGames = Object.keys(nGame).length
      let mountainsCompleted = 0

      nGame.forEach((game) => {
        mountainsCompleted += game.mountainsNumber
      })

      return {
        total: totalGames,
        mountainsCompleted,
        averageMountains: totalGames / mountainsCompleted,
      }
    })

    setData(mountainsCompletedPerGame)
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
