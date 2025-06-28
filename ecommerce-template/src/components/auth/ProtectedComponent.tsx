'use client'

import React, { ReactNode } from 'react'
import { Permission, UserRole } from '@/lib/permissions'
import {
  useHasPermission,
  useHasAnyPermission,
  useHasAllPermissions,
  useHasRole,
  useIsAdmin,
  useIsSeller,
  useIsCustomer,
} from '@/hooks/usePermissions'

// Base interface for protected component props
interface BaseProtectedProps {
  children: ReactNode
  fallback?: ReactNode
  inverse?: boolean // If true, shows content when user DOESN'T have permission/role
}

// Component that renders children only if user has specific permission
interface PermissionProtectedProps extends BaseProtectedProps {
  permission: Permission
}

export const PermissionProtected: React.FC<PermissionProtectedProps> = ({
  permission,
  children,
  fallback = null,
  inverse = false,
}) => {
  const hasPermission = useHasPermission(permission)
  const shouldRender = inverse ? !hasPermission : hasPermission

  return shouldRender ? <>{children}</> : <>{fallback}</>
}

// Component that renders children only if user has ANY of the specified permissions
interface AnyPermissionProtectedProps extends BaseProtectedProps {
  permissions: Permission[]
}

export const AnyPermissionProtected: React.FC<AnyPermissionProtectedProps> = ({
  permissions,
  children,
  fallback = null,
  inverse = false,
}) => {
  const hasAnyPermission = useHasAnyPermission(permissions)
  const shouldRender = inverse ? !hasAnyPermission : hasAnyPermission

  return shouldRender ? <>{children}</> : <>{fallback}</>
}

// Component that renders children only if user has ALL specified permissions
interface AllPermissionsProtectedProps extends BaseProtectedProps {
  permissions: Permission[]
}

export const AllPermissionsProtected: React.FC<
  AllPermissionsProtectedProps
> = ({ permissions, children, fallback = null, inverse = false }) => {
  const hasAllPermissions = useHasAllPermissions(permissions)
  const shouldRender = inverse ? !hasAllPermissions : hasAllPermissions

  return shouldRender ? <>{children}</> : <>{fallback}</>
}

// Component that renders children only if user has specific role
interface RoleProtectedProps extends BaseProtectedProps {
  role: UserRole
}

export const RoleProtected: React.FC<RoleProtectedProps> = ({
  role,
  children,
  fallback = null,
  inverse = false,
}) => {
  const hasRole = useHasRole(role)
  const shouldRender = inverse ? !hasRole : hasRole

  return shouldRender ? <>{children}</> : <>{fallback}</>
}

// Convenient components for common role checks
export const AdminOnly: React.FC<BaseProtectedProps> = ({
  children,
  fallback = null,
  inverse = false,
}) => {
  const isAdmin = useIsAdmin()
  const shouldRender = inverse ? !isAdmin : isAdmin

  return shouldRender ? <>{children}</> : <>{fallback}</>
}

export const SellerOnly: React.FC<BaseProtectedProps> = ({
  children,
  fallback = null,
  inverse = false,
}) => {
  const isSeller = useIsSeller()
  const shouldRender = inverse ? !isSeller : isSeller

  return shouldRender ? <>{children}</> : <>{fallback}</>
}

export const CustomerOnly: React.FC<BaseProtectedProps> = ({
  children,
  fallback = null,
  inverse = false,
}) => {
  const isCustomer = useIsCustomer()
  const shouldRender = inverse ? !isCustomer : isCustomer

  return shouldRender ? <>{children}</> : <>{fallback}</>
}

// Higher-Order Component for permission-based component wrapping
export function withPermission<P extends object>(
  Component: React.ComponentType<P>,
  permission: Permission,
  fallback?: ReactNode
) {
  const PermissionWrappedComponent = (props: P) => (
    <PermissionProtected permission={permission} fallback={fallback}>
      <Component {...props} />
    </PermissionProtected>
  )

  PermissionWrappedComponent.displayName = `withPermission(${Component.displayName || Component.name})`

  return PermissionWrappedComponent
}

// Higher-Order Component for role-based component wrapping
export function withRole<P extends object>(
  Component: React.ComponentType<P>,
  role: UserRole,
  fallback?: ReactNode
) {
  const RoleWrappedComponent = (props: P) => (
    <RoleProtected role={role} fallback={fallback}>
      <Component {...props} />
    </RoleProtected>
  )

  RoleWrappedComponent.displayName = `withRole(${Component.displayName || Component.name})`

  return RoleWrappedComponent
}

// Higher-Order Component for admin-only components
export function adminOnly<P extends object>(
  Component: React.ComponentType<P>,
  fallback?: ReactNode
) {
  const AdminWrappedComponent = (props: P) => (
    <AdminOnly fallback={fallback}>
      <Component {...props} />
    </AdminOnly>
  )

  AdminWrappedComponent.displayName = `adminOnly(${Component.displayName || Component.name})`

  return AdminWrappedComponent
}

// Higher-Order Component for seller-only components
export function sellerOnly<P extends object>(
  Component: React.ComponentType<P>,
  fallback?: ReactNode
) {
  const SellerWrappedComponent = (props: P) => (
    <SellerOnly fallback={fallback}>
      <Component {...props} />
    </SellerOnly>
  )

  SellerWrappedComponent.displayName = `sellerOnly(${Component.displayName || Component.name})`

  return SellerWrappedComponent
}

// Component that renders different content based on user role
interface RoleBasedRenderProps {
  admin?: ReactNode
  seller?: ReactNode
  customer?: ReactNode
  guest?: ReactNode // For unauthenticated users
}

export const RoleBasedRender: React.FC<RoleBasedRenderProps> = ({
  admin,
  seller,
  customer,
  guest,
}) => {
  const isAdmin = useIsAdmin()
  const isSeller = useIsSeller()
  const isCustomer = useIsCustomer()

  if (isAdmin && admin) return <>{admin}</>
  if (isSeller && seller) return <>{seller}</>
  if (isCustomer && customer) return <>{customer}</>
  if (!isCustomer && guest) return <>{guest}</>

  return null
}

// Component for conditional rendering based on multiple criteria
interface ConditionalRenderProps extends BaseProtectedProps {
  condition: boolean
}

export const ConditionalRender: React.FC<ConditionalRenderProps> = ({
  condition,
  children,
  fallback = null,
  inverse = false,
}) => {
  const shouldRender = inverse ? !condition : condition

  return shouldRender ? <>{children}</> : <>{fallback}</>
}
