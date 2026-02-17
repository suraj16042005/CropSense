import React from 'react'
import { Link } from 'react-router-dom' // Import Link
import { Leaf, Github, Twitter, Linkedin } from 'lucide-react'

const Footer: React.FC = () => {
  return (
    <footer className="bg-surface text-textSecondary py-12 mt-20 rounded-t-2xl shadow-inner">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="flex flex-col items-start">
          <Link to="/" className="flex items-center gap-3 text-text text-2xl font-bold mb-4">
            <Leaf className="text-primary w-8 h-8" />
            CropSense
          </Link>
          <p className="text-sm leading-relaxed">
            Empowering farmers with intelligent paddy yield predictions, leveraging granular data for a sustainable future.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-text mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link to="/" className="hover:text-primary transition-colors duration-200">Home</Link></li>
            <li><Link to="/profile" className="hover:text-primary transition-colors duration-200">Profile</Link></li>
            <li><Link to="/preferences" className="hover:text-primary transition-colors duration-200">Preferences</Link></li>
            <li><Link to="/signup" className="hover:text-primary transition-colors duration-200">Sign Up</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-text mb-4">Connect With Us</h3>
          <div className="flex space-x-4">
            <a href="https://github.com/StackBlitz" target="_blank" rel="noopener noreferrer" className="text-text hover:text-primary transition-colors duration-200">
              <Github size={24} />
            </a>
            <a href="https://twitter.com/StackBlitz" target="_blank" rel="noopener noreferrer" className="text-text hover:text-primary transition-colors duration-200">
              <Twitter size={24} />
            </a>
            <a href="https://www.linkedin.com/company/stackblitz" target="_blank" rel="noopener noreferrer" className="text-text hover:text-primary transition-colors duration-200">
              <Linkedin size={24} />
            </a>
          </div>
          <p className="text-sm mt-6">
            &copy; {new Date().getFullYear()} CropSense. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
