'use client'

import { useMemo } from 'react'
import { useAuth } from '@/lib/AuthProvider'
import {
  Permission,
  UserRole,
  PermissionManager,
  createPermissionManager,
  hasPermission as checkPermission,
  hasRole as checkRole,
  isAdmin as checkIsAdmin,
  isSeller as checkIsSeller,
  isCustomer as checkIsCustomer,
} from '@/lib/permissions'

// Hook to get permission manager instance
export const usePermissions = (): PermissionManager => {
  const { user } = useAuth()

  return useMemo(() => createPermissionManager(user), [user])
}

// Hook to check if user has a specific permission
export const useHasPermission = (permission: Permission): boolean => {
  const { user } = useAuth()

  return useMemo(() => checkPermission(user, permission), [user, permission])
}

// Hook to check if user has any of the specified permissions
export const useHasAnyPermission = (permissions: Permission[]): boolean => {
  const permissionManager = usePermissions()

  return useMemo(
    () => permissionManager.hasAnyPermission(permissions),
    [permissionManager, permissions]
  )
}

// Hook to check if user has all specified permissions
export const useHasAllPermissions = (permissions: Permission[]): boolean => {
  const permissionManager = usePermissions()

  return useMemo(
    () => permissionManager.hasAllPermissions(permissions),
    [permissionManager, permissions]
  )
}

// Hook to check if user has a specific role
export const useHasRole = (role: UserRole): boolean => {
  const { user } = useAuth()

  return useMemo(() => checkRole(user, role), [user, role])
}

// Hook to check if user is admin
export const useIsAdmin = (): boolean => {
  const { user } = useAuth()

  return useMemo(() => checkIsAdmin(user), [user])
}

// Hook to check if user is seller
export const useIsSeller = (): boolean => {
  const { user } = useAuth()

  return useMemo(() => checkIsSeller(user), [user])
}

// Hook to check if user is customer
export const useIsCustomer = (): boolean => {
  const { user } = useAuth()

  return useMemo(() => checkIsCustomer(user), [user])
}

// Hook to get current user role
export const useUserRole = (): UserRole | null => {
  const permissionManager = usePermissions()

  return useMemo(() => permissionManager.getUserRole(), [permissionManager])
}

// Hook to check resource ownership/management permissions
export const useCanManageUser = (targetUserId: string): boolean => {
  const permissionManager = usePermissions()

  return useMemo(
    () => permissionManager.canManageUser(targetUserId),
    [permissionManager, targetUserId]
  )
}

export const useCanManageStore = (storeOwnerId: string): boolean => {
  const permissionManager = usePermissions()

  return useMemo(
    () => permissionManager.canManageStore(storeOwnerId),
    [permissionManager, storeOwnerId]
  )
}

export const useCanManageProduct = (productOwnerId: string): boolean => {
  const permissionManager = usePermissions()

  return useMemo(
    () => permissionManager.canManageProduct(productOwnerId),
    [permissionManager, productOwnerId]
  )
}

export const useCanViewOrder = (
  orderCustomerId: string,
  orderStoreOwnerId?: string
): boolean => {
  const permissionManager = usePermissions()

  return useMemo(
    () => permissionManager.canViewOrder(orderCustomerId, orderStoreOwnerId),
    [permissionManager, orderCustomerId, orderStoreOwnerId]
  )
}

// Hook to get all user permissions
export const useUserPermissions = (): Permission[] => {
  const permissionManager = usePermissions()
  const userRole = useUserRole()

  return useMemo(() => {
    if (!userRole) return []
    return permissionManager.getRolePermissions(userRole)
  }, [permissionManager, userRole])
}
