'use client'

import React, { useState } from 'react'
import DashboardLayout from '@/components/dashboard/DashboardLayout'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import {
  Settings,
  User,
  Bell,
  Shield,
  Palette,
  Globe,
  Smartphone,
  Mail,
  MessageSquare,
  Eye,
  EyeOff,
  Save,
  Trash2,
  Download,
  Upload,
  Check,
} from 'lucide-react'

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('account')
  const [settings, setSettings] = useState({
    // Account Settings
    language: 'pt-BR',
    timezone: 'America/Sao_Paulo',
    currency: 'BRL',
    theme: 'light',

    // Notification Settings
    emailNotifications: {
      orderUpdates: true,
      promotions: false,
      newsletter: true,
      priceAlerts: true,
      securityAlerts: true,
    },
    pushNotifications: {
      orderUpdates: true,
      promotions: false,
      priceAlerts: true,
      securityAlerts: true,
    },
    smsNotifications: {
      orderUpdates: false,
      securityAlerts: true,
    },

    // Privacy Settings
    profileVisibility: 'private',
    shareActivityData: false,
    shareEmail: false,
    allowPersonalization: true,
    cookieConsent: true,

    // Security Settings
    twoFactorAuth: false,
    loginAlerts: true,
    autoLogout: 30,
  })

  const tabs = [
    {
      id: 'account',
      name: 'Conta',
      icon: User,
      description: 'Preferências gerais da conta',
    },
    {
      id: 'notifications',
      name: 'Notificações',
      icon: Bell,
      description: 'Gerencie suas notificações',
    },
    {
      id: 'security',
      name: 'Segurança',
      icon: Shield,
      description: 'Configurações de segurança',
    },
    {
      id: 'privacy',
      name: 'Privacidade',
      icon: Eye,
      description: 'Controle de privacidade e dados',
    },
    {
      id: 'appearance',
      name: 'Aparência',
      icon: Palette,
      description: 'Personalizar tema e interface',
    },
  ]

  const handleSettingChange = (
    category: string,
    setting: string,
    value: any
  ) => {
    setSettings(prev => {
      const categorySettings = prev[category as keyof typeof prev]
      if (typeof categorySettings === 'object' && categorySettings !== null) {
        return {
          ...prev,
          [category]: {
            ...categorySettings,
            [setting]: value,
          },
        }
      }
      return prev
    })
  }

  const handleDirectSettingChange = (setting: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [setting]: value,
    }))
  }

  const ToggleSwitch = ({
    checked,
    onChange,
  }: {
    checked: boolean
    onChange: () => void
  }) => (
    <button
      onClick={onChange}
      className={cn(
        'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
        checked ? 'bg-blue-600' : 'bg-gray-200'
      )}
    >
      <span
        className={cn(
          'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
          checked ? 'translate-x-5' : 'translate-x-0'
        )}
      />
    </button>
  )

  const AccountSettings = () => (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Informações Pessoais</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">Nome</Label>
            <Input id="firstName" defaultValue="João" placeholder="Seu nome" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="lastName">Sobrenome</Label>
            <Input
              id="lastName"
              defaultValue="Silva"
              placeholder="Seu sobrenome"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              defaultValue="joao.silva@email.com"
              placeholder="seu@email.com"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Telefone</Label>
            <Input
              id="phone"
              defaultValue="+55 11 99999-9999"
              placeholder="+55 11 99999-9999"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cpf">CPF</Label>
            <Input
              id="cpf"
              defaultValue="123.456.789-00"
              placeholder="000.000.000-00"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="birthDate">Data de Nascimento</Label>
            <Input id="birthDate" type="date" defaultValue="1990-01-01" />
          </div>
        </div>

        <div className="mt-4 pt-4 border-t">
          <h4 className="font-medium mb-3">Endereço</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="cep">CEP</Label>
              <Input
                id="cep"
                defaultValue="01234-567"
                placeholder="00000-000"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="address">Endereço</Label>
              <Input
                id="address"
                defaultValue="Rua das Flores, 123"
                placeholder="Rua, número"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="complement">Complemento</Label>
              <Input
                id="complement"
                defaultValue="Apto 45"
                placeholder="Apto, casa, etc."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="neighborhood">Bairro</Label>
              <Input
                id="neighborhood"
                defaultValue="Centro"
                placeholder="Bairro"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="city">Cidade</Label>
              <Input id="city" defaultValue="São Paulo" placeholder="Cidade" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="state">Estado</Label>
              <select
                id="state"
                defaultValue="SP"
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="AC">Acre</option>
                <option value="AL">Alagoas</option>
                <option value="AP">Amapá</option>
                <option value="AM">Amazonas</option>
                <option value="BA">Bahia</option>
                <option value="CE">Ceará</option>
                <option value="DF">Distrito Federal</option>
                <option value="ES">Espírito Santo</option>
                <option value="GO">Goiás</option>
                <option value="MA">Maranhão</option>
                <option value="MT">Mato Grosso</option>
                <option value="MS">Mato Grosso do Sul</option>
                <option value="MG">Minas Gerais</option>
                <option value="PA">Pará</option>
                <option value="PB">Paraíba</option>
                <option value="PR">Paraná</option>
                <option value="PE">Pernambuco</option>
                <option value="PI">Piauí</option>
                <option value="RJ">Rio de Janeiro</option>
                <option value="RN">Rio Grande do Norte</option>
                <option value="RS">Rio Grande do Sul</option>
                <option value="RO">Rondônia</option>
                <option value="RR">Roraima</option>
                <option value="SC">Santa Catarina</option>
                <option value="SP">São Paulo</option>
                <option value="SE">Sergipe</option>
                <option value="TO">Tocantins</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <Button>
            <Save className="h-4 w-4 mr-2" />
            Salvar Informações
          </Button>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Preferências Regionais</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="language">Idioma</Label>
            <select
              id="language"
              value={settings.language}
              onChange={e =>
                handleDirectSettingChange('language', e.target.value)
              }
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="pt-BR">Português (Brasil)</option>
              <option value="en-US">English (US)</option>
              <option value="es-ES">Español</option>
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="timezone">Fuso Horário</Label>
            <select
              id="timezone"
              value={settings.timezone}
              onChange={e =>
                handleDirectSettingChange('timezone', e.target.value)
              }
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="America/Sao_Paulo">São Paulo (GMT-3)</option>
              <option value="America/Rio_Branco">Rio Branco (GMT-5)</option>
              <option value="America/Manaus">Manaus (GMT-4)</option>
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="currency">Moeda</Label>
            <select
              id="currency"
              value={settings.currency}
              onChange={e =>
                handleDirectSettingChange('currency', e.target.value)
              }
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="BRL">Real Brasileiro (R$)</option>
              <option value="USD">Dólar Americano ($)</option>
              <option value="EUR">Euro (€)</option>
            </select>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Dados da Conta</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <h4 className="font-medium">Exportar Dados</h4>
              <p className="text-sm text-gray-600">
                Baixe todos os seus dados pessoais
              </p>
            </div>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Exportar
            </Button>
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg border-red-200 bg-red-50">
            <div>
              <h4 className="font-medium text-red-900">Excluir Conta</h4>
              <p className="text-sm text-red-600">
                Ação permanente e irreversível
              </p>
            </div>
            <Button variant="destructive" size="sm">
              <Trash2 className="h-4 w-4 mr-2" />
              Excluir
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )

  const NotificationSettings = () => (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Mail className="h-5 w-5 text-blue-600" />
          <h3 className="text-lg font-semibold">Notificações por Email</h3>
        </div>
        <div className="space-y-4">
          {Object.entries(settings.emailNotifications).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <div>
                <Label className="font-medium">
                  {key === 'orderUpdates' && 'Atualizações de Pedidos'}
                  {key === 'promotions' && 'Promoções e Ofertas'}
                  {key === 'newsletter' && 'Newsletter'}
                  {key === 'priceAlerts' && 'Alertas de Preço'}
                  {key === 'securityAlerts' && 'Alertas de Segurança'}
                </Label>
                <p className="text-sm text-gray-600">
                  {key === 'orderUpdates' &&
                    'Receba updates sobre seus pedidos'}
                  {key === 'promotions' && 'Ofertas especiais e promoções'}
                  {key === 'newsletter' && 'Novidades e conteúdo da loja'}
                  {key === 'priceAlerts' &&
                    'Quando preços da lista de desejos mudarem'}
                  {key === 'securityAlerts' && 'Alertas de login e segurança'}
                </p>
              </div>
              <ToggleSwitch
                checked={value}
                onChange={() =>
                  handleSettingChange('emailNotifications', key, !value)
                }
              />
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Smartphone className="h-5 w-5 text-green-600" />
          <h3 className="text-lg font-semibold">Notificações Push</h3>
        </div>
        <div className="space-y-4">
          {Object.entries(settings.pushNotifications).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <div>
                <Label className="font-medium">
                  {key === 'orderUpdates' && 'Atualizações de Pedidos'}
                  {key === 'promotions' && 'Promoções e Ofertas'}
                  {key === 'priceAlerts' && 'Alertas de Preço'}
                  {key === 'securityAlerts' && 'Alertas de Segurança'}
                </Label>
              </div>
              <ToggleSwitch
                checked={value}
                onChange={() =>
                  handleSettingChange('pushNotifications', key, !value)
                }
              />
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center space-x-2 mb-4">
          <MessageSquare className="h-5 w-5 text-purple-600" />
          <h3 className="text-lg font-semibold">SMS e WhatsApp</h3>
        </div>
        <div className="space-y-4">
          {Object.entries(settings.smsNotifications).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <div>
                <Label className="font-medium">
                  {key === 'orderUpdates' && 'Atualizações de Pedidos'}
                  {key === 'securityAlerts' && 'Alertas de Segurança'}
                </Label>
              </div>
              <ToggleSwitch
                checked={value}
                onChange={() =>
                  handleSettingChange('smsNotifications', key, !value)
                }
              />
            </div>
          ))}
        </div>
      </Card>
    </div>
  )

  const SecuritySettings = () => (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Autenticação</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label className="font-medium">
                Autenticação de dois fatores
              </Label>
              <p className="text-sm text-gray-600">
                Adiciona uma camada extra de segurança
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <ToggleSwitch
                checked={settings.twoFactorAuth}
                onChange={() =>
                  handleDirectSettingChange(
                    'twoFactorAuth',
                    !settings.twoFactorAuth
                  )
                }
              />
              {settings.twoFactorAuth && (
                <Badge
                  variant="secondary"
                  className="bg-green-100 text-green-800"
                >
                  Ativo
                </Badge>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label className="font-medium">Alertas de login</Label>
              <p className="text-sm text-gray-600">
                Receba notificações sobre novos logins
              </p>
            </div>
            <ToggleSwitch
              checked={settings.loginAlerts}
              onChange={() =>
                handleDirectSettingChange('loginAlerts', !settings.loginAlerts)
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="autoLogout">Logout automático</Label>
            <div className="flex items-center space-x-4">
              <select
                id="autoLogout"
                value={settings.autoLogout}
                onChange={e =>
                  handleDirectSettingChange(
                    'autoLogout',
                    parseInt(e.target.value)
                  )
                }
                className="p-2 border border-gray-300 rounded-md"
              >
                <option value={15}>15 minutos</option>
                <option value={30}>30 minutos</option>
                <option value={60}>1 hora</option>
                <option value={120}>2 horas</option>
                <option value={240}>4 horas</option>
                <option value={0}>Nunca</option>
              </select>
              <p className="text-sm text-gray-600">de inatividade</p>
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Senhas e Acesso</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <h4 className="font-medium">Alterar senha</h4>
              <p className="text-sm text-gray-600">
                Última alteração há 3 meses
              </p>
            </div>
            <Button variant="outline" size="sm">
              Alterar
            </Button>
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <h4 className="font-medium">Gerenciar senhas salvas</h4>
              <p className="text-sm text-gray-600">
                Visualizar e editar senhas do navegador
              </p>
            </div>
            <Button variant="outline" size="sm">
              Gerenciar
            </Button>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Sessões Ativas</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg bg-green-50">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <div>
                <h4 className="font-medium">Sessão atual</h4>
                <p className="text-sm text-gray-600">
                  Chrome no Windows • São Paulo, SP
                </p>
                <p className="text-xs text-gray-500">Último acesso: agora</p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
              <div>
                <h4 className="font-medium">iPhone Safari</h4>
                <p className="text-sm text-gray-600">
                  Safari no iOS • São Paulo, SP
                </p>
                <p className="text-xs text-gray-500">
                  Último acesso: há 2 horas
                </p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              Encerrar
            </Button>
          </div>

          <div className="flex justify-center pt-4">
            <Button variant="destructive" size="sm">
              Encerrar todas as outras sessões
            </Button>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Contas Conectadas</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">G</span>
              </div>
              <div>
                <h4 className="font-medium">Google</h4>
                <p className="text-sm text-gray-600">usuario@gmail.com</p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              Desconectar
            </Button>
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg border-dashed">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">F</span>
              </div>
              <div>
                <h4 className="font-medium">Facebook</h4>
                <p className="text-sm text-gray-600">Não conectado</p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              Conectar
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )

  const PrivacySettings = () => (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Visibilidade do Perfil</h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Quem pode ver seu perfil?</Label>
            <div className="space-y-2">
              {[
                {
                  value: 'private',
                  label: 'Apenas eu',
                  description: 'Seu perfil fica completamente privado',
                },
                {
                  value: 'friends',
                  label: 'Amigos',
                  description: 'Apenas pessoas que você seguir',
                },
                {
                  value: 'public',
                  label: 'Público',
                  description: 'Qualquer pessoa pode ver seu perfil',
                },
              ].map(option => (
                <div key={option.value} className="flex items-start space-x-3">
                  <input
                    type="radio"
                    name="profileVisibility"
                    value={option.value}
                    checked={settings.profileVisibility === option.value}
                    onChange={e =>
                      handleDirectSettingChange(
                        'profileVisibility',
                        e.target.value
                      )
                    }
                    className="mt-1"
                  />
                  <div>
                    <Label className="font-medium">{option.label}</Label>
                    <p className="text-sm text-gray-600">
                      {option.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Dados e Personalização</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label className="font-medium">
                Compartilhar dados de atividade
              </Label>
              <p className="text-sm text-gray-600">
                Ajuda a melhorar recomendações
              </p>
            </div>
            <ToggleSwitch
              checked={settings.shareActivityData}
              onChange={() =>
                handleDirectSettingChange(
                  'shareActivityData',
                  !settings.shareActivityData
                )
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label className="font-medium">Permitir personalização</Label>
              <p className="text-sm text-gray-600">
                Conteúdo personalizado baseado no seu uso
              </p>
            </div>
            <ToggleSwitch
              checked={settings.allowPersonalization}
              onChange={() =>
                handleDirectSettingChange(
                  'allowPersonalization',
                  !settings.allowPersonalization
                )
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label className="font-medium">Cookies e rastreamento</Label>
              <p className="text-sm text-gray-600">
                Aceitar cookies para melhor experiência
              </p>
            </div>
            <ToggleSwitch
              checked={settings.cookieConsent}
              onChange={() =>
                handleDirectSettingChange(
                  'cookieConsent',
                  !settings.cookieConsent
                )
              }
            />
          </div>
        </div>
      </Card>
    </div>
  )

  const AppearanceSettings = () => (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Tema</h3>
        <div className="grid grid-cols-3 gap-4">
          {[
            {
              value: 'light',
              label: 'Claro',
              preview: 'bg-white border-gray-300',
            },
            {
              value: 'dark',
              label: 'Escuro',
              preview: 'bg-gray-900 border-gray-700',
            },
            {
              value: 'auto',
              label: 'Automático',
              preview:
                'bg-gradient-to-r from-white to-gray-900 border-gray-400',
            },
          ].map(theme => (
            <button
              key={theme.value}
              onClick={() => handleDirectSettingChange('theme', theme.value)}
              className={cn(
                'p-4 border-2 rounded-lg transition-colors',
                settings.theme === theme.value
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-300 hover:border-gray-400'
              )}
            >
              <div
                className={cn('w-full h-20 rounded mb-2 border', theme.preview)}
              />
              <p className="font-medium">{theme.label}</p>
              {settings.theme === theme.value && (
                <Check className="h-4 w-4 text-blue-500 mx-auto mt-2" />
              )}
            </button>
          ))}
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Acessibilidade</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label className="font-medium">Alto contraste</Label>
              <p className="text-sm text-gray-600">
                Melhor visibilidade para pessoas com deficiência visual
              </p>
            </div>
            <Button variant="outline" size="sm">
              Ativar
            </Button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label className="font-medium">Texto grande</Label>
              <p className="text-sm text-gray-600">
                Aumenta o tamanho da fonte em toda a aplicação
              </p>
            </div>
            <Button variant="outline" size="sm">
              Configurar
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )

  const renderTabContent = () => {
    switch (activeTab) {
      case 'account':
        return <AccountSettings />
      case 'notifications':
        return <NotificationSettings />
      case 'security':
        return <SecuritySettings />
      case 'privacy':
        return <PrivacySettings />
      case 'appearance':
        return <AppearanceSettings />
      default:
        return <AccountSettings />
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Configurações</h1>
            <p className="text-gray-600">
              Gerencie suas preferências e configurações da conta
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="p-4">
              <nav className="space-y-1">
                {tabs.map(tab => {
                  const IconComponent = tab.icon
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={cn(
                        'w-full flex items-start space-x-3 p-3 rounded-lg text-left transition-colors',
                        activeTab === tab.id
                          ? 'bg-blue-100 text-blue-700'
                          : 'text-gray-700 hover:bg-gray-100'
                      )}
                    >
                      <IconComponent className="h-5 w-5 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium">{tab.name}</p>
                        <p className="text-xs text-gray-600">
                          {tab.description}
                        </p>
                      </div>
                    </button>
                  )
                })}
              </nav>
            </Card>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            {renderTabContent()}

            {/* Save Button */}
            <Card className="p-4 mt-6">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">
                  Suas configurações são salvas automaticamente
                </p>
                <Button>
                  <Save className="h-4 w-4 mr-2" />
                  Salvar Configurações
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default SettingsPage
