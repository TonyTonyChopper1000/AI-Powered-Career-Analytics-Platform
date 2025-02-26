import React from 'react'
import { useNavigate , Routes , Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage';

const App = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Routes>
        <Route path='/' element={<LoginPage />} />
      </Routes>
    </div>
  )
}

export default App