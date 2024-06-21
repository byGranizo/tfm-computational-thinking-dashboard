import { Link } from 'react-router-dom'
import './Menu.css'

export default function MenuLink(props) {
  const { route, name } = props

  return (
    <li>
      <Link className={`left-menu-entry ${route === '' && 'left-menu-entry__active'}`} to={route}>
        {name}
      </Link>
    </li>
  )
}
