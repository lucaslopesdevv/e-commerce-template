import { AuthUser, UserRole } from './auth'
import { USER_ROLES } from '@/constants'

// Re-export UserRole for convenience
export { UserRole } from './auth'

// Define all possible permissions in the system
export enum Permission {
  // User Management
  MANAGE_USERS = 'manage_users',
  VIEW_USERS = 'view_users',
  DELETE_USERS = 'delete_users',

  // Product Management
  MANAGE_PRODUCTS = 'manage_products',
  CREATE_PRODUCTS = 'create_products',
  EDIT_PRODUCTS = 'edit_products',
  DELETE_PRODUCTS = 'delete_products',
  VIEW_PRODUCTS = 'view_products',

  // Order Management
  MANAGE_ORDERS = 'manage_orders',
  VIEW_ORDERS = 'view_orders',
  PROCESS_ORDERS = 'process_orders',
  CANCEL_ORDERS = 'cancel_orders',
  REFUND_ORDERS = 'refund_orders',

  // Store Management
  MANAGE_STORES = 'manage_stores',
  CREATE_STORE = 'create_store',
  EDIT_STORE = 'edit_store',
  DELETE_STORE = 'delete_store',
  VIEW_STORE_ANALYTICS = 'view_store_analytics',

  // Financial Management
  VIEW_FINANCIAL_REPORTS = 'view_financial_reports',
  MANAGE_PAYMENTS = 'manage_payments',
  VIEW_SALES_DATA = 'view_sales_data',

  // System Administration
  MANAGE_SETTINGS = 'manage_settings',
  VIEW_LOGS = 'view_logs',
  MANAGE_CATEGORIES = 'manage_categories',
  MANAGE_NOTIFICATIONS = 'manage_notifications',

  // Customer Actions
  PLACE_ORDERS = 'place_orders',
  VIEW_OWN_ORDERS = 'view_own_orders',
  CANCEL_OWN_ORDERS = 'cancel_own_orders',
  WRITE_REVIEWS = 'write_reviews',
  MANAGE_PROFILE = 'manage_profile',

  // Seller Actions
  MANAGE_OWN_STORE = 'manage_own_store',
  VIEW_OWN_SALES = 'view_own_sales',
  MANAGE_OWN_PRODUCTS = 'manage_own_products',
  PROCESS_OWN_ORDERS = 'process_own_orders',
}

// Role-based permissions mapping
export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  [UserRole.ADMIN]: [
    // Admin has all permissions
    Permission.MANAGE_USERS,
    Permission.VIEW_USERS,
    Permission.DELETE_USERS,
    Permission.MANAGE_PRODUCTS,
    Permission.CREATE_PRODUCTS,
    Permission.EDIT_PRODUCTS,
    Permission.DELETE_PRODUCTS,
    Permission.VIEW_PRODUCTS,
    Permission.MANAGE_ORDERS,
    Permission.VIEW_ORDERS,
    Permission.PROCESS_ORDERS,
    Permission.CANCEL_ORDERS,
    Permission.REFUND_ORDERS,
    Permission.MANAGE_STORES,
    Permission.CREATE_STORE,
    Permission.EDIT_STORE,
    Permission.DELETE_STORE,
    Permission.VIEW_STORE_ANALYTICS,
    Permission.VIEW_FINANCIAL_REPORTS,
    Permission.MANAGE_PAYMENTS,
    Permission.VIEW_SALES_DATA,
    Permission.MANAGE_SETTINGS,
    Permission.VIEW_LOGS,
    Permission.MANAGE_CATEGORIES,
    Permission.MANAGE_NOTIFICATIONS,
    Permission.PLACE_ORDERS,
    Permission.VIEW_OWN_ORDERS,
    Permission.CANCEL_OWN_ORDERS,
    Permission.WRITE_REVIEWS,
    Permission.MANAGE_PROFILE,
    Permission.MANAGE_OWN_STORE,
    Permission.VIEW_OWN_SALES,
    Permission.MANAGE_OWN_PRODUCTS,
    Permission.PROCESS_OWN_ORDERS,
  ],

  [UserRole.SELLER]: [
    // Seller permissions
    Permission.VIEW_PRODUCTS,
    Permission.MANAGE_OWN_STORE,
    Permission.CREATE_STORE,
    Permission.EDIT_STORE,
    Permission.VIEW_OWN_SALES,
    Permission.MANAGE_OWN_PRODUCTS,
    Permission.CREATE_PRODUCTS,
    Permission.EDIT_PRODUCTS,
    Permission.DELETE_PRODUCTS,
    Permission.PROCESS_OWN_ORDERS,
    Permission.VIEW_ORDERS,
    Permission.PROCESS_ORDERS,
    Permission.CANCEL_ORDERS,
    Permission.VIEW_STORE_ANALYTICS,
    Permission.PLACE_ORDERS,
    Permission.VIEW_OWN_ORDERS,
    Permission.CANCEL_OWN_ORDERS,
    Permission.WRITE_REVIEWS,
    Permission.MANAGE_PROFILE,
  ],

  [UserRole.CUSTOMER]: [
    // Customer permissions
    Permission.VIEW_PRODUCTS,
    Permission.PLACE_ORDERS,
    Permission.VIEW_OWN_ORDERS,
    Permission.CANCEL_OWN_ORDERS,
    Permission.WRITE_REVIEWS,
    Permission.MANAGE_PROFILE,
  ],
}

