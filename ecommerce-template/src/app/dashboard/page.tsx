'use client'

import React from 'react'
import { useAuth } from '@/lib/AuthProvider'
import { useUserRole } from '@/hooks/usePermissions'
import DashboardLayout from '@/components/dashboard/DashboardLayout'
import {
  StatsCard,
  ActivityFeed,
  QuickActions,
  ProgressWidget,
  SimpleChart,
  NotificationPanel,
} from '@/components/dashboard/DashboardWidgets'
import {
  CustomerOnly,
  SellerOnly,
  AdminOnly,
} from '@/components/auth/ProtectedComponent'
import {
  ShoppingCart,
  Package,
  DollarSign,
  Users,
  TrendingUp,
  Heart,
  Star,
  Settings,
  Plus,
  FileText,
  BarChart3,
  CreditCard,
  MessageSquare,
  Bell,
} from 'lucide-react'

const Dashboard = () => {
  const { user } = useAuth()
  const userRole = useUserRole()

  // Mock data - In a real app, this would come from API calls
  const customerStats = [
    {
      title: 'Pedidos Totais',
      value: '12',
      change: { value: 8, isPositive: true, period: 'mês passado' },
      icon: ShoppingCart,
      color: 'blue' as const,
      href: '/dashboard/orders',
    },
    {
      title: 'Lista de Desejos',
      value: '24',
      icon: Heart,
      color: 'red' as const,
      href: '/dashboard/wishlist',
    },
    {
      title: 'Avaliações Feitas',
      value: '8',
      icon: Star,
      color: 'yellow' as const,
    },
    {
      title: 'Valor Economizado',
      value: 'R$ 1.240',
      change: { value: 15, isPositive: true, period: 'mês passado' },
      icon: DollarSign,
      color: 'green' as const,
    },
  ]

  const sellerStats = [
    {
      title: 'Vendas do Mês',
      value: 'R$ 8.450',
      change: { value: 12, isPositive: true, period: 'mês passado' },
      icon: DollarSign,
      color: 'green' as const,
      href: '/dashboard/seller/financial',
    },
    {
      title: 'Produtos Ativos',
      value: '48',
      change: { value: 3, isPositive: true, period: 'semana passada' },
      icon: Package,
      color: 'blue' as const,
      href: '/dashboard/seller/products',
    },
    {
      title: 'Pedidos Pendentes',
      value: '7',
      icon: ShoppingCart,
      color: 'yellow' as const,
      href: '/dashboard/seller/orders',
    },
    {
      title: 'Avaliação Média',
      value: '4.8',
      change: { value: 2, isPositive: true, period: 'mês passado' },
      icon: Star,
      color: 'purple' as const,
    },
  ]

  const adminStats = [
    {
      title: 'Usuários Totais',
      value: '2.456',
      change: { value: 18, isPositive: true, period: 'mês passado' },
      icon: Users,
      color: 'blue' as const,
      href: '/admin/users',
    },
    {
      title: 'Vendas Totais',
      value: 'R$ 124.580',
      change: { value: 25, isPositive: true, period: 'mês passado' },
      icon: DollarSign,
      color: 'green' as const,
    },
    {
      title: 'Produtos Ativos',
      value: '1.248',
      change: { value: 8, isPositive: true, period: 'semana passada' },
      icon: Package,
      color: 'purple' as const,
    },
    {
      title: 'Taxa de Conversão',
      value: '3.2%',
      change: { value: 5, isPositive: true, period: 'mês passado' },
      icon: TrendingUp,
      color: 'red' as const,
    },
  ]

  const customerActivities = [
    {
      id: '1',
      type: 'order' as const,
      title: 'Pedido #1234 confirmado',
      description: 'Seu pedido foi confirmado e está sendo preparado',
      time: '2 horas atrás',
      status: 'success' as const,
    },
    {
      id: '2',
      type: 'payment' as const,
      title: 'Pagamento processado',
      description: 'Pagamento via PIX no valor de R$ 245,90',
      time: '5 horas atrás',
      status: 'success' as const,
    },
    {
      id: '3',
      type: 'product' as const,
      title: 'Produto adicionado aos favoritos',
      description: 'iPhone 15 Pro Max foi adicionado à sua lista',
      time: '1 dia atrás',
      status: 'info' as const,
    },
    {
      id: '4',
      type: 'review' as const,
      title: 'Avaliação enviada',
      description: 'Você avaliou o produto "MacBook Air M2"',
      time: '2 dias atrás',
      status: 'success' as const,
    },
  ]

  const sellerActivities = [
    {
      id: '1',
      type: 'order' as const,
      title: 'Novo pedido recebido',
      description: 'Pedido #5678 - MacBook Air M2',
      time: '30 minutos atrás',
      status: 'info' as const,
    },
    {
      id: '2',
      type: 'payment' as const,
      title: 'Pagamento recebido',
      description: 'R$ 8.999,00 creditado na sua conta',
      time: '2 horas atrás',
      status: 'success' as const,
    },
    {
      id: '3',
      type: 'product' as const,
      title: 'Produto esgotado',
      description: 'iPhone 15 Pro Max - Estoque zerado',
      time: '4 horas atrás',
      status: 'warning' as const,
    },
    {
      id: '4',
      type: 'review' as const,
      title: 'Nova avaliação',
      description: 'Cliente avaliou seu produto com 5 estrelas',
      time: '6 horas atrás',
      status: 'success' as const,
    },
  ]

  const customerQuickActions = [
    {
      title: 'Fazer Pedido',
      description: 'Explore produtos e faça um novo pedido',
      icon: ShoppingCart,
      href: '/products',
      color: 'blue' as const,
    },
    {
      title: 'Meus Pedidos',
      description: 'Acompanhe seus pedidos em andamento',
      icon: Package,
      href: '/dashboard/orders',
      color: 'green' as const,
      badge: '3',
    },
    {
      title: 'Lista de Desejos',
      description: 'Veja seus produtos favoritos',
      icon: Heart,
      href: '/dashboard/wishlist',
      color: 'red' as const,
    },
    {
      title: 'Configurações',
      description: 'Gerencie sua conta e preferências',
      icon: Settings,
      href: '/dashboard/settings',
      color: 'purple' as const,
    },
  ]

  const sellerQuickActions = [
    {
      title: 'Adicionar Produto',
      description: 'Cadastre um novo produto na sua loja',
      icon: Plus,
      href: '/dashboard/seller/products/new',
      color: 'green' as const,
    },
    {
      title: 'Gerenciar Pedidos',
      description: 'Visualize e processe seus pedidos',
      icon: FileText,
      href: '/dashboard/seller/orders',
      color: 'blue' as const,
      badge: '7',
    },
    {
      title: 'Ver Analytics',
      description: 'Acompanhe o desempenho da sua loja',
      icon: BarChart3,
      href: '/dashboard/seller/analytics',
      color: 'purple' as const,
    },
    {
      title: 'Financeiro',
      description: 'Gerencie pagamentos e relatórios',
      icon: CreditCard,
      href: '/dashboard/seller/financial',
      color: 'yellow' as const,
    },
  ]

  const notifications = [
    {
      id: '1',
      title: 'Pedido confirmado',
      message: 'Seu pedido #1234 foi confirmado e está sendo preparado',
      type: 'success' as const,
      time: '2 horas atrás',
      read: false,
    },
    {
      id: '2',
      title: 'Promoção especial',
      message: 'Até 50% de desconto em eletrônicos. Aproveite!',
      type: 'info' as const,
      time: '1 dia atrás',
      read: false,
    },
    {
      id: '3',
      title: 'Produto em falta',
      message: 'O produto em sua lista de desejos está disponível novamente',
      type: 'warning' as const,
      time: '2 dias atrás',
      read: true,
    },
  ]

  const salesChart = [
    { label: 'Jan', value: 12000 },
    { label: 'Fev', value: 15000 },
    { label: 'Mar', value: 18000 },
    { label: 'Abr', value: 16000 },
    { label: 'Mai', value: 22000 },
    { label: 'Jun', value: 25000 },
  ]

  const progressItems = [
    {
      label: 'Perfil Completo',
      value: 4,
      max: 5,
      color: 'green' as const,
    },
    {
      label: 'Avaliações Feitas',
      value: 8,
      max: 10,
      color: 'yellow' as const,
    },
    {
      label: 'Compras Realizadas',
      value: 12,
      max: 20,
      color: 'blue' as const,
    },
  ]

  const getWelcomeMessage = () => {
    const hour = new Date().getHours()
    const firstName = user?.user_metadata?.fullName?.split(' ')[0] || 'Usuário'

    if (hour < 12) return `Bom dia, ${firstName}!`
    if (hour < 18) return `Boa tarde, ${firstName}!`
    return `Boa noite, ${firstName}!`
  }

  const getRoleSpecificStats = () => {
    if (userRole === 'admin') return adminStats
    if (userRole === 'seller') return sellerStats
    return customerStats
  }

  const getRoleSpecificActivities = () => {
    if (userRole === 'seller' || userRole === 'admin') return sellerActivities
    return customerActivities
  }

  const getRoleSpecificActions = () => {
    if (userRole === 'seller' || userRole === 'admin') return sellerQuickActions
    return customerQuickActions
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-6 text-white">
          <h1 className="text-2xl font-bold">{getWelcomeMessage()}</h1>
          <p className="text-blue-100 mt-2">
            {userRole === 'admin'
              ? 'Gerencie sua plataforma e acompanhe o crescimento'
              : userRole === 'seller'
                ? 'Acompanhe suas vendas e gerencie sua loja'
                : 'Bem-vindo de volta! Explore nossas ofertas especiais'}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {getRoleSpecificStats().map((stat, index) => (
            <StatsCard key={index} {...stat} />
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            <QuickActions actions={getRoleSpecificActions()} />

            <CustomerOnly>
              <ProgressWidget
                title="Progresso da Conta"
                items={progressItems}
              />
            </CustomerOnly>

            <SellerOnly>
              <SimpleChart
                title="Vendas dos Últimos 6 Meses"
                data={salesChart}
              />
            </SellerOnly>

            <AdminOnly>
              <SimpleChart title="Receita da Plataforma" data={salesChart} />
            </AdminOnly>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <ActivityFeed activities={getRoleSpecificActivities()} />
            <NotificationPanel notifications={notifications} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Dashboard
