'use client'

import { useState, useEffect } from 'react'
import ProductCard from './ProductCard'
import ProductListItem from './ProductListItem'
import Pagination from './Pagination'
import { Product, ProductFilters } from '@/types'

interface ProductCatalogProps {
  filters: ProductFilters
  page: number
  view: 'grid' | 'list'
}

// Mock data - replace with actual API call
const mockProducts: Product[] = [
  {
    id: '1',
    title: 'iPhone 15 Pro Max 256GB',
    description:
      'O mais avançado iPhone com chip A17 Pro e câmeras profissionais',
    category_id: 'eletronicos',
    images: ['/api/placeholder/400/400'],
    price: 10999.99,
    compare_at_price: 12999.99,
    sku: 'IPHONE15PM256',
    stock_quantity: 25,
    track_inventory: true,
    allow_backorder: false,
    weight: 221,
    requires_shipping: true,
    is_digital: false,
    status: 'active',
    available: true,
    store_id: 'store-1',
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-01-15T10:00:00Z',
  },
  {
    id: '2',
    title: 'Samsung Galaxy S24 Ultra',
    description: 'Galaxy S24 Ultra com S Pen e câmera de 200MP',
    category_id: 'eletronicos',
    images: ['/api/placeholder/400/400'],
    price: 8999.99,
    compare_at_price: 9999.99,
    sku: 'GALAXYS24ULTRA',
    stock_quantity: 15,
    track_inventory: true,
    allow_backorder: false,
    weight: 232,
    requires_shipping: true,
    is_digital: false,
    status: 'active',
    available: true,
    store_id: 'store-2',
    created_at: '2024-01-14T10:00:00Z',
    updated_at: '2024-01-14T10:00:00Z',
  },
  {
    id: '3',
    title: 'MacBook Air M3 13"',
    description: 'MacBook Air com chip M3, 16GB RAM e 512GB SSD',
    category_id: 'eletronicos',
    images: ['/api/placeholder/400/400'],
    price: 15999.99,
    sku: 'MACBOOKAIRM3',
    stock_quantity: 8,
    track_inventory: true,
    allow_backorder: false,
    weight: 1240,
    requires_shipping: true,
    is_digital: false,
    status: 'active',
    available: true,
    store_id: 'store-1',
    created_at: '2024-01-13T10:00:00Z',
    updated_at: '2024-01-13T10:00:00Z',
  },
  {
    id: '4',
    title: 'Sony WH-1000XM5 Headphones',
    description: 'Fones de ouvido com cancelamento de ruído premium',
    category_id: 'eletronicos',
    images: ['/api/placeholder/400/400'],
    price: 1799.99,
    compare_at_price: 2199.99,
    sku: 'SONYWH1000XM5',
    stock_quantity: 32,
    track_inventory: true,
    allow_backorder: false,
    weight: 250,
    requires_shipping: true,
    is_digital: false,
    status: 'active',
    available: true,
    store_id: 'store-3',
    created_at: '2024-01-12T10:00:00Z',
    updated_at: '2024-01-12T10:00:00Z',
  },
  {
    id: '5',
    title: 'Apple Watch Series 9',
    description: 'Apple Watch Series 9 com GPS e tela Always-On',
    category_id: 'eletronicos',
    images: ['/api/placeholder/400/400'],
    price: 3499.99,
    sku: 'APPLEWATCHS9',
    stock_quantity: 18,
    track_inventory: true,
    allow_backorder: false,
    weight: 51,
    requires_shipping: true,
    is_digital: false,
    status: 'active',
    available: true,
    store_id: 'store-1',
    created_at: '2024-01-11T10:00:00Z',
    updated_at: '2024-01-11T10:00:00Z',
  },
  {
    id: '6',
    title: 'Nintendo Switch OLED',
    description: 'Console Nintendo Switch com tela OLED de 7 polegadas',
    category_id: 'games',
    images: ['/api/placeholder/400/400'],
    price: 2199.99,
    sku: 'SWITCHOLED',
    stock_quantity: 22,
    track_inventory: true,
    allow_backorder: false,
    weight: 420,
    requires_shipping: true,
    is_digital: false,
    status: 'active',
    available: true,
    store_id: 'store-4',
    created_at: '2024-01-10T10:00:00Z',
    updated_at: '2024-01-10T10:00:00Z',
  },
]

