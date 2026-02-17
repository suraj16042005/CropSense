import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import Input from '../components/Input'
import { useAuth } from '../hooks/useAuth'
import { LogIn } from 'lucide-react'

const SignIn: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { signIn } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const { error: signInError } = await signIn(email, password)

    if (signInError) {
      setError(signInError.message)
    } else {
      navigate('/profile') // Redirect to profile after successful signin
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="bg-surface p-10 rounded-2xl shadow-2xl w-full max-w-md border border-border animate-fade-in">
        <div className="flex flex-col items-center mb-8">
          <LogIn className="text-primary w-12 h-12 mb-4" />
          <h2 className="text-4xl font-bold text-text mb-2">Sign In</h2>
          <p className="text-textSecondary text-lg">
            Access your CropSense account
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

          {error && <p className="text-error text-sm text-center">{error}</p>}

          <Button type="submit" isLoading={loading} className="w-full" size="lg">
            Sign In
          </Button>
        </form>

        <p className="text-center text-textSecondary mt-8">
          Don't have an account?{' '}
          <Link to="/signup" className="text-primary hover:underline font-semibold">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  )
}

export default SignIn
