'use client'

import React from 'react'
import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import {
  TrendingUp,
  TrendingDown,
  MoreHorizontal,
  ExternalLink,
  Calendar,
  Clock,
  DollarSign,
  Package,
  Users,
  ShoppingCart,
  Star,
  AlertCircle,
  CheckCircle,
  XCircle,
} from 'lucide-react'

// Stats Card Component
interface StatsCardProps {
  title: string
  value: string | number
  change?: {
    value: number
    isPositive: boolean
    period: string
  }
  icon: React.ElementType
  color?: 'blue' | 'green' | 'red' | 'yellow' | 'purple'
  href?: string
}

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  change,
  icon: Icon,
  color = 'blue',
  href,
}) => {
  const colorClasses = {
    blue: 'text-blue-600 bg-blue-100',
    green: 'text-green-600 bg-green-100',
    red: 'text-red-600 bg-red-100',
    yellow: 'text-yellow-600 bg-yellow-100',
    purple: 'text-purple-600 bg-purple-100',
  }

  const Content = () => (
    <Card className="p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>

          {change && (
            <div className="flex items-center mt-2">
              {change.isPositive ? (
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
              )}
              <span
                className={cn(
                  'text-sm font-medium',
                  change.isPositive ? 'text-green-500' : 'text-red-500'
                )}
              >
                {change.isPositive ? '+' : ''}
                {change.value}%
              </span>
              <span className="text-sm text-gray-500 ml-1">
                vs {change.period}
              </span>
            </div>
          )}
        </div>

        <div className={cn('p-3 rounded-lg', colorClasses[color])}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </Card>
  )

  if (href) {
    return (
      <Link href={href} className="block">
        <Content />
      </Link>
    )
  }

  return <Content />
}

// Activity Feed Component
interface ActivityItem {
  id: string
  type: 'order' | 'product' | 'payment' | 'review' | 'system'
  title: string
  description: string
  time: string
  status?: 'success' | 'warning' | 'error' | 'info'
}

interface ActivityFeedProps {
  activities: ActivityItem[]
  className?: string
}

