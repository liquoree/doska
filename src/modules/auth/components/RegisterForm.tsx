import { useState } from 'react'
import Button from '@/shared/ui/Button/Button'
import { register } from '@/api/auth'
import './Forms.scss'

export default function RegisterForm({ onSuccess }: { onSuccess: () => void }) {
  const [nickname, setNickname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const { data } = await register(nickname, email, password)
      localStorage.setItem('token', data.access_token)
      localStorage.setItem('user_id', data.user_id)
      localStorage.setItem('nickname', data.nickname)
      onSuccess()
    } catch (err: any) {
      const detail = err?.response?.data?.detail
      if (Array.isArray(detail)) {
        setError('Введите корректный email')
      } else {
        setError(detail ?? 'Ошибка регистрации')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className='input-box'>
        <input
          placeholder="Никнейм"
          className='auth-input'
          value={nickname}
          onChange={e => setNickname(e.target.value)}
        />
        <input
          placeholder="Email"
          className='auth-input'
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          placeholder="Пароль"
          className='auth-input'
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        {error && <p style={{ color: 'red', fontSize: 14, textAlign: 'center' }}>{error}</p>}
        <Button type="submit" variant="primary" fullWidth disabled={loading}>
          {loading ? 'Регистрация...' : 'Зарегистрироваться'}
        </Button>
      </div>
    </form>
  )
}