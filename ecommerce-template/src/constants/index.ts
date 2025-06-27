// App Configuration
export const APP_CONFIG = {
  name: process.env.NEXT_PUBLIC_APP_NAME || 'RentEasy',
  url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  description: 'A maior plataforma de aluguel online do Brasil',
  version: '1.0.0',
}

// Brazilian States
export const BRAZILIAN_STATES = [
  { code: 'AC', name: 'Acre' },
  { code: 'AL', name: 'Alagoas' },
  { code: 'AP', name: 'Amapá' },
  { code: 'AM', name: 'Amazonas' },
  { code: 'BA', name: 'Bahia' },
  { code: 'CE', name: 'Ceará' },
  { code: 'DF', name: 'Distrito Federal' },
  { code: 'ES', name: 'Espírito Santo' },
  { code: 'GO', name: 'Goiás' },
  { code: 'MA', name: 'Maranhão' },
  { code: 'MT', name: 'Mato Grosso' },
  { code: 'MS', name: 'Mato Grosso do Sul' },
  { code: 'MG', name: 'Minas Gerais' },
  { code: 'PA', name: 'Pará' },
  { code: 'PB', name: 'Paraíba' },
  { code: 'PR', name: 'Paraná' },
  { code: 'PE', name: 'Pernambuco' },
  { code: 'PI', name: 'Piauí' },
  { code: 'RJ', name: 'Rio de Janeiro' },
  { code: 'RN', name: 'Rio Grande do Norte' },
  { code: 'RS', name: 'Rio Grande do Sul' },
  { code: 'RO', name: 'Rondônia' },
  { code: 'RR', name: 'Roraima' },
  { code: 'SC', name: 'Santa Catarina' },
  { code: 'SP', name: 'São Paulo' },
  { code: 'SE', name: 'Sergipe' },
  { code: 'TO', name: 'Tocantins' },
]

// Payment Methods
export const PAYMENT_METHODS = {
  PIX: 'pix',
  CREDIT_CARD: 'credit_card',
  DEBIT_CARD: 'debit_card',
  MERCADO_PAGO: 'mercado_pago',
  PAGSEGURO: 'pagseguro',
} as const

export const PAYMENT_METHOD_LABELS = {
  [PAYMENT_METHODS.PIX]: 'PIX',
  [PAYMENT_METHODS.CREDIT_CARD]: 'Cartão de Crédito',
  [PAYMENT_METHODS.DEBIT_CARD]: 'Cartão de Débito',
  [PAYMENT_METHODS.MERCADO_PAGO]: 'Mercado Pago',
  [PAYMENT_METHODS.PAGSEGURO]: 'PagSeguro',
}

// User Roles
export const USER_ROLES = {
  ADMIN: 'admin',
  CUSTOMER: 'customer',
  VENDOR: 'vendor',
} as const

export const USER_ROLE_LABELS = {
  [USER_ROLES.ADMIN]: 'Administrador',
  [USER_ROLES.CUSTOMER]: 'Cliente',
  [USER_ROLES.VENDOR]: 'Locador',
}

// Booking Status
export const BOOKING_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  ACTIVE: 'active',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
} as const

export const BOOKING_STATUS_LABELS = {
  [BOOKING_STATUS.PENDING]: 'Pendente',
  [BOOKING_STATUS.CONFIRMED]: 'Confirmado',
  [BOOKING_STATUS.ACTIVE]: 'Ativo',
  [BOOKING_STATUS.COMPLETED]: 'Concluído',
  [BOOKING_STATUS.CANCELLED]: 'Cancelado',
}

// Payment Status
export const PAYMENT_STATUS = {
  PENDING: 'pending',
  PAID: 'paid',
  REFUNDED: 'refunded',
} as const

export const PAYMENT_STATUS_LABELS = {
  [PAYMENT_STATUS.PENDING]: 'Pendente',
  [PAYMENT_STATUS.PAID]: 'Pago',
  [PAYMENT_STATUS.REFUNDED]: 'Reembolsado',
}

// Notification Types
export const NOTIFICATION_TYPES = {
  BOOKING: 'booking',
  PAYMENT: 'payment',
  REMINDER: 'reminder',
  PROMOTION: 'promotion',
  SYSTEM: 'system',
} as const

// Product Categories (Sample)
export const PRODUCT_CATEGORIES = [
  {
    id: 'construction',
    name: 'Construção e Reforma',
    icon: '🔨',
    subcategories: ['Ferramentas', 'Equipamentos Pesados', 'Andaimes'],
  },
  {
    id: 'vehicles',
    name: 'Veículos',
    icon: '🚗',
    subcategories: ['Carros', 'Motos', 'Caminhões'],
  },
  {
    id: 'events',
    name: 'Eventos e Festas',
    icon: '🎉',
    subcategories: ['Decoração', 'Som e Luz', 'Mobiliário'],
  },
  {
    id: 'sports',
    name: 'Esportes e Lazer',
    icon: '⚽',
    subcategories: ['Equipamentos Esportivos', 'Bicicletas', 'Camping'],
  },
  {
    id: 'electronics',
    name: 'Eletrônicos',
    icon: '📱',
    subcategories: ['Câmeras', 'Notebooks', 'Equipamentos de Som'],
  },
]

// Date and Time
export const DATE_FORMATS = {
  SHORT: 'dd/MM/yyyy',
  LONG: 'dd/MM/yyyy HH:mm',
  DISPLAY: 'dd/MM/yyyy',
  ISO: 'yyyy-MM-dd',
}

// Business Rules
export const BUSINESS_RULES = {
  MIN_RENTAL_DAYS: 1,
  MAX_RENTAL_DAYS: 365,
  MIN_DEPOSIT_PERCENTAGE: 0.1, // 10%
  MAX_DEPOSIT_PERCENTAGE: 1.0, // 100%
  BOOKING_CANCELLATION_HOURS: 24,
  REVIEW_DEADLINE_DAYS: 30,
}

// Contact Information
export const CONTACT_INFO = {
  phone: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+5511999999999',
  email: 'contato@renteasy.com.br',
  whatsapp: `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace('+', '')}`,
  address: 'São Paulo, SP - Brasil',
}

// Social Media
export const SOCIAL_MEDIA = {
  instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || '#',
  facebook: process.env.NEXT_PUBLIC_FACEBOOK_URL || '#',
  twitter: '#',
}

// API Endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/api/auth/login',
    REGISTER: '/api/auth/register',
    LOGOUT: '/api/auth/logout',
    PROFILE: '/api/auth/profile',
  },
  PRODUCTS: {
    LIST: '/api/products',
    CREATE: '/api/products',
    DETAIL: (id: string) => `/api/products/${id}`,
    UPDATE: (id: string) => `/api/products/${id}`,
    DELETE: (id: string) => `/api/products/${id}`,
  },
  BOOKINGS: {
    LIST: '/api/bookings',
    CREATE: '/api/bookings',
    DETAIL: (id: string) => `/api/bookings/${id}`,
    UPDATE: (id: string) => `/api/bookings/${id}`,
    CANCEL: (id: string) => `/api/bookings/${id}/cancel`,
  },
  PAYMENTS: {
    CREATE: '/api/payments',
    WEBHOOK: '/api/payments/webhook',
    STATUS: (id: string) => `/api/payments/${id}/status`,
  },
}
