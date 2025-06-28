'use client'

import React, { useState } from 'react'
import { AdminGuard } from '@/components/auth/RouteGuard'
import {
  PermissionProtected,
  AdminOnly,
} from '@/components/auth/ProtectedComponent'
import { Permission, UserRole, PERMISSION_LABELS } from '@/lib/permissions'
import { useAuth } from '@/lib/AuthProvider'
import { useUserRole, useUserPermissions } from '@/hooks/usePermissions'
import { USER_ROLE_LABELS } from '@/constants'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Header, Footer } from '@/components/layout'

// Mock data for demonstration
const mockUsers = [
  {
    id: '1',
    name: 'João Silva',
    email: 'joao@example.com',
    role: 'customer',
    status: 'active',
  },
  {
    id: '2',
    name: 'Maria Santos',
    email: 'maria@example.com',
    role: 'seller',
    status: 'active',
  },
  {
    id: '3',
    name: 'Pedro Oliveira',
    email: 'pedro@example.com',
    role: 'admin',
    status: 'active',
  },
  {
    id: '4',
    name: 'Ana Costa',
    email: 'ana@example.com',
    role: 'customer',
    status: 'inactive',
  },
]

const mockStats = {
  totalUsers: 1247,
  totalProducts: 3891,
  totalOrders: 892,
  totalRevenue: 'R$ 234.567,89',
  pendingOrders: 23,
  activeStores: 45,
}

