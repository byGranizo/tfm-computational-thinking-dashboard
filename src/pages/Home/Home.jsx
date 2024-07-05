import { DonutChart, Legend, LineChart, BarChart } from '@tremor/react'

import { useGameResultStat } from '@/hooks/useGameResultStat'
import { useGameWinLoseRatioStat } from '@/hooks/useGameWinLoseRatioStat'
import { useTurnsToCompleteMissionByDifficultyStat } from '@/hooks/useTurnsToCompleteMissionByDifficultyStat'
import { useTurnsToCompleteMissionByBiomeStat } from '@/hooks/useTurnsToCompleteMissionByBiomeStat'
import { useTurnTimePerNGameStat } from '@/hooks/useTurnTimePerNGameStat'
import { useMountainCompletedPerGameStat } from '@/hooks/useMountainCompletedPerGameStat'
import { useTilesMissionCompletedPerGame } from '@/hooks/useTilesMissionCompletedPerGame'

const valuePercentFormatter = (value) => `${Math.round(value)}%`
const valueIntFormatter = (value) => `${value}`

const customTooltip = (props) => {
  const { payload, active } = props
  if (!active || !payload) return null
  const categoryPayload = payload?.[0]
  if (!categoryPayload) return null

  return (
    <div className='bg-white p-4 rounded-md shadow-md'>
      <p className='text-lg font-semibold'>{categoryPayload.name}</p>
      <p className='text-sm text-gray-400'>Count: {categoryPayload.value}</p>
      <p className='text-sm text-gray-400'>
        Ratio: {valuePercentFormatter(categoryPayload.payload.ratio)}
      </p>
    </div>
  )
}

export function Home() {
  let gameResultStat,
    winLoseRarioPerGame,
    turnsToMissionByDifficulty,
    turnsToMissionByBiome,
    turnTimePerNGame,
    mountainMissionCompletedPerGame,
    tilesMissionCompletedPerGame = null

  gameResultStat = useGameResultStat()
  winLoseRarioPerGame = useGameWinLoseRatioStat()
  turnsToMissionByDifficulty = useTurnsToCompleteMissionByDifficultyStat()
  turnsToMissionByBiome = useTurnsToCompleteMissionByBiomeStat()
  turnTimePerNGame = useTurnTimePerNGameStat()
  mountainMissionCompletedPerGame = useMountainCompletedPerGameStat()
  tilesMissionCompletedPerGame = useTilesMissionCompletedPerGame()

  return (
    <div className='home'>
      {gameResultStat && (
        <div>
          <h2 className='text-2xl font-semibold'>
            Proporción de partidas no terminadas/ganadas/perdidas respecto de total
          </h2>

          <div className='flex items-center justify-center space-x-6 mb-20'>
            <DonutChart
              data={gameResultStat}
              category='total'
              index='label'
              valueFormatter={valueIntFormatter}
              colors={['green', 'red', 'gray']}
              className='w-40'
              customTooltip={customTooltip}
            />

            <Legend
              categories={gameResultStat.map((item) => item.label)}
              colors={['green', 'red', 'gray']}
              className='max-w-xs'
            />
          </div>
        </div>
      )}

      {winLoseRarioPerGame && (
        <div>
          <h2 className='text-2xl font-semibold'>
            Media del ratio ganar/perder según se suman nuevas partidas
          </h2>

          <div className='flex items-center justify-center space-x-6 mb-20'>
            <LineChart
              className='mt-4 h-72'
              data={winLoseRarioPerGame}
              index='index'
              yAxisWidth={65}
              categories={['winnedGamesRatio']}
              colors={['indigo']}
              valueFormatter={valueIntFormatter}
              minValue={0}
              maxValue={100}
              showLegend={false}
            />
          </div>
        </div>
      )}

      {turnsToMissionByDifficulty && (
        <div>
          <h2 className='text-2xl font-semibold'>
            Número de turnos que se tardan en completar misiones según la dificultad de dichas
            misiones{' '}
          </h2>

          <div className='flex items-center justify-center space-x-6 mb-20'>
            <BarChart
              className='mt-6'
              data={turnsToMissionByDifficulty}
              index='difficulty'
              categories={['averageTurns']}
              colors={['blue']}
              valueFormatter={valueIntFormatter}
              yAxisWidth={48}
              showLegend={false}
            />
          </div>
        </div>
      )}

      {turnsToMissionByBiome && (
        <div>
          <h2 className='text-2xl font-semibold'>
            Número de turnos en completar las misiones según su bioma
          </h2>

          <div className='flex items-center justify-center space-x-6 mb-20'>
            <BarChart
              className='mt-6'
              data={turnsToMissionByBiome}
              index='biome'
              categories={['averageTurns']}
              colors={['blue']}
              valueFormatter={valueIntFormatter}
              yAxisWidth={48}
              showLegend={false}
            />
          </div>
        </div>
      )}

      {turnTimePerNGame && (
        <div>
          <h2 className='text-2xl font-semibold'>
            Media del tiempo por turno según avanza la partida
          </h2>

          <div className='flex items-center justify-center space-x-6 mb-20'>
            <LineChart
              className='mt-4 h-72'
              data={turnTimePerNGame}
              index='turn'
              yAxisWidth={65}
              categories={['average_time']}
              colors={['indigo']}
              valueFormatter={valueIntFormatter}
              minValue={0}
              showLegend={false}
            />
          </div>
        </div>
      )}

      {mountainMissionCompletedPerGame && (
        <div>
          <h2 className='text-2xl font-semibold'>
            Número de misiones completadas a través de losetas de montaña por partida
          </h2>

          <div className='flex items-center justify-center space-x-6 mb-20'>
            <LineChart
              className='mt-4 h-72'
              data={mountainMissionCompletedPerGame}
              index='index'
              yAxisWidth={65}
              categories={['averageMountains']}
              colors={['indigo']}
              valueFormatter={valueIntFormatter}
              minValue={0}
              showLegend={false}
            />
          </div>
        </div>
      )}

      {tilesMissionCompletedPerGame && (
        <div>
          <h2 className='text-2xl font-semibold'>
            Número de misiones completadas a través de losetas por partida
          </h2>

          <div className='flex items-center justify-center space-x-6 mb-20'>
            <LineChart
              className='mt-4 h-72'
              data={tilesMissionCompletedPerGame}
              index='index'
              yAxisWidth={65}
              categories={['averageMissions']}
              colors={['indigo']}
              valueFormatter={valueIntFormatter}
              minValue={0}
              showLegend={false}
            />
          </div>
        </div>
      )}
    </div>
  )
}
