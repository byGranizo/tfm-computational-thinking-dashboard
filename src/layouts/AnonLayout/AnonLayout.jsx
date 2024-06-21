import { Outlet, useNavigate } from 'react-router-dom'
import { useUser } from '@/hooks/useUser'
import './AnonLayout.css'
import { useEffect } from 'react'

export function AnonLayout() {
  const { isLogged } = useUser()
  const navigate = useNavigate()

  useEffect(() => {
    if (isLogged) {
      navigate('/', { replace: true })
    }
  }, [isLogged, navigate])

  return (
    <div className='anon-layout'>
      <main role='main'>
        <Outlet />
      </main>
    </div>
  )
}
