// User Types
export interface User {
  id: string
  email: string
  name?: string
  role: 'admin' | 'customer' | 'vendor'
  avatar?: string
  phone?: string
  created_at: string
  updated_at: string
}

// Product Types
export interface Product {
  id: string
  title: string
  description: string
  category_id: string
  images: string[]
  price_per_day: number
  price_per_week?: number
  price_per_month?: number
  minimum_rental_days: number
  maximum_rental_days?: number
  deposit_amount: number
  location: string
  available: boolean
  owner_id: string
  specifications?: Record<string, unknown>
  created_at: string
  updated_at: string
}

// Category Types
export interface Category {
  id: string
  name: string
  slug: string
  description?: string
  image?: string
  parent_id?: string
  created_at: string
  updated_at: string
}

// Booking Types
export interface Booking {
  id: string
  product_id: string
  customer_id: string
  start_date: string
  end_date: string
  total_days: number
  total_amount: number
  deposit_amount: number
  status: 'pending' | 'confirmed' | 'active' | 'completed' | 'cancelled'
  payment_status: 'pending' | 'paid' | 'refunded'
  notes?: string
  created_at: string
  updated_at: string
}

// Payment Types
export interface Payment {
  id: string
  booking_id: string
  amount: number
  currency: string
  method: 'pix' | 'credit_card' | 'debit_card' | 'mercado_pago' | 'pagseguro'
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'refunded'
  transaction_id?: string
  created_at: string
  updated_at: string
}

// Address Types (Brazilian format)
export interface Address {
  id: string
  user_id: string
  street: string
  number: string
  complement?: string
  neighborhood: string
  city: string
  state: string
  cep: string
  country: string
  is_default: boolean
  created_at: string
  updated_at: string
}

// Review Types
export interface Review {
  id: string
  product_id: string
  customer_id: string
  booking_id: string
  rating: number // 1-5
  comment?: string
  created_at: string
  updated_at: string
}

// Notification Types
export interface Notification {
  id: string
  user_id: string
  title: string
  message: string
  type: 'booking' | 'payment' | 'reminder' | 'promotion' | 'system'
  read: boolean
  data?: Record<string, unknown>
  created_at: string
}

// API Response Types
export interface ApiResponse<T> {
  data: T
  message?: string
  success: boolean
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number
    limit: number
    total: number
    pages: number
  }
}

// Form Types
export interface LoginForm {
  email: string
  password: string
}

export interface RegisterForm {
  name: string
  email: string
  password: string
  confirmPassword: string
  phone?: string
  acceptTerms: boolean
}

export interface ProductForm {
  title: string
  description: string
  category_id: string
  price_per_day: number
  price_per_week?: number
  price_per_month?: number
  minimum_rental_days: number
  maximum_rental_days?: number
  deposit_amount: number
  location: string
  specifications?: Record<string, unknown>
}

export interface BookingForm {
  product_id: string
  start_date: string
  end_date: string
  notes?: string
}

// Filter Types
export interface ProductFilters {
  category?: string
  location?: string
  min_price?: number
  max_price?: number
  available_from?: string
  available_to?: string
  search?: string
}

// Error Types
export interface ApiError {
  message: string
  code?: string
  details?: Record<string, unknown>
}
