'use client'

import React, { useState } from 'react'
import DashboardLayout from '@/components/dashboard/DashboardLayout'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import {
  Search,
  Heart,
  ShoppingCart,
  Star,
  Trash2,
  Filter,
  SortAsc,
  Share2,
  Eye,
  Package,
  DollarSign,
  TrendingDown,
  TrendingUp,
  Calendar,
} from 'lucide-react'

interface WishlistItem {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  rating: number
  reviewCount: number
  category: string
  brand: string
  inStock: boolean
  discount?: number
  dateAdded: string
  lastPriceChange?: {
    date: string
    oldPrice: number
    newPrice: number
  }
}

const WishlistPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [sortBy, setSortBy] = useState('dateAdded')

  // Mock wishlist data
  const wishlistItems: WishlistItem[] = [
    {
      id: '1',
      name: 'iPhone 15 Pro Max 256GB',
      price: 2599.9,
      originalPrice: 2799.9,
      image: '/placeholder-product.jpg',
      rating: 4.8,
      reviewCount: 1248,
      category: 'Smartphones',
      brand: 'Apple',
      inStock: true,
      discount: 7,
      dateAdded: '2024-01-20',
      lastPriceChange: {
        date: '2024-01-22',
        oldPrice: 2799.9,
        newPrice: 2599.9,
      },
    },
    {
      id: '2',
      name: 'MacBook Air M2 13" 256GB',
      price: 8999.0,
      image: '/placeholder-product.jpg',
      rating: 4.9,
      reviewCount: 892,
      category: 'Notebooks',
      brand: 'Apple',
      inStock: true,
      dateAdded: '2024-01-18',
    },
    {
      id: '3',
      name: 'Samsung Galaxy S24 Ultra',
      price: 4299.9,
      originalPrice: 4599.9,
      image: '/placeholder-product.jpg',
      rating: 4.7,
      reviewCount: 634,
      category: 'Smartphones',
      brand: 'Samsung',
      inStock: false,
      discount: 7,
      dateAdded: '2024-01-15',
    },
    {
      id: '4',
      name: 'AirPods Pro 2ª Geração',
      price: 1299.9,
      image: '/placeholder-product.jpg',
      rating: 4.6,
      reviewCount: 2156,
      category: 'Áudio',
      brand: 'Apple',
      inStock: true,
      dateAdded: '2024-01-10',
    },
    {
      id: '5',
      name: 'iPad Pro 12.9" M2',
      price: 4599.9,
      originalPrice: 4999.9,
      image: '/placeholder-product.jpg',
      rating: 4.8,
      reviewCount: 445,
      category: 'Tablets',
      brand: 'Apple',
      inStock: true,
      discount: 8,
      dateAdded: '2024-01-05',
      lastPriceChange: {
        date: '2024-01-21',
        oldPrice: 4999.9,
        newPrice: 4599.9,
      },
    },
  ]

  const categories = [
    'all',
    ...Array.from(new Set(wishlistItems.map(item => item.category))),
  ]

  const filteredItems = wishlistItems
    .filter(item => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.brand.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory =
        categoryFilter === 'all' || item.category === categoryFilter
      return matchesSearch && matchesCategory
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name)
        case 'price':
          return a.price - b.price
        case 'priceDesc':
          return b.price - a.price
        case 'rating':
          return b.rating - a.rating
        case 'dateAdded':
        default:
          return (
            new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()
          )
      }
    })

  const getWishlistSummary = () => {
    const totalItems = wishlistItems.length
    const totalValue = wishlistItems.reduce((sum, item) => sum + item.price, 0)
    const inStockItems = wishlistItems.filter(item => item.inStock).length
    const discountedItems = wishlistItems.filter(item => item.discount).length

    return { totalItems, totalValue, inStockItems, discountedItems }
  }

  const summary = getWishlistSummary()

  const removeFromWishlist = (itemId: string) => {
    // In a real app, this would make an API call
    console.log('Removing item:', itemId)
  }

  const addToCart = (itemId: string) => {
    // In a real app, this would make an API call
    console.log('Adding to cart:', itemId)
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Lista de Desejos
            </h1>
            <p className="text-gray-600">
              Seus produtos favoritos e acompanhamento de preços
            </p>
          </div>
          <Button variant="outline" size="sm">
            <Share2 className="h-4 w-4 mr-2" />
            Compartilhar Lista
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <Heart className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Itens Salvos</p>
                <p className="text-xl font-bold">{summary.totalItems}</p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Package className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Disponíveis</p>
                <p className="text-xl font-bold">{summary.inStockItems}</p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <TrendingDown className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Com Desconto</p>
                <p className="text-xl font-bold">{summary.discountedItems}</p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <DollarSign className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Valor Total</p>
                <p className="text-xl font-bold">
                  R${' '}
                  {summary.totalValue.toLocaleString('pt-BR', {
                    minimumFractionDigits: 2,
                  })}
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Buscar produtos na sua lista..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="lg:w-48">
              <select
                value={categoryFilter}
                onChange={e => setCategoryFilter(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md text-sm"
              >
                <option value="all">Todas as Categorias</option>
                {categories.slice(1).map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div className="lg:w-48">
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md text-sm"
              >
                <option value="dateAdded">Recém Adicionados</option>
                <option value="name">Nome A-Z</option>
                <option value="price">Menor Preço</option>
                <option value="priceDesc">Maior Preço</option>
                <option value="rating">Melhor Avaliação</option>
              </select>
            </div>
          </div>
        </Card>

        {/* Wishlist Items */}
        <div className="space-y-4">
          {filteredItems.length === 0 ? (
            <Card className="p-8 text-center">
              <Heart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Nenhum item encontrado
              </h3>
              <p className="text-gray-600">
                {searchTerm || categoryFilter !== 'all'
                  ? 'Tente ajustar os filtros para encontrar seus produtos'
                  : 'Sua lista de desejos está vazia. Que tal explorar nossos produtos?'}
              </p>
              {!searchTerm && categoryFilter === 'all' && (
                <Button className="mt-4">Explorar Produtos</Button>
              )}
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map(item => (
                <Card
                  key={item.id}
                  className="p-4 group hover:shadow-lg transition-shadow"
                >
                  {/* Product Image */}
                  <div className="relative mb-4">
                    <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                      <Package className="h-12 w-12 text-gray-400" />
                    </div>

                    {/* Badges */}
                    <div className="absolute top-2 left-2 space-y-1">
                      {item.discount && (
                        <Badge variant="destructive">-{item.discount}%</Badge>
                      )}
                      {!item.inStock && (
                        <Badge variant="secondary">Esgotado</Badge>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => removeFromWishlist(item.id)}
                        className="bg-white"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* Price Change Indicator */}
                    {item.lastPriceChange && (
                      <div className="absolute bottom-2 left-2">
                        <Badge variant="default" className="bg-green-600">
                          <TrendingDown className="h-3 w-3 mr-1" />
                          Preço baixou!
                        </Badge>
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="space-y-3">
                    <div>
                      <h3 className="font-semibold text-gray-900 line-clamp-2">
                        {item.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {item.brand} • {item.category}
                      </p>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium ml-1">
                          {item.rating}
                        </span>
                      </div>
                      <span className="text-sm text-gray-500">
                        ({item.reviewCount} avaliações)
                      </span>
                    </div>

                    {/* Price */}
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-bold text-gray-900">
                          R${' '}
                          {item.price.toLocaleString('pt-BR', {
                            minimumFractionDigits: 2,
                          })}
                        </span>
                        {item.originalPrice && (
                          <span className="text-sm text-gray-500 line-through">
                            R${' '}
                            {item.originalPrice.toLocaleString('pt-BR', {
                              minimumFractionDigits: 2,
                            })}
                          </span>
                        )}
                      </div>

                      {item.lastPriceChange && (
                        <p className="text-xs text-green-600">
                          Preço reduziu R${' '}
                          {(
                            item.lastPriceChange.oldPrice -
                            item.lastPriceChange.newPrice
                          ).toLocaleString('pt-BR', {
                            minimumFractionDigits: 2,
                          })}{' '}
                          em{' '}
                          {new Date(
                            item.lastPriceChange.date
                          ).toLocaleDateString('pt-BR')}
                        </p>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex space-x-2 pt-2">
                      <Button
                        size="sm"
                        className="flex-1"
                        disabled={!item.inStock}
                        onClick={() => addToCart(item.id)}
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        {item.inStock
                          ? 'Adicionar ao Carrinho'
                          : 'Indisponível'}
                      </Button>
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* Date Added */}
                    <div className="flex items-center text-xs text-gray-500 pt-2 border-t">
                      <Calendar className="h-3 w-3 mr-1" />
                      Adicionado em{' '}
                      {new Date(item.dateAdded).toLocaleDateString('pt-BR')}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Bulk Actions */}
        {filteredItems.length > 0 && (
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600">
                {filteredItems.length}{' '}
                {filteredItems.length === 1 ? 'item' : 'itens'} na sua lista
              </p>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  Adicionar Todos ao Carrinho
                </Button>
                <Button variant="outline" size="sm">
                  Limpar Lista
                </Button>
              </div>
            </div>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}

export default WishlistPage
