'use client'

import { useState, useRef } from 'react'
import { useAuth, withAuth } from '@/lib/AuthProvider'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import {
  User,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  Camera,
  MapPin,
  Shield,
} from 'lucide-react'
import Link from 'next/link'
import { supabase } from '@/lib/database'
import {
  ProfileForm,
  AddressForm,
  SecurityForm,
} from '@/components/forms/ProfileForm'

function ProfilePage() {
  const { user, loading: authLoading } = useAuth()
  const [activeTab, setActiveTab] = useState<
    'personal' | 'address' | 'security'
  >('personal')
  const [uploading, setUploading] = useState(false)
  const [profilePicture, setProfilePicture] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleSuccess = (message: string) => {
    setSuccessMessage(message)
    setErrorMessage(null)
    // Clear message after 5 seconds
    setTimeout(() => setSuccessMessage(null), 5000)
  }

  const handleError = (message: string) => {
    setErrorMessage(message)
    setSuccessMessage(null)
    // Clear message after 5 seconds
    setTimeout(() => setErrorMessage(null), 5000)
  }

  // Handle profile picture upload
  const handleProfilePictureUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    try {
      setUploading(true)
      setErrorMessage(null)

      const file = event.target.files?.[0]
      if (!file) return

      // Validate file type and size
      if (!file.type.startsWith('image/')) {
        setErrorMessage('Por favor, selecione apenas arquivos de imagem.')
        return
      }

      if (file.size > 5 * 1024 * 1024) {
        setErrorMessage('A imagem deve ter no máximo 5MB.')
        return
      }

      // Upload to Supabase Storage
      const fileExt = file.name.split('.').pop()
      const fileName = `${user?.id}/profile.${fileExt}`

      const { error: uploadError } = await supabase.storage
        .from('profiles')
        .upload(fileName, file, { upsert: true })

      if (uploadError) {
        throw uploadError
      }

      // Get public URL
      const {
        data: { publicUrl },
      } = supabase.storage.from('profiles').getPublicUrl(fileName)

      // Update user metadata
      const { error: updateError } = await supabase.auth.updateUser({
        data: { profilePicture: publicUrl },
      })

      if (updateError) {
        throw updateError
      }

      setProfilePicture(publicUrl)
      setSuccessMessage('Foto de perfil atualizada com sucesso!')
    } catch (error) {
      console.error('Error uploading profile picture:', error)
      setErrorMessage('Erro ao fazer upload da foto. Tente novamente.')
    } finally {
      setUploading(false)
    }
  }

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Carregando perfil...</p>
        </div>
      </div>
    )
  }

  const userRole = user?.user_metadata?.role || 'customer'
  const userName = user?.user_metadata?.fullName || user?.email?.split('@')[0]
  const profilePic = user?.user_metadata?.profilePicture || profilePicture

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/dashboard"
            className="inline-flex items-center text-blue-600 hover:text-blue-500 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Voltar ao Dashboard
          </Link>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Meu Perfil</h1>
              <p className="mt-2 text-gray-600">
                Gerencie suas informações pessoais e configurações de segurança.
              </p>
            </div>

            <Badge variant={userRole === 'seller' ? 'default' : 'secondary'}>
              {userRole === 'seller' ? 'Vendedor' : 'Cliente'}
            </Badge>
          </div>
        </div>

        {/* Success/Error Messages */}
        {successMessage && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center">
            <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
            <span className="text-green-800">{successMessage}</span>
          </div>
        )}

        {errorMessage && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center">
            <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
            <span className="text-red-800">{errorMessage}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Profile Sidebar */}
          <div className="lg:col-span-1">
            <Card className="p-6">
              {/* Profile Picture */}
              <div className="text-center mb-6">
                <div className="relative inline-block">
                  <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                    {profilePic ? (
                      <img
                        src={profilePic}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="w-12 h-12 text-gray-400" />
                    )}
                  </div>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                    className="absolute -bottom-1 -right-1 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full transition-colors disabled:opacity-50"
                  >
                    <Camera className="w-4 h-4" />
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleProfilePictureUpload}
                    className="hidden"
                  />
                </div>

                <h3 className="mt-4 font-semibold text-gray-900">{userName}</h3>
                <p className="text-sm text-gray-600 break-words overflow-hidden">
                  {user?.email}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Membro desde{' '}
                  {new Date(user?.created_at || '').toLocaleDateString('pt-BR')}
                </p>
              </div>

              {/* Navigation */}
              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab('personal')}
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    activeTab === 'personal'
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <User className="w-4 h-4 mr-3" />
                  Dados Pessoais
                </button>

                <button
                  onClick={() => setActiveTab('address')}
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    activeTab === 'address'
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <MapPin className="w-4 h-4 mr-3" />
                  Endereço
                </button>

                <button
                  onClick={() => setActiveTab('security')}
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    activeTab === 'security'
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Shield className="w-4 h-4 mr-3" />
                  Segurança
                </button>
              </nav>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Personal Information Tab */}
            {activeTab === 'personal' && user && (
              <ProfileForm
                user={user}
                onSuccess={handleSuccess}
                onError={handleError}
              />
            )}

            {/* Address Tab */}
            {activeTab === 'address' && user && (
              <AddressForm
                user={user}
                onSuccess={handleSuccess}
                onError={handleError}
              />
            )}

            {/* Security Tab */}
            {activeTab === 'security' && user && (
              <SecurityForm
                user={user}
                onSuccess={handleSuccess}
                onError={handleError}
              />
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default withAuth(ProfilePage)
