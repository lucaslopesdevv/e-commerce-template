'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { useAuth } from '@/lib/AuthProvider'
import { useUserRole } from '@/hooks/usePermissions'
import { AdminOnly, SellerOnly } from '@/components/auth/ProtectedComponent'
import { USER_ROLE_LABELS } from '@/constants'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  User,
  Settings,
  Bell,
  BarChart3,
  Store,
  Users,
  Shield,
  Heart,
  CreditCard,
  FileText,
  Menu,
  X,
  LogOut,
} from 'lucide-react'

interface DashboardLayoutProps {
  children: React.ReactNode
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()
  const { user, signOut } = useAuth()
  const userRole = useUserRole()

  const navigation = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: LayoutDashboard,
      roles: ['admin', 'seller', 'customer'],
    },
    {
      name: 'Meus Pedidos',
      href: '/dashboard/orders',
      icon: ShoppingCart,
      roles: ['admin', 'seller', 'customer'],
    },
    {
      name: 'Lista de Desejos',
      href: '/dashboard/wishlist',
      icon: Heart,
      roles: ['admin', 'seller', 'customer'],
    },
    {
      name: 'Perfil',
      href: '/dashboard/profile',
      icon: User,
      roles: ['admin', 'seller', 'customer'],
    },
    {
      name: 'Configurações',
      href: '/dashboard/settings',
      icon: Settings,
      roles: ['admin', 'seller', 'customer'],
    },
  ]

  const sellerNavigation = [
    {
      name: 'Painel do Vendedor',
      href: '/dashboard/seller',
      icon: Store,
      roles: ['admin', 'seller'],
    },
    {
      name: 'Meus Produtos',
      href: '/dashboard/seller/products',
      icon: Package,
      roles: ['admin', 'seller'],
    },
    {
      name: 'Pedidos Recebidos',
      href: '/dashboard/seller/orders',
      icon: FileText,
      roles: ['admin', 'seller'],
    },
    {
      name: 'Analytics',
      href: '/dashboard/seller/analytics',
      icon: BarChart3,
      roles: ['admin', 'seller'],
    },
    {
      name: 'Financeiro',
      href: '/dashboard/seller/financial',
      icon: CreditCard,
      roles: ['admin', 'seller'],
    },
  ]

  const adminNavigation = [
    {
      name: 'Painel Admin',
      href: '/admin',
      icon: Shield,
      roles: ['admin'],
    },
    {
      name: 'Gerenciar Usuários',
      href: '/admin/users',
      icon: Users,
      roles: ['admin'],
    },
    {
      name: 'Relatórios',
      href: '/admin/reports',
      icon: BarChart3,
      roles: ['admin'],
    },
  ]

  const handleSignOut = async () => {
    await signOut()
    setSidebarOpen(false)
  }

  const isActiveLink = (href: string) => {
    if (href === '/dashboard') {
      return pathname === href
    }
    return pathname.startsWith(href)
  }

  const NavigationSection = ({
    title,
    items,
    showForRoles,
  }: {
    title: string
    items: typeof navigation
    showForRoles?: string[]
  }) => {
    const shouldShow =
      !showForRoles || (userRole && showForRoles.includes(userRole))

    if (!shouldShow) return null

    return (
      <div className="space-y-1">
        <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
          {title}
        </h3>
        {items.map(item => {
          const isRoleAllowed = userRole && item.roles.includes(userRole)
          if (!isRoleAllowed) return null

          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setSidebarOpen(false)}
              className={cn(
                'group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors',
                isActiveLink(item.href)
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
              )}
            >
              <item.icon
                className={cn(
                  'mr-3 h-5 w-5',
                  isActiveLink(item.href)
                    ? 'text-blue-500'
                    : 'text-gray-400 group-hover:text-gray-500'
                )}
              />
              {item.name}
            </Link>
          )
        })}
      </div>
    )
  }

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Dashboard</h2>
          <p className="text-sm text-gray-600">
            {user?.user_metadata?.fullName || user?.email?.split('@')[0]}
          </p>
        </div>
        <Badge
          variant={
            userRole === 'admin'
              ? 'destructive'
              : userRole === 'seller'
                ? 'default'
                : 'secondary'
          }
          className="text-xs"
        >
          {userRole ? USER_ROLE_LABELS[userRole] : 'Cliente'}
        </Badge>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-6 overflow-y-auto">
        <NavigationSection title="Geral" items={navigation} />

        <SellerOnly>
          <NavigationSection
            title="Vendedor"
            items={sellerNavigation}
            showForRoles={['admin', 'seller']}
          />
        </SellerOnly>

        <AdminOnly>
          <NavigationSection
            title="Administração"
            items={adminNavigation}
            showForRoles={['admin']}
          />
        </AdminOnly>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t">
        <Button
          onClick={handleSignOut}
          variant="outline"
          size="sm"
          className="w-full justify-start"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sair
        </Button>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:flex-shrink-0">
        <div className="flex flex-col w-64 bg-white shadow-sm border-r">
          <SidebarContent />
        </div>
      </div>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-gray-600 bg-opacity-75"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="relative flex flex-col max-w-xs w-full bg-white shadow-xl">
            <div className="absolute top-0 right-0 -mr-12 pt-2">
              <button
                type="button"
                className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-white"
                onClick={() => setSidebarOpen(false)}
              >
                <X className="h-6 w-6 text-white" />
              </button>
            </div>
            <SidebarContent />
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Mobile Header */}
        <div className="lg:hidden flex items-center justify-between p-4 bg-white shadow-sm border-b">
          <button
            type="button"
            className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>
          <h1 className="text-lg font-semibold">Dashboard</h1>
          <div className="w-10" /> {/* Spacer */}
        </div>

        {/* Page Content */}
        <main className="flex-1 p-4 lg:p-8">{children}</main>
      </div>
    </div>
  )
}

export default DashboardLayout
