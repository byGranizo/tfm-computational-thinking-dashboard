import { Routes, Route, Navigate } from 'react-router-dom'
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
      <Route path='*' element={<Navigate replace to='/' />} />
    </Routes>
  )
}

export default App
