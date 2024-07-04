//Media del ratio ganar/perder según se suman nuevas partida

import { useState, useCallback, useEffect } from 'react'
import { groupGamesByNMatchOfTheUser } from '../utils/game'
import { getGames } from '../services/data'

export const useGameWinLoseRatioStat = () => {
  const [data, setData] = useState([])

  const calculateGameWinLoseRatioStat = useCallback((games) => {
    const gamesParsed = groupGamesByNMatchOfTheUser(games)

    const gamesWinLoseRatio = gamesParsed.map((nGame, index) => {
      const totalGames = Object.keys(nGame).length
      let winnedGames = 0
      let lostGames = 0

      Object.entries(nGame).forEach(([, game]) => {
        if (game.result === true) {
          winnedGames++
          return
        }

        lostGames++
      })

      const winnedGamesRatio = (winnedGames / totalGames) * 100
      const lostGamesRatio = (lostGames / totalGames) * 100

      return {
        index: index + 1,
        total: totalGames,
        winnedGames,
        winnedGamesRatio,
        lostGames,
        lostGamesRatio,
      }
    })

    setData(gamesWinLoseRatio)
  }, [])

  useEffect(() => {
    async function fetchData() {
      const games = await getGames()
      calculateGameWinLoseRatioStat(games)
    }

    fetchData()
  }, [calculateGameWinLoseRatioStat])

  return data
}
