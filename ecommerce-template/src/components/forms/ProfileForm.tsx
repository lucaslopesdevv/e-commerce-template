'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import {
  Save,
  Upload,
  User,
  MapPin,
  Phone,
  Mail,
  Calendar,
  CreditCard,
  Shield,
} from 'lucide-react'

// Brazilian CPF validation
const cpfValidation = (cpf: string) => {
  cpf = cpf.replace(/[^\d]/g, '')

  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
    return false
  }

  let sum = 0
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cpf.charAt(i)) * (10 - i)
  }
  let remainder = (sum * 10) % 11
  if (remainder === 10 || remainder === 11) remainder = 0
  if (remainder !== parseInt(cpf.charAt(9))) return false

  sum = 0
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cpf.charAt(i)) * (11 - i)
  }
  remainder = (sum * 10) % 11
  if (remainder === 10 || remainder === 11) remainder = 0
  if (remainder !== parseInt(cpf.charAt(10))) return false

  return true
}

const profileSchema = z.object({
  firstName: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  lastName: z.string().min(2, 'Sobrenome deve ter pelo menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  phone: z.string().min(10, 'Telefone inválido'),
  cpf: z.string().refine(cpfValidation, 'CPF inválido'),
  birthDate: z.string(),
  cep: z.string().regex(/^\d{5}-?\d{3}$/, 'CEP inválido'),
  address: z.string().min(5, 'Endereço deve ter pelo menos 5 caracteres'),
  complement: z.string().optional(),
  neighborhood: z.string().min(2, 'Bairro é obrigatório'),
  city: z.string().min(2, 'Cidade é obrigatória'),
  state: z.string().min(2, 'Estado é obrigatório'),
})

type ProfileFormData = z.infer<typeof profileSchema>

interface ProfileFormProps {
  initialData?: Partial<ProfileFormData>
  onSubmit?: (data: ProfileFormData) => void
  showAddressFields?: boolean
  className?: string
}

// Brazilian states data
const brazilianStates = [
  { value: 'AC', label: 'Acre' },
  { value: 'AL', label: 'Alagoas' },
  { value: 'AP', label: 'Amapá' },
  { value: 'AM', label: 'Amazonas' },
  { value: 'BA', label: 'Bahia' },
  { value: 'CE', label: 'Ceará' },
  { value: 'DF', label: 'Distrito Federal' },
  { value: 'ES', label: 'Espírito Santo' },
  { value: 'GO', label: 'Goiás' },
  { value: 'MA', label: 'Maranhão' },
  { value: 'MT', label: 'Mato Grosso' },
  { value: 'MS', label: 'Mato Grosso do Sul' },
  { value: 'MG', label: 'Minas Gerais' },
  { value: 'PA', label: 'Pará' },
  { value: 'PB', label: 'Paraíba' },
  { value: 'PR', label: 'Paraná' },
  { value: 'PE', label: 'Pernambuco' },
  { value: 'PI', label: 'Piauí' },
  { value: 'RJ', label: 'Rio de Janeiro' },
  { value: 'RN', label: 'Rio Grande do Norte' },
  { value: 'RS', label: 'Rio Grande do Sul' },
  { value: 'RO', label: 'Rondônia' },
  { value: 'RR', label: 'Roraima' },
  { value: 'SC', label: 'Santa Catarina' },
  { value: 'SP', label: 'São Paulo' },
  { value: 'SE', label: 'Sergipe' },
  { value: 'TO', label: 'Tocantins' },
]

const ProfileForm: React.FC<ProfileFormProps> = ({
  initialData,
  onSubmit,
  showAddressFields = true,
  className,
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [avatarFile, setAvatarFile] = useState<File | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: initialData?.firstName || 'João',
      lastName: initialData?.lastName || 'Silva',
      email: initialData?.email || 'joao.silva@email.com',
      phone: initialData?.phone || '+55 11 99999-9999',
      cpf: initialData?.cpf || '123.456.789-00',
      birthDate: initialData?.birthDate || '1990-01-01',
      cep: initialData?.cep || '01234-567',
      address: initialData?.address || 'Rua das Flores, 123',
      complement: initialData?.complement || 'Apto 45',
      neighborhood: initialData?.neighborhood || 'Centro',
      city: initialData?.city || 'São Paulo',
      state: initialData?.state || 'SP',
    },
  })

  const handleFormSubmit = async (data: ProfileFormData) => {
    setIsLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API call
      onSubmit?.(data)
      console.log('Profile updated:', data)
    } catch (error) {
      console.error('Error updating profile:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setAvatarFile(file)
    }
  }

  const fetchAddressByCep = async (cep: string) => {
    if (cep.length === 9) {
      try {
        const response = await fetch(
          `https://viacep.com.br/ws/${cep.replace('-', '')}/json/`
        )
        const data = await response.json()

        if (!data.erro) {
          setValue('address', data.logradouro)
          setValue('neighborhood', data.bairro)
          setValue('city', data.localidade)
          setValue('state', data.uf)
        }
      } catch (error) {
        console.error('Error fetching address:', error)
      }
    }
  }

  const formatCpf = (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1')
  }

  const formatPhone = (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '+55 $1 $2')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .replace(/(-\d{4})\d+?$/, '$1')
  }

  const formatCep = (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .replace(/(-\d{3})\d+?$/, '$1')
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className={className}>
      <div className="space-y-6">
        {/* Avatar Section */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <User className="h-5 w-5 mr-2" />
            Foto do Perfil
          </h3>
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
              {avatarFile ? (
                <img
                  src={URL.createObjectURL(avatarFile)}
                  alt="Avatar"
                  className="w-20 h-20 rounded-full object-cover"
                />
              ) : (
                <User className="h-8 w-8 text-gray-500" />
              )}
            </div>
            <div>
              <Label htmlFor="avatar" className="cursor-pointer">
                <Button type="button" variant="outline" size="sm" asChild>
                  <span>
                    <Upload className="h-4 w-4 mr-2" />
                    Alterar Foto
                  </span>
                </Button>
              </Label>
              <input
                id="avatar"
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="hidden"
              />
              <p className="text-xs text-gray-500 mt-1">
                JPG, PNG ou GIF até 2MB
              </p>
            </div>
          </div>
        </Card>

        {/* Personal Information */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <User className="h-5 w-5 mr-2" />
            Informações Pessoais
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">Nome *</Label>
              <Input
                id="firstName"
                {...register('firstName')}
                placeholder="Seu nome"
                className={errors.firstName ? 'border-red-500' : ''}
              />
              {errors.firstName && (
                <p className="text-sm text-red-500">
                  {errors.firstName.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName">Sobrenome *</Label>
              <Input
                id="lastName"
                {...register('lastName')}
                placeholder="Seu sobrenome"
                className={errors.lastName ? 'border-red-500' : ''}
              />
              {errors.lastName && (
                <p className="text-sm text-red-500">
                  {errors.lastName.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  {...register('email')}
                  placeholder="seu@email.com"
                  className={`pl-10 ${errors.email ? 'border-red-500' : ''}`}
                />
              </div>
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Telefone *</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="phone"
                  {...register('phone')}
                  placeholder="+55 11 99999-9999"
                  className={`pl-10 ${errors.phone ? 'border-red-500' : ''}`}
                  onChange={e => {
                    const formatted = formatPhone(e.target.value)
                    setValue('phone', formatted)
                  }}
                />
              </div>
              {errors.phone && (
                <p className="text-sm text-red-500">{errors.phone.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="cpf">CPF *</Label>
              <div className="relative">
                <CreditCard className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="cpf"
                  {...register('cpf')}
                  placeholder="000.000.000-00"
                  className={`pl-10 ${errors.cpf ? 'border-red-500' : ''}`}
                  onChange={e => {
                    const formatted = formatCpf(e.target.value)
                    setValue('cpf', formatted)
                  }}
                />
              </div>
              {errors.cpf && (
                <p className="text-sm text-red-500">{errors.cpf.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="birthDate">Data de Nascimento</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="birthDate"
                  type="date"
                  {...register('birthDate')}
                  className={`pl-10 ${errors.birthDate ? 'border-red-500' : ''}`}
                />
              </div>
              {errors.birthDate && (
                <p className="text-sm text-red-500">
                  {errors.birthDate.message}
                </p>
              )}
            </div>
          </div>
        </Card>

        {/* Address Information */}
        {showAddressFields && (
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <MapPin className="h-5 w-5 mr-2" />
              Endereço
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="cep">CEP *</Label>
                <Input
                  id="cep"
                  {...register('cep')}
                  placeholder="00000-000"
                  className={errors.cep ? 'border-red-500' : ''}
                  onChange={e => {
                    const formatted = formatCep(e.target.value)
                    setValue('cep', formatted)
                    fetchAddressByCep(formatted)
                  }}
                />
                {errors.cep && (
                  <p className="text-sm text-red-500">{errors.cep.message}</p>
                )}
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="address">Endereço *</Label>
                <Input
                  id="address"
                  {...register('address')}
                  placeholder="Rua, número"
                  className={errors.address ? 'border-red-500' : ''}
                />
                {errors.address && (
                  <p className="text-sm text-red-500">
                    {errors.address.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="complement">Complemento</Label>
                <Input
                  id="complement"
                  {...register('complement')}
                  placeholder="Apto, casa, etc."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="neighborhood">Bairro *</Label>
                <Input
                  id="neighborhood"
                  {...register('neighborhood')}
                  placeholder="Bairro"
                  className={errors.neighborhood ? 'border-red-500' : ''}
                />
                {errors.neighborhood && (
                  <p className="text-sm text-red-500">
                    {errors.neighborhood.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="city">Cidade *</Label>
                <Input
                  id="city"
                  {...register('city')}
                  placeholder="Cidade"
                  className={errors.city ? 'border-red-500' : ''}
                />
                {errors.city && (
                  <p className="text-sm text-red-500">{errors.city.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="state">Estado *</Label>
                <select
                  id="state"
                  {...register('state')}
                  className={`w-full p-2 border border-gray-300 rounded-md ${
                    errors.state ? 'border-red-500' : ''
                  }`}
                >
                  {brazilianStates.map(state => (
                    <option key={state.value} value={state.value}>
                      {state.label}
                    </option>
                  ))}
                </select>
                {errors.state && (
                  <p className="text-sm text-red-500">{errors.state.message}</p>
                )}
              </div>
            </div>
          </Card>
        )}

        {/* Submit Button */}
        <div className="flex justify-end">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              'Salvando...'
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Salvar Informações
              </>
            )}
          </Button>
        </div>
      </div>
    </form>
  )
}

// Legacy component interfaces for backward compatibility
interface LegacyFormProps {
  user: any
  onSuccess: (message: string) => void
  onError: (message: string) => void
}

// Wrapper for personal information form (legacy interface)
export function LegacyProfileForm({
  user,
  onSuccess,
  onError,
}: LegacyFormProps) {
  const handleSubmit = (data: ProfileFormData) => {
    onSuccess('Perfil atualizado com sucesso!')
  }

  const initialData = {
    firstName:
      user?.user_metadata?.firstName ||
      user?.user_metadata?.fullName?.split(' ')[0] ||
      '',
    lastName:
      user?.user_metadata?.lastName ||
      user?.user_metadata?.fullName?.split(' ').slice(1).join(' ') ||
      '',
    email: user?.email || '',
    phone: user?.user_metadata?.phone || '',
    cpf: user?.user_metadata?.cpf || '',
    birthDate: user?.user_metadata?.birthDate || '',
    cep: user?.user_metadata?.address?.cep || '',
    address: user?.user_metadata?.address?.street || '',
    complement: user?.user_metadata?.address?.complement || '',
    neighborhood: user?.user_metadata?.address?.neighborhood || '',
    city: user?.user_metadata?.address?.city || '',
    state: user?.user_metadata?.address?.state || '',
  }

  return (
    <ProfileForm
      initialData={initialData}
      onSubmit={handleSubmit}
      showAddressFields={false}
    />
  )
}

// Wrapper for address form (legacy interface)
export function AddressForm({ user, onSuccess, onError }: LegacyFormProps) {
  const handleSubmit = (data: ProfileFormData) => {
    onSuccess('Endereço atualizado com sucesso!')
  }

  const initialData = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    cpf: '',
    birthDate: '',
    cep: user?.user_metadata?.address?.cep || '',
    address: user?.user_metadata?.address?.street || '',
    complement: user?.user_metadata?.address?.complement || '',
    neighborhood: user?.user_metadata?.address?.neighborhood || '',
    city: user?.user_metadata?.address?.city || '',
    state: user?.user_metadata?.address?.state || '',
  }

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <MapPin className="h-5 w-5 mr-2" />
          Endereço
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="cep">CEP *</Label>
            <Input
              id="cep"
              defaultValue={initialData.cep}
              placeholder="00000-000"
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="address">Endereço *</Label>
            <Input
              id="address"
              defaultValue={initialData.address}
              placeholder="Rua, número"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="complement">Complemento</Label>
            <Input
              id="complement"
              defaultValue={initialData.complement}
              placeholder="Apto, casa, etc."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="neighborhood">Bairro *</Label>
            <Input
              id="neighborhood"
              defaultValue={initialData.neighborhood}
              placeholder="Bairro"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="city">Cidade *</Label>
            <Input
              id="city"
              defaultValue={initialData.city}
              placeholder="Cidade"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="state">Estado *</Label>
            <select
              id="state"
              defaultValue={initialData.state}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              {brazilianStates.map(state => (
                <option key={state.value} value={state.value}>
                  {state.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <Button onClick={() => onSuccess('Endereço atualizado com sucesso!')}>
            <Save className="h-4 w-4 mr-2" />
            Salvar Endereço
          </Button>
        </div>
      </Card>
    </div>
  )
}

// Wrapper for security form (legacy interface)
export function SecurityForm({ user, onSuccess, onError }: LegacyFormProps) {
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (newPassword !== confirmPassword) {
      onError('As senhas não coincidem')
      return
    }

    if (newPassword.length < 6) {
      onError('A nova senha deve ter pelo menos 6 caracteres')
      return
    }

    onSuccess('Senha atualizada com sucesso!')
  }

  return (
    <Card className="p-6">
      <div className="flex items-center mb-6">
        <Shield className="w-5 h-5 text-blue-600 mr-2" />
        <h2 className="text-xl font-semibold text-gray-900">Segurança</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h3 className="font-medium text-blue-900 mb-2">Alterar Senha</h3>
          <p className="text-sm text-blue-800">
            Para sua segurança, você precisará inserir sua senha atual antes de
            definir uma nova senha.
          </p>
        </div>

        <div>
          <Label htmlFor="currentPassword">Senha Atual *</Label>
          <Input
            id="currentPassword"
            type="password"
            value={currentPassword}
            onChange={e => setCurrentPassword(e.target.value)}
            placeholder="Digite sua senha atual"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="newPassword">Nova Senha *</Label>
            <Input
              id="newPassword"
              type="password"
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              placeholder="Digite sua nova senha"
            />
          </div>

          <div>
            <Label htmlFor="confirmPassword">Confirmar Nova Senha *</Label>
            <Input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              placeholder="Confirme sua nova senha"
            />
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-sm text-yellow-800">
            <strong>Requisitos da senha:</strong>
          </p>
          <ul className="text-sm text-yellow-700 mt-1 space-y-1">
            <li>• Pelo menos 6 caracteres</li>
            <li>• Uma letra maiúscula</li>
            <li>• Uma letra minúscula</li>
            <li>• Um número</li>
          </ul>
        </div>

        <div className="flex justify-end">
          <Button type="submit" className="flex items-center">
            <Shield className="w-4 h-4 mr-2" />
            Atualizar Senha
          </Button>
        </div>
      </form>
    </Card>
  )
}

export default ProfileForm

// Named exports for backward compatibility
export { LegacyProfileForm as ProfileForm }
