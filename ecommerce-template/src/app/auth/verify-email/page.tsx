'use client'

import { useState, useEffect, useCallback } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { AuthLayout } from '@/components/layout/AuthLayout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { CheckCircle, XCircle, Mail, RefreshCw } from 'lucide-react'
import { supabase } from '@/lib/database'

export default function VerifyEmailPage() {
  const [status, setStatus] = useState<
    'loading' | 'success' | 'error' | 'expired' | 'already_verified'
  >('loading')
  const [message, setMessage] = useState('')
  const [resendEmail, setResendEmail] = useState('')
  const [resendLoading, setResendLoading] = useState(false)
  const [resendMessage, setResendMessage] = useState('')
  const [resendError, setResendError] = useState('')

  const searchParams = useSearchParams()
  const router = useRouter()

  const verifyToken = useCallback(async () => {
    const token = searchParams.get('token')
    const type = searchParams.get('type')

    if (!token || type !== 'signup') {
      setStatus('error')
      setMessage('Link de verificação inválido.')
      return
    }

    try {
      const { data, error } = await supabase.auth.verifyOtp({
        token_hash: token,
        type: 'signup',
      })

      if (error) {
        if (error.message.includes('expired')) {
          setStatus('expired')
          setMessage('Link de verificação expirado. Solicite um novo link.')
        } else if (error.message.includes('already verified')) {
          setStatus('already_verified')
          setMessage('Email já verificado. Você pode fazer login.')
        } else {
          setStatus('error')
          setMessage('Erro ao verificar email. Link inválido ou expirado.')
        }
        return
      }

      if (data.user) {
        setStatus('success')
        setMessage(
          'Email verificado com sucesso! Você será redirecionado para o login.'
        )

        // Redirect to login after 3 seconds
        setTimeout(() => {
          router.push('/auth/login?verified=true')
        }, 3000)
      }
    } catch (err) {
      console.error('Verification error:', err)
      setStatus('error')
      setMessage('Erro inesperado ao verificar email.')
    }
  }, [searchParams, router])

  useEffect(() => {
    verifyToken()
  }, [verifyToken])

  const handleResendVerification = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!resendEmail) {
      setResendError('Digite seu email')
      return
    }

    setResendLoading(true)
    setResendError('')
    setResendMessage('')

    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: resendEmail,
      })

      if (error) {
        if (error.message.includes('already confirmed')) {
          setResendError('Este email já foi verificado. Você pode fazer login.')
        } else {
          setResendError(
            'Erro ao enviar email de verificação. Tente novamente.'
          )
        }
        return
      }

      setResendMessage(
        'Email de verificação enviado! Verifique sua caixa de entrada.'
      )
    } catch (err) {
      console.error('Resend error:', err)
      setResendError('Erro inesperado. Tente novamente.')
    } finally {
      setResendLoading(false)
    }
  }

  const getStatusIcon = () => {
    switch (status) {
      case 'success':
      case 'already_verified':
        return <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
      case 'error':
      case 'expired':
        return <XCircle className="w-16 h-16 text-red-500 mx-auto" />
      case 'loading':
        return (
          <RefreshCw className="w-16 h-16 text-blue-500 mx-auto animate-spin" />
        )
      default:
        return <Mail className="w-16 h-16 text-gray-400 mx-auto" />
    }
  }

  const getStatusColor = () => {
    switch (status) {
      case 'success':
      case 'already_verified':
        return 'text-green-600'
      case 'error':
      case 'expired':
        return 'text-red-600'
      case 'loading':
        return 'text-blue-600'
      default:
        return 'text-gray-600'
    }
  }

  return (
    <AuthLayout>
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-4">
          {getStatusIcon()}

          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Verificação de Email
            </h1>
            <p className={`mt-2 text-sm ${getStatusColor()}`}>{message}</p>
          </div>
        </div>

        {/* Show resend form for expired or error status */}
        {(status === 'expired' || status === 'error') && (
          <div className="space-y-4">
            <div className="border-t pt-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Reenviar Email de Verificação
              </h2>

              <form onSubmit={handleResendVerification} className="space-y-4">
                {resendError && (
                  <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
                    {resendError}
                  </div>
                )}

                {resendMessage && (
                  <div className="p-3 text-sm text-green-600 bg-green-50 border border-green-200 rounded-md">
                    {resendMessage}
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="resend-email">Email</Label>
                  <Input
                    id="resend-email"
                    type="email"
                    placeholder="seu@email.com"
                    value={resendEmail}
                    onChange={e => setResendEmail(e.target.value)}
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={resendLoading}
                >
                  {resendLoading ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    'Reenviar Email de Verificação'
                  )}
                </Button>
              </form>
            </div>
          </div>
        )}

        {/* Action buttons based on status */}
        <div className="text-center space-y-3">
          {(status === 'success' || status === 'already_verified') && (
            <Link href="/auth/login">
              <Button className="w-full">Ir para Login</Button>
            </Link>
          )}

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
