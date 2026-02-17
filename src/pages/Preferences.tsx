import React, { useState, useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'
import { supabase } from '../lib/supabase'
import Button from '../components/Button'
import Input from '../components/Input'
import LoadingSpinner from '../components/LoadingSpinner'
import { Settings, Bell, Ruler, Save } from 'lucide-react'

interface PreferencesData {
  unit_system: 'metric' | 'imperial'
  notifications_enabled: boolean
  favorite_crop: string
}

const Preferences: React.FC = () => {
  const { user } = useAuth()
  const [preferences, setPreferences] = useState<PreferencesData>({
    unit_system: 'metric',
    notifications_enabled: true,
    favorite_crop: 'Paddy',
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  useEffect(() => {
    const fetchPreferences = async () => {
      if (!user) {
        setLoading(false)
        return
      }

      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('preferences')
          .eq('id', user.id)
          .single()

        if (error && error.code !== 'PGRST116') {
          throw error
        }

        if (data && data.preferences) {
          setPreferences((prev) => ({ ...prev, ...data.preferences }))
        }
      } catch (err: any) {
        console.error('Error fetching preferences:', err.message)
        setError('Failed to load preferences.')
      } finally {
        setLoading(false)
      }
    }

    fetchPreferences()
  }, [user])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { id, value, type, checked } = e.target as HTMLInputElement
    setPreferences((prev) => ({
      ...prev,
      [id]: type === 'checkbox' ? checked : value,
    }))
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
        .update({
          preferences: preferences,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id)

      if (error) {
        throw error
      }
      setSuccess('Preferences updated successfully!')
    } catch (err: any) {
      console.error('Error updating preferences:', err.message)
      setError('Failed to update preferences: ' + err.message)
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
          <Settings className="text-primary w-16 h-16 mb-4" />
          <h2 className="text-4xl font-bold text-text mb-2">Preferences</h2>
          <p className="text-textSecondary text-lg">
            Customize your CropSense experience
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="unit_system"
              className="block text-textSecondary text-sm mb-2"
            >
              <Ruler size={18} className="inline-block mr-2 text-primary" />
              Unit System
            </label>
            <select
              id="unit_system"
              value={preferences.unit_system}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-background border border-border text-text rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200 ease-in-out"
            >
              <option value="metric">Metric (e.g., kg/hectare)</option>
              <option value="imperial">Imperial (e.g., lbs/acre)</option>
            </select>
          </div>

          <div className="flex items-center justify-between bg-background p-4 rounded-xl border border-border">
            <label
              htmlFor="notifications_enabled"
              className="flex items-center gap-3 text-text text-lg cursor-pointer"
            >
              <Bell size={24} className="text-primary" />
              Enable Notifications
            </label>
            <input
              type="checkbox"
              id="notifications_enabled"
              checked={preferences.notifications_enabled}
              onChange={handleChange}
              className="h-6 w-12 rounded-full appearance-none bg-border transition-colors duration-300 ease-in-out relative cursor-pointer checked:bg-primary"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='3' fill='%23fff'/%3e%3c/svg%3e")`,
                backgroundSize: '150% 100%',
                backgroundPosition: preferences.notifications_enabled ? 'right' : 'left',
                backgroundRepeat: 'no-repeat',
              }}
            />
          </div>

          <Input
            id="favorite_crop"
            label="Favorite Crop for Prediction"
            type="text"
            value={preferences.favorite_crop}
            onChange={handleChange}
            placeholder="e.g., Paddy, Wheat"
          />

          {error && <p className="text-error text-sm text-center">{error}</p>}
          {success && <p className="text-success text-sm text-center">{success}</p>}

          <Button type="submit" isLoading={saving} className="w-full" size="lg">
            <Save size={20} /> Save Preferences
          </Button>
        </form>
      </div>
    </div>
  )
}

export default Preferences