const AdminDashboard = () => {
  const { user } = useAuth()
  const userRole = useUserRole()
  const userPermissions = useUserPermissions()
  const [selectedTab, setSelectedTab] = useState<
    'overview' | 'users' | 'permissions' | 'settings'
  >('overview')

  const StatsCard = ({
    title,
    value,
    description,
  }: {
    title: string
    value: string | number
    description?: string
  }) => (
    <Card className="p-6 dark:bg-gray-800">
      <div className="flex flex-col space-y-2">
        <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
          {title}
        </h3>
        <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          {value}
        </p>
        {description && (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {description}
          </p>
        )}
      </div>
    </Card>
  )

  const UserManagementSection = () => (
    <PermissionProtected permission={Permission.MANAGE_USERS}>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            Gerenciamento de Usuários
          </h2>
          <Button>Adicionar Usuário</Button>
        </div>

        <Card className="p-6 dark:bg-gray-800">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left p-2 text-gray-900 dark:text-gray-100">
                    Nome
                  </th>
                  <th className="text-left p-2 text-gray-900 dark:text-gray-100">
                    Email
                  </th>
                  <th className="text-left p-2 text-gray-900 dark:text-gray-100">
                    Papel
                  </th>
                  <th className="text-left p-2 text-gray-900 dark:text-gray-100">
                    Status
                  </th>
                  <th className="text-left p-2 text-gray-900 dark:text-gray-100">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody>
                {mockUsers.map(user => (
                  <tr
                    key={user.id}
                    className="border-b border-gray-200 dark:border-gray-700"
                  >
                    <td className="p-2 text-gray-900 dark:text-gray-100">
                      {user.name}
                    </td>
                    <td className="p-2 text-gray-900 dark:text-gray-100">
                      {user.email}
                    </td>
                    <td className="p-2">
                      <Badge
                        variant={
                          user.role === 'admin'
                            ? 'destructive'
                            : user.role === 'seller'
                              ? 'default'
                              : 'secondary'
                        }
                      >
                        {
                          USER_ROLE_LABELS[
                            user.role as keyof typeof USER_ROLE_LABELS
                          ]
                        }
                      </Badge>
                    </td>
                    <td className="p-2">
                      <Badge
                        variant={
                          user.status === 'active' ? 'default' : 'secondary'
                        }
                      >
                        {user.status === 'active' ? 'Ativo' : 'Inativo'}
                      </Badge>
                    </td>
                    <td className="p-2">
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          Editar
                        </Button>
                        <PermissionProtected
                          permission={Permission.DELETE_USERS}
                        >
                          <Button size="sm" variant="destructive">
                            Excluir
                          </Button>
                        </PermissionProtected>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </PermissionProtected>
  )

  const PermissionsSection = () => (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
        Suas Permissões
      </h2>

      <Card className="p-6 dark:bg-gray-800">
        <div className="space-y-4">
          <div>
            <h3 className="font-medium mb-2 text-gray-900 dark:text-gray-100">
              Papel Atual
            </h3>
            <Badge variant="default" className="text-lg px-3 py-1">
              {userRole ? USER_ROLE_LABELS[userRole] : 'Não definido'}
            </Badge>
          </div>

          <div>
            <h3 className="font-medium mb-2 text-gray-900 dark:text-gray-100">
              Permissões Ativas ({userPermissions.length})
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
              {userPermissions.map(permission => (
                <Badge key={permission} variant="secondary" className="text-xs">
                  {PERMISSION_LABELS[permission]}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </div>
  )

  const SystemSettingsSection = () => (
    <PermissionProtected permission={Permission.MANAGE_SETTINGS}>
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          Configurações do Sistema
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6 dark:bg-gray-800">
            <h3 className="font-medium mb-4 text-gray-900 dark:text-gray-100">
              Configurações Gerais
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-900 dark:text-gray-100">
                  Registro de novos usuários
                </span>
                <Badge variant="default">Habilitado</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-900 dark:text-gray-100">
                  Verificação de email obrigatória
                </span>
                <Badge variant="default">Habilitado</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-900 dark:text-gray-100">
                  Modo de manutenção
                </span>
                <Badge variant="secondary">Desabilitado</Badge>
              </div>
            </div>
          </Card>

          <Card className="p-6 dark:bg-gray-800">
            <h3 className="font-medium mb-4 text-gray-900 dark:text-gray-100">
              Segurança
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-900 dark:text-gray-100">
                  Autenticação de dois fatores
                </span>
                <Badge variant="secondary">Opcional</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-900 dark:text-gray-100">
                  Tentativas de login
                </span>
                <Badge variant="default">5 máximo</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-900 dark:text-gray-100">
                  Expiração de sessão
                </span>
                <Badge variant="default">7 dias</Badge>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </PermissionProtected>
  )

  const renderTabContent = () => {
    switch (selectedTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <StatsCard
                title="Total de Usuários"
                value={mockStats.totalUsers}
              />
              <StatsCard
                title="Total de Produtos"
                value={mockStats.totalProducts}
              />
              <StatsCard
                title="Total de Pedidos"
                value={mockStats.totalOrders}
              />
              <StatsCard title="Receita Total" value={mockStats.totalRevenue} />
              <StatsCard
                title="Pedidos Pendentes"
                value={mockStats.pendingOrders}
                description="Requer atenção"
              />
              <StatsCard title="Lojas Ativas" value={mockStats.activeStores} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-6 dark:bg-gray-800">
                <h3 className="font-medium mb-4 text-gray-900 dark:text-gray-100">
                  Atividade Recente
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-900 dark:text-gray-100">
                      Nova loja registrada: "Eletrônicos Silva"
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm text-gray-900 dark:text-gray-100">
                      Pedido #1234 processado
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span className="text-sm text-gray-900 dark:text-gray-100">
                      Produto reportado: "Smartphone XYZ"
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="text-sm text-gray-900 dark:text-gray-100">
                      Novo usuário registrado
                    </span>
                  </div>
                </div>
              </Card>

              <Card className="p-6 dark:bg-gray-800">
                <h3 className="font-medium mb-4 text-gray-900 dark:text-gray-100">
                  Alertas do Sistema
                </h3>
                <div className="space-y-3">
                  <div className="bg-yellow-50 dark:bg-yellow-900 border border-yellow-200 dark:border-yellow-700 rounded p-3">
                    <p className="text-sm text-yellow-800 dark:text-yellow-200">
                      <strong>Atenção:</strong> 23 pedidos pendentes de
                      processamento
                    </p>
                  </div>
                  <div className="bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 rounded p-3">
                    <p className="text-sm text-red-800 dark:text-red-200">
                      <strong>Crítico:</strong> 3 produtos com estoque baixo
                    </p>
                  </div>
                  <div className="bg-green-50 dark:bg-green-900 border border-green-200 dark:border-green-700 rounded p-3">
                    <p className="text-sm text-green-800 dark:text-green-200">
                      <strong>Sucesso:</strong> Backup do sistema concluído
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        )
      case 'users':
        return <UserManagementSection />
      case 'permissions':
        return <PermissionsSection />
      case 'settings':
        return <SystemSettingsSection />
      default:
        return null
    }
  }

  return (
    <>
      <Header />
      <AdminGuard>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                Painel Administrativo
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Gerencie usuários, configurações e monitore o sistema
              </p>
            </div>

            {/* Navigation Tabs */}
            <div className="border-b border-gray-200 dark:border-gray-700 mb-8">
              <nav className="-mb-px flex space-x-8">
                {[
                  { id: 'overview', label: 'Visão Geral' },
                  { id: 'users', label: 'Usuários' },
                  { id: 'permissions', label: 'Permissões' },
                  { id: 'settings', label: 'Configurações' },
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() =>
                      setSelectedTab(
                        tab.id as
                          | 'overview'
                          | 'users'
                          | 'permissions'
                          | 'settings'
                      )
                    }
                    className={`py-2 px-1 border-b-2 font-medium text-sm ${
                      selectedTab === tab.id
                        ? 'border-blue-500 text-blue-600 dark:border-blue-400 dark:text-blue-400'
                        : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab Content */}
            {renderTabContent()}
          </div>
        </div>
      </AdminGuard>
      <Footer />
    </>
  )
}

export default AdminDashboard
