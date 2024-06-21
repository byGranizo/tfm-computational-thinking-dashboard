import './Home.css'
import { useEffect, useState } from 'react'
import { getTurns } from '@/services/data'
import { DonutChart, Legend } from '@tremor/react'

const sales = [
  {
    name: 'New York',
    sales: 980,
  },
  {
    name: 'London',
    sales: 456,
  },
  {
    name: 'Hong Kong',
    sales: 390,
  },
  {
    name: 'San Francisco',
    sales: 240,
  },
  {
    name: 'Singapore',
    sales: 190,
  },
]

const valueFormatter = (number) => `$ ${Intl.NumberFormat('us').format(number).toString()}`

export function Home() {
  const [turns, setTurns] = useState([])

  useEffect(() => {
    async function fetchTurns() {
      const turns = await getTurns()
      setTurns(turns)
    }

    fetchTurns()
  }, [])
  return (
    <div className='home'>
      <h1>Home</h1>
      <ul>
        {turns.map((turn, index) => (
          <li key={index}>
            {turn.id} - {turn.game_id} - {turn.turn_n}
          </li>
        ))}
      </ul>

      <div className='flex items-center justify-center space-x-6'>
        <DonutChart
          data={sales}
          category='sales'
          index='name'
          valueFormatter={valueFormatter}
          colors={['blue', 'cyan', 'indigo', 'violet', 'fuchsia']}
          className='w-40'
        />
        <Legend
          categories={['New York', 'London', 'Hong Kong', 'San Francisco', 'Singapore']}
          colors={['blue', 'cyan', 'indigo', 'violet', 'fuchsia']}
          className='max-w-xs'
        />
      </div>
    </div>
  )
}
