'use client'

import { useState } from 'react'
import { ShoppingCart, Check, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Product } from '@/types'
import { cn } from '@/lib/utils'

interface AddToCartButtonProps {
  product: Product
  quantity?: number
  className?: string
  disabled?: boolean
}

export default function AddToCartButton({
  product,
  quantity = 1,
  className,
  disabled = false,
}: AddToCartButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [isAdded, setIsAdded] = useState(false)

  const handleAddToCart = async () => {
    if (disabled || isLoading) return

    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Here you would typically:
      // - Add item to cart context/state
      // - Make API call to backend
      // - Update cart count in header

      console.log('Added to cart:', {
        productId: product.id,
        quantity,
        price: product.price,
        title: product.title,
      })

      setIsAdded(true)

      // Reset the "added" state after 2 seconds
      setTimeout(() => {
        setIsAdded(false)
      }, 2000)
    } catch (error) {
      console.error('Error adding to cart:', error)
      // Handle error (show toast, etc.)
    } finally {
      setIsLoading(false)
    }
  }

  if (isAdded) {
    return (
      <Button
        variant="outline"
        className={cn('transition-colors', className)}
        disabled
      >
        <Check className="h-4 w-4 mr-2 text-green-600" />
        Adicionado ao Carrinho
      </Button>
    )
  }

  return (
    <Button
      onClick={handleAddToCart}
      disabled={disabled || isLoading}
      className={cn('transition-colors', className)}
    >
      {isLoading ? (
        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
      ) : (
        <ShoppingCart className="h-4 w-4 mr-2" />
      )}
      {isLoading ? 'Adicionando...' : 'Adicionar ao Carrinho'}
    </Button>
  )
}
