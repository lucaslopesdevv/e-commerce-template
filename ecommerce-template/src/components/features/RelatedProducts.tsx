'use client'

import { useState, useEffect } from 'react'
import ProductCard from './ProductCard'
import { Product } from '@/types'

interface RelatedProductsProps {
  productId: string
  categoryId: string
}

// Mock related products data
const mockRelatedProducts: Product[] = [
  {
    id: 'related-1',
    title: 'iPhone 15 Pro 128GB',
    description:
      'iPhone 15 Pro com chip A17 Pro e sistema de câmeras profissional',
    category_id: 'eletronicos',
    images: ['/api/placeholder/400/400'],
    price: 9999.99,
    compare_at_price: 11999.99,
    sku: 'IPHONE15PRO128',
    stock_quantity: 15,
    track_inventory: true,
    allow_backorder: false,
    weight: 187,
    requires_shipping: true,
    is_digital: false,
    status: 'active',
    available: true,
    store_id: 'store-1',
    created_at: '2024-01-14T10:00:00Z',
    updated_at: '2024-01-14T10:00:00Z',
  },
  {
    id: 'related-2',
    title: 'AirPods Pro 2ª Geração',
    description: 'AirPods Pro com cancelamento ativo de ruído e áudio espacial',
    category_id: 'eletronicos',
    images: ['/api/placeholder/400/400'],
    price: 2499.99,
    sku: 'AIRPODSPRO2',
    stock_quantity: 28,
    track_inventory: true,
    allow_backorder: false,
    weight: 50,
    requires_shipping: true,
    is_digital: false,
    status: 'active',
    available: true,
    store_id: 'store-1',
    created_at: '2024-01-13T10:00:00Z',
    updated_at: '2024-01-13T10:00:00Z',
  },
  {
    id: 'related-3',
    title: 'iPhone 15 Plus 256GB',
    description: 'iPhone 15 Plus com tela de 6.7" e sistema de câmera avançado',
    category_id: 'eletronicos',
    images: ['/api/placeholder/400/400'],
    price: 8999.99,
    sku: 'IPHONE15PLUS256',
    stock_quantity: 12,
    track_inventory: true,
    allow_backorder: false,
    weight: 201,
    requires_shipping: true,
    is_digital: false,
    status: 'active',
    available: true,
    store_id: 'store-1',
    created_at: '2024-01-12T10:00:00Z',
    updated_at: '2024-01-12T10:00:00Z',
  },
  {
    id: 'related-4',
    title: 'MagSafe Charger',
    description:
      'Carregador sem fio MagSafe para iPhone com alinhamento magnético',
    category_id: 'eletronicos',
    images: ['/api/placeholder/400/400'],
    price: 399.99,
    sku: 'MAGSAFECHARGER',
    stock_quantity: 45,
    track_inventory: true,
    allow_backorder: false,
    weight: 85,
    requires_shipping: true,
    is_digital: false,
    status: 'active',
    available: true,
    store_id: 'store-1',
    created_at: '2024-01-11T10:00:00Z',
    updated_at: '2024-01-11T10:00:00Z',
  },
]

export default function RelatedProducts({
  productId,
  categoryId,
}: RelatedProductsProps) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      setLoading(true)

      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500))

        // Filter out the current product and get related products
        const relatedProducts = mockRelatedProducts
          .filter(
            product =>
              product.id !== productId && product.category_id === categoryId
          )
          .slice(0, 4)

        setProducts(relatedProducts)
      } catch (error) {
        console.error('Error fetching related products:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchRelatedProducts()
  }, [productId, categoryId])

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-gray-200 aspect-square rounded-lg mb-4" />
            <div className="space-y-2">
              <div className="bg-gray-200 h-4 rounded w-3/4" />
              <div className="bg-gray-200 h-4 rounded w-1/2" />
              <div className="bg-gray-200 h-6 rounded w-1/3" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (products.length === 0) {
    return null
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