export default function ProductCatalog({
  filters,
  page,
  view,
}: ProductCatalogProps) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [totalPages, setTotalPages] = useState(0)
  const [totalProducts, setTotalProducts] = useState(0)

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)

      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500))

        // Apply filters to mock data
        let filteredProducts = mockProducts

        if (filters.search) {
          filteredProducts = filteredProducts.filter(
            product =>
              product.title
                .toLowerCase()
                .includes(filters.search!.toLowerCase()) ||
              product.description
                .toLowerCase()
                .includes(filters.search!.toLowerCase())
          )
        }

        if (filters.category) {
          filteredProducts = filteredProducts.filter(
            product => product.category_id === filters.category
          )
        }

        if (filters.min_price) {
          filteredProducts = filteredProducts.filter(
            product => product.price >= filters.min_price!
          )
        }

        if (filters.max_price) {
          filteredProducts = filteredProducts.filter(
            product => product.price <= filters.max_price!
          )
        }

        if (filters.in_stock) {
          filteredProducts = filteredProducts.filter(
            product => product.stock_quantity > 0
          )
        }

        if (filters.on_sale) {
          filteredProducts = filteredProducts.filter(
            product =>
              product.compare_at_price &&
              product.compare_at_price > product.price
          )
        }

        // Sort products
        if (filters.sort_by) {
          filteredProducts.sort((a, b) => {
            switch (filters.sort_by) {
              case 'price_asc':
                return a.price - b.price
              case 'price_desc':
                return b.price - a.price
              case 'name_asc':
                return a.title.localeCompare(b.title)
              case 'name_desc':
                return b.title.localeCompare(a.title)
              case 'newest':
                return (
                  new Date(b.created_at).getTime() -
                  new Date(a.created_at).getTime()
                )
              default:
                return 0
            }
          })
        }

        const itemsPerPage = 20
        const startIndex = (page - 1) * itemsPerPage
        const endIndex = startIndex + itemsPerPage
        const paginatedProducts = filteredProducts.slice(startIndex, endIndex)

        setProducts(paginatedProducts)
        setTotalProducts(filteredProducts.length)
        setTotalPages(Math.ceil(filteredProducts.length / itemsPerPage))
      } catch (error) {
        console.error('Error fetching products:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [filters, page])

  if (loading) {
    return (
      <div className="space-y-6">
        {view === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 12 }).map((_, i) => (
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
        ) : (
          <div className="space-y-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="animate-pulse flex space-x-4 p-4 bg-white rounded-lg"
              >
                <div className="bg-gray-200 w-32 h-32 rounded-lg" />
                <div className="flex-1 space-y-2">
                  <div className="bg-gray-200 h-6 rounded w-3/4" />
                  <div className="bg-gray-200 h-4 rounded w-full" />
                  <div className="bg-gray-200 h-4 rounded w-2/3" />
                  <div className="bg-gray-200 h-8 rounded w-1/4" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-6xl mb-4">📦</div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Nenhum produto encontrado
        </h3>
        <p className="text-gray-600">
          Tente ajustar seus filtros ou buscar por outros termos.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Results Summary */}
      <div className="text-sm text-gray-600">
        {totalProducts} produto{totalProducts !== 1 ? 's' : ''} encontrado
        {totalProducts !== 1 ? 's' : ''}
      </div>

      {/* Product Grid/List */}
      {view === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {products.map(product => (
            <ProductListItem key={product.id} product={product} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          totalItems={totalProducts}
        />
      )}
    </div>
  )
}
