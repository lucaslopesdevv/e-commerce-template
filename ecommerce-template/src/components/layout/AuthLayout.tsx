'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft } from 'lucide-react'

interface AuthLayoutProps {
  children: React.ReactNode
  title?: string
  subtitle?: string
  showBackButton?: boolean
}

export function AuthLayout({
  children,
  title,
  subtitle,
  showBackButton = true,
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">R</span>
            </div>
            <span className="text-xl font-bold text-gray-900">RentShop</span>
          </Link>
        </div>

        {title && (
          <div className="mt-6 text-center">
            <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
            {subtitle && (
              <p className="mt-2 text-sm text-gray-600">{subtitle}</p>
            )}
          </div>
        )}
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {showBackButton && (
            <div className="mb-6">
              <Link
                href="/"
                className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700"
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                Voltar ao site
              </Link>
            </div>
          )}

          {children}
        </div>
      </div>

      <div className="mt-8 text-center">
        <p className="text-xs text-gray-500">
          © 2024 RentShop. Todos os direitos reservados.
        </p>
        <div className="mt-2 space-x-4">
          <Link
            href="/termos"
            className="text-xs text-gray-500 hover:text-gray-700"
          >
            Termos de Uso
          </Link>
          <Link
            href="/privacidade"
            className="text-xs text-gray-500 hover:text-gray-700"
          >
            Política de Privacidade
          </Link>
          <Link
            href="/contato"
            className="text-xs text-gray-500 hover:text-gray-700"
          >
            Contato
          </Link>
        </div>
      </div>
    </div>
  )
}
