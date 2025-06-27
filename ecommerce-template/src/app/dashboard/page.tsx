'use client';

import { useAuth, withAuth } from '@/lib/AuthProvider';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { User, Package, Calendar, CreditCard } from 'lucide-react';

function DashboardPage() {
  const { user } = useAuth();

  const userRole = user?.user_metadata?.role || 'customer';
  const userName = user?.user_metadata?.fullName || user?.email?.split('@')[0];

  const dashboardStats = [
    {
      title: 'Reservas Ativas',
      value: '3',
      icon: Calendar,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: 'Produtos Favoritados',
      value: '12',
      icon: Package,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      title: 'Gastos Mensais',
      value: 'R$ 850,00',
      icon: CreditCard,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
  ];

  const vendorStats = [
    {
      title: 'Produtos Cadastrados',
      value: '8',
      icon: Package,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: 'Reservas Recebidas',
      value: '15',
      icon: Calendar,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      title: 'Receita Mensal',
      value: 'R$ 2.450,00',
      icon: CreditCard,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
  ];

  const stats = userRole === 'vendor' ? vendorStats : dashboardStats;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Olá, {userName}! 👋
              </h1>
              <p className="mt-2 text-gray-600">
                Bem-vindo ao seu dashboard. Aqui você pode gerenciar suas
                atividades.
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <Badge variant={userRole === 'vendor' ? 'default' : 'secondary'}>
                {userRole === 'vendor' ? 'Fornecedor' : 'Cliente'}
              </Badge>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <Card key={index} className="p-6">
                <div className="flex items-center">
                  <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                    <IconComponent className={`h-6 w-6 ${stat.color}`} />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {stat.value}
                    </p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activity */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Atividade Recente
            </h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <Calendar className="h-5 w-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    Nova reserva confirmada
                  </p>
                  <p className="text-sm text-gray-600">
                    Câmera Canon EOS - 2 dias
                  </p>
                </div>
                <span className="text-xs text-gray-500">2h atrás</span>
              </div>

              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <Package className="h-5 w-5 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    Produto favoritado
                  </p>
                  <p className="text-sm text-gray-600">
                    Bicicleta Mountain Bike
                  </p>
                </div>
                <span className="text-xs text-gray-500">1 dia atrás</span>
              </div>

              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <CreditCard className="h-5 w-5 text-purple-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    Pagamento processado
                  </p>
                  <p className="text-sm text-gray-600">R$ 180,00 via PIX</p>
                </div>
                <span className="text-xs text-gray-500">3 dias atrás</span>
              </div>
            </div>
          </Card>

          {/* Quick Actions */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Ações Rápidas
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {userRole === 'vendor' ? (
                <>
                  <Button className="h-16 flex flex-col items-center justify-center space-y-1">
                    <Package className="h-5 w-5" />
                    <span className="text-xs">Adicionar Produto</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-16 flex flex-col items-center justify-center space-y-1"
                  >
                    <Calendar className="h-5 w-5" />
                    <span className="text-xs">Ver Reservas</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-16 flex flex-col items-center justify-center space-y-1"
                  >
                    <CreditCard className="h-5 w-5" />
                    <span className="text-xs">Financeiro</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-16 flex flex-col items-center justify-center space-y-1"
                  >
                    <User className="h-5 w-5" />
                    <span className="text-xs">Perfil</span>
                  </Button>
                </>
              ) : (
                <>
                  <Button className="h-16 flex flex-col items-center justify-center space-y-1">
                    <Package className="h-5 w-5" />
                    <span className="text-xs">Buscar Produtos</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-16 flex flex-col items-center justify-center space-y-1"
                  >
                    <Calendar className="h-5 w-5" />
                    <span className="text-xs">Minhas Reservas</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-16 flex flex-col items-center justify-center space-y-1"
                  >
                    <CreditCard className="h-5 w-5" />
                    <span className="text-xs">Histórico</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-16 flex flex-col items-center justify-center space-y-1"
                  >
                    <User className="h-5 w-5" />
                    <span className="text-xs">Perfil</span>
                  </Button>
                </>
              )}
            </div>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}

// Export the component wrapped with authentication protection
export default withAuth(DashboardPage);
