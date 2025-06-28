'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Heart, Star, ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Product } from '@/types'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const isOnSale =
    product.compare_at_price && product.compare_at_price > product.price
  const discountPercent = isOnSale
    ? Math.round(
        ((product.compare_at_price! - product.price) /
          product.compare_at_price!) *
          100
      )
    : 0

  return (
    <div className="group bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-200 overflow-hidden">
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden">
        <Link href={`/products/${product.id}`}>
          <Image
            src={product.images[0] || '/api/placeholder/400/400'}
            alt={product.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-200"
          />
        </Link>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {isOnSale && (
            <Badge variant="destructive" className="text-xs">
              {discountPercent}% OFF
            </Badge>
          )}
          {product.stock_quantity === 0 && (
            <Badge variant="secondary" className="text-xs">
              Esgotado
            </Badge>
          )}
        </div>

        {/* Wishlist Button */}
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-3 right-3 h-8 w-8 p-0 bg-white/80 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Heart className="h-4 w-4" />
        </Button>

        {/* Quick Add to Cart */}
        <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            className="w-full h-9 text-sm"
            disabled={product.stock_quantity === 0}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Adicionar ao Carrinho
          </Button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <div className="mb-2">
          <Link
            href={`/products/${product.id}`}
            className="text-sm font-medium text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 line-clamp-2"
          >
            {product.title}
          </Link>
        </div>

        {/* Rating */}
        <div className="flex items-center mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-3 w-3 ${
                  i < 4 // Mock rating
                    ? 'text-yellow-400 fill-current'
                    : 'text-gray-300 dark:text-gray-600'
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-gray-600 dark:text-gray-400 ml-1">
            (24)
          </span>
        </div>

        {/* Price */}
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-gray-900 dark:text-gray-100">
              R$ {product.price.toFixed(2).replace('.', ',')}
            </span>
            {isOnSale && (
              <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
                R$ {product.compare_at_price!.toFixed(2).replace('.', ',')}
              </span>
            )}
          </div>

          <div className="text-xs text-gray-600 dark:text-gray-400">
            ou 10x de R$ {(product.price / 10).toFixed(2).replace('.', ',')}
          </div>
        </div>

        {/* Stock Status */}
        <div className="mt-2">
          {product.stock_quantity > 0 ? (
            <span className="text-xs text-green-600 dark:text-green-400 font-medium">
              {product.stock_quantity} em estoque
            </span>
          ) : (
            <span className="text-xs text-red-600 dark:text-red-400 font-medium">
              Fora de estoque
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
