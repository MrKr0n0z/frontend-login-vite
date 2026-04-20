import { useState, useContext, useEffect } from 'react'
import { AuthContext } from '../context/AuthContext'
import './Perfil.css'

export default function Perfil() {
  const { user, login } = useContext(AuthContext)
  const [formData, setFormData] = useState({ name: '', email: '' })
  const [loading, setLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')

  // Pre-poblar el formulario con los datos del usuario
  useEffect(() => {
    if (user) {
      setFormData({ name: user.name, email: user.email })
    }
  }, [user])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)

    // Simular petición al servidor
    setTimeout(() => {
      const updatedUser = {
        ...user,
        name: formData.name,
        email: formData.email,
      }
      login(updatedUser)
      setLoading(false)
      setSuccessMessage('¡Perfil actualizado exitosamente!')

      // Limpiar mensaje después de 3 segundos
      setTimeout(() => {
        setSuccessMessage('')
      }, 3000)
    }, 1000)
  }

  return (
    <div className="perfil-container">
      <div className="perfil-card">
        <h1>Mi Perfil</h1>

        {successMessage && (
          <div className="success-message">
            ✓ {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Nombre:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Tu nombre completo"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="tu@email.com"
            />
          </div>

          <button type="submit" disabled={loading} className="submit-btn">
            {loading ? 'Guardando cambios...' : 'Guardar Cambios'}
          </button>
        </form>

        <div className="perfil-info">
          <h3>Información de Cuenta</h3>
          <p><strong>ID de Usuario:</strong> {user?.id}</p>
          <p><strong>Miembro desde:</strong> 20 de Abril de 2026</p>
        </div>
      </div>
    </div>
  )
}
