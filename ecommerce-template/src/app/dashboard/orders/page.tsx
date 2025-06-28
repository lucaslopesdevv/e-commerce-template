'use client'

import React, { useState } from 'react'
import DashboardLayout from '@/components/dashboard/DashboardLayout'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { cn } from '@/lib/utils'
import {
  Search,
  Package,
  Truck,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  RefreshCw,
  Filter,
  Calendar,
  DollarSign,
} from 'lucide-react'

interface Order {
  id: string
  number: string
  date: string
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled'
  total: number
  items: {
    id: string
    name: string
    image: string
    quantity: number
    price: number
  }[]
  tracking?: string
  estimatedDelivery?: string
}

const OrdersPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  // Mock orders data
  const orders: Order[] = [
    {
      id: '1',
      number: 'ORD-2024-001',
      date: '2024-01-15',
      status: 'delivered',
      total: 2599.9,
      items: [
        {
          id: '1',
          name: 'iPhone 15 Pro Max 256GB',
          image: '/placeholder-product.jpg',
          quantity: 1,
          price: 2599.9,
        },
      ],
      tracking: 'BR123456789',
      estimatedDelivery: '2024-01-18',
    },
    {
      id: '2',
      number: 'ORD-2024-002',
      date: '2024-01-20',
      status: 'shipped',
      total: 8999.0,
      items: [
        {
          id: '2',
          name: 'MacBook Air M2 13"',
          image: '/placeholder-product.jpg',
          quantity: 1,
          price: 8999.0,
        },
      ],
      tracking: 'BR987654321',
      estimatedDelivery: '2024-01-25',
    },
    {
      id: '3',
      number: 'ORD-2024-003',
      date: '2024-01-22',
      status: 'confirmed',
      total: 1299.9,
      items: [
        {
          id: '3',
          name: 'AirPods Pro 2ª Geração',
          image: '/placeholder-product.jpg',
          quantity: 1,
          price: 1299.9,
        },
      ],
      estimatedDelivery: '2024-01-28',
    },
    {
      id: '4',
      number: 'ORD-2024-004',
      date: '2024-01-23',
      status: 'pending',
      total: 4599.9,
      items: [
        {
          id: '4',
          name: 'iPad Pro 12.9" M2',
          image: '/placeholder-product.jpg',
          quantity: 1,
          price: 4599.9,
        },
      ],
    },
  ]

  const getStatusConfig = (status: Order['status']) => {
    const configs = {
      pending: {
        label: 'Pendente',
        variant: 'secondary' as const,
        icon: Clock,
        color: 'text-yellow-600',
      },
      confirmed: {
        label: 'Confirmado',
        variant: 'default' as const,
        icon: CheckCircle,
        color: 'text-blue-600',
      },
      shipped: {
        label: 'Enviado',
        variant: 'default' as const,
        icon: Truck,
        color: 'text-purple-600',
      },
      delivered: {
        label: 'Entregue',
        variant: 'default' as const,
        icon: Package,
        color: 'text-green-600',
      },
      cancelled: {
        label: 'Cancelado',
        variant: 'destructive' as const,
        icon: XCircle,
        color: 'text-red-600',
      },
    }
    return configs[status]
  }

  const filteredOrders = orders.filter(order => {
    const matchesSearch =
      order.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.items.some(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    const matchesStatus =
      statusFilter === 'all' || order.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getOrderSummary = () => {
    const total = orders.length
    const delivered = orders.filter(o => o.status === 'delivered').length
    const pending = orders.filter(o => o.status === 'pending').length
    const totalSpent = orders
      .filter(o => o.status === 'delivered')
      .reduce((sum, order) => sum + order.total, 0)

    return { total, delivered, pending, totalSpent }
  }

  const summary = getOrderSummary()

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Meus Pedidos</h1>
            <p className="text-gray-600">
              Acompanhe todos os seus pedidos e entregas
            </p>
          </div>
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Atualizar
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Package className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total de Pedidos</p>
                <p className="text-xl font-bold">{summary.total}</p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Entregues</p>
                <p className="text-xl font-bold">{summary.delivered}</p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Pendentes</p>
                <p className="text-xl font-bold">{summary.pending}</p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <DollarSign className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Gasto</p>
                <p className="text-xl font-bold">
                  R${' '}
                  {summary.totalSpent.toLocaleString('pt-BR', {
                    minimumFractionDigits: 2,
                  })}
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Filters */}
        <Card className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Buscar por número do pedido ou produto..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="sm:w-48">
              <select
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md text-sm"
              >
                <option value="all">Todos os Status</option>
                <option value="pending">Pendente</option>
                <option value="confirmed">Confirmado</option>
                <option value="shipped">Enviado</option>
                <option value="delivered">Entregue</option>
                <option value="cancelled">Cancelado</option>
              </select>
            </div>
          </div>
        </Card>

        {/* Orders List */}
        <div className="space-y-4">
          {filteredOrders.length === 0 ? (
            <Card className="p-8 text-center">
              <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Nenhum pedido encontrado
              </h3>
              <p className="text-gray-600">
                {searchTerm || statusFilter !== 'all'
                  ? 'Tente ajustar os filtros para encontrar seus pedidos'
                  : 'Você ainda não fez nenhum pedido. Que tal explorar nossos produtos?'}
              </p>
              {!searchTerm && statusFilter === 'all' && (
                <Button className="mt-4">Explorar Produtos</Button>
              )}
            </Card>
          ) : (
            filteredOrders.map(order => {
              const statusConfig = getStatusConfig(order.status)
              const StatusIcon = statusConfig.icon

              return (
                <Card key={order.id} className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div
                        className={cn(
                          'p-2 rounded-lg',
                          order.status === 'delivered'
                            ? 'bg-green-100'
                            : order.status === 'shipped'
                              ? 'bg-purple-100'
                              : order.status === 'confirmed'
                                ? 'bg-blue-100'
                                : order.status === 'cancelled'
                                  ? 'bg-red-100'
                                  : 'bg-yellow-100'
                        )}
                      >
                        <StatusIcon
                          className={cn('h-5 w-5', statusConfig.color)}
                        />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {order.number}
                        </h3>
                        <p className="text-sm text-gray-600">
                          Pedido feito em{' '}
                          {new Date(order.date).toLocaleDateString('pt-BR')}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Badge variant={statusConfig.variant}>
                        {statusConfig.label}
                      </Badge>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        Detalhes
                      </Button>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="space-y-3 mb-4">
                    {order.items.map(item => (
                      <div
                        key={item.id}
                        className="flex items-center space-x-3"
                      >
                        <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                          <Package className="h-6 w-6 text-gray-400" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">
                            {item.name}
                          </p>
                          <p className="text-sm text-gray-600">
                            Quantidade: {item.quantity} • Preço: R${' '}
                            {item.price.toLocaleString('pt-BR', {
                              minimumFractionDigits: 2,
                            })}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Order Footer */}
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="text-sm text-gray-600">
                      {order.tracking && (
                        <span>
                          Código de rastreamento:{' '}
                          <span className="font-medium">{order.tracking}</span>
                        </span>
                      )}
                      {order.estimatedDelivery && (
                        <span className="ml-4">
                          Previsão de entrega:{' '}
                          <span className="font-medium">
                            {new Date(
                              order.estimatedDelivery
                            ).toLocaleDateString('pt-BR')}
                          </span>
                        </span>
                      )}
                    </div>

                    <div className="text-right">
                      <p className="text-sm text-gray-600">Total</p>
                      <p className="text-lg font-bold text-gray-900">
                        R${' '}
                        {order.total.toLocaleString('pt-BR', {
                          minimumFractionDigits: 2,
                        })}
                      </p>
                    </div>
                  </div>
                </Card>
              )
            })
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}

export default OrdersPage
