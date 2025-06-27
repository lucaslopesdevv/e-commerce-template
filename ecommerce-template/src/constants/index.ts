// App Configuration
export const APP_CONFIG = {
  name: process.env.NEXT_PUBLIC_APP_NAME || 'ShopEasy',
  url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  description: 'Plataforma completa de e-commerce para lojas online no Brasil',
  version: '1.0.0',
  author: 'ShopEasy Team',
  keywords: ['ecommerce', 'loja online', 'vendas', 'produtos', 'brasil'],
  social: {
    twitter: '@shopeasy_br',
    facebook: 'shopeasy.brasil',
    instagram: '@shopeasy_brasil',
  },
}

// Environment
export const ENV = {
  DEVELOPMENT: 'development',
  PRODUCTION: 'production',
  TEST: 'test',
}

// Database Configuration
export const DB_CONFIG = {
  MAX_CONNECTIONS: 10,
  CONNECTION_TIMEOUT: 30000,
  QUERY_TIMEOUT: 10000,
}

// Authentication
export const AUTH_CONFIG = {
  SESSION_DURATION: 7 * 24 * 60 * 60, // 7 days in seconds
  REFRESH_THRESHOLD: 60 * 60, // 1 hour in seconds
  MAX_LOGIN_ATTEMPTS: 5,
  LOCKOUT_DURATION: 15 * 60, // 15 minutes in seconds
}

// User Roles
export const USER_ROLES = {
  ADMIN: 'admin',
  CUSTOMER: 'customer',
  SELLER: 'seller',
} as const

export const USER_ROLE_LABELS = {
  [USER_ROLES.ADMIN]: 'Administrador',
  [USER_ROLES.CUSTOMER]: 'Cliente',
  [USER_ROLES.SELLER]: 'Vendedor',
} as const

// Order Status
export const ORDER_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  PROCESSING: 'processing',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
  REFUNDED: 'refunded',
} as const

export const ORDER_STATUS_LABELS = {
  [ORDER_STATUS.PENDING]: 'Pendente',
  [ORDER_STATUS.CONFIRMED]: 'Confirmado',
  [ORDER_STATUS.PROCESSING]: 'Processando',
  [ORDER_STATUS.SHIPPED]: 'Enviado',
  [ORDER_STATUS.DELIVERED]: 'Entregue',
  [ORDER_STATUS.CANCELLED]: 'Cancelado',
  [ORDER_STATUS.REFUNDED]: 'Reembolsado',
} as const

// Payment Status
export const PAYMENT_STATUS = {
  PENDING: 'pending',
  PAID: 'paid',
  PARTIALLY_PAID: 'partially_paid',
  FAILED: 'failed',
  REFUNDED: 'refunded',
} as const

export const PAYMENT_STATUS_LABELS = {
  [PAYMENT_STATUS.PENDING]: 'Pendente',
  [PAYMENT_STATUS.PAID]: 'Pago',
  [PAYMENT_STATUS.PARTIALLY_PAID]: 'Parcialmente Pago',
  [PAYMENT_STATUS.FAILED]: 'Falhou',
  [PAYMENT_STATUS.REFUNDED]: 'Reembolsado',
} as const

// Payment Methods
export const PAYMENT_METHODS = {
  PIX: 'pix',
  CREDIT_CARD: 'credit_card',
  DEBIT_CARD: 'debit_card',
  BOLETO: 'boleto',
  MERCADO_PAGO: 'mercado_pago',
  PAGSEGURO: 'pagseguro',
} as const

export const PAYMENT_METHOD_LABELS = {
  [PAYMENT_METHODS.PIX]: 'PIX',
  [PAYMENT_METHODS.CREDIT_CARD]: 'Cartão de Crédito',
  [PAYMENT_METHODS.DEBIT_CARD]: 'Cartão de Débito',
  [PAYMENT_METHODS.BOLETO]: 'Boleto Bancário',
  [PAYMENT_METHODS.MERCADO_PAGO]: 'Mercado Pago',
  [PAYMENT_METHODS.PAGSEGURO]: 'PagSeguro',
} as const

// Product Status
export const PRODUCT_STATUS = {
  ACTIVE: 'active',
  DRAFT: 'draft',
  ARCHIVED: 'archived',
} as const

