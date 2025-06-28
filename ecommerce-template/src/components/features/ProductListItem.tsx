'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Heart, Star, ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Product } from '@/types'

interface ProductListItemProps {
  product: Product
}

export default function ProductListItem({ product }: ProductListItemProps) {
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
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 p-4">
      <div className="flex space-x-4">
        {/* Product Image */}
        <div className="relative w-32 h-32 shrink-0 overflow-hidden rounded-lg">
          <Link href={`/products/${product.id}`}>
            <Image
              src={product.images[0] || '/api/placeholder/400/400'}
              alt={product.title}
              fill
              className="object-cover hover:scale-105 transition-transform duration-200"
            />
          </Link>

          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
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
        </div>

        {/* Product Details */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0 pr-4">
              {/* Title */}
              <Link
                href={`/products/${product.id}`}
                className="text-lg font-medium text-gray-900 hover:text-blue-600 line-clamp-2"
              >
                {product.title}
              </Link>

              {/* Rating */}
              <div className="flex items-center mt-1 mb-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < 4 // Mock rating
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600 ml-2">
                  (24 avaliações)
                </span>
              </div>

              {/* Description */}
              <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                {product.description}
              </p>

              {/* Features/Specs */}
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="inline-flex items-center px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded">
                  SKU: {product.sku}
                </span>
                {product.requires_shipping && (
                  <span className="inline-flex items-center px-2 py-1 text-xs bg-green-100 text-green-800 rounded">
                    Frete Grátis
                  </span>
                )}
              </div>

              {/* Stock Status */}
              <div className="mb-3">
                {product.stock_quantity > 0 ? (
                  <span className="text-sm text-green-600 font-medium">
                    ✓ {product.stock_quantity} em estoque
                  </span>
                ) : (
                  <span className="text-sm text-red-600 font-medium">
                    ✗ Fora de estoque
                  </span>
                )}
              </div>
            </div>

            {/* Price and Actions */}
            <div className="text-right shrink-0">
              {/* Price */}
              <div className="mb-3">
                <div className="flex flex-col items-end space-y-1">
                  <span className="text-2xl font-bold text-gray-900">
                    R$ {product.price.toFixed(2).replace('.', ',')}
                  </span>
                  {isOnSale && (
                    <span className="text-lg text-gray-500 line-through">
                      R${' '}
                      {product.compare_at_price!.toFixed(2).replace('.', ',')}
                    </span>
                  )}
                </div>

                <div className="text-sm text-gray-600 mt-1">
                  ou 10x de R${' '}
                  {(product.price / 10).toFixed(2).replace('.', ',')}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                <Button
                  className="w-full"
                  disabled={product.stock_quantity === 0}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Adicionar ao Carrinho
                </Button>

                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Heart className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    Ver Detalhes
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
