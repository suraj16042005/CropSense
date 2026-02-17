import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import Input from '../components/Input'
import { useAuth } from '../hooks/useAuth'
import { UserPlus } from 'lucide-react'

const SignUp: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { signUp } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      setLoading(false)
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.')
      setLoading(false)
      return
    }

    const { error: signUpError } = await signUp(email, password)

    if (signUpError) {
      setError(signUpError.message)
    } else {
      navigate('/profile') // Redirect to profile after successful signup
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="bg-surface p-10 rounded-2xl shadow-2xl w-full max-w-md border border-border animate-fade-in">
        <div className="flex flex-col items-center mb-8">
          <UserPlus className="text-primary w-12 h-12 mb-4" />
          <h2 className="text-4xl font-bold text-text mb-2">Sign Up</h2>
          <p className="text-textSecondary text-lg">
            Create your CropSense account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            id="email"
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="your@example.com"
          />
          <Input
            id="password"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="••••••••"
          />
          <Input
            id="confirmPassword"
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            placeholder="••••••••"
            error={error && error.includes('match') ? error : ''}
          />

          {error && !error.includes('match') && (
            <p className="text-error text-sm text-center">{error}</p>
          )}

          <Button type="submit" isLoading={loading} className="w-full" size="lg">
            Sign Up
          </Button>
        </form>

        <p className="text-center text-textSecondary mt-8">
          Already have an account?{' '}
          <Link to="/signin" className="text-primary hover:underline font-semibold">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  )
}

export default SignUp
