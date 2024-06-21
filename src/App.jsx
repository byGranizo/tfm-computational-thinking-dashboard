import { Routes, Route } from 'react-router-dom'
import { AuthLayout, AnonLayout } from '@/layouts'
import { Home, Login } from '@/pages'

function App() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path='/' element={<Home />} />
      </Route>
      <Route element={<AnonLayout />}>
        <Route path='/login' element={<Login />} />
      </Route>
    </Routes>
  )
}

export default App
