import MenuLink from './MenuLink'
import './Menu.css'

import { useUser } from '@/hooks/useUser'

const ROUTES = [{ name: 'Home', path: '/' }]

export function Menu() {
  const { logout } = useUser()

  return (
    <aside className='left-menu'>
      <ul>
        {ROUTES.map((route) => (
          <MenuLink key={route.name} name={route.name} route={route.path} />
        ))}
      </ul>
      <button onClick={logout}>Logout</button>
    </aside>
  )
}
