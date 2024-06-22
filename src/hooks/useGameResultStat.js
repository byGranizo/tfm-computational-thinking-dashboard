//Proporción de partidas no terminadas/ganadas/perdidas respecto al total

import { useState, useCallback, useEffect } from 'react'

export const useGameResultStat = () => { 
  const [data, setData] = useState([])

  const calculateGameResultStat = useCallback((games) => {
    const totalGames = games.length
    let winnedGames = 0
    let lostGames = 0
    let notFinishedGames = 0

    games.forEach(game => {
      if(game.result === true){
        winnedGames++
        return
      }

      if(game.result === false){
        winnedGames++
        return
      }

      notFinishedGames++
    })

    const winnedGamesRatio = (winnedGames / totalGames) * 100
    const lostGamesRatio = (lostGames / totalGames) * 100
    const notFinishedGamesRatio = (notFinishedGames / totalGames) * 100

    setData[
      {
        label: "Win",
        total: winnedGames,
        ratio: winnedGamesRatio
      },
      {
        label: "Lost",
        total: lostGames,
        ratio: lostGamesRatio
      },
      {
        label: "Not Finished",
        total: notFinishedGames,
        ratio: notFinishedGamesRatio
      }
    ]
  }, [])

  useEffect(() => {
    calculateGameResultStat(games)
  }, [])

  return data
}