import React from 'react'
import { Toaster } from 'react-hot-toast'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Register from './pages/Register'
import RecipeDashboard from './User/Dashboard'
import List from './user/List'
import InfluencerDashboard from './influencer/InfluencerDashboard'

const App = () => {
  return (
    <BrowserRouter>
    <Toaster position='top-right' />
      <Routes>

        {/* common path start */}
        <Route path='/' element={<Landing/>}/>
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        {/* common path end */}

        {/* user routes */}
        <Route path='/user-home' element={<RecipeDashboard/>} />
        <Route path='/recipe-list' element={<List/>} />
        {/* user routes end */}

        {/* influencer path start */}
        <Route path='/influencer-home' element={<InfluencerDashboard/>}/>
        {/* influencer path end */}
      </Routes>
    </BrowserRouter>

  )
}

export default App
