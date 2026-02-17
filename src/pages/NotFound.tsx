import React from 'react'
import { Link } from 'react-router-dom'
import Button from '../components/Button'
import { Frown } from 'lucide-react'

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-background text-text flex flex-col items-center justify-center p-6">
      <div className="text-center bg-surface p-10 rounded-2xl shadow-2xl border border-border animate-fade-in">
        <Frown className="text-primary w-24 h-24 mx-auto mb-8" />
        <h1 className="text-6xl font-extrabold text-text mb-4">404</h1>
        <h2 className="text-3xl font-semibold text-textSecondary mb-6">
          Page Not Found
        </h2>
        <p className="text-lg text-textSecondary mb-10 max-w-md mx-auto">
          Oops! The page you are looking for might have been removed, had its
          name changed, or is temporarily unavailable.
        </p>
        <Link to="/">
          <Button variant="primary" size="lg">
            Go to Homepage
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default NotFound
