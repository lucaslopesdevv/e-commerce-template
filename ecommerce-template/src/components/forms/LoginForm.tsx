'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Eye, EyeOff, Mail, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/lib/AuthProvider'
import { auth } from '@/lib/auth'

const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email é obrigatório')
    .email('Digite um email válido'),
  password: z
    .string()
    .min(1, 'Senha é obrigatória')
    .min(6, 'Senha deve ter pelo menos 6 caracteres'),
})

type LoginFormData = z.infer<typeof loginSchema>

interface LoginFormProps {
  onSuccess?: () => void
}

export function LoginForm({ onSuccess }: LoginFormProps) {
  const { signIn } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [authError, setAuthError] = useState<string | null>(null)
  const [unverifiedEmail, setUnverifiedEmail] = useState<string | null>(null)
  const [resendLoading, setResendLoading] = useState(false)
  const [resendMessage, setResendMessage] = useState<string | null>(null)
  const [verificationMessage, setVerificationMessage] = useState<string | null>(
    null
  )
  const [passwordUpdateMessage, setPasswordUpdateMessage] = useState<
    string | null
  >(null)

  const searchParams = useSearchParams()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  // Check for success messages
  useEffect(() => {
    const verified = searchParams.get('verified')
    const passwordUpdated = searchParams.get('password_updated')

    if (verified === 'true') {
      setVerificationMessage(
        'Email verificado com sucesso! Agora você pode fazer login.'
      )
    }

    if (passwordUpdated === 'true') {
      setPasswordUpdateMessage(
        'Senha atualizada com sucesso! Agora você pode fazer login com sua nova senha.'
      )
    }
  }, [searchParams])

  const handleResendVerification = async () => {
    if (!unverifiedEmail) return

    setResendLoading(true)
    setResendMessage(null)

    try {
      const { error } = await auth.resendVerification(unverifiedEmail)

      if (error) {
        setAuthError('Erro ao reenviar email de verificação. Tente novamente.')
      } else {
        setResendMessage(
          'Email de verificação enviado! Verifique sua caixa de entrada.'
        )
        setAuthError(null)
      }
    } catch (error) {
      console.error('Resend verification error:', error)
      setAuthError('Erro inesperado. Tente novamente.')
    } finally {
      setResendLoading(false)
    }
  }

  const onSubmit = async (data: LoginFormData) => {
    try {
      setAuthError(null)
      setUnverifiedEmail(null)
      setResendMessage(null)
      setVerificationMessage(null)
      setPasswordUpdateMessage(null)

      const { error } = await signIn(data.email, data.password)

      if (error) {
        // Handle specific Supabase auth errors
        if (error.message.includes('Invalid login credentials')) {
          setAuthError('Email ou senha incorretos')
        } else if (error.message.includes('Email not confirmed')) {
          setAuthError(
            'Email ainda não confirmado. Clique no botão abaixo para reenviar o email de verificação.'
          )
          setUnverifiedEmail(data.email)
        } else if (error.message.includes('Too many requests')) {
          setAuthError(
            'Muitas tentativas de login. Tente novamente em alguns minutos.'
          )
        } else {
          setAuthError('Erro ao fazer login. Tente novamente.')
        }
        return
      }

      // Success - redirect will be handled by AuthProvider
      onSuccess?.()
    } catch (error) {
      console.error('Login error:', error)
      setAuthError('Erro inesperado. Tente novamente.')
    }
  }

  return (
    <div className="w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900">Entrar</h1>
        <p className="mt-2 text-sm text-gray-600">
          Entre com sua conta para continuar
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {verificationMessage && (
          <div className="p-3 text-sm text-green-600 bg-green-50 border border-green-200 rounded-md">
            {verificationMessage}
          </div>
        )}

        {passwordUpdateMessage && (
          <div className="p-3 text-sm text-green-600 bg-green-50 border border-green-200 rounded-md">
            {passwordUpdateMessage}
          </div>
        )}

        {authError && (
          <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
            {authError}
          </div>
        )}

        {resendMessage && (
          <div className="p-3 text-sm text-green-600 bg-green-50 border border-green-200 rounded-md">
            {resendMessage}
          </div>
        )}

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

        {/* Resend verification button */}
        {unverifiedEmail && (
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={handleResendVerification}
            disabled={resendLoading}
          >
            {resendLoading ? (
              <>
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                Reenviando...
              </>
            ) : (
              <>
                <Mail className="w-4 h-4 mr-2" />
                Reenviar Email de Verificação
              </>
            )}
          </Button>
        )}

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? 'Entrando...' : 'Entrar'}
        </Button>

        <div className="text-center">
          <Link
            href="/auth/reset-password"
            className="text-sm text-blue-600 hover:text-blue-500"
          >
            Esqueceu sua senha?
          </Link>
        </div>
      </form>

      <div className="text-center">
        <p className="text-sm text-gray-600">
          Não tem uma conta?{' '}
          <Link
            href="/auth/register"
            className="text-blue-600 hover:text-blue-500 font-medium"
          >
            Criar conta
          </Link>
        </p>
      </div>
    </div>
  )
}