// Role hierarchy - higher roles inherit permissions from lower roles
export const ROLE_HIERARCHY: Record<UserRole, UserRole[]> = {
  [UserRole.ADMIN]: [UserRole.SELLER, UserRole.CUSTOMER],
  [UserRole.SELLER]: [UserRole.CUSTOMER],
  [UserRole.CUSTOMER]: [],
}

// Utility functions for permission checking
export class PermissionManager {
  private user: AuthUser | null

  constructor(user: AuthUser | null) {
    this.user = user
  }

  // Get user role from user metadata
  getUserRole(): UserRole | null {
    if (!this.user) return null
    return (this.user.user_metadata?.role as UserRole) || UserRole.CUSTOMER
  }

  // Get all permissions for a role (including inherited permissions)
  getRolePermissions(role: UserRole): Permission[] {
    const directPermissions = ROLE_PERMISSIONS[role] || []
    const inheritedRoles = ROLE_HIERARCHY[role] || []

    const inheritedPermissions = inheritedRoles.flatMap(
      inheritedRole => ROLE_PERMISSIONS[inheritedRole] || []
    )

    // Combine and deduplicate permissions
    return [...new Set([...directPermissions, ...inheritedPermissions])]
  }

  // Check if user has a specific permission
  hasPermission(permission: Permission): boolean {
    const userRole = this.getUserRole()
    if (!userRole) return false

    const userPermissions = this.getRolePermissions(userRole)
    return userPermissions.includes(permission)
  }

  // Check if user has any of the specified permissions
  hasAnyPermission(permissions: Permission[]): boolean {
    return permissions.some(permission => this.hasPermission(permission))
  }

  // Check if user has all specified permissions
  hasAllPermissions(permissions: Permission[]): boolean {
    return permissions.every(permission => this.hasPermission(permission))
  }

  // Check if user has a specific role or higher
  hasRole(role: UserRole): boolean {
    const userRole = this.getUserRole()
    if (!userRole) return false

    if (userRole === role) return true

    // Check if user role is higher in hierarchy
    return ROLE_HIERARCHY[userRole]?.includes(role) || false
  }

  // Check if user is admin
  isAdmin(): boolean {
    return this.hasRole(UserRole.ADMIN)
  }

  // Check if user is seller or higher
  isSeller(): boolean {
    return this.hasRole(UserRole.SELLER)
  }

  // Check if user is customer (any authenticated user)
  isCustomer(): boolean {
    return this.hasRole(UserRole.CUSTOMER)
  }

  // Check if user can manage a specific resource
  canManageUser(targetUserId: string): boolean {
    // Admin can manage any user
    if (this.isAdmin()) return true

    // Users can only manage themselves
    return this.user?.id === targetUserId
  }

  canManageStore(storeOwnerId: string): boolean {
    // Admin can manage any store
    if (this.isAdmin()) return true

    // Store owners can manage their own store
    return this.user?.id === storeOwnerId && this.isSeller()
  }

  canManageProduct(productOwnerId: string): boolean {
    // Admin can manage any product
    if (this.isAdmin()) return true

    // Product owners can manage their own products
    return this.user?.id === productOwnerId && this.isSeller()
  }

