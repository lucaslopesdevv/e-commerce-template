'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Link from 'next/link'
import { Eye, EyeOff, Mail, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useAuth } from '@/lib/AuthProvider'
import { USER_ROLES } from '@/constants'

const registerSchema = z
  .object({
    firstName: z
      .string()
      .min(1, 'Nome é obrigatório')
      .min(2, 'Nome deve ter pelo menos 2 caracteres'),
    lastName: z
      .string()
      .min(1, 'Sobrenome é obrigatório')
      .min(2, 'Sobrenome deve ter pelo menos 2 caracteres'),
    email: z
      .string()
      .min(1, 'Email é obrigatório')
      .email('Digite um email válido'),
    password: z
      .string()
      .min(1, 'Senha é obrigatória')
      .min(6, 'Senha deve ter pelo menos 6 caracteres')
      .regex(/[A-Z]/, 'Senha deve conter pelo menos uma letra maiúscula')
      .regex(/[a-z]/, 'Senha deve conter pelo menos uma letra minúscula')
      .regex(/[0-9]/, 'Senha deve conter pelo menos um número'),
    confirmPassword: z.string().min(1, 'Confirmação de senha é obrigatória'),
    phone: z
      .string()
      .min(1, 'Telefone é obrigatório')
      .regex(
        /^\(\d{2}\)\s\d{4,5}-\d{4}$/,
        'Digite um telefone válido (ex: (11) 99999-9999)'
      ),
    role: z.enum(['customer', 'seller'] as const, {
      required_error: 'Selecione um tipo de conta',
    }),
    acceptTerms: z
      .boolean()
      .refine(val => val === true, 'Você deve aceitar os termos de uso'),
    acceptPrivacy: z
      .boolean()
      .refine(
        val => val === true,
        'Você deve aceitar a política de privacidade'
      ),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  })

type RegisterFormData = z.infer<typeof registerSchema>

interface RegisterFormProps {
  onSuccess?: () => void
}

