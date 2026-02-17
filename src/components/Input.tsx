import React from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  id: string
  error?: string
}

const Input: React.FC<InputProps> = ({
  label,
  id,
  error,
  className = '',
  ...props
}) => {
  const baseStyles =
    'w-full px-4 py-2.5 bg-surface border border-border text-text placeholder-textSecondary focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200 ease-in-out'
  const roundedStyles = 'rounded-xl'

  return (
    <div className="relative w-full">
      {label && (
        <label htmlFor={id} className="block text-textSecondary text-sm mb-2">
          {label}
        </label>
      )}
      <input
        id={id}
        className={`${baseStyles} ${roundedStyles} ${
          error ? 'border-error focus:ring-error' : ''
        } ${className}`}
        {...props}
      />
      {error && (
        <p className="mt-2 text-sm text-error absolute -bottom-6 left-0">
          {error}
        </p>
      )}
    </div>
  )
}

export default Input