  canViewOrder(orderCustomerId: string, orderStoreOwnerId?: string): boolean {
    // Admin can view any order
    if (this.isAdmin()) return true

    // Customer can view their own orders
    if (this.user?.id === orderCustomerId) return true

    // Store owner can view orders for their store
    if (
      orderStoreOwnerId &&
      this.user?.id === orderStoreOwnerId &&
      this.isSeller()
    ) {
      return true
    }

    return false
  }
}

// Factory function to create permission manager
export const createPermissionManager = (
  user: AuthUser | null
): PermissionManager => {
  return new PermissionManager(user)
}

// Utility functions for quick checks
export const hasPermission = (
  user: AuthUser | null,
  permission: Permission
): boolean => {
  return createPermissionManager(user).hasPermission(permission)
}

export const hasRole = (user: AuthUser | null, role: UserRole): boolean => {
  return createPermissionManager(user).hasRole(role)
}

export const isAdmin = (user: AuthUser | null): boolean => {
  return createPermissionManager(user).isAdmin()
}

export const isSeller = (user: AuthUser | null): boolean => {
  return createPermissionManager(user).isSeller()
}

export const isCustomer = (user: AuthUser | null): boolean => {
  return createPermissionManager(user).isCustomer()
}

// Permission labels for UI
export const PERMISSION_LABELS: Record<Permission, string> = {
  [Permission.MANAGE_USERS]: 'Gerenciar Usuários',
  [Permission.VIEW_USERS]: 'Visualizar Usuários',
  [Permission.DELETE_USERS]: 'Excluir Usuários',

  [Permission.MANAGE_PRODUCTS]: 'Gerenciar Produtos',
  [Permission.CREATE_PRODUCTS]: 'Criar Produtos',
  [Permission.EDIT_PRODUCTS]: 'Editar Produtos',
  [Permission.DELETE_PRODUCTS]: 'Excluir Produtos',
  [Permission.VIEW_PRODUCTS]: 'Visualizar Produtos',

  [Permission.MANAGE_ORDERS]: 'Gerenciar Pedidos',
  [Permission.VIEW_ORDERS]: 'Visualizar Pedidos',
  [Permission.PROCESS_ORDERS]: 'Processar Pedidos',
  [Permission.CANCEL_ORDERS]: 'Cancelar Pedidos',
  [Permission.REFUND_ORDERS]: 'Reembolsar Pedidos',

  [Permission.MANAGE_STORES]: 'Gerenciar Lojas',
  [Permission.CREATE_STORE]: 'Criar Loja',
  [Permission.EDIT_STORE]: 'Editar Loja',
  [Permission.DELETE_STORE]: 'Excluir Loja',
  [Permission.VIEW_STORE_ANALYTICS]: 'Ver Analytics da Loja',

  [Permission.VIEW_FINANCIAL_REPORTS]: 'Ver Relatórios Financeiros',
  [Permission.MANAGE_PAYMENTS]: 'Gerenciar Pagamentos',
  [Permission.VIEW_SALES_DATA]: 'Ver Dados de Vendas',

  [Permission.MANAGE_SETTINGS]: 'Gerenciar Configurações',
  [Permission.VIEW_LOGS]: 'Visualizar Logs',
  [Permission.MANAGE_CATEGORIES]: 'Gerenciar Categorias',
  [Permission.MANAGE_NOTIFICATIONS]: 'Gerenciar Notificações',

  [Permission.PLACE_ORDERS]: 'Fazer Pedidos',
  [Permission.VIEW_OWN_ORDERS]: 'Ver Próprios Pedidos',
  [Permission.CANCEL_OWN_ORDERS]: 'Cancelar Próprios Pedidos',
  [Permission.WRITE_REVIEWS]: 'Escrever Avaliações',
  [Permission.MANAGE_PROFILE]: 'Gerenciar Perfil',

  [Permission.MANAGE_OWN_STORE]: 'Gerenciar Própria Loja',
  [Permission.VIEW_OWN_SALES]: 'Ver Próprias Vendas',
  [Permission.MANAGE_OWN_PRODUCTS]: 'Gerenciar Próprios Produtos',
  [Permission.PROCESS_OWN_ORDERS]: 'Processar Próprios Pedidos',
}
