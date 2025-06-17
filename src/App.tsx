import { Outlet } from 'react-router-dom'
import './App.css'

export function App() {
  return (
    <div className="App">
      <h1>Welcome to the Issue Tracker</h1>
      <Outlet />
    </div>
  )
}



