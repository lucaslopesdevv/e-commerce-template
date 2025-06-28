'use client'

import React, { ReactNode, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/AuthProvider'
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

// Loading component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
  </div>
)

// Access denied component
const AccessDenied = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="text-center">
      <h1 className="text-4xl font-bold text-red-600 mb-4">Acesso Negado</h1>
      <p className="text-gray-600 mb-6">
        Você não tem permissão para acessar esta página.
      </p>
      <button
        onClick={() => window.history.back()}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Voltar
      </button>
    </div>
  </div>
)

// Base interface for route guard props
interface BaseRouteGuardProps {
  children: ReactNode
  fallback?: ReactNode
  redirectTo?: string
  loading?: ReactNode
}

// Route guard that requires authentication
interface AuthGuardProps extends BaseRouteGuardProps {
  requireAuth?: boolean
}

export const AuthGuard: React.FC<AuthGuardProps> = ({
  children,
  fallback = <AccessDenied />,
  redirectTo = '/auth/login',
  loading = <LoadingSpinner />,
  requireAuth = true,
}) => {
  const { user, loading: isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading) {
      if (requireAuth && !user && redirectTo) {
        router.push(redirectTo)
        return
      }
      if (!requireAuth && user && redirectTo) {
        router.push(redirectTo)
        return
      }
    }
  }, [user, isLoading, requireAuth, redirectTo, router])

  if (isLoading) {
    return <>{loading}</>
  }

  if (requireAuth && !user) {
    return <>{fallback}</>
  }

  if (!requireAuth && user) {
    return <>{fallback}</>
  }

  return <>{children}</>
}

// Route guard that requires specific permission
interface PermissionGuardProps extends BaseRouteGuardProps {
  permission: Permission
}

export const PermissionGuard: React.FC<PermissionGuardProps> = ({
  permission,
  children,
  fallback = <AccessDenied />,
  redirectTo,
  loading = <LoadingSpinner />,
}) => {
  const { loading: isLoading } = useAuth()
  const hasPermission = useHasPermission(permission)
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !hasPermission && redirectTo) {
      router.push(redirectTo)
    }
  }, [hasPermission, isLoading, redirectTo, router])

  if (isLoading) {
    return <>{loading}</>
  }

  if (!hasPermission) {
    return <>{fallback}</>
  }

  return <>{children}</>
}

// Route guard that requires any of the specified permissions
interface AnyPermissionGuardProps extends BaseRouteGuardProps {
  permissions: Permission[]
}

export const AnyPermissionGuard: React.FC<AnyPermissionGuardProps> = ({
  permissions,
  children,
  fallback = <AccessDenied />,
  redirectTo,
  loading = <LoadingSpinner />,
}) => {
  const { loading: isLoading } = useAuth()
  const hasAnyPermission = useHasAnyPermission(permissions)
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !hasAnyPermission && redirectTo) {
      router.push(redirectTo)
    }
  }, [hasAnyPermission, isLoading, redirectTo, router])

  if (isLoading) {
    return <>{loading}</>
  }

  if (!hasAnyPermission) {
    return <>{fallback}</>
  }

  return <>{children}</>
}

// Route guard that requires specific role
interface RoleGuardProps extends BaseRouteGuardProps {
  role: UserRole
}

export const RoleGuard: React.FC<RoleGuardProps> = ({
  role,
  children,
  fallback = <AccessDenied />,
  redirectTo,
  loading = <LoadingSpinner />,
}) => {
  const { loading: isLoading } = useAuth()
  const hasRole = useHasRole(role)
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !hasRole && redirectTo) {
      router.push(redirectTo)
    }
  }, [hasRole, isLoading, redirectTo, router])

  if (isLoading) {
    return <>{loading}</>
  }

  if (!hasRole) {
    return <>{fallback}</>
  }

  return <>{children}</>
}

// Convenient guards for common roles
export const AdminGuard: React.FC<BaseRouteGuardProps> = props => {
  const isAdmin = useIsAdmin()

  return (
    <RoleGuard
      role={UserRole.ADMIN}
      {...props}
      fallback={
        props.fallback || (
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-red-600 mb-4">
                Acesso Restrito
              </h1>
              <p className="text-gray-600 mb-6">
                Esta área é restrita apenas para administradores.
              </p>
              <button
                onClick={() => window.history.back()}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Voltar
              </button>
            </div>
          </div>
        )
      }
    />
  )
}

export const SellerGuard: React.FC<BaseRouteGuardProps> = props => {
  return (
    <RoleGuard
      role={UserRole.SELLER}
      {...props}
      fallback={
        props.fallback || (
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-red-600 mb-4">
                Acesso Restrito
              </h1>
              <p className="text-gray-600 mb-6">
                Esta área é restrita apenas para vendedores e administradores.
              </p>
              <button
                onClick={() => window.history.back()}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Voltar
              </button>
            </div>
          </div>
        )
      }
    />
  )
}

// Combined auth and role guard
interface AuthRoleGuardProps extends BaseRouteGuardProps {
  role?: UserRole
  permission?: Permission
  permissions?: Permission[]
  requireAnyPermission?: boolean // If true, requires ANY of the permissions
}

export const AuthRoleGuard: React.FC<AuthRoleGuardProps> = ({
  role,
  permission,
  permissions,
  requireAnyPermission = false,
  children,
  fallback = <AccessDenied />,
  redirectTo,
  loading = <LoadingSpinner />,
}) => {
  return (
    <AuthGuard fallback={fallback} redirectTo={redirectTo} loading={loading}>
      {role && (
        <RoleGuard
          role={role}
          fallback={fallback}
          redirectTo={redirectTo}
          loading={loading}
        >
          {permission && (
            <PermissionGuard
              permission={permission}
              fallback={fallback}
              redirectTo={redirectTo}
              loading={loading}
            >
              {children}
            </PermissionGuard>
          )}
          {permissions &&
            !permission &&
            (requireAnyPermission ? (
              <AnyPermissionGuard
                permissions={permissions}
                fallback={fallback}
                redirectTo={redirectTo}
                loading={loading}
              >
                {children}
              </AnyPermissionGuard>
            ) : (
              <>{children}</>
            ))}
          {!permission && !permissions && children}
        </RoleGuard>
      )}
      {!role && permission && (
        <PermissionGuard
          permission={permission}
          fallback={fallback}
          redirectTo={redirectTo}
          loading={loading}
        >
          {children}
        </PermissionGuard>
      )}
      {!role &&
        permissions &&
        !permission &&
        (requireAnyPermission ? (
          <AnyPermissionGuard
            permissions={permissions}
            fallback={fallback}
            redirectTo={redirectTo}
            loading={loading}
          >
            {children}
          </AnyPermissionGuard>
        ) : (
          <>{children}</>
        ))}
      {!role && !permission && !permissions && children}
    </AuthGuard>
  )
}
