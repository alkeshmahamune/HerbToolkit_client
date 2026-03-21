import React from 'react'
import { Toaster } from 'react-hot-toast'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Register from './pages/Register'
import RecipeDashboard from './user/dashboard'
// import List from './user/List'
import InfluencerDashboard from './influencer/InfluencerDashboard'
import DoctorDashboard from './doctor/Dashboard'

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
        {/* <Route path='/recipe-list' element={<List/>} /> */}
        {/* user routes end */}

        {/* influencer path start */}
        <Route path='/influencer-home' element={<InfluencerDashboard/>}/>
        {/* influencer path end */}

        {/* doctor path start */}
        <Route path='/doctor-home' element={<DoctorDashboard/>}/>
        {/* doctor path end */}
      </Routes>
    </BrowserRouter>

  )
}

export default App