export function RegisterForm({ onSuccess }: RegisterFormProps) {
  const { signUp } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [authError, setAuthError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [registeredEmail, setRegisteredEmail] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  })

  const selectedRole = watch('role')

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setAuthError(null)
      setSuccessMessage(null)

      const { error } = await signUp(data.email, data.password, {
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        role: data.role,
        fullName: `${data.firstName} ${data.lastName}`,
      })

      if (error) {
        // Handle specific Supabase auth errors
        if (error.message.includes('User already registered')) {
          setAuthError('Este email já está cadastrado. Tente fazer login.')
        } else if (error.message.includes('Password should be at least')) {
          setAuthError('A senha deve ter pelo menos 6 caracteres.')
        } else if (error.message.includes('Invalid email')) {
          setAuthError('Digite um email válido.')
        } else {
          setAuthError('Erro ao criar conta. Tente novamente.')
        }
        return
      }

      // Success
      setRegisteredEmail(data.email)
      setSuccessMessage(
        'Conta criada com sucesso! Enviamos um email de verificação para você.'
      )
      onSuccess?.()
    } catch (error) {
      console.error('Registration error:', error)
      setAuthError('Erro inesperado. Tente novamente.')
    }
  }

  const formatPhoneNumber = (value: string) => {
    // Remove all non-digits
    const cleaned = value.replace(/\D/g, '')

    // Apply formatting
    if (cleaned.length <= 2) {
      return cleaned
    } else if (cleaned.length <= 6) {
      return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2)}`
    } else if (cleaned.length <= 10) {
      return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 6)}-${cleaned.slice(6)}`
    } else {
      return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7, 11)}`
    }
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value)
    setValue('phone', formatted)
  }

  // If registration was successful, show success state
  if (successMessage && registeredEmail) {
    return (
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-4">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />

          <div>
            <h1 className="text-2xl font-bold text-gray-900">Conta Criada!</h1>
            <p className="mt-2 text-sm text-green-600">{successMessage}</p>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Mail className="w-5 h-5 text-blue-600 mt-0.5" />
            <div className="text-sm">
              <p className="text-blue-800 font-medium">Verifique seu email</p>
              <p className="text-blue-700 mt-1">
                Enviamos um link de verificação para{' '}
                <strong>{registeredEmail}</strong>. Clique no link para ativar
                sua conta.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-sm text-gray-600 text-center">
            Não recebeu o email?
          </p>

          <Link href="/auth/verify-email">
            <Button variant="outline" className="w-full">
              Reenviar Email de Verificação
            </Button>
          </Link>

          <div className="text-center">
            <Link
              href="/auth/login"
              className="text-sm text-blue-600 hover:text-blue-500 font-medium"
            >
              ← Voltar para Login
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900">Criar Conta</h1>
        <p className="mt-2 text-sm text-gray-600">
          Preencha os dados para criar sua conta
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {authError && (
          <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
            {authError}
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">Nome</Label>
            <Input
              id="firstName"
              placeholder="João"
              {...register('firstName')}
              className={errors.firstName ? 'border-red-500' : ''}
            />
            {errors.firstName && (
              <p className="text-sm text-red-600">{errors.firstName.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="lastName">Sobrenome</Label>
            <Input
              id="lastName"
              placeholder="Silva"
              {...register('lastName')}
              className={errors.lastName ? 'border-red-500' : ''}
            />
            {errors.lastName && (
              <p className="text-sm text-red-600">{errors.lastName.message}</p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="seu@email.com"
            {...register('email')}
            className={errors.email ? 'border-red-500' : ''}
          />
          {errors.email && (
            <p className="text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Telefone</Label>
          <Input
            id="phone"
            type="tel"
            placeholder="(11) 99999-9999"
            {...register('phone')}
            onChange={handlePhoneChange}
            className={errors.phone ? 'border-red-500' : ''}
          />
          {errors.phone && (
            <p className="text-sm text-red-600">{errors.phone.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="role">Tipo de Conta</Label>
          <Select
            onValueChange={value =>
              setValue('role', value as 'customer' | 'seller')
            }
          >
            <SelectTrigger className={errors.role ? 'border-red-500' : ''}>
              <SelectValue placeholder="Selecione o tipo de conta" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="customer">
                <div className="flex flex-col items-start">
                  <span className="font-medium">Cliente</span>
                  <span className="text-sm text-gray-500">
                    Comprar produtos na plataforma
                  </span>
                </div>
              </SelectItem>
              <SelectItem value="seller">
                <div className="flex flex-col items-start">
                  <span className="font-medium">Vendedor</span>
                  <span className="text-sm text-gray-500">
                    Vender produtos na plataforma
                  </span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
          {errors.role && (
            <p className="text-sm text-red-600">{errors.role.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Senha</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              {...register('password')}
              className={errors.password ? 'border-red-500 pr-10' : 'pr-10'}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {errors.password && (
            <p className="text-sm text-red-600">{errors.password.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirmar Senha</Label>
          <div className="relative">
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="••••••••"
              {...register('confirmPassword')}
              className={
                errors.confirmPassword ? 'border-red-500 pr-10' : 'pr-10'
              }
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-sm text-red-600">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <input
              id="acceptTerms"
              type="checkbox"
              {...register('acceptTerms')}
              className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <div className="text-sm">
              <label htmlFor="acceptTerms" className="text-gray-700">
                Eu aceito os{' '}
                <Link
                  href="/termos"
                  className="text-blue-600 hover:text-blue-500"
                  target="_blank"
                >
                  Termos de Uso
                </Link>
              </label>
              {errors.acceptTerms && (
                <p className="text-red-600 mt-1">
                  {errors.acceptTerms.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <input
              id="acceptPrivacy"
              type="checkbox"
              {...register('acceptPrivacy')}
              className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <div className="text-sm">
              <label htmlFor="acceptPrivacy" className="text-gray-700">
                Eu aceito a{' '}
                <Link
                  href="/privacidade"
                  className="text-blue-600 hover:text-blue-500"
                  target="_blank"
                >
                  Política de Privacidade
                </Link>
              </label>
              {errors.acceptPrivacy && (
                <p className="text-red-600 mt-1">
                  {errors.acceptPrivacy.message}
                </p>
              )}
            </div>
          </div>
        </div>

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? 'Criando conta...' : 'Criar Conta'}
        </Button>
      </form>

      <div className="text-center">
        <p className="text-sm text-gray-600">
          Já tem uma conta?{' '}
          <Link
            href="/auth/login"
            className="text-blue-600 hover:text-blue-500 font-medium"
          >
            Fazer login
          </Link>
        </p>
      </div>
    </div>
  )
}
