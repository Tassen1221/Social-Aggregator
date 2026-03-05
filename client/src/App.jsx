import { useState } from 'react'

const API = 'https://social-aggregator-backend-ubdf.onrender.com'

function App() {
  const [token, setToken] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isRegister, setIsRegister] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async () => {
    setError('')
    const endpoint = isRegister ? '/api/auth/register' : '/api/auth/login'

    try {
      const res = await fetch(`${API}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      })
      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Something went wrong')
        return
      }

      if (isRegister) {
        setIsRegister(false)
        setError('Account created! Please log in.')
      } else {
        setToken(data.token)
      }
    } catch (e) {
      setError('Could not reach server')
    }
  }

  if (token) {
    return (
      <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
        <h1>Social Aggregator</h1>
        <p>✅ You are logged in!</p>
        <button onClick={() => setToken(null)}>Log out</button>
      </div>
    )
  }

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif', maxWidth: '400px' }}>
      <h1>Social Aggregator</h1>
      <h2>{isRegister ? 'Register' : 'Login'}</h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          style={{ padding: '0.5rem', fontSize: '1rem' }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={{ padding: '0.5rem', fontSize: '1rem' }}
        />
        <button onClick={handleSubmit} style={{ padding: '0.5rem', fontSize: '1rem' }}>
          {isRegister ? 'Register' : 'Login'}
        </button>
        {error && <p style={{ color: isRegister ? 'green' : 'red' }}>{error}</p>}
        <p
          onClick={() => { setIsRegister(!isRegister); setError('') }}
          style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}
        >
          {isRegister ? 'Already have an account? Login' : "Don't have an account? Register"}
        </p>
      </div>
    </div>
  )
}

export default App