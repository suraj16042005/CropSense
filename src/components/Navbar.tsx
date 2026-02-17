import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Leaf, LogOut, User, Settings, Home } from 'lucide-react'
import Button from './Button'
import { useAuth } from '../hooks/useAuth'

const Navbar: React.FC = () => {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  const handleSignOut = async () => {
    const { error } = await signOut()
    if (!error) {
      navigate('/signin')
    } else {
      alert('Failed to sign out: ' + error.message)
    }
  }

  return (
    <nav className="bg-surface bg-opacity-90 backdrop-blur-md fixed w-full z-50 shadow-lg rounded-b-2xl">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-3 text-text text-2xl font-bold">
          <Leaf className="text-primary w-8 h-8" />
          CropSense
        </Link>

        <div className="flex items-center gap-6">
          <Link to="/" className="text-textSecondary hover:text-primary transition-colors duration-200 flex items-center gap-2">
            <Home size={20} /> Home
          </Link>
          {user ? (
            <>
              <Link to="/profile" className="text-textSecondary hover:text-primary transition-colors duration-200 flex items-center gap-2">
                <User size={20} /> Profile
              </Link>
              <Link to="/preferences" className="text-textSecondary hover:text-primary transition-colors duration-200 flex items-center gap-2">
                <Settings size={20} /> Preferences
              </Link>
              <Button variant="ghost" size="sm" onClick={handleSignOut} className="text-error hover:bg-error/10">
                <LogOut size={18} /> Sign Out
              </Button>
            </>
          ) : (
            <>
              <Link to="/signin">
                <Button variant="ghost" size="sm">Sign In</Button>
              </Link>
              <Link to="/signup">
                <Button variant="primary" size="sm">Sign Up</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
