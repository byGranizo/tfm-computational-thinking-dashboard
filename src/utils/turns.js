export function groupTurnsByNTurnOfGame(turns) {
  const turnsByNTurn = turns.reduce((acc, turn) => {
    const gameId = turn.game_id

    let index = 0
    while (index < acc.length && acc[index][gameId]) {
      index++
    }

    if (index === acc.length) {
      acc.push({ [gameId]: turn })
    } else {
      acc[index][gameId] = turn
    }

    return acc
  }, [])

  return turnsByNTurn
}
