import React from 'react'
import { Toaster } from 'react-hot-toast'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Register from './pages/Register'
import RecipeDashboard from './User/Dashboard'
import List from './user/List'

const App = () => {
  return (
    <BrowserRouter>
    <Toaster position='top-right' />
      <Routes>
        <Route path='/' element={<Landing/>}/>
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/user-home' element={<RecipeDashboard/>} />
        <Route path='/recipe-list' element={<List/>} />
      </Routes>
    </BrowserRouter>

  )
}

export default App
