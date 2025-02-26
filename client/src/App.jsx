import React from 'react'
import { useNavigate , Routes , Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage';
import RegisterPage from "./pages/RegisterPage"
import LandingPage from "./pages/LandingPage"
import MultiFac from "./pages/MultiFac"

const App = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/home' element={<LandingPage/>} />
        <Route path='/2fa' element={<MultiFac />} />
      </Routes>
    </div>
  )
}

export default App