export const PRODUCT_STATUS_LABELS = {
  [PRODUCT_STATUS.ACTIVE]: 'Ativo',
  [PRODUCT_STATUS.DRAFT]: 'Rascunho',
  [PRODUCT_STATUS.ARCHIVED]: 'Arquivado',
} as const

// Notification Types
export const NOTIFICATION_TYPES = {
  ORDER: 'order',
  PAYMENT: 'payment',
  SHIPPING: 'shipping',
  PROMOTION: 'promotion',
  SYSTEM: 'system',
} as const

export const NOTIFICATION_TYPE_LABELS = {
  [NOTIFICATION_TYPES.ORDER]: 'Pedido',
  [NOTIFICATION_TYPES.PAYMENT]: 'Pagamento',
  [NOTIFICATION_TYPES.SHIPPING]: 'Envio',
  [NOTIFICATION_TYPES.PROMOTION]: 'Promoção',
  [NOTIFICATION_TYPES.SYSTEM]: 'Sistema',
} as const

// File Upload
export const FILE_UPLOAD = {
  MAX_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_TYPES: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
  MAX_FILES: 10,
}

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 20,
  MAX_LIMIT: 100,
}

// Validation Rules
export const VALIDATION = {
  MIN_PASSWORD_LENGTH: 6,
  MAX_PASSWORD_LENGTH: 128,
  MIN_NAME_LENGTH: 2,
  MAX_NAME_LENGTH: 100,
  MIN_DESCRIPTION_LENGTH: 10,
  MAX_DESCRIPTION_LENGTH: 5000,
  MIN_PRODUCT_PRICE: 0.01,
  MAX_PRODUCT_PRICE: 999999.99,
  MIN_STOCK_QUANTITY: 0,
  MAX_STOCK_QUANTITY: 99999,
  MIN_WEIGHT: 0,
  MAX_WEIGHT: 99999, // in grams
}

// Brazilian specific
export const BRAZIL = {
  CURRENCY: 'BRL',
  CURRENCY_SYMBOL: 'R$',
  LOCALE: 'pt-BR',
  TIMEZONE: 'America/Sao_Paulo',
  CEP_REGEX: /^\d{5}-?\d{3}$/,
  PHONE_REGEX: /^\(\d{2}\)\s\d{4,5}-\d{4}$/,
  CPF_REGEX: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
  CNPJ_REGEX: /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/,
}

// Company Information
export const COMPANY = {
  name: 'ShopEasy Brasil Ltda.',
  cnpj: '00.000.000/0001-00',
  address: 'São Paulo, SP - Brasil',
  phone: '(11) 9999-9999',
  email: 'contato@shopeasy.com.br',
  website: 'https://shopeasy.com.br',
  support_email: 'suporte@shopeasy.com.br',
  commercial_email: 'vendas@shopeasy.com.br',
}

// Default Categories
export const DEFAULT_CATEGORIES = [
  { name: 'Eletrônicos', slug: 'eletronicos' },
  { name: 'Roupas e Acessórios', slug: 'roupas-acessorios' },
  { name: 'Casa e Jardim', slug: 'casa-jardim' },
  { name: 'Esportes e Lazer', slug: 'esportes-lazer' },
  { name: 'Livros e Mídia', slug: 'livros-midia' },
  { name: 'Beleza e Saúde', slug: 'beleza-saude' },
  { name: 'Automotivo', slug: 'automotivo' },
  { name: 'Infantil', slug: 'infantil' },
]