export const ActivityFeed: React.FC<ActivityFeedProps> = ({
  activities,
  className,
}) => {
  const getActivityIcon = (type: ActivityItem['type']) => {
    const icons = {
      order: ShoppingCart,
      product: Package,
      payment: DollarSign,
      review: Star,
      system: AlertCircle,
    }
    return icons[type]
  }

  const getStatusIcon = (status?: ActivityItem['status']) => {
    if (!status) return null

    const icons = {
      success: CheckCircle,
      warning: AlertCircle,
      error: XCircle,
      info: AlertCircle,
    }

    const colors = {
      success: 'text-green-500',
      warning: 'text-yellow-500',
      error: 'text-red-500',
      info: 'text-blue-500',
    }

    const IconComponent = icons[status]
    return <IconComponent className={cn('h-4 w-4', colors[status])} />
  }

  return (
    <Card className={cn('p-6', className)}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Atividade Recente</h3>
        <Button variant="ghost" size="sm">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-4">
        {activities.map(activity => {
          const ActivityIcon = getActivityIcon(activity.type)

          return (
            <div key={activity.id} className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <ActivityIcon className="h-4 w-4 text-gray-600" />
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900">
                    {activity.title}
                  </p>
                  {getStatusIcon(activity.status)}
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  {activity.description}
                </p>
                <div className="flex items-center mt-2">
                  <Clock className="h-3 w-3 text-gray-400 mr-1" />
                  <span className="text-xs text-gray-500">{activity.time}</span>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-4 pt-4 border-t">
        <Button variant="ghost" size="sm" className="w-full">
          Ver todas as atividades
          <ExternalLink className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </Card>
  )
}

// Quick Actions Component
interface QuickAction {
  title: string
  description: string
  icon: React.ElementType
  href: string
  color?: 'blue' | 'green' | 'red' | 'yellow' | 'purple'
  badge?: string
}

interface QuickActionsProps {
  actions: QuickAction[]
  className?: string
}

export const QuickActions: React.FC<QuickActionsProps> = ({
  actions,
  className,
}) => {
  const colorClasses = {
    blue: 'bg-blue-600 hover:bg-blue-700',
    green: 'bg-green-600 hover:bg-green-700',
    red: 'bg-red-600 hover:bg-red-700',
    yellow: 'bg-yellow-600 hover:bg-yellow-700',
    purple: 'bg-purple-600 hover:bg-purple-700',
  }

  return (
    <Card className={cn('p-6', className)}>
      <h3 className="text-lg font-semibold mb-4">Ações Rápidas</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {actions.map((action, index) => {
          const ActionIcon = action.icon

          return (
            <Link key={index} href={action.href}>
              <Button
                variant="outline"
                className="h-auto p-4 justify-start text-left hover:bg-gray-50 relative"
              >
                <div className="flex items-start space-x-3 w-full">
                  <div
                    className={cn(
                      'p-2 rounded-lg text-white',
                      colorClasses[action.color || 'blue']
                    )}
                  >
                    <ActionIcon className="h-4 w-4" />
                  </div>

                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{action.title}</p>
                    <p className="text-sm text-gray-600 mt-1">
                      {action.description}
                    </p>
                  </div>

                  {action.badge && (
                    <Badge
                      variant="secondary"
                      className="absolute top-2 right-2"
                    >
                      {action.badge}
                    </Badge>
                  )}
                </div>
              </Button>
            </Link>
          )
        })}
      </div>
    </Card>
  )
}

// Progress Widget Component
interface ProgressItem {
  label: string
  value: number
  max: number
  color?: 'blue' | 'green' | 'red' | 'yellow' | 'purple'
}

interface ProgressWidgetProps {
  title: string
  items: ProgressItem[]
  className?: string
}

export const ProgressWidget: React.FC<ProgressWidgetProps> = ({
  title,
  items,
  className,
}) => {
  const colorClasses = {
    blue: 'bg-blue-600',
    green: 'bg-green-600',
    red: 'bg-red-600',
    yellow: 'bg-yellow-600',
    purple: 'bg-purple-600',
  }

  return (
    <Card className={cn('p-6', className)}>
      <h3 className="text-lg font-semibold mb-4">{title}</h3>

      <div className="space-y-4">
        {items.map((item, index) => {
          const percentage = Math.round((item.value / item.max) * 100)

          return (
            <div key={index}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-gray-900">
                  {item.label}
                </span>
                <span className="text-sm text-gray-600">
                  {item.value}/{item.max} ({percentage}%)
                </span>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={cn(
                    'h-2 rounded-full transition-all duration-300',
                    colorClasses[item.color || 'blue']
                  )}
                  style={{ width: `${Math.min(percentage, 100)}%` }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </Card>
  )
}

// Simple Chart Component (placeholder for now)
interface ChartData {
  label: string
  value: number
}

interface SimpleChartProps {
  title: string
  data: ChartData[]
  type?: 'bar' | 'line'
  className?: string
}

export const SimpleChart: React.FC<SimpleChartProps> = ({
  title,
  data,
  type = 'bar',
  className,
}) => {
  const maxValue = Math.max(...data.map(d => d.value))

  return (
    <Card className={cn('p-6', className)}>
      <h3 className="text-lg font-semibold mb-4">{title}</h3>

      <div className="space-y-3">
        {data.map((item, index) => {
          const percentage = (item.value / maxValue) * 100

          return (
            <div key={index} className="flex items-center space-x-3">
              <span className="text-sm text-gray-600 w-20 text-right">
                {item.label}
              </span>

              <div className="flex-1 bg-gray-200 rounded-full h-3">
                <div
                  className="bg-blue-600 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${percentage}%` }}
                />
              </div>

              <span className="text-sm font-medium text-gray-900 w-12">
                {item.value}
              </span>
            </div>
          )
        })}
      </div>
    </Card>
  )
}

// Notification Panel Component
interface Notification {
  id: string
  title: string
  message: string
  type: 'info' | 'success' | 'warning' | 'error'
  time: string
  read: boolean
}

interface NotificationPanelProps {
  notifications: Notification[]
  className?: string
}

export const NotificationPanel: React.FC<NotificationPanelProps> = ({
  notifications,
  className,
}) => {
  const getNotificationIcon = (type: Notification['type']) => {
    const icons = {
      info: AlertCircle,
      success: CheckCircle,
      warning: AlertCircle,
      error: XCircle,
    }

    const colors = {
      info: 'text-blue-500',
      success: 'text-green-500',
      warning: 'text-yellow-500',
      error: 'text-red-500',
    }

    const IconComponent = icons[type]
    return <IconComponent className={cn('h-4 w-4', colors[type])} />
  }

  return (
    <Card className={cn('p-6', className)}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Notificações</h3>
        <Badge variant="secondary">
          {notifications.filter(n => !n.read).length}
        </Badge>
      </div>

      <div className="space-y-3 max-h-64 overflow-y-auto">
        {notifications.map(notification => (
          <div
            key={notification.id}
            className={cn(
              'p-3 rounded-lg border transition-colors',
              notification.read ? 'bg-gray-50' : 'bg-white border-blue-200'
            )}
          >
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 mt-0.5">
                {getNotificationIcon(notification.type)}
              </div>

              <div className="flex-1">
                <p
                  className={cn(
                    'text-sm font-medium',
                    notification.read ? 'text-gray-600' : 'text-gray-900'
                  )}
                >
                  {notification.title}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  {notification.message}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {notification.time}
                </p>
              </div>

              {!notification.read && (
                <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-2" />
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t">
        <Button variant="ghost" size="sm" className="w-full">
          Ver todas as notificações
        </Button>
      </div>
    </Card>
  )
}
