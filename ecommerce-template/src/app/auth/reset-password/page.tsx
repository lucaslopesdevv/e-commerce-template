'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Link from 'next/link'
import { AuthLayout } from '@/components/layout/AuthLayout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Mail, CheckCircle, RefreshCw } from 'lucide-react'
import { useAuth } from '@/lib/AuthProvider'

const resetSchema = z.object({
  email: z
    .string()
    .min(1, 'Email é obrigatório')
    .email('Digite um email válido'),
})

type ResetFormData = z.infer<typeof resetSchema>

export default function ResetPasswordPage() {
  const { resetPassword } = useAuth()
  const [status, setStatus] = useState<'form' | 'success'>('form')
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [sentEmail, setSentEmail] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetFormData>({
    resolver: zodResolver(resetSchema),
  })

  const onSubmit = async (data: ResetFormData) => {
    try {
      setError(null)
      setMessage(null)

      const { error } = await resetPassword(data.email)

      if (error) {
        if (error.message.includes('User not found')) {
          setError('Email não encontrado. Verifique se o email está correto.')
        } else if (error.message.includes('Too many requests')) {
          setError(
            'Muitas tentativas. Aguarde alguns minutos antes de tentar novamente.'
          )
        } else {
          setError('Erro ao enviar email de recuperação. Tente novamente.')
        }
        return
      }

      // Success
      setSentEmail(data.email)
      setStatus('success')
      setMessage('Email de recuperação enviado com sucesso!')
    } catch (error) {
      console.error('Reset password error:', error)
      setError('Erro inesperado. Tente novamente.')
    }
  }

  // Success state
  if (status === 'success') {
    return (
      <AuthLayout>
        <div className="w-full max-w-md space-y-6">
          <div className="text-center space-y-4">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />

            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Email Enviado!
              </h1>
              <p className="mt-2 text-sm text-green-600">{message}</p>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Mail className="w-5 h-5 text-blue-600 mt-0.5" />
              <div className="text-sm">
                <p className="text-blue-800 font-medium">Verifique seu email</p>
                <p className="text-blue-700 mt-1">
                  Enviamos um link de recuperação para{' '}
                  <strong>{sentEmail}</strong>. Clique no link para definir uma
                  nova senha.
                </p>
                <p className="text-blue-600 mt-2 text-xs">
                  O link expira em 1 hora por motivos de segurança.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-900 mb-2">
                Não recebeu o email?
              </h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Verifique sua pasta de spam/lixo eletrônico</li>
                <li>• Certifique-se de que o email está correto</li>
                <li>• Aguarde alguns minutos, pode haver atraso na entrega</li>
              </ul>
            </div>

            <Button
              onClick={() => {
                setStatus('form')
                setMessage(null)
                setError(null)
                setSentEmail(null)
              }}
              variant="outline"
              className="w-full"
            >
              Tentar com outro email
            </Button>

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
      </AuthLayout>
    )
  }

  // Form state
  return (
    <AuthLayout>
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Recuperar Senha</h1>
          <p className="mt-2 text-sm text-gray-600">
            Digite seu email para receber um link de recuperação
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {error && (
            <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
              {error}
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

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
            <p className="text-sm text-gray-700">
              <strong>Como funciona:</strong>
            </p>
            <ol className="text-sm text-gray-600 mt-1 space-y-1">
              <li>1. Digite seu email cadastrado</li>
              <li>2. Verifique sua caixa de entrada</li>
              <li>3. Clique no link recebido</li>
              <li>4. Defina sua nova senha</li>
            </ol>
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                Enviando...
              </>
            ) : (
              'Enviar Email de Recuperação'
            )}
          </Button>
        </form>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            Lembrou sua senha?{' '}
            <Link
              href="/auth/login"
              className="text-blue-600 hover:text-blue-500 font-medium"
            >
              Fazer login
            </Link>
          </p>
        </div>
      </div>
    </AuthLayout>
  )
}