// API Endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/api/auth/login',
    REGISTER: '/api/auth/register',
    LOGOUT: '/api/auth/logout',
    REFRESH: '/api/auth/refresh',
    RESET_PASSWORD: '/api/auth/reset-password',
    VERIFY_EMAIL: '/api/auth/verify-email',
  },
  USERS: {
    LIST: '/api/users',
    PROFILE: '/api/users/profile',
    UPDATE: '/api/users/profile',
    DELETE: '/api/users/profile',
    AVATAR: '/api/users/avatar',
  },
  PRODUCTS: {
    LIST: '/api/products',
    CREATE: '/api/products',
    DETAIL: (id: string) => `/api/products/${id}`,
    UPDATE: (id: string) => `/api/products/${id}`,
    DELETE: (id: string) => `/api/products/${id}`,
    SEARCH: '/api/products/search',
    FEATURED: '/api/products/featured',
    CATEGORIES: '/api/products/categories',
  },
  ORDERS: {
    LIST: '/api/orders',
    CREATE: '/api/orders',
    DETAIL: (id: string) => `/api/orders/${id}`,
    UPDATE: (id: string) => `/api/orders/${id}`,
    CANCEL: (id: string) => `/api/orders/${id}/cancel`,
    TRACKING: (id: string) => `/api/orders/${id}/tracking`,
  },
  CART: {
    GET: '/api/cart',
    ADD: '/api/cart/add',
    UPDATE: '/api/cart/update',
    REMOVE: '/api/cart/remove',
    CLEAR: '/api/cart/clear',
  },
  PAYMENTS: {
    PROCESS: '/api/payments/process',
    WEBHOOK: '/api/payments/webhook',
    STATUS: (id: string) => `/api/payments/${id}/status`,
  },
  STORES: {
    LIST: '/api/stores',
    CREATE: '/api/stores',
    DETAIL: (id: string) => `/api/stores/${id}`,
    UPDATE: (id: string) => `/api/stores/${id}`,
    PRODUCTS: (id: string) => `/api/stores/${id}/products`,
  },
  REVIEWS: {
    LIST: (productId: string) => `/api/products/${productId}/reviews`,
    CREATE: (productId: string) => `/api/products/${productId}/reviews`,
    UPDATE: (id: string) => `/api/reviews/${id}`,
    DELETE: (id: string) => `/api/reviews/${id}`,
  },
  SHIPPING: {
    CALCULATE: '/api/shipping/calculate',
    METHODS: '/api/shipping/methods',
    TRACKING: (code: string) => `/api/shipping/tracking/${code}`,
  },
  COUPONS: {
    VALIDATE: '/api/coupons/validate',
    APPLY: '/api/coupons/apply',
  },
  ANALYTICS: {
    DASHBOARD: '/api/analytics/dashboard',
    SALES: '/api/analytics/sales',
    PRODUCTS: '/api/analytics/products',
    CUSTOMERS: '/api/analytics/customers',
  },
}

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Erro de conexão. Tente novamente.',
  UNAUTHORIZED: 'Acesso não autorizado.',
  FORBIDDEN: 'Você não tem permissão para esta ação.',
  NOT_FOUND: 'Recurso não encontrado.',
  VALIDATION_ERROR: 'Dados inválidos fornecidos.',
  INTERNAL_ERROR: 'Erro interno do servidor.',
  RATE_LIMIT: 'Muitas tentativas. Tente novamente mais tarde.',
}

// Success Messages
export const SUCCESS_MESSAGES = {
  ORDER_CREATED: 'Pedido criado com sucesso!',
  ORDER_UPDATED: 'Pedido atualizado com sucesso!',
  ORDER_CANCELLED: 'Pedido cancelado com sucesso!',
  PAYMENT_PROCESSED: 'Pagamento processado com sucesso!',
  PRODUCT_ADDED: 'Produto adicionado com sucesso!',
  PRODUCT_UPDATED: 'Produto atualizado com sucesso!',
  PROFILE_UPDATED: 'Perfil atualizado com sucesso!',
  EMAIL_SENT: 'Email enviado com sucesso!',
}

// Sort Options
export const SORT_OPTIONS = [
  { value: 'newest', label: 'Mais Recentes' },
  { value: 'price_asc', label: 'Menor Preço' },
  { value: 'price_desc', label: 'Maior Preço' },
  { value: 'name_asc', label: 'Nome A-Z' },
  { value: 'name_desc', label: 'Nome Z-A' },
  { value: 'best_selling', label: 'Mais Vendidos' },
]

// Store Settings Defaults
export const STORE_DEFAULTS = {
  currency: BRAZIL.CURRENCY,
  tax_rate: 0.0, // No default tax
  theme: 'default',
  items_per_page: 20,
  allow_reviews: true,
  require_email_verification: true,
  auto_approve_orders: false,
}
