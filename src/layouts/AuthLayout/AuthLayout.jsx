import { Outlet, useNavigate } from 'react-router-dom'
import { useUser } from '@/hooks/useUser'
import { Menu } from '@/components'
import './AuthLayout.css'
import { useEffect } from 'react'

export function AuthLayout() {
  const { isLogged } = useUser()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLogged) {
      navigate('/login', { replace: true })
    }
  }, [isLogged, navigate])

  return (
    <div className='auth-layout'>
      <Menu />
      <main role='main'>
        <Outlet />
      </main>
    </div>
  )
}
