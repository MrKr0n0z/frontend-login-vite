import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import './Dashboard.css'

export default function Dashboard() {
  const { user, logout } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="dashboard-container">
      <nav className="navbar">
        <div className="navbar-content">
          <h2 className="navbar-title">Mi App</h2>
          <div className="navbar-actions">
            <a href="/perfil" className="nav-link">Mi Perfil</a>
            <button onClick={handleLogout} className="logout-btn">
              Cerrar Sesión
            </button>
          </div>
        </div>
      </nav>

      <div className="dashboard-content">
        <div className="welcome-card">
          <h1>¡Bienvenido, {user?.name}!</h1>
          <p>Tu email: {user?.email}</p>
          <div className="dashboard-info">
            <p>Esta es tu página principal. Desde aquí puedes acceder a tu perfil y otras funcionalidades.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
