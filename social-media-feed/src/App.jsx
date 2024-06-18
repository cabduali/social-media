import React from 'react'
import SignIn from './components/SignIn'
import { Route, Routes } from 'react-router-dom'
import SignUp from './components/SignUp'
import Dashboard from './pages/Dashboard'

export const App = () => {
  return (
  <Routes>
    <Route path='/SignIn' element={<SignIn/>}/>
    <Route path='/SignUp' element={<SignUp/>}/>
    <Route path='/dashboard' element={<Dashboard/>}/>
  </Routes>

  )
}
export default App