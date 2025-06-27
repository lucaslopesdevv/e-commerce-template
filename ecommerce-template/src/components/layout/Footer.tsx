'use client'

import Link from 'next/link'
import {
  Facebook,
  Instagram,
  Twitter,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  Smartphone,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface FooterProps {
  className?: string
}

export default function Footer({ className }: FooterProps) {
  const currentYear = new Date().getFullYear()

  const footerSections = [
    {
      title: 'Empresa',
      links: [
        { name: 'Sobre Nós', href: '/about' },
        { name: 'Como Funciona', href: '/how-it-works' },
        { name: 'Carreiras', href: '/careers' },
        { name: 'Imprensa', href: '/press' },
      ],
    },
    {
      title: 'Suporte',
      links: [
        { name: 'Central de Ajuda', href: '/help' },
        { name: 'Contato', href: '/contact' },
        { name: 'FAQ', href: '/faq' },
        { name: 'Status do Sistema', href: '/status' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { name: 'Termos de Uso', href: '/terms' },
        { name: 'Política de Privacidade', href: '/privacy' },
        { name: 'LGPD', href: '/lgpd' },
        { name: 'Política de cookies', href: '/cookies' },
      ],
    },
    {
      title: 'Para Locadores',
      links: [
        { name: 'Anuncie seu Produto', href: '/list-product' },
        { name: 'Guia do Locador', href: '/landlord-guide' },
        { name: 'Taxas e Comissões', href: '/fees' },
        { name: 'Proteção ao Locador', href: '/protection' },
      ],
    },
  ]

  const paymentMethods = [
    { name: 'PIX', icon: '🔥' },
    { name: 'Visa', icon: '💳' },
    { name: 'Mastercard', icon: '💳' },
    { name: 'Mercado Pago', icon: '💙' },
    { name: 'PagSeguro', icon: '🟡' },
  ]

  return (
    <footer className={cn('bg-gray-900 text-gray-300', className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <Link href="/" className="text-2xl font-bold text-white">
              RentEasy
            </Link>
            <p className="mt-4 text-sm text-gray-400">
              A maior plataforma de aluguel online do Brasil. Alugue
              equipamentos, veículos e muito mais com segurança e praticidade.
            </p>

            {/* Contact Info */}
            <div className="mt-6 space-y-2">
              <div className="flex items-center space-x-2 text-sm">
                <Phone className="h-4 w-4" />
                <span>(11) 9999-9999</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Mail className="h-4 w-4" />
                <span>contato@renteasy.com.br</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <MapPin className="h-4 w-4" />
                <span>São Paulo, SP - Brasil</span>
              </div>
            </div>

            {/* Social Media */}
            <div className="mt-6 flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>

            {/* WhatsApp Button */}
            <a
              href="https://wa.me/5511999999999"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm"
            >
              <Smartphone className="h-4 w-4" />
              <span>WhatsApp</span>
            </a>
          </div>

          {/* Footer Links */}
          {footerSections.map(section => (
            <div key={section.title}>
              <h3 className="text-white font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map(link => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-400 hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Payment Methods */}
        <div className="py-6 border-t border-gray-800">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-4 md:mb-0">
              <h4 className="text-white font-semibold mb-2">
                Formas de Pagamento
              </h4>
              <div className="flex items-center space-x-4">
                {paymentMethods.map(method => (
                  <div
                    key={method.name}
                    className="flex items-center space-x-1 text-sm"
                    title={method.name}
                  >
                    <span>{method.icon}</span>
                    <span className="hidden sm:inline">{method.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center md:text-right">
              <div className="flex items-center justify-center md:justify-end space-x-2 text-sm text-gray-400">
                <CreditCard className="h-4 w-4" />
                <span>Ambiente Seguro</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Seus dados protegidos por certificado SSL
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-gray-800">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="text-sm text-gray-400">
              <p>
                &copy; {currentYear} RentEasy. Todos os direitos reservados.
              </p>
              <p className="mt-1">
                CNPJ: 00.000.000/0001-00 | RentEasy Intermediação Ltda.
              </p>
            </div>

            <div className="mt-4 md:mt-0 text-sm text-gray-400">
              <p>Feito com ❤️ no Brasil</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
