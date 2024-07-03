export function groupGamesByNMatchOfTheUser(games) {
  const gamesByNMatch = []

  const gamesSorted = games
    .filter((game) => !!game.date_end)
    .sort((a, b) => new Date(a.date_end) - new Date(b.date_end))

  gamesSorted.forEach((game) => {
    const userId = game.uid

    let index = 0
    while (index < gamesByNMatch.length && gamesByNMatch[index][userId]) {
      index++
    }

    if (index === gamesByNMatch.length) {
      gamesByNMatch.push({ [userId]: game })
    } else {
      gamesByNMatch[index][userId] = game
    }
  })

  return gamesByNMatch
}
