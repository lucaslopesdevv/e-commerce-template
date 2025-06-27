// User Types
export interface User {
  id: string
  email: string
  name?: string
  role: 'admin' | 'customer' | 'seller'
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
  price: number
  compare_at_price?: number // For discount pricing
  cost_price?: number // Cost for store owners
  sku?: string
  stock_quantity: number
  track_inventory: boolean
  allow_backorder: boolean
  weight?: number // in grams
  dimensions?: {
    length: number
    width: number
    height: number
  }
  requires_shipping: boolean
  is_digital: boolean
  status: 'active' | 'draft' | 'archived'
  available: boolean
  store_id: string
  specifications?: Record<string, unknown>
  seo_title?: string
  seo_description?: string
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

// Order Types (previously Booking)
export interface Order {
  id: string
  order_number: string
  customer_id: string
  store_id?: string
  items: OrderItem[]
  subtotal: number
  shipping_cost: number
  tax_amount: number
  discount_amount: number
  total_amount: number
  currency: string
  status:
    | 'pending'
    | 'confirmed'
    | 'processing'
    | 'shipped'
    | 'delivered'
    | 'cancelled'
    | 'refunded'
  payment_status: 'pending' | 'paid' | 'partially_paid' | 'refunded' | 'failed'
  shipping_address: Address
  billing_address?: Address
  shipping_method?: string
  tracking_number?: string
  notes?: string
  created_at: string
  updated_at: string
}

export interface OrderItem {
  id: string
  order_id: string
  product_id: string
  variant_id?: string
  quantity: number
  price: number
  total: number
}

// Payment Types
export interface Payment {
  id: string
  order_id: string
  amount: number
  currency: string
  method:
    | 'pix'
    | 'credit_card'
    | 'debit_card'
    | 'mercado_pago'
    | 'pagseguro'
    | 'boleto'
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'refunded'
  transaction_id?: string
  gateway_response?: Record<string, unknown>
  created_at: string
  updated_at: string
}

// Address Types
export interface Address {
  id: string
  user_id: string
  type: 'shipping' | 'billing'
  first_name: string
  last_name: string
  company?: string
  street: string
  number: string
  complement?: string
  neighborhood: string
  city: string
  state: string
  cep: string
  country: string
  phone?: string
  is_default: boolean
  created_at: string
  updated_at: string
}

// Store/Seller Types
export interface Store {
  id: string
  name: string
  slug: string
  description?: string
  logo?: string
  banner?: string
  owner_id: string
  email: string
  phone?: string
  address?: Address
  status: 'active' | 'inactive' | 'pending_approval'
  settings: StoreSettings
  created_at: string
  updated_at: string
}

export interface StoreSettings {
  currency: string
  tax_rate?: number
  shipping_policy?: string
  return_policy?: string
  terms_of_service?: string
  privacy_policy?: string
}

// Review Types
export interface Review {
  id: string
  product_id: string
  customer_id: string
  order_id?: string
  rating: number // 1-5
  title?: string
  comment?: string
  verified_purchase: boolean
  helpful_count: number
  created_at: string
  updated_at: string
}

// Notification Types
export interface Notification {
  id: string
  user_id: string
  title: string
  message: string
  type: 'order' | 'payment' | 'shipping' | 'promotion' | 'system'
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
  price: number
  compare_at_price?: number
  sku?: string
  stock_quantity: number
  track_inventory: boolean
  weight?: number
  requires_shipping: boolean
  is_digital: boolean
  specifications?: Record<string, unknown>
}

export interface OrderForm {
  items: {
    product_id: string
    quantity: number
  }[]
  shipping_address: Omit<
    Address,
    'id' | 'user_id' | 'created_at' | 'updated_at'
  >
  billing_address?: Omit<
    Address,
    'id' | 'user_id' | 'created_at' | 'updated_at'
  >
  notes?: string
}

// Cart Types
export interface CartItem {
  product_id: string
  quantity: number
  selected_variant?: string
}

export interface Cart {
  items: CartItem[]
  subtotal: number
  shipping_cost: number
  tax_amount: number
  total: number
}

// Filter Types
export interface ProductFilters {
  category?: string
  store?: string
  min_price?: number
  max_price?: number
  in_stock?: boolean
  on_sale?: boolean
  search?: string
  sort_by?:
    | 'price_asc'
    | 'price_desc'
    | 'name_asc'
    | 'name_desc'
    | 'newest'
    | 'best_selling'
}

// Error Types
export interface ApiError {
  message: string
  code?: string
  details?: Record<string, unknown>
}

// Shipping Types
export interface ShippingMethod {
  id: string
  name: string
  description?: string
  price: number
  estimated_days: number
  active: boolean
}

// Discount/Coupon Types
export interface Coupon {
  id: string
  code: string
  type: 'percentage' | 'fixed_amount' | 'free_shipping'
  value: number
  min_order_amount?: number
  max_discount_amount?: number
  usage_limit?: number
  usage_count: number
  expires_at?: string
  active: boolean
  created_at: string
}
