import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import DashboardPage from '@/features/dashboard'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/dashboard" element={<DashboardPage />} />
    </Routes>
  )
}

export default App
