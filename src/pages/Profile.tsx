import React, { useState, useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'
import { supabase } from '../lib/supabase'
import Button from '../components/Button'
import Input from '../components/Input'
import LoadingSpinner from '../components/LoadingSpinner'
import { User, MapPin, Mail, Save } from 'lucide-react'

interface ProfileData {
  full_name: string
  location: string
}

const Profile: React.FC = () => {
  const { user } = useAuth()
  const [profile, setProfile] = useState<ProfileData>({
    full_name: '',
    location: '',
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) {
        setLoading(false)
        return
      }

      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('full_name, location')
          .eq('id', user.id)
          .single()

        if (error && error.code !== 'PGRST116') { // PGRST116 means no rows found
          throw error
        }

        if (data) {
          setProfile(data)
        }
      } catch (err: any) {
        console.error('Error fetching profile:', err.message)
        setError('Failed to load profile data.')
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [user])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setProfile((prev) => ({ ...prev, [id]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError(null)
    setSuccess(null)

    if (!user) {
      setError('User not authenticated.')
      setSaving(false)
      return
    }

    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          full_name: profile.full_name,
          location: profile.location,
          updated_at: new Date().toISOString(),
        }, { onConflict: 'id' }) // Use upsert to insert or update

      if (error) {
        throw error
      }
      setSuccess('Profile updated successfully!')
    } catch (err: any) {
      console.error('Error updating profile:', err.message)
      setError('Failed to update profile: ' + err.message)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-text p-6 pt-24">
      <div className="container mx-auto max-w-2xl bg-surface p-10 rounded-2xl shadow-2xl border border-border animate-fade-in">
        <div className="flex flex-col items-center mb-8">
          <User className="text-primary w-16 h-16 mb-4" />
          <h2 className="text-4xl font-bold text-text mb-2">Your Profile</h2>
          <p className="text-textSecondary text-lg">
            Manage your personal information
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex items-center gap-4 bg-background p-4 rounded-xl border border-border">
            <Mail className="text-textSecondary" size={24} />
            <p className="text-text text-lg font-medium">{user?.email}</p>
          </div>

          <Input
            id="full_name"
            label="Full Name"
            type="text"
            value={profile.full_name}
            onChange={handleChange}
            placeholder="John Doe"
            icon={<User size={20} />}
          />
          <Input
            id="location"
            label="Location"
            type="text"
            value={profile.location}
            onChange={handleChange}
            placeholder="City, Country"
            icon={<MapPin size={20} />}
          />

          {error && <p className="text-error text-sm text-center">{error}</p>}
          {success && <p className="text-success text-sm text-center">{success}</p>}

          <Button type="submit" isLoading={saving} className="w-full" size="lg">
            <Save size={20} /> Save Changes
          </Button>
        </form>
      </div>
    </div>
  )
}

export default Profile
