'use client'

import { useState, useEffect, useCallback } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Link from 'next/link'
import { AuthLayout } from '@/components/layout/AuthLayout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Eye, EyeOff, CheckCircle, XCircle, RefreshCw } from 'lucide-react'
import { supabase } from '@/lib/database'
import { auth } from '@/lib/auth'

const updatePasswordSchema = z
  .object({
    password: z
      .string()
      .min(1, 'Nova senha é obrigatória')
      .min(6, 'Nova senha deve ter pelo menos 6 caracteres')
      .regex(/[A-Z]/, 'Nova senha deve conter pelo menos uma letra maiúscula')
      .regex(/[a-z]/, 'Nova senha deve conter pelo menos uma letra minúscula')
      .regex(/[0-9]/, 'Nova senha deve conter pelo menos um número'),
    confirmPassword: z.string().min(1, 'Confirmação de senha é obrigatória'),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  })

type UpdatePasswordFormData = z.infer<typeof updatePasswordSchema>

export default function UpdatePasswordPage() {
  const [status, setStatus] = useState<
    'loading' | 'ready' | 'success' | 'error' | 'expired' | 'no_token'
  >('loading')
  const [message, setMessage] = useState('')
  const [authError, setAuthError] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const searchParams = useSearchParams()
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UpdatePasswordFormData>({
    resolver: zodResolver(updatePasswordSchema),
  })

  const verifyResetToken = useCallback(async () => {
    try {
      // First, check if we already have an active session (Supabase might have set it)
      const { data: sessionData, error: sessionError } =
        await supabase.auth.getSession()

      if (sessionData.session) {
        setStatus('ready')
        setMessage('Agora você pode definir sua nova senha.')
        // Clean up any URL parameters
        window.history.replaceState(null, '', window.location.pathname)
        return
      }

      // Check for URL hash fragments (alternative Supabase format)
      const hash = window.location.hash.substring(1)
      const hashParams = new URLSearchParams(hash)

      // Check for query parameters (another possible format)
      const accessToken =
        hashParams.get('access_token') || searchParams.get('access_token')
      const refreshToken =
        hashParams.get('refresh_token') || searchParams.get('refresh_token')
      const type = hashParams.get('type') || searchParams.get('type')

      // Check for error parameters that Supabase might send
      const error = hashParams.get('error') || searchParams.get('error')
      const errorDescription =
        hashParams.get('error_description') ||
        searchParams.get('error_description')

      // Handle error cases from Supabase
      if (error) {
        if (
          error === 'access_denied' ||
          errorDescription?.includes('expired')
        ) {
          setStatus('expired')
          setMessage('Link de recuperação expirado. Solicite um novo link.')
        } else {
          setStatus('error')
          setMessage('Link de recuperação inválido.')
        }
        return
      }

      // If we have tokens, try to set the session
      if (accessToken && refreshToken && type === 'recovery') {
        const { data, error } = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken,
        })

        if (error) {
          console.error('Session error:', error)
          if (
            error.message.includes('expired') ||
            error.message.includes('invalid')
          ) {
            setStatus('expired')
            setMessage('Link de recuperação expirado. Solicite um novo link.')
          } else {
            setStatus('error')
            setMessage('Link de recuperação inválido.')
          }
          return
        }

        if (data.session && data.session.user) {
          setStatus('ready')
          setMessage('Agora você pode definir sua nova senha.')
          // Clean up the URL
          window.history.replaceState(null, '', window.location.pathname)
          return
        }
      }

      // If no session and no tokens, this might be direct access or an incomplete flow
      if (!hash && searchParams.toString().length === 0) {
        setStatus('no_token')
        setMessage(
          'Acesso direto à página de atualização de senha não é permitido.'
        )
        return
      }

      // If we have some parameters but couldn't establish a session, it's likely an error
      setStatus('error')
      setMessage('Link de recuperação inválido ou expirado.')
    } catch (err) {
      console.error('Token verification error:', err)
      setStatus('error')
      setMessage('Erro ao verificar link de recuperação.')
    }
  }, [searchParams])

  useEffect(() => {
    verifyResetToken()
  }, [verifyResetToken])

  const onSubmit = async (data: UpdatePasswordFormData) => {
    try {
      setAuthError(null)

      const { error } = await auth.updatePassword(data.password)

      if (error) {
        if (error.message.includes('Same password')) {
          setAuthError('A nova senha deve ser diferente da senha atual.')
        } else if (error.message.includes('Password should be at least')) {
          setAuthError('A senha deve ter pelo menos 6 caracteres.')
        } else if (
          error.message.includes('session_not_found') ||
          error.message.includes('not authenticated')
        ) {
          setAuthError('Sessão expirada. Solicite um novo link de recuperação.')
        } else {
          setAuthError('Erro ao atualizar senha. Tente novamente.')
        }
        return
      }

      // Success
      setStatus('success')
      setMessage(
        'Senha atualizada com sucesso! Você será redirecionado para o login.'
      )

      // Sign out the user and redirect to login after 3 seconds
      setTimeout(async () => {
        await auth.signOut()
        router.push('/auth/login?password_updated=true')
      }, 3000)
    } catch (error) {
      console.error('Update password error:', error)
      setAuthError('Erro inesperado. Tente novamente.')
    }
  }

  const getStatusIcon = () => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
      case 'error':
      case 'expired':
      case 'no_token':
        return <XCircle className="w-16 h-16 text-red-500 mx-auto" />
      case 'loading':
        return (
          <RefreshCw className="w-16 h-16 text-blue-500 mx-auto animate-spin" />
        )
      default:
        return null
    }
  }

  const getStatusColor = () => {
    switch (status) {
      case 'success':
        return 'text-green-600'
      case 'error':
      case 'expired':
      case 'no_token':
        return 'text-red-600'
      case 'loading':
        return 'text-blue-600'
      case 'ready':
        return 'text-gray-600'
      default:
        return 'text-gray-600'
    }
  }

  // Show status screen for loading, success, error, expired, or no_token
  if (status !== 'ready') {
    return (
      <AuthLayout>
        <div className="w-full max-w-md space-y-6">
          <div className="text-center space-y-4">
            {getStatusIcon()}

            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {status === 'loading' && 'Verificando...'}
                {status === 'success' && 'Senha Atualizada!'}
                {status === 'error' && 'Erro na Recuperação'}
                {status === 'expired' && 'Link Expirado'}
                {status === 'no_token' && 'Acesso Inválido'}
              </h1>
              <p className={`mt-2 text-sm ${getStatusColor()}`}>{message}</p>
            </div>
          </div>

          {/* Actions for error/expired/no_token states */}
          {(status === 'error' ||
            status === 'expired' ||
            status === 'no_token') && (
            <div className="text-center space-y-3">
              <Link href="/auth/reset-password">
                <Button className="w-full">Solicitar Nova Recuperação</Button>
              </Link>

              <p className="text-sm text-gray-600">
                <Link
                  href="/auth/login"
                  className="text-blue-600 hover:text-blue-500 font-medium"
                >
                  ← Voltar para Login
                </Link>
              </p>
            </div>
          )}

          {/* Success state - show login link */}
          {status === 'success' && (
            <div className="text-center">
              <Link href="/auth/login">
                <Button className="w-full">Ir para Login</Button>
              </Link>
            </div>
          )}
        </div>
      </AuthLayout>
    )
  }

  // Show password update form
  return (
    <AuthLayout>
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Nova Senha</h1>
          <p className="mt-2 text-sm text-gray-600">
            Digite sua nova senha abaixo
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {authError && (
            <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
              {authError}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="password">Nova Senha</Label>
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
            <Label htmlFor="confirmPassword">Confirmar Nova Senha</Label>
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

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p className="text-sm text-blue-800">
              <strong>Requisitos da senha:</strong>
            </p>
            <ul className="text-sm text-blue-700 mt-1 space-y-1">
              <li>• Pelo menos 6 caracteres</li>
              <li>• Uma letra maiúscula</li>
              <li>• Uma letra minúscula</li>
              <li>• Um número</li>
            </ul>
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? 'Atualizando...' : 'Atualizar Senha'}
          </Button>
        </form>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            <Link
              href="/auth/login"
              className="text-blue-600 hover:text-blue-500 font-medium"
            >
              ← Voltar para Login
            </Link>
          </p>
        </div>
      </div>
    </AuthLayout>
  )
}
