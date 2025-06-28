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
    <Card className="p-6">
      <div className="flex flex-col space-y-2">
        <h3 className="text-sm font-medium text-gray-600">{title}</h3>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        {description && <p className="text-sm text-gray-500">{description}</p>}
      </div>
    </Card>
  )

  const UserManagementSection = () => (
    <PermissionProtected permission={Permission.MANAGE_USERS}>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Gerenciamento de Usuários</h2>
          <Button>Adicionar Usuário</Button>
        </div>

        <Card className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Nome</th>
                  <th className="text-left p-2">Email</th>
                  <th className="text-left p-2">Papel</th>
                  <th className="text-left p-2">Status</th>
                  <th className="text-left p-2">Ações</th>
                </tr>
              </thead>
              <tbody>
                {mockUsers.map(user => (
                  <tr key={user.id} className="border-b">
                    <td className="p-2">{user.name}</td>
                    <td className="p-2">{user.email}</td>
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
      <h2 className="text-xl font-semibold">Suas Permissões</h2>

      <Card className="p-6">
        <div className="space-y-4">
          <div>
            <h3 className="font-medium mb-2">Papel Atual</h3>
            <Badge variant="default" className="text-lg px-3 py-1">
              {userRole ? USER_ROLE_LABELS[userRole] : 'Não definido'}
            </Badge>
          </div>

          <div>
            <h3 className="font-medium mb-2">
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
        <h2 className="text-xl font-semibold">Configurações do Sistema</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="font-medium mb-4">Configurações Gerais</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span>Registro de novos usuários</span>
                <Badge variant="default">Habilitado</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>Verificação de email obrigatória</span>
                <Badge variant="default">Habilitado</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>Modo de manutenção</span>
                <Badge variant="secondary">Desabilitado</Badge>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-medium mb-4">Segurança</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span>Autenticação de dois fatores</span>
                <Badge variant="secondary">Opcional</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>Tentativas de login</span>
                <Badge variant="default">5 máximo</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>Expiração de sessão</span>
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
              <Card className="p-6">
                <h3 className="font-medium mb-4">Atividade Recente</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm">
                      Nova loja registrada: "Eletrônicos Silva"
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm">Pedido #1234 processado</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span className="text-sm">
                      Produto reportado: "Smartphone XYZ"
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="text-sm">Novo usuário registrado</span>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="font-medium mb-4">Alertas do Sistema</h3>
                <div className="space-y-3">
                  <div className="bg-yellow-50 border border-yellow-200 rounded p-3">
                    <p className="text-sm text-yellow-800">
                      <strong>Atenção:</strong> 23 pedidos pendentes de
                      processamento
                    </p>
                  </div>
                  <div className="bg-red-50 border border-red-200 rounded p-3">
                    <p className="text-sm text-red-800">
                      <strong>Crítico:</strong> 3 produtos com estoque baixo
                    </p>
                  </div>
                  <div className="bg-green-50 border border-green-200 rounded p-3">
                    <p className="text-sm text-green-800">
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
        <div className="min-h-screen bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">
                Painel Administrativo
              </h1>
              <p className="text-gray-600 mt-2">
                Gerencie usuários, configurações e monitore o sistema
              </p>
            </div>

            {/* Navigation Tabs */}
            <div className="border-b border-gray-200 mb-8">
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
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
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
